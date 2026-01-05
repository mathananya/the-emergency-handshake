import { Hospital } from "@/data/sampleHospitals";
import { Bed, Users, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HospitalScoreCardsProps {
  hospitals: Hospital[];
}

const getScoreColor = (score: number) => {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
};

const getScoreBg = (score: number) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
};

const getProgressColor = (score: number) => {
  if (score >= 70) return "[&>div]:bg-green-500";
  if (score >= 40) return "[&>div]:bg-amber-500";
  return "[&>div]:bg-red-500";
};

const HospitalScoreCards = ({ hospitals }: HospitalScoreCardsProps) => {
  // Sort by readiness score descending
  const sortedHospitals = [...hospitals].sort((a, b) => b.readinessScore - a.readinessScore);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedHospitals.map((hospital, index) => (
        <Card 
          key={hospital.id} 
          className="group hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
        >
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                  {index === 0 && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" />
                      Top
                    </span>
                  )}
                  {index === sortedHospitals.length - 1 && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                      <TrendingDown className="w-3 h-3" />
                      Low
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground truncate">{hospital.name}</h3>
                <p className="text-xs text-muted-foreground">{hospital.city}, {hospital.state}</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getScoreBg(hospital.readinessScore)}`}>
                {hospital.readinessScore}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <Progress 
                value={hospital.readinessScore} 
                className={`h-2 ${getProgressColor(hospital.readinessScore)}`}
              />
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Bed className="w-3.5 h-3.5" />
                  Beds
                </span>
                <span className="font-medium text-foreground">
                  {hospital.emptyBeds}/{hospital.totalBeds}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  Specialists
                </span>
                <span className="font-medium text-foreground">{hospital.specialists}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <AlertCircle className="w-3.5 h-3.5" />
                  ER Available
                </span>
                <span className="font-medium text-foreground">
                  {hospital.erAvailable}/{hospital.erCapacity}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HospitalScoreCards;
