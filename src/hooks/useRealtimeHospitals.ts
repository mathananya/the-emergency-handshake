import { useState, useEffect, useCallback } from "react";
import { Hospital, generateHospitalData, simulateUpdate } from "@/data/sampleHospitals";

interface UseRealtimeHospitalsOptions {
  updateInterval?: number; // in milliseconds
  enabled?: boolean;
}

export const useRealtimeHospitals = (options: UseRealtimeHospitalsOptions = {}) => {
  const { updateInterval = 5000, enabled = true } = options;
  
  const [hospitals, setHospitals] = useState<Hospital[]>(() => generateHospitalData());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(enabled);
  const [updatedIds, setUpdatedIds] = useState<Set<string>>(new Set());

  const updateHospitals = useCallback(() => {
    setHospitals(prev => {
      const updated = simulateUpdate(prev);
      
      // Track which hospitals had score changes
      const changedIds = new Set<string>();
      updated.forEach((hospital, index) => {
        if (hospital.readinessScore !== prev[index].readinessScore) {
          changedIds.add(hospital.id);
        }
      });
      setUpdatedIds(changedIds);
      
      // Clear the updated indicators after animation
      setTimeout(() => setUpdatedIds(new Set()), 1000);
      
      return updated;
    });
    setLastUpdated(new Date());
  }, []);

  const toggleLive = useCallback(() => {
    setIsLive(prev => !prev);
  }, []);

  const refreshNow = useCallback(() => {
    updateHospitals();
  }, [updateHospitals]);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(updateHospitals, updateInterval);
    return () => clearInterval(interval);
  }, [isLive, updateInterval, updateHospitals]);

  return {
    hospitals,
    lastUpdated,
    isLive,
    toggleLive,
    refreshNow,
    updatedIds,
  };
};
