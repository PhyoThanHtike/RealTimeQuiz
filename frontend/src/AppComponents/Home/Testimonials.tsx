import { motion } from 'framer-motion';
import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      quote: "QuizHub helped me ace my certification exam! The custom quizzes were perfect for studying.",
      author: "Sarah K.",
      role: "Computer Science Student"
    },
    {
      quote: "Our team uses QuizHub for weekly trivia nights - it's so much fun competing in real-time!",
      author: "Mark T.",
      role: "Team Lead"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
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
          className="text-3xl font-bold text-center text-white mb-12"
        >
          What Our Users Say
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700"
            >
              <div className="text-yellow-400 text-2xl mb-4">"</div>
              <p className="text-gray-200 italic mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials