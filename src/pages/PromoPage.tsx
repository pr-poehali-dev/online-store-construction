import Icon from '@/components/ui/icon';
import { products } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

interface PromoPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function PromoPage({ onNavigate }: PromoPageProps) {
  const saleProducts = products.filter(p => p.isSale);

  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Акции</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-amber-DEFAULT overflow-hidden py-14">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)` }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="font-oswald text-6xl font-bold uppercase text-steel-900 mb-3 animate-fade-in">
            Горячие скидки
          </div>
          <p className="text-steel-800 font-ibm text-lg animate-fade-in delay-100">
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
            <div key={i} className={`steel-texture border ${b.color} p-5 flex items-center gap-4`}>
              <div className="w-12 h-12 bg-amber-DEFAULT/10 border border-amber-DEFAULT/20 flex items-center justify-center flex-shrink-0">
                <Icon name={b.icon as 'Truck'} size={22} className="text-amber-DEFAULT" />
              </div>
              <div>
                <div className="font-oswald text-base font-bold uppercase">{b.title}</div>
                <div className="text-steel-400 text-sm font-ibm">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Products on sale */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-amber-DEFAULT" />
            <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Спецпредложения</span>
          </div>
          <h2 className="font-oswald text-3xl font-bold uppercase mb-6">Товары по акции</h2>
        </div>

        {saleProducts.length === 0 ? (
          <div className="steel-texture border border-steel-600 p-16 text-center">
            <Icon name="Tag" size={48} className="text-steel-500 mx-auto mb-4" />
            <p className="font-oswald text-lg uppercase text-steel-400">Акционных товаров сейчас нет</p>
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
