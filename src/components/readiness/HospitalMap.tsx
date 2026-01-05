import { useState } from "react";
import { Hospital } from "@/data/sampleHospitals";
import { Bed, Users, AlertCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HospitalMapProps {
  hospitals: Hospital[];
  updatedIds?: Set<string>;
}

// Convert lat/lng to percentage positions on the India map image
// India bounds: lat 8-37, lng 68-97
const latLngToPosition = (lat: number, lng: number) => {
  const minLat = 6, maxLat = 38;
  const minLng = 66, maxLng = 98;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  
  return { x: `${x}%`, y: `${y}%` };
};

const getScoreColor = (score: number) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
};

const getScoreBorder = (score: number) => {
  if (score >= 70) return "ring-green-500/50";
  if (score >= 40) return "ring-amber-500/50";
  return "ring-red-500/50";
};

const HospitalMap = ({ hospitals, updatedIds = new Set() }: HospitalMapProps) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // Update selected hospital data when hospitals update
  const currentSelectedData = selectedHospital 
    ? hospitals.find(h => h.id === selectedHospital.id) || selectedHospital
    : null;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2 relative bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-2xl border border-border overflow-hidden shadow-sm min-h-[400px] lg:min-h-[500px]">
        {/* India Map Background using OpenStreetMap static image */}
        <div className="absolute inset-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/India_location_map.svg/800px-India_location_map.svg.png"
            alt="Map of India"
            className="w-full h-full object-contain opacity-60"
          />
        </div>
        
        {/* Hospital Markers */}
        {hospitals.map((hospital) => {
          const pos = latLngToPosition(hospital.lat, hospital.lng);
          const isSelected = currentSelectedData?.id === hospital.id;
          const isUpdated = updatedIds.has(hospital.id);
          
          return (
            <button
              key={hospital.id}
              onClick={() => setSelectedHospital(hospital)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-primary rounded-full ${
                isSelected ? "scale-125 z-20" : "hover:scale-110"
              } ${isUpdated ? "animate-pulse" : ""}`}
              style={{ left: pos.x, top: pos.y }}
              aria-label={`${hospital.name} - Readiness Score: ${hospital.readinessScore}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white transition-colors duration-300 ${getScoreColor(hospital.readinessScore)} ${
                  isSelected ? `ring-4 ${getScoreBorder(hospital.readinessScore)}` : ""
                }`}
              >
                {hospital.readinessScore}
              </div>
              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full bg-background border border-border rounded-lg px-2 py-1 shadow-lg whitespace-nowrap z-30">
                  <p className="text-xs font-medium text-foreground">{hospital.name}</p>
                  <p className="text-[10px] text-muted-foreground">{hospital.city}</p>
                </div>
              )}
            </button>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border shadow-md">
          <p className="text-xs font-medium text-foreground mb-2">Readiness Level</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">High (70-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Medium (40-69)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-muted-foreground">Low (0-39)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Hospital Details */}
      <div className="lg:col-span-1">
        {currentSelectedData ? (
          <Card className="h-full animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{currentSelectedData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentSelectedData.city}, {currentSelectedData.state}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${getScoreColor(currentSelectedData.readinessScore)}`}>
                  {currentSelectedData.readinessScore}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Bed className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Available Beds</p>
                    <p className="text-2xl font-bold text-foreground">
                      {currentSelectedData.emptyBeds}
                      <span className="text-sm font-normal text-muted-foreground"> / {currentSelectedData.totalBeds}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Specialists On-Call</p>
                    <p className="text-2xl font-bold text-foreground">{currentSelectedData.specialists}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">ER Capacity</p>
                    <p className="text-2xl font-bold text-foreground">
                      {currentSelectedData.erAvailable}
                      <span className="text-sm font-normal text-muted-foreground"> / {currentSelectedData.erCapacity} available</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Readiness score calculated based on bed availability (40%), specialist coverage (30%), and ER capacity (30%).
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Click on a hospital marker to view details
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HospitalMap;
