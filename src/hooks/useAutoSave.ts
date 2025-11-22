/**
 * useAutoSave.ts
 * Custom hook for automatic saving to localStorage at intervals
 */

import { useEffect, useRef, useState } from "react";

interface UseAutoSaveOptions<T> {
  data: T;
  saveFunction: (data: T) => void;
  interval?: number; // milliseconds, default 20000 (20 seconds)
}

export const useAutoSave = <T>({
  data,
  saveFunction,
  interval = 20000,
}: UseAutoSaveOptions<T>) => {
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const savedDataRef = useRef<string>(JSON.stringify(data));

  useEffect(() => {
    const timer = setInterval(() => {
      const currentData = JSON.stringify(data);

      // Only save if data has changed
      if (currentData !== savedDataRef.current) {
        saveFunction(data);
        savedDataRef.current = currentData;
        setLastSaveTime(new Date());
      }
    }, interval);

    return () => clearInterval(timer);
  }, [data, saveFunction, interval]);

  return { lastSaveTime };
};
