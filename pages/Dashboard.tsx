
import React, { useState } from 'react';
import { Transaction, View } from '../types';
import Navigation from '../components/Navigation';

interface Props {
  transactions: Transaction[];
  setView: (view: View) => void;
}

const Dashboard: React.FC<Props> = ({ transactions, setView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Budget alert: Food & Drinks reached 90%", icon: "warning", color: "text-apricot" },
    { id: 2, text: "New insight: You saved $50 this week", icon: "lightbulb", color: "text-primary" },
    { id: 3, text: "Salary deposit processed successfully", icon: "check_circle", color: "text-green-500" },
  ];

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar relative">
      {/* Side Menu Drawer */}
      {showMenu && (
        <div className="absolute inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMenu(false)}
          />
          <div className="relative w-4/5 max-w-[300px] bg-white h-full shadow-2xl p-6 flex flex-col animate-slide-right">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl">eco</span>
                <span className="text-xl font-bold tracking-tight">Daily Bloom</span>
              </div>
              <button onClick={() => setShowMenu(false)} className="text-gray-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <nav className="space-y-1">
              <MenuOption icon="account_balance" label="Manage Accounts" />
              <MenuOption icon="history" label="History" />
              <MenuOption icon="file_upload" label="Export Data" />
              <MenuOption icon="settings" label="App Settings" />
              <div className="pt-4 mt-4 border-t border-gray-100">
                <MenuOption icon="help" label="Help & Support" />
                <MenuOption icon="logout" label="Sign Out" />
              </div>
            </nav>
            
            <div className="mt-auto bg-cream p-4 rounded-xl">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Bloom Tip</p>
              <p className="text-sm text-charcoal/70 leading-relaxed italic">"A flower does not think of competing with the flower next to it. It just blooms."</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center p-6 justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button 
          onClick={() => setShowMenu(true)}
          className="size-10 flex items-center justify-center rounded-full bg-cream active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-charcoal">menu</span>
        </button>
        <h2 className="text-lg font-bold">Dashboard</h2>
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="size-10 flex items-center justify-center rounded-full bg-cream active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-charcoal">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-3 w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 z-30 p-4 animate-scale-in origin-top-right">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-sm">Notifications</h4>
                  <button className="text-[10px] text-primary font-bold uppercase tracking-wider">Mark all as read</button>
                </div>
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n.id} className="flex gap-3 p-2 hover:bg-cream rounded-lg transition-colors cursor-pointer">
                      <span className={`material-symbols-outlined text-lg ${n.color}`}>{n.icon}</span>
                      <p className="text-xs font-medium text-charcoal/80 leading-snug">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hero Card */}
      <div className="px-6 py-2">
        <div className="relative rounded-2xl p-6 bg-cream shadow-sm border border-primary/5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-charcoal/60 text-sm font-medium mb-1">Total Balance</p>
              <p className="text-3xl font-bold tracking-tight">$2,450.00</p>
            </div>
            <div className="bg-white/80 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-charcoal/70 text-sm font-medium">Monthly Spending</p>
              <p className="text-sm font-bold">$820.50 <span className="text-primary/80 font-normal">/ $1,200</span></p>
            </div>
            <div className="h-2 w-full bg-white rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 opacity-5">
            <span className="material-symbols-outlined text-[80px]">eco</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">Recent Activity</h3>
        <button className="text-primary text-sm font-semibold hover:opacity-70 transition-opacity">View All</button>
      </div>

      <div className="px-4 space-y-1">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-4 bg-white px-3 py-3 rounded-xl active:bg-cream transition-colors cursor-pointer">
            <div className={`flex items-center justify-center rounded-full shrink-0 size-12 text-white bg-primary`}>
              <span className="material-symbols-outlined">{tx.icon}</span>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-base font-semibold leading-none mb-1">{tx.category}</p>
              <p className="text-gray-400 text-xs font-medium">{tx.date} • {tx.description}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`text-base font-bold ${tx.type === 'income' ? 'text-primary' : 'text-charcoal'}`}>
                {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Navigation currentView="dashboard" setView={setView} />

      <style>{`
        @keyframes slide-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-slide-right { animation: slide-right 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

const MenuOption = ({ icon, label }: { icon: string, label: string }) => (
  <button className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-cream transition-colors text-charcoal/80">
    <span className="material-symbols-outlined text-lg">{icon}</span>
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export default Dashboard;
