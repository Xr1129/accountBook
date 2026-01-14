
import React from 'react';
import { View } from '../types';

interface Props {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<Props> = ({ currentView, setView }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="bg-white/95 backdrop-blur-xl border-t border-cream flex items-center justify-around h-20 px-4 relative">
        <NavButton 
          icon="home" 
          label="Home" 
          isActive={currentView === 'dashboard'} 
          onClick={() => setView('dashboard')} 
        />
        <NavButton 
          icon="analytics" 
          label="Stats" 
          isActive={currentView === 'stats'} 
          onClick={() => setView('stats')} 
        />
        
        {/* Embedded Add Button */}
        <div className="flex flex-col items-center justify-center -mt-2">
          <button 
            onClick={() => setView('add')}
            className="bg-primary text-white size-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all hover:brightness-110"
          >
            <span className="material-symbols-outlined text-3xl font-bold">add</span>
          </button>
          <span className="text-[10px] font-bold text-gray-400 mt-1">Add Bill</span>
        </div>

        <NavButton 
          icon="account_balance_wallet" 
          label="Budget" 
          isActive={currentView === 'budget'} 
          onClick={() => setView('budget')} 
        />
        <NavButton 
          icon="person" 
          label="Profile" 
          isActive={currentView === 'profile'} 
          onClick={() => setView('profile')} 
        />
      </div>
      
      <div className="bg-white h-6 flex justify-center items-center pb-2">
        <div className="w-32 h-1 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-300'}`}
  >
    <span className={`material-symbols-outlined transition-all ${isActive ? 'fill-1 scale-110' : ''}`}>{icon}</span>
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default Navigation;
