import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { orders } from '@/data/products';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

const statusColors: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  confirmed: 'text-blue-600 bg-blue-50 border-blue-200',
  processing: 'text-purple-600 bg-purple-50 border-purple-200',
  shipped: 'text-cyan-600 bg-cyan-50 border-cyan-200',
  delivered: 'text-green-600 bg-green-50 border-green-200',
  cancelled: 'text-red-500 bg-red-50 border-red-200',
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
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-xl p-8 w-full max-w-sm animate-scale-in">
          <h2 className="font-montserrat text-2xl font-bold uppercase mb-6 text-center">Войти</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors" />
            <input type="password" placeholder="Пароль" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors" />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase py-3 rounded-lg transition-colors">Войти</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Личный кабинет</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-400/30 rounded-xl flex items-center justify-center">
            <Icon name="User" size={28} className="text-blue-500" />
          </div>
          <div>
            <h1 className="font-montserrat text-2xl font-bold uppercase">Александр Петров</h1>
            <div className="text-slate-400 font-golos text-sm">a.petrov@mail.ru · +7 (916) 123-45-67</div>
          </div>
        </div>

        <div className="flex gap-0 mb-6 border-b border-slate-200">
          {([['orders', 'Мои заказы'], ['profile', 'Профиль']] as const).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-montserrat text-sm uppercase tracking-wide border-b-2 -mb-px transition-colors
                ${tab === t ? 'text-blue-500 border-blue-500' : 'text-slate-400 border-transparent hover:text-foreground'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full flex flex-wrap items-center gap-4 p-4 text-left"
                >
                  <span className="font-montserrat text-lg font-bold text-blue-500 min-w-[100px]">#{order.orderNumber}</span>
                  <span className={`text-xs px-2 py-0.5 border rounded font-montserrat uppercase ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                  <span className="text-slate-400 font-golos text-sm">{new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                  <span className="ml-auto font-montserrat text-xl font-bold">{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
                  <Icon name={expandedOrder === order.id ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-slate-400" />
                </button>

                {expandedOrder === order.id && (
                  <div className="border-t border-slate-200 p-4 animate-fade-in">
                    {/* Progress */}
                    {order.status !== 'cancelled' && (
                      <div className="mb-5">
                        <div className="flex justify-between mb-2">
                          {steps.map(s => (
                            <div key={s} className="flex flex-col items-center gap-1 text-center flex-1">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                ${steps.indexOf(s) <= steps.indexOf(order.status)
                                  ? 'bg-blue-500 border-blue-500'
                                  : 'border-slate-200 bg-white'}`}
                              >
                                {steps.indexOf(s) <= steps.indexOf(order.status) && (
                                  <Icon name="Check" size={12} className="text-white" />
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-golos hidden sm:block">{statusLabels[s]}</span>
                            </div>
                          ))}
                        </div>
                        <div className="relative h-1 bg-slate-200 -mt-4 mx-3">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-500 transition-all rounded-full"
                            style={{ width: `${(steps.indexOf(order.status) / (steps.length - 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div className="space-y-2 text-sm font-golos">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-slate-600">
                          <span>{item.productName} {item.variantName && `(${item.variantName})`} × {item.quantity} {item.unit}</span>
                          <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ))}
                      <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-foreground">
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
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md">
            <h3 className="font-montserrat text-lg font-bold uppercase mb-5">Личные данные</h3>
            <div className="space-y-4">
              {[
                { label: 'Имя и фамилия', val: 'Александр Петров' },
                { label: 'Телефон', val: '+7 (916) 123-45-67' },
                { label: 'Email', val: 'a.petrov@mail.ru' },
                { label: 'Адрес доставки', val: 'г. Москва, ул. Строителей, 14' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">{f.label}</label>
                  <input defaultValue={f.val} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground outline-none focus:border-blue-400 transition-colors" />
                </div>
              ))}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide py-3 rounded-lg transition-colors mt-2">
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
