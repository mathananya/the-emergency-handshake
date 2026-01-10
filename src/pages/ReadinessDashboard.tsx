import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HospitalMap from "@/components/readiness/HospitalMap";
import HospitalScoreCards from "@/components/readiness/HospitalScoreCards";
import LiveStatusBar from "@/components/readiness/LiveStatusBar";
import { useRealtimeHospitals } from "@/hooks/useRealtimeHospitals";

const ReadinessDashboard = () => {
  const { hospitals, lastUpdated, isLive, toggleLive, refreshNow, updatedIds } = useRealtimeHospitals({
    updateInterval: 5000,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Live Network Status
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Hospital Readiness Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Real-time visibility into hospital capacity across India. View bed availability, 
                specialist coverage, and ER status at a glance.
              </p>
            </div>
          </div>
        </section>

        {/* Live Status Bar */}
        <LiveStatusBar 
          lastUpdated={lastUpdated}
          isLive={isLive}
          onToggleLive={toggleLive}
          onRefresh={refreshNow}
        />

        {/* Map Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Disclaimer */}
            <div className="mb-6 p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
              <p className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                <span className="font-semibold">⚠️ Disclaimer:</span>
                <span>The data presented here is entirely fictional and intended solely for simulation and testing purposes. It does not represent any real entities, events, or information.</span>
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Network Map</h2>
              <p className="text-muted-foreground">
                Click on a hospital marker to view details
              </p>
            </div>
            <HospitalMap hospitals={hospitals} updatedIds={updatedIds} />
          </div>
        </section>

        {/* Hospital Scores Section */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Readiness Scores</h2>
              <p className="text-muted-foreground">
                Scores calculated based on available beds, specialists on-call, and ER capacity
              </p>
            </div>
            <HospitalScoreCards hospitals={hospitals} updatedIds={updatedIds} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReadinessDashboard;
