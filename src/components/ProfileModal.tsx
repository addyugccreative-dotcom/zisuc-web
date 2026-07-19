import React, { useState } from 'react';
import { X, LogOut, User } from 'lucide-react';
import { googleSignIn, logout as firebaseLogout } from '../lib/firebase';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onLogin, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        onLogin({
          name: result.user.displayName || 'User',
          email: result.user.email,
          avatar: result.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(result.user.displayName || 'User')}&background=random`,
          accessToken: result.accessToken
        });
      }
    } catch (err) {
      console.error('Google Login Failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await firebaseLogout();
    onLogout();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100] transition-opacity animate-fade-in backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white p-6 sm:p-8 rounded-none border border-stone-200/60 shadow-lg z-[110] animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-medium text-stone-900 tracking-wide">
            {user ? 'My Account' : 'Sign In'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-stone-100 rounded-full transition" aria-label="Close Profile">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full border border-stone-200" />
              <div>
                <p className="font-sans font-semibold text-stone-900">{user.name}</p>
                <p className="text-sm text-stone-500">{user.email}</p>
              </div>
            </div>
            
            <div className="border-t border-stone-100 pt-4">
              <button className="w-full flex items-center justify-between p-3 hover:bg-stone-50 transition text-left text-sm text-stone-700">
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> My Orders</span>
              </button>
              <button 
                onClick={async () => {
                  if (!user.accessToken) {
                    alert('Please sign in again to grant Google Sheets permission.');
                    return;
                  }
                  try {
                    // Create a new spreadsheet
                    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        properties: { title: "ZISU'C User Data Sync" }
                      })
                    });
                    const data = await res.json();
                    if (data.spreadsheetId) {
                      window.open(data.spreadsheetUrl, '_blank');
                    }
                  } catch (e) {
                    console.error('Error creating spreadsheet', e);
                  }
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-stone-50 transition text-left text-sm text-green-700 mt-1"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Export Data to Google Sheets
                </span>
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3 hover:bg-stone-50 transition text-left text-sm text-red-600 mt-1"
              >
                <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-stone-600">
              Sign in to manage your orders, save your favorite products, and access exclusive offers.
            </p>
            
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 py-3 px-4 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </>
              )}
            </button>
            
            <p className="text-[10px] text-stone-400 text-center uppercase tracking-wider">
              By signing in, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
