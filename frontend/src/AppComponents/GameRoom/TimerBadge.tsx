import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const TimerBadge = ({ initialTime }: { initialTime: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialTime]);

  return (
    <Badge variant={timeLeft < 5 ? "destructive" : "default"}>
      {timeLeft}s
    </Badge>
  );
};

export default TimerBadge;
