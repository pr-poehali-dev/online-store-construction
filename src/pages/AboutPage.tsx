import Icon from '@/components/ui/icon';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">О компании</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="bg-blue-600 text-white rounded-2xl px-8 py-10 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-8 bg-blue-300" />
            <span className="text-blue-200 font-montserrat font-semibold text-xs uppercase tracking-widest">О нас</span>
          </div>
          <h1 className="font-montserrat text-4xl font-bold uppercase mb-4">СтройМаркет</h1>
          <p className="font-golos text-blue-100 text-lg leading-relaxed max-w-3xl">
            Мы — надёжный поставщик строительных материалов с 2008 года. За 15 лет мы выстроили партнёрские отношения с ведущими производителями и сформировали склад более 10 000 позиций.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="font-montserrat text-2xl font-bold uppercase mb-6">История компании</h2>
          <div className="space-y-0">
            {[
              { year: '2008', title: 'Основание', desc: 'Открытие первого склада и торговой точки в Москве.' },
              { year: '2012', title: 'Расширение', desc: 'Запуск онлайн-магазина и расширение ассортимента до 5 000 позиций.' },
              { year: '2016', title: 'Оптовые поставки', desc: 'Начало работы с крупными строительными компаниями по долгосрочным контрактам.' },
              { year: '2020', title: 'Цифровизация', desc: 'Полный переход на цифровое управление складом и заказами.' },
              { year: '2024', title: 'Сегодня', desc: 'Более 50 000 клиентов, 10 000+ позиций, доставка по всей России.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 z-10">
                    <span className="font-montserrat text-xs font-bold text-white">{item.year}</span>
                  </div>
                  {i < 4 && <div className="w-0.5 flex-1 bg-slate-200 mt-1" />}
                </div>
                <div className="pb-2">
                  <div className="font-montserrat text-lg font-bold uppercase text-foreground mb-1">{item.title}</div>
                  <p className="text-slate-600 font-golos text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <h2 className="font-montserrat text-2xl font-bold uppercase mb-6">Наши ценности</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: 'ShieldCheck', title: 'Качество', desc: 'Только сертифицированная продукция от проверенных производителей' },
            { icon: 'Handshake', title: 'Надёжность', desc: 'Выполняем обязательства точно в срок без исключений' },
            { icon: 'Users', title: 'Клиент на первом месте', desc: 'Индивидуальный подход к каждому — от частника до застройщика' },
            { icon: 'TrendingUp', title: 'Развитие', desc: 'Постоянно расширяем ассортимент и улучшаем сервис' },
          ].map((v, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={v.icon as 'ShieldCheck'} size={20} className="text-blue-500" />
              </div>
              <div>
                <div className="font-montserrat text-sm font-bold uppercase tracking-wide mb-1">{v.title}</div>
                <p className="text-slate-600 text-sm font-golos">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
