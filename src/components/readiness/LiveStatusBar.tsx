import { RefreshCw, Radio, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface LiveStatusBarProps {
  lastUpdated: Date;
  isLive: boolean;
  onToggleLive: () => void;
  onRefresh: () => void;
}

const LiveStatusBar = ({ lastUpdated, isLive, onToggleLive, onRefresh }: LiveStatusBarProps) => {
  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="flex items-center gap-2">
              {isLive ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-green-600">Live</span>
                </>
              ) : (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-muted-foreground"></span>
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">Paused</span>
                </>
              )}
            </div>
            
            {/* Last Updated */}
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Last updated: {format(lastUpdated, "HH:mm:ss")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Live */}
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleLive}
              className="gap-2"
            >
              {isLive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Radio className="w-4 h-4" />
                  <span className="hidden sm:inline">Go Live</span>
                </>
              )}
            </Button>

            {/* Manual Refresh */}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatusBar;
