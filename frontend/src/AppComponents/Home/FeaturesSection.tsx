// src/components/Features.tsx
import React from "react";
import { motion, type Variants } from "framer-motion";

// const items = [
//   {
//     title: "Realtime Play",
//     desc: "Players answer in real-time with instant scoring and leaderboards.",
//   },
//   {
//     title: "Create & Host",
//     desc: "Build quizzes fast — multiple question types and timers.",
//   },
//   {
//     title: "Cross-Device",
//     desc: "Mobile and desktop friendly — no downloads required.",
//   },
// ];

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 18 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
//   }),
// };

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "🚀",
      title: "Live Quiz Rooms",
      description:
        "Compete with friends in real-time with our multiplayer quiz system",
    },
    {
      icon: "📝",
      title: "Create Custom Quizzes",
      description: "Build your own quizzes for exam prep or knowledge testing",
    },
    {
      icon: "🏆",
      title: "Leaderboards",
      description: "Track your progress and climb the global rankings",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-b from-purple-950 to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          Why Choose QuizHub?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="flex flex-row gap-3 items-center justify-center">
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
              </div>

              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
