import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { orders } from '@/data/products';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  confirmed: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  processing: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  shipped: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  delivered: 'text-green-400 bg-green-400/10 border-green-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};

const statusLabels: Record<string, string> = {
  pending: 'Ожидает', confirmed: 'Подтверждён', processing: 'В обработке',
  shipped: 'В пути', delivered: 'Доставлен', cancelled: 'Отменён',
};

const steps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export default function AccountPage({ onNavigate }: AccountPageProps) {
  const [tab, setTab] = useState<'orders' | 'profile'>('orders');
  const [isLoggedIn] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="industrial-bg min-h-screen flex items-center justify-center p-4">
        <div className="steel-texture border border-steel-600 p-8 w-full max-w-sm animate-scale-in">
          <h2 className="font-oswald text-2xl font-bold uppercase mb-6 text-center">Войти</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT" />
            <input type="password" placeholder="Пароль" className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT" />
            <button className="w-full bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase py-3 transition-colors">Войти</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Личный кабинет</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-amber-DEFAULT/10 border border-amber-DEFAULT/30 flex items-center justify-center">
            <Icon name="User" size={28} className="text-amber-DEFAULT" />
          </div>
          <div>
            <h1 className="font-oswald text-2xl font-bold uppercase">Александр Петров</h1>
            <div className="text-steel-400 font-ibm text-sm">a.petrov@mail.ru · +7 (916) 123-45-67</div>
          </div>
        </div>

        <div className="flex gap-0 mb-6 border-b border-steel-700">
          {([['orders', 'Мои заказы'], ['profile', 'Профиль']] as const).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-oswald text-sm uppercase tracking-wide border-b-2 -mb-px transition-colors
                ${tab === t ? 'text-amber-DEFAULT border-amber-DEFAULT' : 'text-steel-400 border-transparent hover:text-foreground'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="steel-texture border border-steel-600">
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full flex flex-wrap items-center gap-4 p-4 text-left"
                >
                  <span className="font-oswald text-lg font-bold text-amber-DEFAULT min-w-[100px]">#{order.orderNumber}</span>
                  <span className={`text-xs px-2 py-0.5 border font-oswald uppercase ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                  <span className="text-steel-400 font-ibm text-sm">{new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                  <span className="ml-auto font-oswald text-xl font-bold">{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
                  <Icon name={expandedOrder === order.id ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-steel-400" />
                </button>

                {expandedOrder === order.id && (
                  <div className="border-t border-steel-700 p-4 animate-fade-in">
                    {/* Progress */}
                    {order.status !== 'cancelled' && (
                      <div className="mb-5">
                        <div className="flex justify-between mb-2">
                          {steps.map(s => (
                            <div key={s} className="flex flex-col items-center gap-1 text-center flex-1">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${steps.indexOf(s) <= steps.indexOf(order.status)
                                  ? 'bg-amber-DEFAULT border-amber-DEFAULT'
                                  : 'border-steel-600 bg-steel-800'}`}
                              >
                                {steps.indexOf(s) <= steps.indexOf(order.status) && (
                                  <Icon name="Check" size={12} className="text-steel-900" />
                                )}
                              </div>
                              <span className="text-[10px] text-steel-500 font-ibm hidden sm:block">{statusLabels[s]}</span>
                            </div>
                          ))}
                        </div>
                        <div className="relative h-1 bg-steel-700 -mt-4 mx-3">
                          <div
                            className="absolute top-0 left-0 h-full bg-amber-DEFAULT transition-all"
                            style={{ width: `${(steps.indexOf(order.status) / (steps.length - 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div className="space-y-2 text-sm font-ibm">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-steel-300">
                          <span>{item.productName} {item.variantName && `(${item.variantName})`} × {item.quantity} {item.unit}</span>
                          <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ))}
                      <div className="border-t border-steel-700 pt-2 flex justify-between font-semibold text-foreground">
                        <span>Итого</span><span>{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'profile' && (
          <div className="steel-texture border border-steel-600 p-6 max-w-md">
            <h3 className="font-oswald text-lg font-bold uppercase mb-5">Личные данные</h3>
            <div className="space-y-4">
              {[
                { label: 'Имя и фамилия', val: 'Александр Петров' },
                { label: 'Телефон', val: '+7 (916) 123-45-67' },
                { label: 'Email', val: 'a.petrov@mail.ru' },
                { label: 'Адрес доставки', val: 'г. Москва, ул. Строителей, 14' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">{f.label}</label>
                  <input defaultValue={f.val} className="w-full bg-steel-700 border border-steel-600 px-3 py-2 text-sm font-ibm text-foreground outline-none focus:border-amber-DEFAULT" />
                </div>
              ))}
              <button className="w-full bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide py-3 transition-colors mt-2">
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
