import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import { Hospital } from "@/data/sampleHospitals";
import { Bed, Users, AlertCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";

interface HospitalMapProps {
  hospitals: Hospital[];
}

const getScoreColor = (score: number) => {
  if (score >= 70) return "#22c55e"; // green
  if (score >= 40) return "#f59e0b"; // amber
  return "#ef4444"; // red
};

const getScoreBg = (score: number) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
};

// Create custom marker icon
const createMarkerIcon = (score: number) => {
  const color = getScoreColor(score);
  return new DivIcon({
    className: "custom-marker",
    html: `<div style="
      width: 32px;
      height: 32px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
    ">${score}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const HospitalMap = ({ hospitals }: HospitalMapProps) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // Center of India
  const indiaCenter: [number, number] = [20.5937, 78.9629];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2 relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <MapContainer
          center={indiaCenter}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-[400px] lg:h-[500px] rounded-2xl"
          style={{ zIndex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lng]}
              icon={createMarkerIcon(hospital.readinessScore)}
              eventHandlers={{
                click: () => setSelectedHospital(hospital),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{hospital.name}</p>
                  <p className="text-gray-600">{hospital.city}, {hospital.state}</p>
                  <p className="mt-1">Readiness: <strong>{hospital.readinessScore}</strong></p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border z-[1000]">
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
