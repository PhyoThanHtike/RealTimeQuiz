import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomById } from '@/apiEndpoints/Room';
import type { roomData } from '@/apiEndpoints/Room';
import PreviewQuizComponent from '@/AppComponents/PreviewQuestions/PreviewQuizComponent';
import { useNavigate } from 'react-router-dom';

const PreviewQuiz: React.FC = () => {
  const { roomId, hostId } = useParams<{ roomId: string, hostId: string }>();
  const [room, setRoom] = useState<roomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await getRoomById(roomId);
        if ('room' in response) {
          setRoom(response.room);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch room data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleStartQuiz = () => {
    // Navigation logic to start the quiz
    console.log('Starting quiz...');
    navigate(`/room/game-room/${roomId}/${hostId}`);
  };

  if (!roomId) {
    return <div>Room ID is missing</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-purple-950 p-4">
      <PreviewQuizComponent
        room={room}
        loading={loading}
        error={error}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
};

export default PreviewQuiz;