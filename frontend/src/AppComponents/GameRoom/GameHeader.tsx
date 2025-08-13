import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const GameHeader = ({ roomId, isHost, onLeave }: { roomId?: string; isHost: boolean; onLeave: () => void }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Quiz Room
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="text-gray-300">Room Code:</span>
          <span className="font-mono px-3 py-1 bg-gray-800 rounded-lg text-white border border-gray-700 shadow-sm">
            {roomId}
          </span>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isHost && (
          <motion.span 
            className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-md"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: ["0 0 0 0 rgba(234, 179, 8, 0.7)", "0 0 0 6px rgba(234, 179, 8, 0)"],
            }}
            transition={{ 
              boxShadow: { duration: 1.5, repeat: Infinity },
            }}
          >
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            Host
          </motion.span>
        )}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold shadow-lg"
            onClick={onLeave}
          >
            Leave Room
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameHeader;
