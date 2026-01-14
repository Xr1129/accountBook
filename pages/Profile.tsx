
import React from 'react';
import { View } from '../types';
import Navigation from '../components/Navigation';

interface Props {
  setView: (view: View) => void;
}

const Profile: React.FC<Props> = ({ setView }) => {
  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar">
      <div className="sticky top-0 z-10 flex items-center bg-white/80 backdrop-blur-md p-4 justify-between">
        <button onClick={() => setView('dashboard')} className="text-primary">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold pr-8 flex-1 text-center">Personal Center</h2>
      </div>

      <div className="flex p-8 flex-col items-center">
        <div className="relative">
          <div className="aspect-square rounded-full w-32 h-32 border-4 border-primary p-1 bg-white shadow-sm">
            <img 
              alt="User" 
              className="w-full h-full object-cover rounded-full" 
              src="https://picsum.photos/seed/alex/200/200" 
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white">
            <span className="material-symbols-outlined text-[16px] block">edit</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold">Alex Rivers</p>
          <div className="flex items-center justify-center gap-1.5 mt-1 text-primary">
            <span className="material-symbols-outlined text-sm">spa</span>
            <p className="text-sm font-medium">On track this month!</p>
          </div>
          <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-semibold">Member since Jan 2024</p>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-cream p-5 shadow-sm">
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold">Premium Plan</p>
            <p className="text-gray-500 text-sm">Unlock advanced insights and unlimited wallets.</p>
          </div>
          <button className="min-w-[80px] h-9 px-4 bg-primary text-white text-sm font-semibold rounded-lg">Upgrade</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">
        <GridCard icon="account_balance_wallet" label="My Wallets" sub="3 Active" />
        <GridCard icon="target" label="Monthly Goals" sub="75% Reached" showProgress={true} />
        <GridCard icon="settings" label="Settings" sub="Preferences" />
        <GridCard icon="headset_mic" label="Support" sub="Help Center" />
      </div>

      <div className="mt-8 px-4 divide-y divide-gray-50">
        <MenuLink label="Export Data" />
        <MenuLink label="Security & Privacy" />
      </div>

      <div className="mt-12 text-center pb-8">
        <p className="text-gray-400 text-sm font-medium underline decoration-2 underline-offset-4">Sign Out</p>
        <p className="text-gray-300 text-[10px] mt-6 uppercase">Version 2.4.1 (BOTANICAL)</p>
      </div>

      <Navigation currentView="profile" setView={setView} />
    </div>
  );
};

const GridCard = ({ icon, label, sub, showProgress }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
    <div className="bg-cream w-10 h-10 rounded-lg flex items-center justify-center text-primary">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <h2 className="text-base font-bold">{label}</h2>
      {showProgress && (
        <div className="w-full bg-gray-100 h-1 rounded-full mt-2 mb-1">
          <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
        </div>
      )}
      <p className="text-gray-400 text-xs">{sub}</p>
    </div>
  </div>
);

const MenuLink = ({ label }: any) => (
  <div className="flex items-center justify-between p-4">
    <span className="text-charcoal font-medium text-sm">{label}</span>
    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
  </div>
);

export default Profile;
