import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { categories, products, Product } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

interface CatalogPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  params?: Record<string, string>;
}

export default function CatalogPage({ onNavigate, params }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(params?.category || 'all');
  const [sortBy, setSortBy] = useState('default');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = products.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (priceMin && p.price < Number(priceMin)) return false;
    if (priceMax && p.price > Number(priceMax)) return false;
    if (inStockOnly && p.stock === 0) return false;
    if (saleOnly && !p.isSale) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'ru');
    return 0;
  });

  const currentCat = categories.find(c => c.id === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Каталог</span>
          {currentCat && (
            <>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">{currentCat.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-60 flex-shrink-0">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden w-full flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 mb-4 font-montserrat text-sm uppercase tracking-wide"
            >
              <span className="flex items-center gap-2"><Icon name="SlidersHorizontal" size={16} /> Фильтры</span>
              <Icon name={filterOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>

            <div className={`${filterOpen ? 'block' : 'hidden'} lg:block space-y-4`}>
              {/* Categories */}
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-3 text-foreground">Категории</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left text-sm font-golos px-2 py-1.5 transition-colors ${selectedCategory === 'all' ? 'text-blue-500 border-l-2 border-blue-400 pl-3' : 'text-slate-600 hover:text-blue-500'}`}
                    >
                      Все категории
                      <span className="float-right text-slate-400 text-xs">{products.length}</span>
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left text-sm font-golos px-2 py-1.5 transition-colors ${selectedCategory === cat.id ? 'text-blue-500 border-l-2 border-blue-400 pl-3' : 'text-slate-600 hover:text-blue-500'}`}
                      >
                        {cat.name}
                        <span className="float-right text-slate-400 text-xs">{cat.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-3 text-foreground">Цена, ₽</h3>
                <div className="flex gap-2">
                  <input
                    value={priceMin}
                    onChange={e => setPriceMin(e.target.value)}
                    placeholder="От"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors"
                  />
                  <input
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)}
                    placeholder="До"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground placeholder-slate-400 outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-2 text-foreground">Наличие</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`w-4 h-4 border rounded transition-colors flex items-center justify-center ${inStockOnly ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}
                  >
                    {inStockOnly && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className="text-sm font-golos text-slate-600 group-hover:text-foreground transition-colors">Только в наличии</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setSaleOnly(!saleOnly)}
                    className={`w-4 h-4 border rounded transition-colors flex items-center justify-center ${saleOnly ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}
                  >
                    {saleOnly && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className="text-sm font-golos text-slate-600 group-hover:text-foreground transition-colors">Только со скидкой</span>
                </label>
              </div>

              {/* Reset */}
              <button
                onClick={() => { setSelectedCategory('all'); setPriceMin(''); setPriceMax(''); setInStockOnly(false); setSaleOnly(false); }}
                className="w-full border border-slate-200 hover:border-blue-400 text-slate-500 hover:text-blue-500 font-montserrat text-xs uppercase tracking-wide py-2 rounded-lg transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-montserrat text-2xl font-bold uppercase">
                {currentCat ? currentCat.name : 'Все товары'}
                <span className="text-slate-400 ml-2 text-lg font-normal">({sorted.length})</span>
              </h1>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-slate-700 outline-none focus:border-blue-400 transition-colors"
              >
                <option value="default">По умолчанию</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
                <option value="name">По названию</option>
              </select>
            </div>

            {sorted.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
                <Icon name="PackageSearch" size={48} className="text-slate-400 mx-auto mb-4" />
                <p className="font-montserrat text-lg uppercase text-slate-600">Товары не найдены</p>
                <p className="text-slate-400 text-sm font-golos mt-1">Попробуйте изменить параметры фильтра</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {sorted.map((p: Product) => (
                  <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
