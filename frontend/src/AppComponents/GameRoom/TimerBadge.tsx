import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface TimerBadgeProps {
  initialTime: number;
  onTimeUp?: () => void;
}

const TimerBadge = ({ initialTime, onTimeUp }: TimerBadgeProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleTick = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        onTimeUp?.();
        return 0;
      }
      return prev - 1;
    });
  }, [onTimeUp]);

  useEffect(() => {
    setTimeLeft(initialTime);
    const interval = setInterval(handleTick, 1000);
    return () => clearInterval(interval);
  }, [initialTime, handleTick]);

  return (
    <Badge 
      variant={timeLeft < 5 ? "destructive" : "default"}
      className="font-mono text-sm"
    >
      {timeLeft}s
    </Badge>
  );
};

export default React.memo(TimerBadge);
