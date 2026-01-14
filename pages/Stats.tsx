
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Transaction, View } from '../types';
import Navigation from '../components/Navigation';

interface Props {
  transactions: Transaction[];
  setView: (view: View) => void;
}

type FilterType = 'day' | 'week' | 'month';

const filterData = {
  day: {
    total: 42.50,
    label: 'Today',
    chart: [
      { name: 'Food', value: 35.00, color: '#A0B0A0', percent: 82, trend: '+5%' },
      { name: 'Other', value: 7.50, color: '#f2f3f2', percent: 18, trend: 'Stable' },
    ]
  },
  week: {
    total: 315.80,
    label: 'This Week',
    chart: [
      { name: 'Food', value: 150.20, color: '#A0B0A0', percent: 48, trend: '+2%' },
      { name: 'Transport', value: 85.60, color: '#FDF6E3', percent: 27, trend: '-5%' },
      { name: 'Shopping', value: 80.00, color: '#d1d8d1', percent: 25, trend: '+10%' },
    ]
  },
  month: {
    total: 1240.50,
    label: 'October',
    chart: [
      { name: 'Food', value: 558.22, color: '#A0B0A0', percent: 45, trend: '+2%' },
      { name: 'Transport', value: 372.15, color: '#FDF6E3', percent: 30, trend: '-12%' },
      { name: 'Shopping', value: 186.07, color: '#d1d8d1', percent: 15, trend: 'Stable' },
      { name: 'Other', value: 124.06, color: '#f2f3f2', percent: 10, trend: '+1%' },
    ]
  }
};

const Stats: React.FC<Props> = ({ setView }) => {
  // Set default active filter to 'day'
  const [activeFilter, setActiveFilter] = useState<FilterType>('day');

  const currentStats = useMemo(() => filterData[activeFilter], [activeFilter]);

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar">
      <div className="sticky top-0 z-10 flex items-center bg-white/80 backdrop-blur-md px-4 py-4 justify-between">
        <button 
          onClick={() => setView('dashboard')}
          className="size-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold pr-10 flex-1 text-center">Statistics Report</h2>
      </div>

      <div className="px-4 py-2">
        <div className="flex h-11 items-center justify-center rounded-xl bg-gray-100 p-1 mb-6">
          {(['day', 'week', 'month'] as FilterType[]).map((f) => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                activeFilter === f 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col items-center transition-all">
          <p className="text-gray-400 text-sm font-medium mb-1">Total Spending {activeFilter === 'day' ? 'Today' : activeFilter === 'week' ? 'this Week' : 'in October'}</p>
          <h1 className="text-3xl font-bold mb-8 transition-all">${currentStats.total.toFixed(2)}</h1>

          <div className="w-[200px] h-[200px] relative mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentStats.chart}
                  innerRadius={65}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={800}
                >
                  {currentStats.chart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{currentStats.label}</span>
              <span className="text-primary font-bold text-lg">Detailed</span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap justify-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            {currentStats.chart.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="size-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 px-4 py-3 bg-primary/5 rounded-lg border border-primary/10 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">trending_down</span>
          <p className="text-primary text-sm font-medium italic">
            {activeFilter === 'day' ? "You're spending within today's limit." : "You've spent 5% less than last period. Keep it up!"}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <h3 className="text-base font-bold">Top Categories</h3>
          <div className="space-y-4">
            {currentStats.chart.map((item) => (
              <CategoryItem 
                key={item.name}
                label={item.name} 
                amount={item.value} 
                percent={item.percent} 
                color={item.color} 
                trend={item.trend}
                icon={item.name === 'Food' ? 'restaurant' : item.name === 'Transport' ? 'directions_bus' : item.name === 'Shopping' ? 'shopping_bag' : 'category'}
              />
            ))}
          </div>
        </div>
      </div>

      <Navigation currentView="stats" setView={setView} />
    </div>
  );
};

const CategoryItem = ({ label, amount, percent, color, trend, trendColor = 'text-primary', icon }: any) => (
  <div className="space-y-2 animate-fadeIn">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <p className="text-sm font-bold">{label}</p>
          <p className="text-xs text-gray-400">{percent}% of total budget</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold">${amount.toFixed(2)}</p>
        <p className={`text-xs font-medium ${trendColor}`}>{trend}</p>
      </div>
    </div>
    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${percent}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

export default Stats;
