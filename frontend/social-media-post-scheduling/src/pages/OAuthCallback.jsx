import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const OAuthCallback = () => {
  const { platform } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code) {
          setError('No authorization code received');
          return;
        }

        // Send code and state to backend for token exchange
        const response = await axiosInstance.get(
          `/api/account/v1/auth/${platform}/callback`,
          {
            params: { code, state }
          }
        );

        console.log('OAuth successful:', response.data);
        
        // Redirect to accounts page with success message
        navigate('/accounts?success=true', { replace: true });
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err.response?.data?.message || 'Failed to authenticate with ' + platform);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [platform, navigate, searchParams]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium mb-2'>Authenticating with {platform}...</p>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium text-red-600 mb-4'>{error}</p>
          <button
            onClick={() => navigate('/accounts')}
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md'
          >
            Back to Accounts
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallback;
