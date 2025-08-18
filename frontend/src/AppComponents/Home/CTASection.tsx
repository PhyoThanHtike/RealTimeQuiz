import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import React from 'react'
import { Link } from 'react-router-dom';
const CTASection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-6"
        >
          Ready to Test Your Knowledge?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Join thousands of users who are learning and having fun with QuizHub
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button 
            asChild
            className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all"
          >
            <Link to="/create">
              Create a Quiz
            </Link>
          </Button>
          <Button 
            asChild
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all"
          >
            <Link to="/join">
              Join a Room
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTASection