export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  emptyBeds: number;
  totalBeds: number;
  specialists: number;
  erCapacity: number;
  erAvailable: number;
  readinessScore: number;
}

// Generate random number in range
const randomInRange = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Calculate readiness score (0-100)
const calculateReadiness = (
  emptyBeds: number, 
  totalBeds: number, 
  specialists: number, 
  erAvailable: number, 
  erCapacity: number
): number => {
  const bedScore = (emptyBeds / totalBeds) * 40; // 40% weight
  const specialistScore = Math.min(specialists / 10, 1) * 30; // 30% weight, max at 10 specialists
  const erScore = (erAvailable / erCapacity) * 30; // 30% weight
  return Math.round(bedScore + specialistScore + erScore);
};

// Sample hospital locations across India
const hospitalLocations = [
  { name: "Apollo Hospital", city: "Delhi", state: "Delhi", lat: 28.5673, lng: 77.2090 },
  { name: "Fortis Memorial", city: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266 },
  { name: "AIIMS", city: "New Delhi", state: "Delhi", lat: 28.5672, lng: 77.2100 },
  { name: "Medanta Hospital", city: "Gurugram", state: "Haryana", lat: 28.4400, lng: 77.0420 },
  { name: "Kokilaben Hospital", city: "Mumbai", state: "Maharashtra", lat: 19.1310, lng: 72.8260 },
  { name: "Narayana Health", city: "Bangalore", state: "Karnataka", lat: 12.8980, lng: 77.5970 },
  { name: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", lat: 12.9249, lng: 79.1325 },
  { name: "KIMS Hospital", city: "Hyderabad", state: "Telangana", lat: 17.4485, lng: 78.3908 },
  { name: "Ruby Hall Clinic", city: "Pune", state: "Maharashtra", lat: 18.5330, lng: 73.8800 },
  { name: "Max Super Specialty", city: "Patparganj", state: "Delhi", lat: 28.6230, lng: 77.2900 },
];

// Generate sample data
export const hospitalData: Hospital[] = hospitalLocations.map((loc, index) => {
  const totalBeds = randomInRange(100, 500);
  const emptyBeds = randomInRange(5, Math.floor(totalBeds * 0.4));
  const specialists = randomInRange(3, 15);
  const erCapacity = randomInRange(10, 30);
  const erAvailable = randomInRange(1, erCapacity);
  
  return {
    id: `hospital-${index + 1}`,
    name: loc.name,
    city: loc.city,
    state: loc.state,
    lat: loc.lat,
    lng: loc.lng,
    emptyBeds,
    totalBeds,
    specialists,
    erCapacity,
    erAvailable,
    readinessScore: calculateReadiness(emptyBeds, totalBeds, specialists, erAvailable, erCapacity),
  };
});
