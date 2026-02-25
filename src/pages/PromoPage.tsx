import Icon from '@/components/ui/icon';
import { products } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

interface PromoPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function PromoPage({ onNavigate }: PromoPageProps) {
  const saleProducts = products.filter(p => p.isSale);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Акции</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-blue-600 overflow-hidden py-14">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)` }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="font-montserrat text-6xl font-bold uppercase text-white mb-3 animate-fade-in">
            Горячие скидки
          </div>
          <p className="text-blue-100 font-golos text-lg animate-fade-in delay-100">
            Специальные предложения на строительные материалы — ограниченное время!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: 'Truck', title: 'Бесплатная доставка', sub: 'при заказе от 50 000 ₽', color: 'border-blue-600/40 bg-blue-600/5' },
            { icon: 'Percent', title: 'Скидка 5%', sub: 'при оплате онлайн', color: 'border-green-600/40 bg-green-600/5' },
            { icon: 'Users', title: 'Скидки для юрлиц', sub: 'от 7% при оптовых закупках', color: 'border-purple-600/40 bg-purple-600/5' },
          ].map((b, i) => (
            <div key={i} className={`bg-white border ${b.color} rounded-xl p-5 flex items-center gap-4`}>
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={b.icon as 'Truck'} size={22} className="text-blue-500" />
              </div>
              <div>
                <div className="font-montserrat text-base font-bold uppercase">{b.title}</div>
                <div className="text-slate-400 text-sm font-golos">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Products on sale */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-500 font-montserrat font-semibold text-xs uppercase tracking-widest">Спецпредложения</span>
          </div>
          <h2 className="font-montserrat text-3xl font-bold uppercase mb-6">Товары по акции</h2>
        </div>

        {saleProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
            <Icon name="Tag" size={48} className="text-slate-400 mx-auto mb-4" />
            <p className="font-montserrat text-lg uppercase text-slate-600">Акционных товаров сейчас нет</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {saleProducts.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
          </div>
        )}
      </div>
    </div>
  );
}
