
import React, { useState } from 'react';
import { View } from '../types';
import Navigation from '../components/Navigation';

interface Props {
  setView: (view: View) => void;
}

const Budget: React.FC<Props> = ({ setView }) => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [billingCycle, setBillingCycle] = useState('1st of each month');
  const [budgetLimit, setBudgetLimit] = useState(2000);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [isSelectingCycle, setIsSelectingCycle] = useState(false);
  const [tempLimit, setTempLimit] = useState(budgetLimit.toString());

  const currentSpending = 1200;
  const consumptionPercent = Math.min(Math.round((currentSpending / budgetLimit) * 100), 100);

  const billingCycles = [
    '1st of each month',
    '15th of each month',
    'Last day of month',
    'Every Monday',
    'Every Friday'
  ];

  const handleToggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
  };

  const handleSelectCycle = (cycle: string) => {
    setBillingCycle(cycle);
    setIsSelectingCycle(false);
  };

  const handleSaveLimit = () => {
    const newLimit = parseFloat(tempLimit);
    if (!isNaN(newLimit) && newLimit > 0) {
      setBudgetLimit(newLimit);
      setIsAdjusting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar relative">
      <header className="flex items-center p-6 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => setView('dashboard')} className="text-primary size-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-95 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Budget Settings</h2>
        <button className="size-10 flex items-center justify-center bg-gray-50 rounded-full text-primary active:scale-95 transition-transform">
          <span className="material-symbols-outlined">settings_suggest</span>
        </button>
      </header>

      <div className="px-6 pb-6">
        <div className="rounded-2xl shadow-sm bg-white overflow-hidden border border-cream/50">
          <div className="w-full h-32 bg-gradient-to-br from-cream to-primary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-5xl opacity-40">potted_plant</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Monthly Spending</p>
                <h3 className="text-3xl font-extrabold mt-1">${currentSpending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold">Goal: ${budgetLimit.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-full bg-cream rounded-full overflow-hidden p-1 border border-cream">
                <div className="h-full bg-sage rounded-full transition-all duration-500" style={{ width: `${consumptionPercent}%` }}></div>
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>{consumptionPercent}% consumed</span>
                <span className="text-primary font-bold italic">8 days left</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setTempLimit(budgetLimit.toString());
                setIsAdjusting(true);
              }}
              className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
            >
              Adjust Monthly Limit
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-2 flex justify-between items-center">
        <h3 className="text-lg font-bold">Category Budgets</h3>
        <button className="text-primary text-sm font-bold flex items-center gap-1 active:opacity-70 transition-opacity">
          <span className="material-symbols-outlined text-sm">add_circle</span> Add New
        </button>
      </div>

      <div className="px-6 space-y-3">
        <BudgetItem icon="restaurant" label="Dining Out" left={-35.20} percent={112} exceeded />
        <BudgetItem icon="coffee" label="Groceries" left={240} percent={52} />
        <BudgetItem icon="movie" label="Entertainment" left={110} percent={75} />
      </div>

      <h3 className="text-lg font-bold px-6 pt-8 pb-4">Configuration</h3>
      <div className="px-6 space-y-4">
        <ConfigItem 
          icon="calendar_today" 
          title="Billing Cycle" 
          desc={`Resets on the ${billingCycle}`} 
          onClick={() => setIsSelectingCycle(true)}
        />
        <ConfigItem 
          icon="notifications_active" 
          title="Limit Alerts" 
          desc="Notify at 80% and 100%" 
          hasToggle 
          isToggled={alertsEnabled}
          onClick={handleToggleAlerts}
        />
      </div>

      {/* Adjust Monthly Limit Modal */}
      {isAdjusting && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setIsAdjusting(false)}></div>
          <div className="relative bg-white w-full max-w-[380px] rounded-3xl p-6 shadow-2xl animate-slide-up">
            <h3 className="text-xl font-bold mb-4 text-center">Set Monthly Goal</h3>
            <div className="bg-cream rounded-2xl p-6 mb-6 flex flex-col items-center border border-primary/10">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">New Budget Limit</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary/60">$</span>
                <input 
                  type="number" 
                  autoFocus
                  value={tempLimit}
                  onChange={(e) => setTempLimit(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-4xl font-bold text-charcoal w-32 text-center p-0"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsAdjusting(false)}
                className="h-12 bg-gray-100 text-gray-500 font-bold rounded-xl active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveLimit}
                className="h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                Save Limit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Billing Cycle Selection Modal */}
      {isSelectingCycle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setIsSelectingCycle(false)}></div>
          <div className="relative bg-white w-full max-w-[380px] rounded-t-[32px] sm:rounded-3xl p-6 shadow-2xl animate-slide-up">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>
            <h3 className="text-xl font-bold mb-6 text-center">Billing Cycle</h3>
            <div className="space-y-2 mb-6">
              {billingCycles.map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => handleSelectCycle(cycle)}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                    billingCycle === cycle 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-gray-50 border-2 border-transparent hover:bg-cream'
                  }`}
                >
                  <span className={`font-semibold ${billingCycle === cycle ? 'text-primary' : 'text-charcoal'}`}>
                    {cycle}
                  </span>
                  {billingCycle === cycle && (
                    <span className="material-symbols-outlined text-primary font-bold">check</span>
                  )}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setIsSelectingCycle(false)}
              className="w-full h-14 bg-gray-100 text-gray-500 font-bold rounded-2xl active:scale-95 transition-transform"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Navigation currentView="budget" setView={setView} />
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

const BudgetItem = ({ icon, label, left, percent, exceeded }: any) => (
  <div className={`p-4 rounded-xl border ${exceeded ? 'border-apricot/20' : 'border-gray-100'} bg-white flex items-center gap-4`}>
    <div className={`size-12 rounded-xl flex items-center justify-center ${exceeded ? 'bg-apricot/10 text-apricot' : 'bg-cream text-primary'}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{label}</span>
          {exceeded && <span className="bg-apricot text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-widest uppercase">EXCEEDED</span>}
        </div>
        <span className={`text-sm font-bold ${exceeded ? 'text-apricot' : 'text-charcoal'}`}>{left < 0 ? `-$${Math.abs(left).toFixed(2)}` : `$${left} left`}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className={`flex-1 h-1.5 rounded-full ${exceeded ? 'bg-apricot/10' : 'bg-gray-100'}`}>
          <div className={`h-full rounded-full transition-all duration-700 ${exceeded ? 'bg-apricot' : 'bg-sage'}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
        </div>
        <span className={`text-[10px] font-bold ${exceeded ? 'text-apricot' : 'text-gray-400'}`}>{percent}%</span>
      </div>
    </div>
  </div>
);

const ConfigItem = ({ icon, title, desc, hasToggle, isToggled, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-left active:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="size-10 flex items-center justify-center rounded-lg bg-gray-50 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-bold text-charcoal">{title}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
    {hasToggle ? (
      <div className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${isToggled ? 'bg-primary' : 'bg-gray-300'}`}>
        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all duration-200 ${isToggled ? 'right-1' : 'left-1'}`}></div>
      </div>
    ) : (
      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
    )}
  </button>
);

export default Budget;
