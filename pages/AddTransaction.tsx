
import React, { useState } from 'react';
import { CATEGORIES, Transaction } from '../types';

interface Props {
  onClose: () => void;
  onSave: (tx: Omit<Transaction, 'id'>) => void;
}

const AddTransaction: React.FC<Props> = ({ onClose, onSave }) => {
  const [amount, setAmount] = useState('0.00');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState('');

  const handleKeypad = (val: string) => {
    if (val === 'backspace') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else {
      setAmount(prev => prev === '0.00' || prev === '0' ? val : prev + val);
    }
  };

  const handleConfirm = () => {
    onSave({
      category: category.name,
      amount: -parseFloat(amount),
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: note || 'General',
      icon: category.icon,
      type: 'expense'
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <button onClick={onClose} className="text-gray-400 font-medium">Cancel</button>
        <h2 className="text-lg font-bold">Add Bill</h2>
        <button onClick={handleConfirm} className="text-primary font-bold">Save</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 no-scrollbar">
        {/* Amount Input */}
        <div className="px-6 py-8">
          <div className="bg-cream rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-primary/5">
            <p className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Enter Amount</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary/70">$</span>
              <span className="text-5xl font-bold text-charcoal">{amount}</span>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="px-6 mb-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Select Category</p>
          <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name}
                onClick={() => setCategory(cat)}
                className={`flex flex-col items-center justify-center min-w-[72px] h-[84px] rounded-2xl transition-all ${category.name === cat.name ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400'}`}
              >
                <span className="material-symbols-outlined text-2xl mb-1">{cat.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Extra Info */}
        <div className="px-6 space-y-3">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-300">calendar_today</span>
            <span className="text-sm font-semibold">Today, Oct 31</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-300">description</span>
            <input 
              type="text" 
              placeholder="Add a note..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm font-semibold p-0 w-full"
            />
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div className="bg-gray-50 px-4 pt-6 pb-10 rounded-t-[32px]">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1,2,3,4,5,6,7,8,9,'.',0,'backspace'].map(key => (
            <button 
              key={key}
              onClick={() => handleKeypad(key.toString())}
              className="h-14 bg-white rounded-xl shadow-sm text-2xl font-semibold active:scale-95 transition-transform flex items-center justify-center"
            >
              {key === 'backspace' ? <span className="material-symbols-outlined text-gray-400">backspace</span> : key}
            </button>
          ))}
        </div>
        <button 
          onClick={handleConfirm}
          className="w-full h-16 bg-primary text-white text-lg font-bold rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          Confirm Bill <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
