import React, { useState } from 'react';
import { Lock, ArrowRight, Smartphone, LayoutDashboard, Briefcase, User } from './Icons';
import { UserRole } from '../types';

interface LoginProps {
  onLoginSuccess: (role: UserRole, email: string) => void;
  onWorkforceDemo: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onWorkforceDemo }) => {
  const [activeTab, setActiveTab] = useState<'management' | 'employee'>('management');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (password === '123456') {
        if (email.toLowerCase() === 'owner@gmail.com') {
           onLoginSuccess(UserRole.OWNER, email);
        } else if (email.toLowerCase() === 'talentplate@gmail.com') {
           onLoginSuccess(UserRole.KAM, email);
        } else {
           setError('Unknown email. Are you an Owner or KAM?');
           setIsLoading(false);
        }
      } else {
        setError('Invalid credentials. Password is 123456');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl z-10 overflow-hidden">
        
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100">
           <button 
             onClick={() => setActiveTab('management')}
             className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'management' ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
           >
             Management Login
           </button>
           <button 
             onClick={() => setActiveTab('employee')}
             className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'employee' ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
           >
             Workforce App
           </button>
        </div>

        <div className="p-8">
          
          {activeTab === 'management' ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-black rounded-xl mx-auto flex items-center justify-center mb-4">
                  <LayoutDashboard className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Command Center</h2>
                <p className="text-sm text-gray-500 mt-1">For Owners & KAM Managers</p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase">Email</label>
                  <input
                    type="email"
                    required
                    className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm"
                    placeholder="owner@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase">Password</label>
                  <input
                    type="password"
                    required
                    className="appearance-none block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:text-sm"
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg flex items-center">
                     <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-black hover:bg-gray-800 focus:outline-none transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100">
                 <p className="text-xs text-center text-gray-400 mb-2">Demo Credentials</p>
                 <div className="flex justify-between text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <div>
                       <span className="font-bold block">Owner</span>
                       owner@gmail.com
                    </div>
                    <div className="text-right">
                       <span className="font-bold block">KAM</span>
                       talentplate@gmail.com
                    </div>
                 </div>
                 <div className="text-center text-xs text-gray-400 mt-2">Pass: 123456</div>
              </div>
            </div>
          ) : (
             <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300 py-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-6 text-blue-600">
                   <Smartphone size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Workforce App</h2>
                <p className="text-gray-500 text-sm mb-8 px-4">
                  Experience the mobile interface designed for your staff. Check-ins, shifts, and learning.
                </p>
                <button 
                  onClick={onWorkforceDemo}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Launch App Simulator <ArrowRight size={16} className="ml-2"/>
                </button>
                <p className="text-xs text-gray-400 mt-6">
                   No login required for demo.
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};