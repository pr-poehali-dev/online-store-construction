import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';
import { useCart } from '@/store/cartStore';

interface ProductPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  params?: Record<string, string>;
}

export default function ProductPage({ onNavigate, params }: ProductPageProps) {
  const product = products.find(p => p.id === params?.id) || products[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc');
  const { addItem } = useCart();

  const basePrice = product.isSale && product.salePercent
    ? Math.round(product.price * (1 - product.salePercent / 100))
    : product.price;

  const finalPrice = basePrice + (selectedVariant?.priceModifier || 0);
  const isLowStock = selectedVariant ? selectedVariant.stock <= product.lowStockThreshold : product.stock <= product.lowStockThreshold;
  const stock = selectedVariant ? selectedVariant.stock : product.stock;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      price: finalPrice,
      unit: product.unit,
      quantity,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      variantValue: selectedVariant?.value,
    });
  };

  return (
    <div className="industrial-bg min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <button onClick={() => onNavigate('catalog')} className="hover-amber transition-colors">Каталог</button>
          <Icon name="ChevronRight" size={14} />
          <button onClick={() => onNavigate('catalog', { category: product.category })} className="hover-amber transition-colors">
            {product.subcategory}
          </button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Image */}
          <div className="steel-texture border border-steel-600 aspect-square flex items-center justify-center relative">
            <Icon name="Package" size={100} className="text-steel-500" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-blue-600 text-white text-xs font-oswald font-semibold uppercase tracking-wide px-3 py-1">НОВИНКА</span>
              )}
              {product.isSale && product.salePercent && (
                <span className="bg-amber-DEFAULT text-steel-900 text-xs font-oswald font-semibold uppercase tracking-wide px-3 py-1">-{product.salePercent}%</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-xs text-steel-400 uppercase tracking-widest font-oswald mb-2">
              {product.brand} · Арт.: {product.sku}
            </div>
            <h1 className="font-oswald text-3xl font-bold uppercase mb-3 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Icon key={s} name="Star" size={14} className={s <= Math.round(product.rating) ? 'text-amber-DEFAULT' : 'text-steel-600'} />
                ))}
              </div>
              <span className="text-sm text-steel-400 font-ibm">{product.rating} · {product.reviewCount} отзывов</span>
            </div>

            {/* Price */}
            <div className="border-y border-steel-700 py-4 mb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-oswald text-4xl font-bold text-amber-DEFAULT">
                  {finalPrice.toLocaleString('ru-RU')} ₽
                </span>
                {product.isSale && (
                  <span className="text-steel-500 text-lg line-through font-ibm">{(product.price + (selectedVariant?.priceModifier || 0)).toLocaleString('ru-RU')} ₽</span>
                )}
                <span className="text-steel-400 font-ibm text-sm">/ {product.unit}</span>
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-oswald font-semibold uppercase tracking-widest text-steel-300 mb-2">
                  {product.variants[0].name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 text-sm font-ibm border transition-colors
                        ${selectedVariant?.id === v.id
                          ? 'border-amber-DEFAULT bg-amber-DEFAULT/10 text-amber-DEFAULT'
                          : 'border-steel-600 text-steel-300 hover:border-amber-DEFAULT/50'}`}
                    >
                      {v.value}
                      {v.priceModifier !== 0 && (
                        <span className="ml-1 text-xs text-steel-500">
                          {v.priceModifier > 0 ? `+${v.priceModifier}` : v.priceModifier} ₽
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className={`flex items-center gap-2 mb-5 text-sm font-ibm ${stock === 0 ? 'text-red-400' : isLowStock ? 'text-amber-DEFAULT' : 'text-green-400'}`}>
              <Icon name={stock === 0 ? 'XCircle' : isLowStock ? 'AlertTriangle' : 'CheckCircle'} size={16} />
              {stock === 0 ? 'Нет в наличии' : isLowStock ? `Мало: ${stock} ${product.unit}` : `В наличии: ${stock} ${product.unit}`}
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-steel-600">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-steel-300 hover:text-amber-DEFAULT transition-colors">
                  <Icon name="Minus" size={16} />
                </button>
                <span className="w-12 text-center font-oswald font-medium text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-steel-300 hover:text-amber-DEFAULT transition-colors">
                  <Icon name="Plus" size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-DEFAULT hover:bg-amber-500 disabled:bg-steel-600 text-steel-900 disabled:text-steel-400 font-oswald font-semibold uppercase tracking-wide py-2 transition-colors"
              >
                <Icon name="ShoppingCart" size={18} />
                В корзину — {(finalPrice * quantity).toLocaleString('ru-RU')} ₽
              </button>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'Truck', text: 'Доставка за 1 день' },
                { icon: 'Shield', text: 'Гарантия качества' },
                { icon: 'RefreshCw', text: 'Возврат 14 дней' },
                { icon: 'CreditCard', text: 'Безналичный расчёт' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-steel-300 font-ibm">
                  <Icon name={item.icon as 'Truck'} size={14} className="text-amber-DEFAULT" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="steel-texture border border-steel-600">
          <div className="flex border-b border-steel-600">
            {([['desc', 'Описание'], ['specs', 'Характеристики'], ['delivery', 'Доставка и оплата']] as const).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-oswald text-sm uppercase tracking-wide transition-colors border-b-2 -mb-px ${activeTab === tab ? 'text-amber-DEFAULT border-amber-DEFAULT' : 'text-steel-400 border-transparent hover:text-foreground'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'desc' && (
              <p className="text-steel-200 leading-relaxed font-ibm">{product.description}</p>
            )}
            {activeTab === 'specs' && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(product.specs).map(([key, val]) => val && (
                  <div key={key} className="flex items-center py-2 border-b border-steel-700">
                    <dt className="w-1/2 text-sm text-steel-400 font-ibm">{key}</dt>
                    <dd className="w-1/2 text-sm text-foreground font-ibm font-medium">{val}</dd>
                  </div>
                ))}
                <div className="flex items-center py-2 border-b border-steel-700">
                  <dt className="w-1/2 text-sm text-steel-400 font-ibm">Артикул</dt>
                  <dd className="w-1/2 text-sm text-foreground font-ibm font-medium">{product.sku}</dd>
                </div>
              </dl>
            )}
            {activeTab === 'delivery' && (
              <div className="space-y-4 font-ibm text-steel-200">
                <div className="flex items-start gap-3">
                  <Icon name="Truck" size={20} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Доставка по Москве</div>
                    <p className="text-sm text-steel-300">От 1 рабочего дня. Стоимость рассчитывается при оформлении заказа.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Самовывоз</div>
                    <p className="text-sm text-steel-300">г. Москва, ул. Строителей, д. 14. Пн-Пт 8:00-19:00, Сб 9:00-17:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CreditCard" size={20} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Оплата</div>
                    <p className="text-sm text-steel-300">Наличные, банковские карты, безналичный расчёт для юридических лиц, рассрочка.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
