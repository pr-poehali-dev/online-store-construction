import Icon from '@/components/ui/icon';

interface DeliveryPageProps {
  onNavigate: (page: string) => void;
}

export default function DeliveryPage({ onNavigate }: DeliveryPageProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Доставка и оплата</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-500 font-montserrat font-semibold text-xs uppercase tracking-widest">Логистика</span>
          </div>
          <h1 className="font-montserrat text-4xl font-bold uppercase">Доставка и оплата</h1>
        </div>

        <div className="space-y-6">
          {/* Delivery */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-montserrat text-xl font-bold uppercase mb-4 flex items-center gap-3">
              <Icon name="Truck" size={22} className="text-blue-500" /> Доставка
            </h2>
            <div className="space-y-4 font-golos">
              {[
                { zone: 'Москва (в пределах МКАД)', time: '1 рабочий день', cost: 'от 1 500 ₽', free: 'Бесплатно от 50 000 ₽' },
                { zone: 'Московская область', time: '1–2 рабочих дня', cost: 'от 2 500 ₽', free: 'Бесплатно от 100 000 ₽' },
                { zone: 'Регионы России', time: '3–7 рабочих дней', cost: 'По тарифам перевозчика', free: '—' },
              ].map((d, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 py-3 border-b border-slate-200 last:border-0 text-sm">
                  <div className="sm:col-span-2 font-medium text-foreground">{d.zone}</div>
                  <div className="text-slate-600 flex items-center gap-1.5"><Icon name="Clock" size={13} className="text-blue-500" />{d.time}</div>
                  <div className="text-slate-600">
                    <div>{d.cost}</div>
                    {d.free !== '—' && <div className="text-green-500 text-xs">{d.free}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-golos text-slate-600">
              <Icon name="Info" size={14} className="text-blue-500 inline mr-2" />
              Крупногабаритные грузы (цемент, кирпич, металлопрокат) доставляются манипулятором или самосвалом. Стоимость рассчитывается индивидуально.
            </div>
          </div>

          {/* Pickup */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-montserrat text-xl font-bold uppercase mb-4 flex items-center gap-3">
              <Icon name="MapPin" size={22} className="text-blue-500" /> Самовывоз — Бесплатно
            </h2>
            <p className="font-golos text-slate-600 text-sm mb-3">г. Москва, ул. Строителей, д. 14</p>
            <p className="font-golos text-slate-400 text-sm">Пн-Пт: 8:00–19:00 · Сб: 9:00–17:00 · Вс: Выходной</p>
          </div>

          {/* Payment */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-montserrat text-xl font-bold uppercase mb-4 flex items-center gap-3">
              <Icon name="CreditCard" size={22} className="text-blue-500" /> Способы оплаты
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-golos text-sm">
              {[
                { icon: 'Banknote', title: 'Наличные', desc: 'При самовывозе или доставке' },
                { icon: 'CreditCard', title: 'Банковская карта', desc: 'Visa, Mastercard, МИР' },
                { icon: 'Building2', title: 'Безналичный расчёт', desc: 'Для юридических лиц по счёту' },
                { icon: 'Smartphone', title: 'Онлайн-оплата', desc: 'На сайте при оформлении заказа' },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <Icon name={p.icon as 'CreditCard'} size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">{p.title}</div>
                    <div className="text-slate-400 text-xs">{p.desc}</div>
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
