import React from 'react';

const GoogleOAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";  // Your backend Google OAuth route
  };

  return (
    <button onClick={handleGoogleLogin} className="google-btn">
      Sign up with Google
    </button>
  );
};

export default GoogleOAuthButton;
