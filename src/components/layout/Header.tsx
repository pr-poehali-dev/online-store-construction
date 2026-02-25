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
      <div className="bg-steel-900 border-b border-steel-700 py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-steel-300">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" size={12} className="text-amber-DEFAULT" />
              <a href="tel:+74951234567" className="hover-amber transition-colors">+7 (495) 123-45-67</a>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Icon name="Clock" size={12} className="text-amber-DEFAULT" />
              Пн-Пт 8:00–19:00, Сб 9:00–17:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5">
              <Icon name="MapPin" size={12} className="text-amber-DEFAULT" />
              Москва, ул. Строителей, 14
            </span>
            <button onClick={() => onNavigate('admin')} className="hover-amber transition-colors text-xs flex items-center gap-1">
              <Icon name="Settings" size={11} />
              Панель управления
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="steel-texture border-b border-steel-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-amber-DEFAULT flex items-center justify-center">
              <Icon name="Hammer" size={20} className="text-steel-900" />
            </div>
            <div className="leading-tight">
              <div className="font-oswald text-lg font-bold text-foreground tracking-wider uppercase">
                Строй<span className="text-amber-DEFAULT">Маркет</span>
              </div>
              <div className="text-[10px] text-steel-300 uppercase tracking-widest -mt-0.5">Строительные материалы</div>
            </div>
          </button>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="flex w-full border border-steel-600 focus-within:border-amber-DEFAULT transition-colors">
              <input
                className="flex-1 bg-steel-800 px-4 py-2 text-sm text-foreground placeholder-steel-400 outline-none font-ibm"
                placeholder="Поиск товаров, артикулов..."
              />
              <button className="px-4 bg-amber-DEFAULT hover:bg-amber-500 transition-colors">
                <Icon name="Search" size={16} className="text-steel-900" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-steel-300 hover:text-amber-DEFAULT transition-colors"
            >
              <Icon name="Search" size={20} />
            </button>
            <button onClick={() => onNavigate('account')} className="hidden sm:flex flex-col items-center gap-0.5 px-3 py-1 text-steel-300 hover:text-amber-DEFAULT transition-colors">
              <Icon name="User" size={18} />
              <span className="text-[10px] uppercase tracking-wider font-oswald">Войти</span>
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1 text-steel-300 hover:text-amber-DEFAULT transition-colors"
            >
              <Icon name="ShoppingCart" size={18} />
              <span className="text-[10px] uppercase tracking-wider font-oswald">Корзина</span>
              {count > 0 && (
                <span className="absolute -top-1 right-1 bg-amber-DEFAULT text-steel-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-steel-300 hover:text-amber-DEFAULT transition-colors">
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 animate-fade-in">
            <div className="flex border border-steel-600">
              <input className="flex-1 bg-steel-800 px-4 py-2 text-sm text-foreground placeholder-steel-400 outline-none" placeholder="Поиск..." />
              <button className="px-4 bg-amber-DEFAULT">
                <Icon name="Search" size={16} className="text-steel-900" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nav bar */}
      <nav className="bg-steel-800 border-b border-steel-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-10 gap-0">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 px-4 h-full bg-amber-DEFAULT text-steel-900 font-oswald text-sm font-semibold uppercase tracking-wide"
            >
              <Icon name="Grid3x3" size={15} />
              Все категории
            </button>
            {navItems.filter(n => n.id !== 'home').map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 h-full text-sm font-ibm uppercase tracking-wider transition-colors hover:text-amber-DEFAULT
                  ${currentPage === item.id ? 'text-amber-DEFAULT border-b-2 border-amber-DEFAULT' : 'text-steel-200'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-steel-800 border-b border-steel-600 animate-fade-in">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`flex w-full px-5 py-3 text-sm font-ibm uppercase tracking-wide border-b border-steel-700 transition-colors
                ${currentPage === item.id ? 'text-amber-DEFAULT bg-steel-700' : 'text-steel-200 hover:text-amber-DEFAULT'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
