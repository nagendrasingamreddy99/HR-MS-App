import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { Marketplace } from './components/Marketplace';
import { Login } from './components/Login';
import { Workforce } from './components/Workforce';
import { Agency } from './components/Agency';
import { AppView, UserRole } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);

  const handleLoginSuccess = (role: UserRole, email: string) => {
    setUserEmail(email);
    setUserRole(role);
    if (role === UserRole.OWNER) {
      setCurrentView(AppView.DASHBOARD);
    } else if (role === UserRole.KAM) {
      setCurrentView(AppView.AGENCY);
    }
  };

  const handleLogout = () => {
    setUserEmail(null);
    setUserRole(UserRole.GUEST);
    setCurrentView(AppView.LANDING);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <Landing onNavigate={() => setCurrentView(userEmail ? (userRole === UserRole.OWNER ? AppView.DASHBOARD : AppView.AGENCY) : AppView.LOGIN)} />;
      case AppView.LOGIN:
        return <Login 
          onLoginSuccess={handleLoginSuccess} 
          onWorkforceDemo={() => setCurrentView(AppView.WORKFORCE)}
        />;
      case AppView.DASHBOARD:
        return userRole === UserRole.OWNER ? <Dashboard /> : <Login onLoginSuccess={handleLoginSuccess} onWorkforceDemo={() => setCurrentView(AppView.WORKFORCE)} />;
      case AppView.MARKETPLACE:
        return <Marketplace />;
      case AppView.WORKFORCE:
        // Accessible by everyone as a demo, but navigation back differs
        return <Workforce />;
      case AppView.AGENCY:
        return userRole === UserRole.KAM ? <Agency /> : <Login onLoginSuccess={handleLoginSuccess} onWorkforceDemo={() => setCurrentView(AppView.WORKFORCE)} />;
      default:
        return <Landing onNavigate={() => setCurrentView(AppView.LOGIN)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        onLogout={handleLogout}
        userEmail={userEmail}
        userRole={userRole}
      />
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;