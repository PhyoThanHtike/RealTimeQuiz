import { getCreatedRooms, type getRooms } from "@/apiEndpoints/Room";
import MyRooms from "@/AppComponents/MyRooms/MyRooms";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Rocket, Users, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Room = () => {
  const {
    data: createdRoomsData,
    isLoading: isRoomsLoading,
    error: roomsError,
    isError,
  } = useQuery<getRooms, Error>({
    queryKey: ["createdRooms"],
    queryFn: getCreatedRooms,
  });

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {/* Hero Section */}
      <motion.div
        className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-purple-900 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Quiz Rooms Dashboard
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Create, manage, and track all your interactive quiz rooms in one place
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Engage"
              description="Create interactive quizzes"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Collaborate"
              description="Invite participants"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Track"
              description="Monitor progress"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Learn"
              description="Reinforce knowledge"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="bg-shade px-6 py-4">
              <h2 className="text-xl font-bold text-white">Active Rooms</h2>
              <p className="text-blue-100">Rooms currently in progress</p>
            </div>
            <MyRooms
              data={createdRoomsData}
              isLoading={isRoomsLoading}
              error={roomsError}
              isError={isError}
              filter="active"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="bg-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">All Rooms</h2>
              <p className="text-indigo-100">Your complete room history</p>
            </div>
            <MyRooms
              data={createdRoomsData}
              isLoading={isRoomsLoading}
              error={roomsError}
              isError={isError}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

// Animated Feature Card
const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-all"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-blue-100">{description}</p>
  </motion.div>
);

export default Room;



