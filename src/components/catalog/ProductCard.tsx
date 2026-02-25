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
      className="group steel-texture border border-steel-600 hover:border-amber-DEFAULT/50 transition-all card-hover cursor-pointer flex flex-col"
    >
      {/* Image area */}
      <div className="relative bg-steel-700 h-44 flex items-center justify-center overflow-hidden">
        <Icon name="Package" size={48} className="text-steel-500 group-hover:text-steel-400 transition-colors" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-oswald font-semibold uppercase tracking-wide px-2 py-0.5">
              НОВИНКА
            </span>
          )}
          {product.isSale && product.salePercent && (
            <span className="bg-amber-DEFAULT text-steel-900 text-[10px] font-oswald font-semibold uppercase tracking-wide px-2 py-0.5">
              -{product.salePercent}%
            </span>
          )}
        </div>

        {/* Stock badge */}
        {(isLowStock || isOutOfStock) && (
          <div className={`absolute bottom-2 right-2 text-[10px] font-oswald font-semibold uppercase px-2 py-0.5 ${isOutOfStock ? 'bg-red-600 text-white' : 'bg-amber-DEFAULT/90 text-steel-900'}`}>
            {isOutOfStock ? 'НЕТ В НАЛИЧИИ' : `МАЛО: ${product.stock} ${product.unit}`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-steel-400 uppercase tracking-wider font-oswald mb-1">{product.brand} · {product.subcategory}</div>
        <h3 className="font-oswald text-sm font-semibold leading-tight mb-2 group-hover:text-amber-DEFAULT transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Icon key={s} name="Star" size={11} className={s <= Math.round(product.rating) ? 'text-amber-DEFAULT' : 'text-steel-600'} />
            ))}
          </div>
          <span className="text-[11px] text-steel-400 font-ibm">{product.rating} ({product.reviewCount})</span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-oswald text-xl font-bold text-foreground">
              {displayPrice.toLocaleString('ru-RU')} ₽
            </span>
            {product.isSale && (
              <span className="text-xs text-steel-500 line-through font-ibm">{product.price.toLocaleString('ru-RU')} ₽</span>
            )}
            <span className="text-xs text-steel-400 font-ibm">/ {product.unit}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 flex items-center justify-center gap-1.5 bg-amber-DEFAULT hover:bg-amber-500 disabled:bg-steel-600 disabled:cursor-not-allowed text-steel-900 disabled:text-steel-400 font-oswald text-xs font-semibold uppercase tracking-wide py-2 transition-colors"
            >
              <Icon name="ShoppingCart" size={14} />
              {isOutOfStock ? 'Нет' : 'В корзину'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="w-9 h-9 border border-steel-600 hover:border-amber-DEFAULT flex items-center justify-center text-steel-400 hover:text-amber-DEFAULT transition-colors"
            >
              <Icon name="Heart" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
