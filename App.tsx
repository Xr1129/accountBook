
import React, { useState, useEffect } from 'react';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Budget from './pages/Budget';
import AddTransaction from './pages/AddTransaction';
import { View, Transaction } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('splash');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', category: 'Groceries', amount: -54.20, date: 'Today, 2:30 PM', description: 'Market', icon: 'shopping_basket', type: 'expense' },
    { id: '2', category: 'Coffee House', amount: -5.00, date: 'Today, 10:15 AM', description: 'Food', icon: 'coffee', type: 'expense' },
    { id: '3', category: 'Salary Deposit', amount: 3000.00, date: 'Yesterday, 9:00 AM', description: 'Work', icon: 'payments', type: 'income' },
    { id: '4', category: 'Gas Station', amount: -42.15, date: 'Oct 24, 6:45 PM', description: 'Travel', icon: 'directions_car', type: 'expense' },
  ]);

  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => setCurrentView('dashboard'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const txWithId = { ...newTx, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([txWithId, ...transactions]);
    setCurrentView('dashboard');
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-[430px] min-h-screen bg-white shadow-xl overflow-x-hidden flex flex-col">
        {currentView === 'splash' && <Splash />}
        {currentView === 'dashboard' && (
          <Dashboard 
            transactions={transactions} 
            setView={setCurrentView} 
          />
        )}
        {currentView === 'stats' && (
          <Stats 
            transactions={transactions} 
            setView={setCurrentView} 
          />
        )}
        {currentView === 'profile' && (
          <Profile setView={setCurrentView} />
        )}
        {currentView === 'budget' && (
          <Budget setView={setCurrentView} />
        )}
        {currentView === 'add' && (
          <AddTransaction 
            onClose={() => setCurrentView('dashboard')} 
            onSave={handleAddTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default App;
