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
      <div className="industrial-bg min-h-screen flex items-center justify-center p-4">
        <div className="steel-texture border border-steel-600 p-10 text-center max-w-md w-full animate-scale-in">
          <div className="w-16 h-16 bg-green-600/20 border border-green-600/40 flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={32} className="text-green-400" />
          </div>
          <h2 className="font-oswald text-3xl font-bold uppercase mb-3">Заказ оформлен!</h2>
          <p className="text-steel-300 font-ibm mb-2">Номер вашего заказа: <span className="text-amber-DEFAULT font-semibold">#2024-005</span></p>
          <p className="text-steel-400 text-sm font-ibm mb-8">Мы свяжемся с вами по телефону для подтверждения заказа в течение 30 минут.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { clearCart(); onNavigate('account'); }} className="w-full bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide py-3 transition-colors">
              Отследить заказ
            </button>
            <button onClick={() => { clearCart(); onNavigate('catalog'); }} className="w-full border border-steel-600 hover:border-amber-DEFAULT text-steel-300 hover:text-amber-DEFAULT font-oswald uppercase tracking-wide py-3 transition-colors">
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="industrial-bg min-h-screen flex items-center justify-center p-4">
        <div className="steel-texture border border-steel-600 p-12 text-center max-w-md w-full">
          <Icon name="ShoppingCart" size={56} className="text-steel-500 mx-auto mb-4" />
          <h2 className="font-oswald text-2xl font-bold uppercase mb-2">Корзина пуста</h2>
          <p className="text-steel-400 font-ibm mb-6 text-sm">Добавьте товары из каталога</p>
          <button onClick={() => onNavigate('catalog')} className="bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide px-8 py-3 transition-colors">
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Корзина</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center gap-0 mb-8 overflow-x-auto">
          {[{ id: 'cart', label: 'Корзина', icon: 'ShoppingCart' }, { id: 'checkout', label: 'Оформление', icon: 'ClipboardList' }, { id: 'success', label: 'Готово', icon: 'CheckCircle' }].map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 text-sm font-oswald uppercase tracking-wide ${step === s.id ? 'text-amber-DEFAULT' : 'text-steel-500'}`}>
                <div className={`w-7 h-7 flex items-center justify-center text-xs border ${step === s.id ? 'bg-amber-DEFAULT border-amber-DEFAULT text-steel-900' : 'border-steel-600 text-steel-500'}`}>
                  {i + 1}
                </div>
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {i < 2 && <div className="h-px w-8 bg-steel-700" />}
            </div>
          ))}
        </div>

        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-oswald text-2xl font-bold uppercase">Корзина <span className="text-steel-500 text-lg">({items.length})</span></h1>
                <button onClick={clearCart} className="text-xs text-steel-500 hover:text-red-400 transition-colors font-ibm flex items-center gap-1">
                  <Icon name="Trash2" size={13} /> Очистить
                </button>
              </div>

              {items.map(item => (
                <div key={`${item.productId}-${item.variantId}`} className="steel-texture border border-steel-600 p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-steel-700 flex items-center justify-center flex-shrink-0">
                    <Icon name="Package" size={28} className="text-steel-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-oswald text-sm font-semibold truncate">{item.productName}</div>
                    {item.variantValue && (
                      <div className="text-xs text-steel-400 font-ibm">{item.variantName}: {item.variantValue}</div>
                    )}
                    <div className="text-xs text-steel-400 font-ibm">{item.price.toLocaleString('ru-RU')} ₽ / {item.unit}</div>
                  </div>
                  <div className="flex items-center border border-steel-600">
                    <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-steel-400 hover:text-amber-DEFAULT">
                      <Icon name="Minus" size={13} />
                    </button>
                    <span className="w-10 text-center text-sm font-oswald">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-steel-400 hover:text-amber-DEFAULT">
                      <Icon name="Plus" size={13} />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="font-oswald font-bold text-foreground">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</div>
                    <button onClick={() => removeItem(item.productId, item.variantId)} className="text-xs text-steel-500 hover:text-red-400 transition-colors mt-1">
                      <Icon name="X" size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="steel-texture border border-steel-600 p-5 sticky top-24">
                <h2 className="font-oswald text-base font-semibold uppercase mb-4">Итого</h2>
                <div className="space-y-2 text-sm font-ibm mb-4">
                  <div className="flex justify-between text-steel-300">
                    <span>Товары ({items.length})</span>
                    <span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-steel-300">
                    <span>Доставка</span>
                    <span className="text-amber-DEFAULT">рассчитаем позже</span>
                  </div>
                  <div className="border-t border-steel-700 pt-2 mt-2 flex justify-between font-semibold text-base">
                    <span>Сумма</span>
                    <span className="font-oswald text-xl font-bold text-amber-DEFAULT">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
                {total >= 50000 && (
                  <div className="bg-green-900/20 border border-green-800/40 px-3 py-2 text-xs text-green-400 font-ibm mb-4 flex items-center gap-2">
                    <Icon name="Gift" size={13} />
                    Бесплатная доставка при заказе от 50 000 ₽
                  </div>
                )}
                <button onClick={() => setStep('checkout')} className="w-full bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide py-3 transition-colors mb-3">
                  Оформить заказ
                </button>
                <button onClick={() => onNavigate('catalog')} className="w-full border border-steel-600 hover:border-amber-DEFAULT text-steel-400 hover:text-amber-DEFAULT text-xs font-oswald uppercase tracking-wide py-2 transition-colors">
                  Продолжить покупки
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'checkout' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="font-oswald text-2xl font-bold uppercase">Оформление заказа</h1>

              {/* Contact */}
              <div className="steel-texture border border-steel-600 p-5">
                <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Icon name="User" size={16} className="text-amber-DEFAULT" />
                  Контактные данные
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Имя и фамилия', placeholder: 'Иван Петров', type: 'text' },
                    { key: 'phone', label: 'Телефон', placeholder: '+7 (___) ___-__-__', type: 'tel' },
                    { key: 'email', label: 'Email', placeholder: 'email@mail.ru', type: 'email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="steel-texture border border-steel-600 p-5">
                <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Icon name="Truck" size={16} className="text-amber-DEFAULT" />
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
                      className={`flex items-center gap-3 p-4 border text-left transition-all ${form.delivery === d.id ? 'border-amber-DEFAULT bg-amber-DEFAULT/5' : 'border-steel-600 hover:border-amber-DEFAULT/40'}`}
                    >
                      <Icon name={d.icon as 'Truck'} size={20} className={form.delivery === d.id ? 'text-amber-DEFAULT' : 'text-steel-400'} />
                      <div>
                        <div className="font-oswald text-sm font-semibold uppercase">{d.label}</div>
                        <div className="text-xs text-steel-400 font-ibm">{d.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {form.delivery === 'delivery' && (
                  <input
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Адрес доставки: улица, дом, квартира"
                    className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT transition-colors"
                  />
                )}
              </div>

              {/* Comment */}
              <div className="steel-texture border border-steel-600 p-5">
                <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest mb-4">Комментарий</h3>
                <textarea
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  placeholder="Укажите особые пожелания к заказу..."
                  rows={3}
                  className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT transition-colors resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="steel-texture border border-steel-600 p-5 sticky top-24">
                <h2 className="font-oswald text-base font-semibold uppercase mb-4">Ваш заказ</h2>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm font-ibm">
                      <span className="text-steel-300 truncate mr-2">{item.productName} ×{item.quantity}</span>
                      <span className="text-foreground flex-shrink-0">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-steel-700 pt-3 space-y-2 text-sm font-ibm">
                  <div className="flex justify-between text-steel-300">
                    <span>Товары</span><span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-steel-300">
                    <span>Доставка</span>
                    <span>{form.delivery === 'pickup' ? 'Бесплатно' : deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-RU')} ₽`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-1 border-t border-steel-700">
                    <span>Итого</span>
                    <span className="font-oswald text-xl text-amber-DEFAULT">{orderTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep('success')}
                  className="w-full bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide py-3 mt-4 transition-colors"
                >
                  Подтвердить заказ
                </button>
                <button
                  onClick={() => setStep('cart')}
                  className="w-full text-steel-500 hover:text-amber-DEFAULT font-ibm text-xs mt-3 transition-colors"
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
