import Icon from '@/components/ui/icon';

interface DeliveryPageProps {
  onNavigate: (page: string) => void;
}

export default function DeliveryPage({ onNavigate }: DeliveryPageProps) {
  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Доставка и оплата</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-amber-DEFAULT" />
            <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Логистика</span>
          </div>
          <h1 className="font-oswald text-4xl font-bold uppercase">Доставка и оплата</h1>
        </div>

        <div className="space-y-6">
          {/* Delivery */}
          <div className="steel-texture border border-steel-600 p-6">
            <h2 className="font-oswald text-xl font-bold uppercase mb-4 flex items-center gap-3">
              <Icon name="Truck" size={22} className="text-amber-DEFAULT" /> Доставка
            </h2>
            <div className="space-y-4 font-ibm">
              {[
                { zone: 'Москва (в пределах МКАД)', time: '1 рабочий день', cost: 'от 1 500 ₽', free: 'Бесплатно от 50 000 ₽' },
                { zone: 'Московская область', time: '1–2 рабочих дня', cost: 'от 2 500 ₽', free: 'Бесплатно от 100 000 ₽' },
                { zone: 'Регионы России', time: '3–7 рабочих дней', cost: 'По тарифам перевозчика', free: '—' },
              ].map((d, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 py-3 border-b border-steel-700 last:border-0 text-sm">
                  <div className="sm:col-span-2 font-medium text-foreground">{d.zone}</div>
                  <div className="text-steel-300 flex items-center gap-1.5"><Icon name="Clock" size={13} className="text-amber-DEFAULT" />{d.time}</div>
                  <div className="text-steel-300">
                    <div>{d.cost}</div>
                    {d.free !== '—' && <div className="text-green-400 text-xs">{d.free}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-steel-700/50 border border-steel-600 p-4 text-sm font-ibm text-steel-300">
              <Icon name="Info" size={14} className="text-amber-DEFAULT inline mr-2" />
              Крупногабаритные грузы (цемент, кирпич, металлопрокат) доставляются манипулятором или самосвалом. Стоимость рассчитывается индивидуально.
            </div>
          </div>

          {/* Pickup */}
          <div className="steel-texture border border-steel-600 p-6">
            <h2 className="font-oswald text-xl font-bold uppercase mb-4 flex items-center gap-3">
              <Icon name="MapPin" size={22} className="text-amber-DEFAULT" /> Самовывоз — Бесплатно
            </h2>
            <p className="font-ibm text-steel-300 text-sm mb-3">г. Москва, ул. Строителей, д. 14</p>
            <p className="font-ibm text-steel-400 text-sm">Пн-Пт: 8:00–19:00 · Сб: 9:00–17:00 · Вс: Выходной</p>
          </div>

          {/* Payment */}
          <div className="steel-texture border border-steel-600 p-6">
            <h2 className="font-oswald text-xl font-bold uppercase mb-4 flex items-center gap-3">
              <Icon name="CreditCard" size={22} className="text-amber-DEFAULT" /> Способы оплаты
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-ibm text-sm">
              {[
                { icon: 'Banknote', title: 'Наличные', desc: 'При самовывозе или доставке' },
                { icon: 'CreditCard', title: 'Банковская карта', desc: 'Visa, Mastercard, МИР' },
                { icon: 'Building2', title: 'Безналичный расчёт', desc: 'Для юридических лиц по счёту' },
                { icon: 'Smartphone', title: 'Онлайн-оплата', desc: 'На сайте при оформлении заказа' },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-steel-700/40 border border-steel-700">
                  <Icon name={p.icon as 'CreditCard'} size={18} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">{p.title}</div>
                    <div className="text-steel-400 text-xs">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
