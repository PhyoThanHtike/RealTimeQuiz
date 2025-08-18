// First, create a new file: components/icons.tsx
import {
  Trophy,
  Zap,
  Star,
  Check,
  Target,
  Clock,
  Award,
  ChevronRight,
  // Add other icons you need
} from "lucide-react";

export const Icons = {
  trophy: Trophy,
  zap: Zap,
  star: Star,
  check: Check,
  target: Target,
  clock: Clock,
  award: Award,
  chevronRight: ChevronRight,
  quiz: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3"/>
      <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.5"/>
      <path d="m9 16-1.5 1.5L6 16"/>
      <path d="m14 16-1.5 1.5L11 16"/>
      <path d="m19 16-1.5 1.5L16 16"/>
      <path d="M9 11V5a3 3 0 1 1 6 0v6"/>
    </svg>
  ),
  // Add more custom icons if needed
};