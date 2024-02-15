import React from 'react';
import LoginForm from '@/containers/templates/Login/loginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <LoginForm />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
