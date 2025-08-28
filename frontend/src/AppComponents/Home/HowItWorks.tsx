import React from 'react'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const steps = [
    {
      title: "Create or Join",
      description: "Start a new quiz room or join an existing one"
    },
    {
      title: "Compete Live",
      description: "Answer questions in real-time against others"
    },
    {
      title: "Track Progress",
      description: "See your results and improve over time"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-white mb-16"
        >
          How QuizHub Works
        </motion.h2>
        
        <div className="relative">
          {/* vertical line */}
          <div className="absolute h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 left-1/2 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center md:items-start ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
              >
                {/* Number circle */}
                <div className={`md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:justify-end md:pr-8' : 'md:justify-start md:pl-8 md:order-2'}`}>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Text */}
                <div className={`md:w-1/2 flex flex-col justify-center ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:order-1'}`}>
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="text-gray-300 mt-3 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
