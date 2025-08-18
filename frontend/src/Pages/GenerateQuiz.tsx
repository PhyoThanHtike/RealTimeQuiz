import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { generateQuizForRoom, generateQuizForRoomWithFile } from '@/apiEndpoints/Room';
import { FileInput, Upload, Wand2, BookOpenCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { Variants } from 'framer-motion';
import ProTips from '@/AppComponents/GenerateQuiz/ProTips';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }
};

const GenerateQuiz = () => {
  const { roomId, hostId } = useParams();
  const userId = useSelector((state: any) => state.user.userId);
    
  const [quizData, setQuizData] = useState({
    prompt: '',
    topic: '',
    file: null as File | null
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  if (userId !== hostId) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-900"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            Only the room creator can generate quizzes for this room.
          </p>
          <Button asChild>
            <a href="/" className="w-full">
              Return to Dashboard
            </a>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQuizData(prev => ({ ...prev, file }));
      setSelectedFileName(file.name);
      toast.success('File uploaded successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const loadingToast = toast.loading('Generating your quiz...', {
      description: 'This may take a moment'
    });
    console.log(quizData);

    try {
      const response = await generateQuizForRoom(roomId, {
        prompt: quizData.prompt,
        topic: quizData.topic
      });

      toast.dismiss(loadingToast);
      toast.success('Quiz Generated!', {
        description: 'Your quiz is ready to use in the room',
        duration: 5000,
        action: {
          label: 'View Room',
          onClick: () => window.location.href = `/room/preview-quiz/${roomId}/${userId}`
        }
      });

      // Reset form
      setQuizData({ prompt: '', topic: '', file: null });
      setSelectedFileName('');

    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error('Generation Failed', {
        description: error.message || 'Could not generate quiz',
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(e)
        }
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-purple mb-4 bg-clip-text ">
            AI Quiz Generator
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Create engaging quizzes in seconds with our powerful AI
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="p-1 bg-gradient-to-r from-blue-900 to-purple-900">
            <motion.div 
            //   variants={cardVariants}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Wand2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-200">Quiz Creation Wizard</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-3">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      Quiz Prompt *
                    </span>
                  </Label>
                  <Textarea
                    id="prompt"
                    name="prompt"
                    value={quizData.prompt}
                    onChange={handleInputChange}
                    placeholder="Example: 'Create a 10-question multiple choice quiz about React hooks with medium difficulty'"
                    className="min-h-[140px] text-lg border-gray-300 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} >
                  <Label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-3">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      Topic (Optional)
                    </span>
                  </Label>
                  <Input
                    id="topic"
                    name="topic"
                    type="text"
                    value={quizData.topic}
                    onChange={handleInputChange}
                    placeholder="Example: 'JavaScript', 'World History'"
                    className="text-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-3">
                    <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      Upload Reference Material (Optional)
                    </span>
                  </Label>
                  <motion.label 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all bg-gray-700"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-3 mb-4 rounded-full bg-blue-100 text-blue-600"
                      >
                        <Upload className="w-6 h-6" />
                      </motion.div>
                      <p className="text-sm text-gray-300 text-center">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                        <br />
                        <span className="text-xs text-gray-400">PDF, DOCX, TXT (Max 10MB)</span>
                      </p>
                    </div>
                    <input 
                      id="file" 
                      name="file" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </motion.label>
                  {selectedFileName && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 flex items-center text-sm text-gray-600 bg-blue-50 rounded-lg p-3"
                    >
                      <FileInput className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{selectedFileName}</span>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="pt-6 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    className="w-full py-7 text-lg font-medium bg-gradient-to-r from-purple to-indigo-800 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    disabled={isGenerating || !quizData.prompt}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Generating Magic...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <BookOpenCheck className="w-6 h-6" />
                        Generate Quiz Now
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
        <ProTips/>
      </div>
      
    </motion.section>
  );
};

export default GenerateQuiz;