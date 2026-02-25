import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/store/cartStore';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'promo', label: 'Акции' },
    { id: 'delivery', label: 'Доставка' },
    { id: 'blog', label: 'Блог' },
    { id: 'about', label: 'О нас' },
    { id: 'contact', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-700 py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-blue-100">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" size={12} className="text-blue-200" />
              <a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Icon name="Clock" size={12} className="text-blue-200" />
              Пн-Пт 8:00–19:00, Сб 9:00–17:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5">
              <Icon name="MapPin" size={12} className="text-blue-200" />
              Москва, ул. Строителей, 14
            </span>
            <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors text-xs flex items-center gap-1">
              <Icon name="Settings" size={11} />
              Панель управления
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
              <Icon name="Hammer" size={20} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-montserrat text-lg font-bold text-slate-800 tracking-tight">
                Строй<span className="text-blue-500">Маркет</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest -mt-0.5 font-golos">Строительные материалы</div>
            </div>
          </button>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="flex w-full border border-slate-200 rounded-lg overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                className="flex-1 bg-slate-50 px-4 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none font-golos"
                placeholder="Поиск товаров, артикулов..."
              />
              <button className="px-4 bg-blue-500 hover:bg-blue-600 transition-colors">
                <Icon name="Search" size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-blue-500 transition-colors"
            >
              <Icon name="Search" size={20} />
            </button>
            <button onClick={() => onNavigate('account')} className="hidden sm:flex flex-col items-center gap-0.5 px-3 py-1.5 text-slate-500 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50">
              <Icon name="User" size={18} />
              <span className="text-[10px] font-montserrat font-semibold uppercase tracking-wider">Войти</span>
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-slate-500 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
            >
              <Icon name="ShoppingCart" size={18} />
              <span className="text-[10px] font-montserrat font-semibold uppercase tracking-wider">Корзина</span>
              {count > 0 && (
                <span className="absolute -top-1 right-1 bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-500 hover:text-blue-500 transition-colors">
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 animate-fade-in">
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <input className="flex-1 bg-slate-50 px-4 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none font-golos" placeholder="Поиск..." />
              <button className="px-4 bg-blue-500">
                <Icon name="Search" size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nav bar */}
      <nav className="bg-white border-b border-slate-200 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-10 gap-0">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 px-4 h-full bg-blue-500 hover:bg-blue-600 text-white font-montserrat text-sm font-semibold uppercase tracking-wide transition-colors"
            >
              <Icon name="Grid3x3" size={15} />
              Все категории
            </button>
            {navItems.filter(n => n.id !== 'home').map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 h-full text-sm font-golos uppercase tracking-wider transition-colors hover:text-blue-500
                  ${currentPage === item.id ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-600'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-fade-in shadow-md">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`flex w-full px-5 py-3 text-sm font-golos uppercase tracking-wide border-b border-slate-100 transition-colors
                ${currentPage === item.id ? 'text-blue-500 bg-blue-50' : 'text-slate-600 hover:text-blue-500 hover:bg-blue-50'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
