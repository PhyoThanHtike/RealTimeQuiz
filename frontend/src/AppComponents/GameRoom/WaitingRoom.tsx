import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WaitingRoom = ({ isHost, onStart }: { isHost: boolean; onStart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
            >
              Waiting for players...
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.p 
            className="text-gray-400 text-lg"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            The quiz will start once the host begins.
          </motion.p>
        </CardContent>
        <CardFooter className="justify-center">
          {isHost && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 10px rgba(74, 222, 128, 0)"],
              }}
              transition={{ 
                boxShadow: { duration: 1.5, repeat: Infinity },
              }}
            >
              <Button 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                onClick={onStart}
              >
                Start Quiz 🚀
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WaitingRoom;