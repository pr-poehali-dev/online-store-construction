import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/store/cartStore';

interface CartPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', delivery: 'delivery', comment: '' });

  const deliveryCost = form.delivery === 'delivery' ? (total >= 50000 ? 0 : 1500) : 0;
  const orderTotal = total + deliveryCost;

  if (step === 'success') {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center max-w-md w-full animate-scale-in">
          <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={32} className="text-green-500" />
          </div>
          <h2 className="font-montserrat text-3xl font-bold uppercase mb-3">Заказ оформлен!</h2>
          <p className="text-slate-600 font-golos mb-2">Номер вашего заказа: <span className="text-blue-500 font-semibold">#2024-005</span></p>
          <p className="text-slate-400 text-sm font-golos mb-8">Мы свяжемся с вами по телефону для подтверждения заказа в течение 30 минут.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { clearCart(); onNavigate('account'); }} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide py-3 rounded-xl transition-colors">
              Отследить заказ
            </button>
            <button onClick={() => { clearCart(); onNavigate('catalog'); }} className="w-full border border-slate-200 hover:border-blue-400 text-slate-400 hover:text-blue-500 font-montserrat uppercase tracking-wide py-3 rounded-xl transition-colors">
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md w-full">
          <Icon name="ShoppingCart" size={56} className="text-slate-300 mx-auto mb-4" />
          <h2 className="font-montserrat text-2xl font-bold uppercase mb-2">Корзина пуста</h2>
          <p className="text-slate-400 font-golos mb-6 text-sm">Добавьте товары из каталога</p>
          <button onClick={() => onNavigate('catalog')} className="bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide px-8 py-3 rounded-xl transition-colors">
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Корзина</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center gap-0 mb-8 overflow-x-auto">
          {[{ id: 'cart', label: 'Корзина', icon: 'ShoppingCart' }, { id: 'checkout', label: 'Оформление', icon: 'ClipboardList' }, { id: 'success', label: 'Готово', icon: 'CheckCircle' }].map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 text-sm font-montserrat uppercase tracking-wide ${step === s.id ? 'text-blue-500' : 'text-slate-400'}`}>
                <div className={`w-7 h-7 flex items-center justify-center text-xs rounded-full ${step === s.id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {i + 1}
                </div>
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {i < 2 && <div className="h-px w-8 bg-slate-200" />}
            </div>
          ))}
        </div>

        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-montserrat text-2xl font-bold uppercase">Корзина <span className="text-slate-400 text-lg">({items.length})</span></h1>
                <button onClick={clearCart} className="text-xs text-slate-400 hover:text-red-500 transition-colors font-golos flex items-center gap-1">
                  <Icon name="Trash2" size={13} /> Очистить
                </button>
              </div>

              {items.map(item => (
                <div key={`${item.productId}-${item.variantId}`} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Package" size={28} className="text-blue-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-montserrat text-sm font-semibold truncate">{item.productName}</div>
                    {item.variantValue && (
                      <div className="text-xs text-slate-400 font-golos">{item.variantName}: {item.variantValue}</div>
                    )}
                    <div className="text-xs text-slate-400 font-golos">{item.price.toLocaleString('ru-RU')} ₽ / {item.unit}</div>
                  </div>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                      <Icon name="Minus" size={13} />
                    </button>
                    <span className="w-10 text-center text-sm font-montserrat">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                      <Icon name="Plus" size={13} />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="font-montserrat font-bold text-foreground">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</div>
                    <button onClick={() => removeItem(item.productId, item.variantId)} className="text-xs text-slate-400 hover:text-red-500 transition-colors mt-1">
                      <Icon name="X" size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 sticky top-24">
                <h2 className="font-montserrat text-base font-semibold uppercase mb-4">Итого</h2>
                <div className="space-y-2 text-sm font-golos mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Товары ({items.length})</span>
                    <span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Доставка</span>
                    <span className="text-blue-500">рассчитаем позже</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between font-semibold text-base">
                    <span>Сумма</span>
                    <span className="font-montserrat text-xl font-bold text-blue-500">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
                {total >= 50000 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-600 font-golos mb-4 flex items-center gap-2">
                    <Icon name="Gift" size={13} />
                    Бесплатная доставка при заказе от 50 000 ₽
                  </div>
                )}
                <button onClick={() => setStep('checkout')} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide py-3 rounded-xl transition-colors mb-2">
                  Оформить заказ
                </button>
                <button onClick={() => onNavigate('catalog')} className="w-full border border-blue-200 hover:border-blue-400 text-slate-400 hover:text-blue-500 text-xs font-montserrat uppercase tracking-wide py-2 rounded-lg transition-colors">
                  Продолжить покупки
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'checkout' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="font-montserrat text-2xl font-bold uppercase">Оформление заказа</h1>

              {/* Contact */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Icon name="User" size={16} className="text-blue-500" />
                  Контактные данные
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Имя и фамилия', placeholder: 'Иван Петров', type: 'text' },
                    { key: 'phone', label: 'Телефон', placeholder: '+7 (___) ___-__-__', type: 'tel' },
                    { key: 'email', label: 'Email', placeholder: 'email@mail.ru', type: 'email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Icon name="Truck" size={16} className="text-blue-500" />
                  Способ получения
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {[
                    { id: 'delivery', label: 'Доставка', sub: 'По адресу в Москве и области', icon: 'Truck' },
                    { id: 'pickup', label: 'Самовывоз', sub: 'ул. Строителей, 14 — бесплатно', icon: 'MapPin' },
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setForm({ ...form, delivery: d.id })}
                      className={`flex items-center gap-3 p-4 border rounded-xl text-left transition-all ${form.delivery === d.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                    >
                      <Icon name={d.icon as 'Truck'} size={20} className={form.delivery === d.id ? 'text-blue-500' : 'text-slate-400'} />
                      <div>
                        <div className="font-montserrat text-sm font-semibold uppercase">{d.label}</div>
                        <div className="text-xs text-slate-400 font-golos">{d.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {form.delivery === 'delivery' && (
                  <input
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Адрес доставки: улица, дом, квартира"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors"
                  />
                )}
              </div>

              {/* Comment */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-4">Комментарий</h3>
                <textarea
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  placeholder="Укажите особые пожелания к заказу..."
                  rows={3}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 sticky top-24">
                <h2 className="font-montserrat text-base font-semibold uppercase mb-4">Ваш заказ</h2>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm font-golos">
                      <span className="text-slate-600 truncate mr-2">{item.productName} ×{item.quantity}</span>
                      <span className="text-foreground flex-shrink-0">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-blue-200 pt-3 space-y-2 text-sm font-golos">
                  <div className="flex justify-between text-slate-600">
                    <span>Товары</span><span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Доставка</span>
                    <span>{form.delivery === 'pickup' ? 'Бесплатно' : deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-RU')} ₽`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-1 border-t border-blue-200">
                    <span>Итого</span>
                    <span className="font-montserrat text-xl text-blue-500">{orderTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep('success')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide py-3 rounded-xl mt-4 transition-colors"
                >
                  Подтвердить заказ
                </button>
                <button
                  onClick={() => setStep('cart')}
                  className="w-full text-slate-400 hover:text-blue-500 font-golos text-xs mt-3 transition-colors"
                >
                  ← Вернуться в корзину
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
