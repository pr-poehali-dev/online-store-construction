import Icon from '@/components/ui/icon';
import { Product } from '@/data/products';
import { useCart } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addItem } = useCart();
  const isLowStock = product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      unit: product.unit,
      quantity: 1,
    });
  };

  const displayPrice = product.isSale && product.salePercent
    ? Math.round(product.price * (1 - product.salePercent / 100))
    : product.price;

  return (
    <div
      onClick={() => onNavigate('product', { id: product.id })}
      className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all card-hover cursor-pointer flex flex-col rounded-xl overflow-hidden"
    >
      {/* Image area */}
      <div className="relative bg-blue-50 h-44 flex items-center justify-center overflow-hidden">
        <Icon name="Package" size={48} className="text-blue-200 group-hover:text-blue-300 transition-colors" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-[10px] font-montserrat font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
              НОВИНКА
            </span>
          )}
          {product.isSale && product.salePercent && (
            <span className="bg-red-500 text-white text-[10px] font-montserrat font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
              -{product.salePercent}%
            </span>
          )}
        </div>

        {/* Stock badge */}
        {(isLowStock || isOutOfStock) && (
          <div className={`absolute bottom-2 right-2 text-[10px] font-montserrat font-semibold uppercase px-2 py-0.5 rounded ${isOutOfStock ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
            {isOutOfStock ? 'НЕТ В НАЛИЧИИ' : `МАЛО: ${product.stock} ${product.unit}`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-montserrat mb-1">{product.brand} · {product.subcategory}</div>
        <h3 className="font-montserrat text-sm font-semibold leading-tight mb-2 group-hover:text-blue-500 transition-colors line-clamp-2 text-slate-800">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Icon key={s} name="Star" size={11} className={s <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200'} />
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-golos">{product.rating} ({product.reviewCount})</span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-montserrat text-xl font-bold text-slate-800">
              {displayPrice.toLocaleString('ru-RU')} ₽
            </span>
            {product.isSale && (
              <span className="text-xs text-slate-400 line-through font-golos">{product.price.toLocaleString('ru-RU')} ₽</span>
            )}
            <span className="text-xs text-slate-400 font-golos">/ {product.unit}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 font-montserrat text-xs font-semibold uppercase tracking-wide py-2 transition-colors rounded-lg"
            >
              <Icon name="ShoppingCart" size={14} />
              {isOutOfStock ? 'Нет' : 'В корзину'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="w-9 h-9 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors rounded-lg"
            >
              <Icon name="Heart" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
