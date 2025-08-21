// AuthSuccess.tsx - Improved version
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setUser } from '../store/slices/userSlice';
import { setUser } from '@/store/slices/UserSlice';
import { toast } from 'sonner';

interface UserData {
  _id: string;
  userName: string;
  email: string;
  profilePicture: string;
}

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Extract and validate user data
        const userData: UserData = {
          _id: searchParams.get('_id') || '',
          userName: searchParams.get('userName') || '',
          email: searchParams.get('email') || '',
          profilePicture: searchParams.get('profilePicture') || ''
        };

        console.log(userData);

        // Validate required fields
        if (!userData._id || !userData.email) {
          throw new Error('Invalid authentication data');
        }

        // Optional: Verify with backend (extra security)
        // const verifyResponse = await verifyGoogleAuth(userData._id);
        
        // Dispatch user to Redux store
        dispatch(setUser(userData));
        toast.success("Welcome back! Google login successful");
        
        // Redirect to home after short delay
        setTimeout(() => navigate("/"), 1000);
        
      } catch (err) {
        setError('Authentication failed. Please try again.');
        toast.error("Google login failed");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    processAuth();
  }, [searchParams, dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Completing login...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthSuccess;