import React, { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Smartphone, Briefcase, ShoppingBag, ArrowRight } from './Icons';
import { AppView, UserRole } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
  userEmail: string | null;
  userRole: UserRole;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onLogout, userEmail, userRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define Navigation Links based on Role
  let navLinks: { label: string; view: AppView; icon: any }[] = [];

  if (userRole === UserRole.OWNER) {
    navLinks = [
      { label: 'Command Center', view: AppView.DASHBOARD, icon: LayoutDashboard },
      { label: 'Marketplace', view: AppView.MARKETPLACE, icon: ShoppingBag },
    ];
  } else if (userRole === UserRole.KAM) {
    navLinks = [
      { label: 'Agency Portal', view: AppView.AGENCY, icon: Briefcase },
      { label: 'Marketplace', view: AppView.MARKETPLACE, icon: ShoppingBag },
    ];
  }

  // Render logic
  const isGuest = !userEmail;
  const isWorkforceDemo = currentView === AppView.WORKFORCE && isGuest;

  return (
    <nav className="fixed top-0 left-0 w-full h-[60px] z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => {
            if (isGuest) setView(AppView.LANDING);
            else if (userRole === UserRole.OWNER) setView(AppView.DASHBOARD);
            else setView(AppView.AGENCY);
          }}
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-2 group-hover:bg-blue-600 transition-colors">
            <span className="text-white font-bold text-sm">TP</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900 hidden sm:block">TalentPlate</span>
        </div>

        {/* Center Navigation (Only if logged in) */}
        {!isGuest && !isWorkforceDemo && (
          <div className="hidden md:flex space-x-1 items-center bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setView(link.view)}
                className={`flex items-center px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  currentView === link.view 
                    ? 'bg-white text-black shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                }`}
              >
                <link.icon size={14} className="mr-2" />
                {link.label}
              </button>
            ))}
          </div>
        )}

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-6">
            {isGuest ? (
               isWorkforceDemo ? (
                 <button onClick={() => setView(AppView.LOGIN)} className="text-sm font-medium text-gray-600 hover:text-black">
                   Back to Login
                 </button>
               ) : (
                 currentView !== AppView.LOGIN && (
                    <button 
                      onClick={() => setView(AppView.LOGIN)}
                      className="bg-black text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center"
                    >
                      Login <ArrowRight size={12} className="ml-2" />
                    </button>
                 )
               )
            ) : (
              <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-900 leading-none">{userRole === UserRole.OWNER ? 'Owner' : 'KAM Manager'}</span>
                    <span className="text-[10px] text-gray-500 leading-none mt-1">{userEmail}</span>
                  </div>
                  <div className="h-6 w-px bg-gray-200"></div>
                  <button 
                    onClick={onLogout}
                    className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
              </div>
            )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute top-[60px] left-0 w-full shadow-lg z-40">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {!isGuest && navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setView(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full text-left px-4 py-3 text-sm font-medium rounded-xl ${
                   currentView === link.view ? 'bg-gray-100 text-black' : 'text-gray-600'
                }`}
              >
                 <link.icon size={16} className="mr-3" />
                {link.label}
              </button>
            ))}
            
            {isGuest ? (
               <button
                onClick={() => {
                  setView(AppView.LOGIN);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-black bg-gray-100 rounded-xl"
              >
                Login
              </button>
            ) : (
               <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl mt-2"
              >
                <LogOut size={16} className="mr-3" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};