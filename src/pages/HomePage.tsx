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
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, hsl(213,80%,90%) 0%, transparent 60%)`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 animate-fade-in">
              <div className="h-px w-10 bg-blue-400" />
              <span className="text-blue-500 text-xs uppercase tracking-widest font-montserrat font-semibold">Официальный поставщик</span>
            </div>
            <h1 className="font-montserrat text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in delay-100 text-slate-800">
              Строй<br />
              <span className="text-blue-500">с умом</span>
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-golos animate-fade-in delay-200">
              Более 10&nbsp;000 позиций строительных материалов. Доставка по всей России. Профессиональные консультации.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide px-8 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30"
              >
                <Icon name="Grid3x3" size={18} />
                Каталог товаров
              </button>
              <button
                onClick={() => onNavigate('promo')}
                className="flex items-center gap-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-500 hover:text-white font-montserrat font-semibold uppercase tracking-wide px-8 py-3 rounded-xl transition-all"
              >
                <Icon name="Tag" size={18} />
                Акции
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-white/80 backdrop-blur border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10 000+', label: 'позиций', icon: 'Package' },
              { value: '15 лет', label: 'на рынке', icon: 'Shield' },
              { value: '50 000+', label: 'клиентов', icon: 'Users' },
              { value: '1 день', label: 'доставка', icon: 'Truck' },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-3 animate-fade-in delay-${(i + 1) * 100}`}>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={stat.icon as 'Package'} size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-montserrat text-xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-golos">{stat.label}</div>
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
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-500 text-xs uppercase tracking-widest font-montserrat font-semibold">Ассортимент</span>
            </div>
            <h2 className="font-montserrat text-3xl font-bold text-slate-800">Категории товаров</h2>
          </div>
          <button onClick={() => onNavigate('catalog')} className="hidden sm:flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition-colors font-golos">
            Все категории <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('catalog', { category: cat.id })}
              className={`group relative bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md p-5 text-left transition-all card-hover rounded-xl animate-fade-in delay-${Math.min(i * 100, 600)}`}
            >
              <div className="mb-3">
                <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-all">
                  <Icon name={cat.icon as 'Package'} size={20} className="text-blue-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
              <div className="font-montserrat text-sm font-semibold group-hover:text-blue-500 transition-colors leading-tight text-slate-700">
                {cat.name}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-golos">{cat.count} товаров</div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300 rounded-b-xl" />
            </button>
          ))}
        </div>
      </section>

      {/* Sale products */}
      {saleProducts.length > 0 && (
        <section className="bg-blue-50 border-y border-blue-100 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-8 bg-blue-400" />
                  <span className="text-blue-500 text-xs uppercase tracking-widest font-montserrat font-semibold">Скидки</span>
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-slate-800">Акции и спецпредложения</h2>
              </div>
              <button onClick={() => onNavigate('promo')} className="hidden sm:flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 font-golos">
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
              <div className="h-px w-8 bg-blue-400" />
              <span className="text-blue-500 text-xs uppercase tracking-widest font-montserrat font-semibold">Популярное</span>
            </div>
            <h2 className="font-montserrat text-3xl font-bold text-slate-800">Хиты продаж</h2>
          </div>
          <button onClick={() => onNavigate('catalog')} className="hidden sm:flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 font-golos">
            Все товары <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
        </div>
      </section>

      {/* New products */}
      {newProducts.length > 0 && (
        <section className="bg-blue-50 border-y border-blue-100 py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-8 bg-blue-400" />
                  <span className="text-blue-500 text-xs uppercase tracking-widest font-montserrat font-semibold">Новое</span>
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-slate-800">Новинки</h2>
              </div>
              <button onClick={() => onNavigate('catalog')} className="hidden sm:flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 font-golos">
                Все новинки <Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {newProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
            </div>
          </div>
        </section>
      )}

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-500 text-xs uppercase tracking-widest font-montserrat font-semibold">Почему мы</span>
            <div className="h-px w-8 bg-blue-400" />
          </div>
          <h2 className="font-montserrat text-3xl font-bold text-slate-800">Наши преимущества</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'ShieldCheck', title: 'Гарантия качества', text: 'Все товары сертифицированы и соответствуют стандартам ГОСТ' },
            { icon: 'Truck', title: 'Быстрая доставка', text: 'Доставка по Москве — 1 день, по России — от 3 дней' },
            { icon: 'Headphones', title: 'Экспертная помощь', text: 'Консультации по выбору материалов от профессионалов' },
            { icon: 'RotateCcw', title: 'Возврат 30 дней', text: 'Возврат или обмен товара в течение 30 дней без вопросов' },
          ].map((a, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-md hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name={a.icon as 'ShieldCheck'} size={24} className="text-blue-500" />
              </div>
              <h3 className="font-montserrat font-bold text-slate-800 mb-2">{a.title}</h3>
              <p className="text-slate-500 text-sm font-golos leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
