
export type View = 'splash' | 'dashboard' | 'stats' | 'profile' | 'budget' | 'add';

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  icon: string;
  type: 'income' | 'expense';
}

export interface Category {
  name: string;
  icon: string;
  color?: string;
}

export const CATEGORIES: Category[] = [
  { name: 'Food', icon: 'restaurant' },
  { name: 'Shopping', icon: 'shopping_bag' },
  { name: 'Transport', icon: 'directions_bus' },
  { name: 'Hobby', icon: 'movie' },
  { name: 'Health', icon: 'ecg_heart' },
  { name: 'Home', icon: 'home' },
  { name: 'Grocery', icon: 'local_grocery_store' },
  { name: 'Gifts', icon: 'featured_seasonal_and_gifts' },
  { name: 'Utilities', icon: 'lightbulb' },
  { name: 'Education', icon: 'school' },
  { name: 'Travel', icon: 'flight' },
];
