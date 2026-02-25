import Icon from '@/components/ui/icon';
import { categories, products } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const saleProducts = products.filter(p => p.isSale);
  const newProducts = products.filter(p => p.isNew);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="industrial-bg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900 via-steel-900/95 to-transparent z-10" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(251,160,0,0.1) 10px,
              rgba(251,160,0,0.1) 11px
            )`
          }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 animate-fade-in">
              <div className="h-px w-10 bg-amber-DEFAULT" />
              <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Официальный поставщик</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold uppercase leading-none mb-6 animate-fade-in delay-100">
              Строй<br />
              <span className="text-amber-DEFAULT">с умом</span>
            </h1>
            <p className="text-steel-200 text-lg mb-8 leading-relaxed font-ibm animate-fade-in delay-200">
              Более 10&nbsp;000 позиций строительных материалов. Доставка по всей России. Профессиональные консультации.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide px-8 py-3 transition-all hover:shadow-lg hover:shadow-amber-DEFAULT/20"
              >
                <Icon name="Grid3x3" size={18} />
                Каталог товаров
              </button>
              <button
                onClick={() => onNavigate('promo')}
                className="flex items-center gap-2 border border-amber-DEFAULT text-amber-DEFAULT hover:bg-amber-DEFAULT hover:text-steel-900 font-oswald font-semibold uppercase tracking-wide px-8 py-3 transition-all"
              >
                <Icon name="Tag" size={18} />
                Акции
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-20 bg-steel-800/90 backdrop-blur border-t border-steel-600">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10 000+', label: 'позиций', icon: 'Package' },
              { value: '15 лет', label: 'на рынке', icon: 'Shield' },
              { value: '50 000+', label: 'клиентов', icon: 'Users' },
              { value: '1 день', label: 'доставка', icon: 'Truck' },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-3 animate-fade-in delay-${(i + 1) * 100}`}>
                <div className="w-10 h-10 border border-amber-DEFAULT/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={stat.icon as 'Package'} size={18} className="text-amber-DEFAULT" />
                </div>
                <div>
                  <div className="font-oswald text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-steel-300 uppercase tracking-wide font-ibm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-8 bg-amber-DEFAULT" />
              <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Ассортимент</span>
            </div>
            <h2 className="font-oswald text-3xl font-bold uppercase">Категории товаров</h2>
          </div>
          <button onClick={() => onNavigate('catalog')} className="hidden sm:flex items-center gap-2 text-sm text-amber-DEFAULT hover:text-amber-500 transition-colors font-ibm">
            Все категории <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('catalog', { category: cat.id })}
              className={`group relative steel-texture border border-steel-600 hover:border-amber-DEFAULT p-5 text-left transition-all card-hover animate-fade-in delay-${Math.min(i * 100, 600)}`}
            >
              <div className="mb-3">
                <div className="w-10 h-10 bg-steel-700 group-hover:bg-amber-DEFAULT/10 border border-steel-600 group-hover:border-amber-DEFAULT/40 flex items-center justify-center transition-all">
                  <Icon name={cat.icon as 'Package'} size={20} className="text-steel-300 group-hover:text-amber-DEFAULT transition-colors" />
                </div>
              </div>
              <div className="font-oswald text-sm font-medium uppercase tracking-wide group-hover:text-amber-DEFAULT transition-colors leading-tight">
                {cat.name}
              </div>
              <div className="text-xs text-steel-400 mt-1 font-ibm">{cat.count} товаров</div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-amber-DEFAULT transition-all duration-300" />
            </button>
          ))}
        </div>
      </section>

      {/* Sale products */}
      {saleProducts.length > 0 && (
        <section className="bg-steel-800/50 border-y border-steel-700 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-8 bg-amber-DEFAULT" />
                  <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Скидки</span>
                </div>
                <h2 className="font-oswald text-3xl font-bold uppercase">Акции и спецпредложения</h2>
              </div>
              <button onClick={() => onNavigate('promo')} className="hidden sm:flex items-center gap-2 text-sm text-amber-DEFAULT hover:text-amber-500 font-ibm">
                Все акции <Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {saleProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
            </div>
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-8 bg-amber-DEFAULT" />
              <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Популярное</span>
            </div>
            <h2 className="font-oswald text-3xl font-bold uppercase">Хиты продаж</h2>
          </div>
          <button onClick={() => onNavigate('catalog')} className="hidden sm:flex items-center gap-2 text-sm text-amber-DEFAULT hover:text-amber-500 font-ibm">
            Все товары <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
        </div>
      </section>

      {/* New products */}
      {newProducts.length > 0 && (
        <section className="bg-steel-800/50 border-y border-steel-700 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-8 bg-amber-DEFAULT" />
                  <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Новинки</span>
                </div>
                <h2 className="font-oswald text-3xl font-bold uppercase">Новые поступления</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {newProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px w-8 bg-amber-DEFAULT" />
            <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Преимущества</span>
            <div className="h-px w-8 bg-amber-DEFAULT" />
          </div>
          <h2 className="font-oswald text-3xl font-bold uppercase">Почему выбирают нас</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: 'ShieldCheck', title: 'Сертифицированная продукция', desc: 'Все товары имеют сертификаты качества и соответствуют ГОСТ' },
            { icon: 'Truck', title: 'Быстрая доставка', desc: 'Доставка по Москве за 1 день, по России — от 2 дней' },
            { icon: 'Calculator', title: 'Оптовые цены', desc: 'Скидки при заказе от 50 000 ₽. Специальные условия для строительных компаний' },
            { icon: 'Headphones', title: 'Техническая поддержка', desc: 'Консультация специалистов по телефону и в чате ежедневно' },
            { icon: 'RefreshCw', title: 'Возврат и обмен', desc: 'Возврат товара в течение 14 дней без объяснения причин' },
            { icon: 'CreditCard', title: 'Удобная оплата', desc: 'Наличными, картой, безналичный расчёт для юридических лиц' },
          ].map((item, i) => (
            <div key={i} className="steel-texture border border-steel-600 p-6 amber-line card-hover">
              <Icon name={item.icon as 'Truck'} size={28} className="text-amber-DEFAULT mb-4" />
              <h3 className="font-oswald text-base font-semibold uppercase tracking-wide mb-2">{item.title}</h3>
              <p className="text-steel-300 text-sm leading-relaxed font-ibm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-amber-DEFAULT overflow-hidden mb-14">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-oswald text-3xl font-bold uppercase text-steel-900">Нужна консультация?</h2>
            <p className="text-steel-800 mt-1 font-ibm">Наши специалисты помогут подобрать материалы под ваш проект</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('contact')} className="flex items-center gap-2 bg-steel-900 hover:bg-steel-800 text-foreground font-oswald font-semibold uppercase tracking-wide px-6 py-3 transition-all">
              <Icon name="Phone" size={18} />
              Заказать звонок
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
