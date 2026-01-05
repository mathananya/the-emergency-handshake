import { useState } from "react";
import { Hospital } from "@/data/sampleHospitals";
import { MapPin, Bed, Users, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HospitalMapProps {
  hospitals: Hospital[];
}

// Convert lat/lng to SVG coordinates for India map
const latLngToSvg = (lat: number, lng: number) => {
  // India bounds approximately: lat 8-37, lng 68-97
  const minLat = 8, maxLat = 37;
  const minLng = 68, maxLng = 97;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  
  return { x, y };
};

const getScoreColor = (score: number) => {
  if (score >= 70) return "text-green-500 fill-green-500";
  if (score >= 40) return "text-amber-500 fill-amber-500";
  return "text-red-500 fill-red-500";
};

const getScoreBg = (score: number) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
};

const HospitalMap = ({ hospitals }: HospitalMapProps) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2 relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-[400px] lg:h-[500px]"
          style={{ background: "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)" }}
        >
          {/* India outline (simplified) */}
          <path
            d="M35,15 L55,10 L70,15 L80,25 L85,40 L80,55 L75,70 L65,80 L55,85 L45,82 L35,75 L25,65 L20,50 L22,35 L28,22 Z"
            fill="hsl(var(--primary) / 0.1)"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="0.5"
          />
          
          {/* Hospital markers */}
          {hospitals.map((hospital) => {
            const { x, y } = latLngToSvg(hospital.lat, hospital.lng);
            const isSelected = selectedHospital?.id === hospital.id;
            
            return (
              <g
                key={hospital.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedHospital(hospital)}
                className="cursor-pointer transition-transform hover:scale-125"
                style={{ transformOrigin: `${x}% ${y}%` }}
              >
                <circle
                  r={isSelected ? 3.5 : 2.5}
                  className={`${getScoreColor(hospital.readinessScore)} transition-all`}
                  stroke="white"
                  strokeWidth="0.5"
                />
                {isSelected && (
                  <circle
                    r="5"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                    className="animate-ping"
                    opacity="0.5"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
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
        {selectedHospital ? (
          <Card className="h-full animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedHospital.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedHospital.city}, {selectedHospital.state}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getScoreBg(selectedHospital.readinessScore)}`}>
                  {selectedHospital.readinessScore}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Bed className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Available Beds</p>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedHospital.emptyBeds}
                      <span className="text-sm font-normal text-muted-foreground"> / {selectedHospital.totalBeds}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Specialists On-Call</p>
                    <p className="text-2xl font-bold text-foreground">{selectedHospital.specialists}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">ER Capacity</p>
                    <p className="text-2xl font-bold text-foreground">
                      {selectedHospital.erAvailable}
                      <span className="text-sm font-normal text-muted-foreground"> / {selectedHospital.erCapacity} available</span>
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
