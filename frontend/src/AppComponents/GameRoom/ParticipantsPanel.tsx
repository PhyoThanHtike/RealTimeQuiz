import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { participant } from "@/apiEndpoints/Room";

const ParticipantsPanel = ({ participants, hostId }: { participants: participant[]; hostId?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            <span className="bg-clip-text text-emerald-500">
              Participants ({participants.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {participants.map((p, idx) => (
              <motion.li
                key={p.userId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex justify-between items-center px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors ${
                  p.userId === hostId ? "border-l-4 border-yellow-400" : ""
                }`}
              >
                <span className="text-white">{p.userName}</span>
                {p.userId === hostId && (
                  <motion.span 
                    className="text-yellow-300 text-xs font-bold px-2 py-1 bg-yellow-900/30 rounded-full flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></span>
                    Host
                  </motion.span>
                )}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ParticipantsPanel;
