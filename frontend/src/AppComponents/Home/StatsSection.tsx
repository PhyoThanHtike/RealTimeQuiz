import { motion } from 'framer-motion';
import React from 'react'

const StatsSection = () => {
  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "50,000+", label: "Quizzes Created" },
    { value: "1M+", label: "Questions Answered" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.p 
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xl text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection