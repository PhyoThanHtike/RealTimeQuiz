import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";

interface QuizStats {
  totalQuizzes: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: string;
  rank: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Icons;
  unlocked: boolean;
}

interface RecentQuiz {
  id: string;
  name: string;
  score: number;
  date: string;
  category: string;
}

export default function Profile() {
  // Mock data - replace with your actual data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/avatars/01.png",
    joinDate: "Joined March 2023",
    level: 12,
    levelProgress: 68,
  };

  const stats: QuizStats = {
    totalQuizzes: 87,
    correctAnswers: 532,
    accuracy: 82,
    averageTime: "12.4s",
    rank: 145,
  };

  const achievements: Achievement[] = [
    {
      id: "1",
      name: "Quiz Master",
      description: "Complete 50 quizzes",
      icon: "trophy",
      unlocked: true,
    },
    {
      id: "2",
      name: "Speed Demon",
      description: "Average answer time < 10s",
      icon: "zap",
      unlocked: true,
    },
    {
      id: "3",
      name: "Perfectionist",
      description: "Score 100% on any quiz",
      icon: "star",
      unlocked: false,
    },
  ];

  const recentQuizzes: RecentQuiz[] = [
    {
      id: "1",
      name: "JavaScript Fundamentals",
      score: 92,
      date: "Today",
      category: "Programming",
    },
    {
      id: "2",
      name: "World Capitals",
      score: 85,
      date: "Yesterday",
      category: "Geography",
    },
    {
      id: "3",
      name: "Modern History",
      score: 78,
      date: "2 days ago",
      category: "History",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-8 space-y-8 mx-auto"
    >
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-3xl font-bold tracking-tight"
              whileHover={{ x: 5 }}
            >
              {user.name}
            </motion.h1>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground">{user.joinDate}</p>
          
          <div className="flex items-center gap-4 pt-2">
            <Badge variant="secondary" className="gap-2">
              <Icons.star className="h-4 w-4 text-yellow-500" />
              Level {user.level}
            </Badge>
            <div className="flex-1 max-w-xs">
              <Progress value={user.levelProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {user.levelProgress}% to next level
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard 
          title="Quizzes Taken" 
          value={stats.totalQuizzes} 
          icon="quiz" 
          change="+8 this week" 
        />
        <StatCard 
          title="Correct Answers" 
          value={stats.correctAnswers} 
          icon="check" 
        />
        <StatCard 
          title="Accuracy" 
          value={`${stats.accuracy}%`} 
          icon="target" 
          change="+5% from last month" 
        />
        <StatCard 
          title="Avg. Time" 
          value={stats.averageTime} 
          icon="clock" 
        />
        <StatCard 
          title="Global Rank" 
          value={`#${stats.rank}`} 
          icon="award" 
          change="↑ 12 places" 
        />
      </motion.div>

      {/* Tabs Section */}
      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-xs">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} {...achievement} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {recentQuizzes.map((quiz) => (
              <QuizHistoryCard key={quiz.id} {...quiz} />
            ))}
            <Button variant="outline" className="w-full">
              View All History
            </Button>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Component for stat cards
function StatCard({ title, value, icon, change }: { 
  title: string; 
  value: string | number; 
  icon: keyof typeof Icons;
  change?: string; 
}) {
  const Icon = Icons[icon];
  
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <p className="text-xs text-muted-foreground mt-1">{change}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Component for achievement cards
function AchievementCard({ name, description, icon, unlocked }: Achievement) {
  const Icon = Icons[icon];
  
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={unlocked ? "" : "opacity-60"}>
        <CardContent className="flex items-center gap-4 pt-6">
          <div className={`p-3 rounded-full ${unlocked ? "bg-primary/10 text-primary" : "bg-muted"}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {!unlocked && (
              <Badge variant="outline" className="mt-1 text-xs">
                Locked
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Component for quiz history cards
function QuizHistoryCard({ name, score, date, category }: RecentQuiz) {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <h4 className="font-semibold">{name}</h4>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="secondary">{category}</Badge>
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
              {score}%
            </div>
            <Icons.chevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}