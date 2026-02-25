import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { products as initialProducts, orders as initialOrders, Product, Order } from '@/data/products';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

type AdminSection = 'dashboard' | 'products' | 'orders' | 'inventory' | 'promo';

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [products, setProducts] = useState([...initialProducts]);
  const [orders, setOrders] = useState([...initialOrders]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [orderFilter, setOrderFilter] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0);
  const outOfStockItems = products.filter(p => p.stock === 0);
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + o.totalAmount, 0);

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  };

  const updateStock = (id: string, stock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock } : p));
  };

  const statusColors: Record<Order['status'], string> = {
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    confirmed: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    processing: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    shipped: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    delivered: 'text-green-400 bg-green-400/10 border-green-400/30',
    cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
  };

  const statusLabels: Record<Order['status'], string> = {
    pending: 'Ожидает', confirmed: 'Подтверждён', processing: 'В обработке',
    shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён',
  };

  const navItems: { id: AdminSection; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Обзор', icon: 'LayoutDashboard' },
    { id: 'products', label: 'Товары', icon: 'Package' },
    { id: 'orders', label: 'Заказы', icon: 'ClipboardList' },
    { id: 'inventory', label: 'Склад', icon: 'Warehouse' },
    { id: 'promo', label: 'Акции', icon: 'Tag' },
  ];

  return (
    <div className="min-h-screen flex bg-steel-900">
      {/* Sidebar */}
      <aside className="w-56 bg-steel-900 border-r border-steel-700 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-steel-700">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-steel-300 hover:text-amber-DEFAULT transition-colors text-xs font-ibm mb-3">
            <Icon name="ArrowLeft" size={14} /> На сайт
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-DEFAULT flex items-center justify-center">
              <Icon name="Settings" size={14} className="text-steel-900" />
            </div>
            <div>
              <div className="font-oswald text-sm font-bold uppercase text-foreground">Панель</div>
              <div className="text-[10px] text-steel-400 font-ibm">управления</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-ibm transition-colors text-left
                ${section === item.id ? 'bg-amber-DEFAULT/10 text-amber-DEFAULT border-l-2 border-amber-DEFAULT' : 'text-steel-300 hover:text-foreground hover:bg-steel-800'}`}
            >
              <Icon name={item.icon as 'Package'} size={16} />
              {item.label}
              {item.id === 'inventory' && (lowStockItems.length + outOfStockItems.length) > 0 && (
                <span className="ml-auto bg-amber-DEFAULT text-steel-900 text-[10px] font-bold px-1.5 rounded-full">
                  {lowStockItems.length + outOfStockItems.length}
                </span>
              )}
              {item.id === 'orders' && orders.filter(o => o.status === 'pending').length > 0 && (
                <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold px-1.5 rounded-full">
                  {orders.filter(o => o.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6 industrial-bg">

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <h1 className="font-oswald text-3xl font-bold uppercase mb-6">Обзор магазина</h1>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Выручка', value: `${(totalRevenue / 1000).toFixed(0)} тыс. ₽`, icon: 'TrendingUp', color: 'text-green-400', bg: 'bg-green-400/10' },
                { label: 'Заказов всего', value: orders.length, icon: 'ShoppingBag', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { label: 'Мало на складе', value: lowStockItems.length, icon: 'AlertTriangle', color: 'text-amber-DEFAULT', bg: 'bg-amber-DEFAULT/10' },
                { label: 'Нет в наличии', value: outOfStockItems.length, icon: 'XCircle', color: 'text-red-400', bg: 'bg-red-400/10' },
              ].map((s, i) => (
                <div key={i} className="steel-texture border border-steel-600 p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 ${s.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={s.icon as 'TrendingUp'} size={22} className={s.color} />
                  </div>
                  <div>
                    <div className={`font-oswald text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-steel-400 font-ibm uppercase tracking-wide">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warnings */}
            {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
              <div className="steel-texture border border-amber-DEFAULT/30 p-5 mb-6">
                <h3 className="font-oswald text-sm font-semibold uppercase tracking-wide text-amber-DEFAULT mb-3 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} /> Уведомления о запасах
                </h3>
                <div className="space-y-2">
                  {outOfStockItems.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-sm font-ibm">
                      <span className="text-red-400 flex items-center gap-2"><Icon name="XCircle" size={13} />{p.name}</span>
                      <span className="text-red-400 text-xs">Нет в наличии</span>
                    </div>
                  ))}
                  {lowStockItems.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-sm font-ibm">
                      <span className="text-amber-DEFAULT flex items-center gap-2"><Icon name="AlertTriangle" size={13} />{p.name}</span>
                      <span className="text-amber-DEFAULT text-xs">Осталось: {p.stock} {p.unit}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSection('inventory')} className="mt-3 text-xs text-amber-DEFAULT hover:text-amber-500 font-ibm">
                  Перейти к управлению складом →
                </button>
              </div>
            )}

            {/* Recent orders */}
            <div className="steel-texture border border-steel-600 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-oswald text-base font-semibold uppercase">Последние заказы</h3>
                <button onClick={() => setSection('orders')} className="text-xs text-amber-DEFAULT font-ibm">Все заказы →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-ibm">
                  <thead>
                    <tr className="border-b border-steel-700 text-steel-400 text-xs uppercase tracking-wide">
                      <th className="text-left py-2 pr-4">Номер</th>
                      <th className="text-left py-2 pr-4">Клиент</th>
                      <th className="text-left py-2 pr-4">Статус</th>
                      <th className="text-right py-2">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-steel-700">
                    {orders.slice(0, 4).map(o => (
                      <tr key={o.id} className="hover:bg-steel-700/30 transition-colors">
                        <td className="py-3 pr-4 font-semibold text-amber-DEFAULT">#{o.orderNumber}</td>
                        <td className="py-3 pr-4 text-steel-200">{o.userName}</td>
                        <td className="py-3 pr-4">
                          <span className={`text-xs px-2 py-0.5 border font-oswald uppercase ${statusColors[o.status]}`}>{statusLabels[o.status]}</span>
                        </td>
                        <td className="py-3 text-right font-semibold">{o.totalAmount.toLocaleString('ru-RU')} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {section === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-oswald text-3xl font-bold uppercase">Товары <span className="text-steel-500 text-xl">({products.length})</span></h1>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2 bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold text-sm uppercase tracking-wide px-4 py-2 transition-colors"
              >
                <Icon name="Plus" size={16} /> Добавить товар
              </button>
            </div>

            <div className="steel-texture border border-steel-600 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-ibm">
                  <thead>
                    <tr className="border-b border-steel-700 bg-steel-800 text-steel-400 text-xs uppercase tracking-widest">
                      <th className="text-left py-3 px-4">Артикул</th>
                      <th className="text-left py-3 px-4">Название</th>
                      <th className="text-left py-3 px-4">Категория</th>
                      <th className="text-right py-3 px-4">Цена</th>
                      <th className="text-right py-3 px-4">Остаток</th>
                      <th className="text-center py-3 px-4">Акция</th>
                      <th className="text-center py-3 px-4">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-steel-700">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-steel-700/20 transition-colors">
                        <td className="py-3 px-4 text-steel-400 text-xs">{p.sku}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-foreground">{p.name}</div>
                          <div className="text-xs text-steel-500">{p.brand}</div>
                        </td>
                        <td className="py-3 px-4 text-steel-300">{p.subcategory}</td>
                        <td className="py-3 px-4 text-right font-semibold">{p.price.toLocaleString('ru-RU')} ₽ / {p.unit}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-semibold ${p.stock === 0 ? 'text-red-400' : p.stock <= p.lowStockThreshold ? 'text-amber-DEFAULT' : 'text-green-400'}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {p.isSale ? (
                            <span className="text-xs bg-amber-DEFAULT/10 border border-amber-DEFAULT/30 text-amber-DEFAULT px-2 py-0.5 font-oswald">-{p.salePercent}%</span>
                          ) : (
                            <span className="text-steel-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="w-7 h-7 flex items-center justify-center text-steel-400 hover:text-amber-DEFAULT transition-colors border border-steel-600 hover:border-amber-DEFAULT/50"
                            >
                              <Icon name="Pencil" size={12} />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center text-steel-400 hover:text-red-400 transition-colors border border-steel-600 hover:border-red-400/50">
                              <Icon name="Trash2" size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit modal */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="steel-texture border border-steel-600 w-full max-w-lg p-6 animate-scale-in overflow-y-auto max-h-[90vh]">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-oswald text-xl font-bold uppercase">Редактировать товар</h2>
                    <button onClick={() => setEditingProduct(null)}><Icon name="X" size={20} className="text-steel-400 hover:text-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: 'name', label: 'Название' },
                      { key: 'brand', label: 'Бренд' },
                      { key: 'sku', label: 'Артикул' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">{f.label}</label>
                        <input
                          value={editingProduct[f.key as keyof Product] as string}
                          onChange={e => setEditingProduct({ ...editingProduct, [f.key]: e.target.value })}
                          className="w-full bg-steel-700 border border-steel-600 px-3 py-2 text-sm font-ibm text-foreground outline-none focus:border-amber-DEFAULT"
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">Цена (₽)</label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full bg-steel-700 border border-steel-600 px-3 py-2 text-sm font-ibm text-foreground outline-none focus:border-amber-DEFAULT"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">Остаток</label>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                          className="w-full bg-steel-700 border border-steel-600 px-3 py-2 text-sm font-ibm text-foreground outline-none focus:border-amber-DEFAULT"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => setEditingProduct({ ...editingProduct, isSale: !editingProduct.isSale })}
                          className={`w-5 h-5 border cursor-pointer flex items-center justify-center transition-colors ${editingProduct.isSale ? 'bg-amber-DEFAULT border-amber-DEFAULT' : 'border-steel-500'}`}
                        >
                          {editingProduct.isSale && <Icon name="Check" size={12} className="text-steel-900" />}
                        </div>
                        <span className="text-sm font-ibm text-steel-300">Акционный товар</span>
                      </div>
                      {editingProduct.isSale && (
                        <div>
                          <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">Скидка %</label>
                          <input
                            type="number"
                            value={editingProduct.salePercent || 0}
                            onChange={e => setEditingProduct({ ...editingProduct, salePercent: Number(e.target.value) })}
                            className="w-full bg-steel-700 border border-steel-600 px-3 py-2 text-sm font-ibm text-foreground outline-none focus:border-amber-DEFAULT"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">Описание</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        rows={3}
                        className="w-full bg-steel-700 border border-steel-600 px-3 py-2 text-sm font-ibm text-foreground outline-none focus:border-amber-DEFAULT resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
                        setEditingProduct(null);
                      }}
                      className="flex-1 bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide py-2.5 transition-colors"
                    >
                      Сохранить
                    </button>
                    <button onClick={() => setEditingProduct(null)} className="flex-1 border border-steel-600 text-steel-300 hover:border-amber-DEFAULT hover:text-amber-DEFAULT font-oswald uppercase tracking-wide py-2.5 transition-colors">
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}
        {section === 'orders' && (
          <div>
            <h1 className="font-oswald text-3xl font-bold uppercase mb-6">Заказы</h1>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'all', label: 'Все' },
                { id: 'pending', label: 'Ожидают' },
                { id: 'confirmed', label: 'Подтверждены' },
                { id: 'processing', label: 'В обработке' },
                { id: 'shipped', label: 'Отправлены' },
                { id: 'delivered', label: 'Доставлены' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setOrderFilter(f.id)}
                  className={`px-4 py-1.5 text-xs font-oswald uppercase tracking-wide border transition-colors
                    ${orderFilter === f.id ? 'bg-amber-DEFAULT border-amber-DEFAULT text-steel-900' : 'border-steel-600 text-steel-400 hover:border-amber-DEFAULT/50'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="steel-texture border border-steel-600 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-oswald text-lg font-bold text-amber-DEFAULT">#{order.orderNumber}</span>
                        <span className={`text-xs px-2 py-0.5 border font-oswald uppercase ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                        <span className={`text-xs px-2 py-0.5 border font-oswald uppercase ${order.paymentStatus === 'paid' ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-red-400 bg-red-400/10 border-red-400/30'}`}>
                          {order.paymentStatus === 'paid' ? 'Оплачен' : 'Не оплачен'}
                        </span>
                      </div>
                      <div className="text-sm font-ibm text-steel-300">
                        <span className="font-medium text-foreground">{order.userName}</span>
                        <span className="mx-2 text-steel-600">·</span>
                        {order.userPhone}
                        <span className="mx-2 text-steel-600">·</span>
                        {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                      </div>
                      {order.deliveryAddress && (
                        <div className="text-xs text-steel-400 font-ibm mt-1 flex items-center gap-1">
                          <Icon name="MapPin" size={11} className="text-amber-DEFAULT" />
                          {order.deliveryAddress}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-oswald text-2xl font-bold text-foreground">{order.totalAmount.toLocaleString('ru-RU')} ₽</div>
                      <div className="text-xs text-steel-400 font-ibm">{order.items.length} поз.</div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-steel-800/50 border border-steel-700 p-3 mb-4 text-xs font-ibm text-steel-300 space-y-1">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{item.productName} {item.variantName && `(${item.variantName})`} × {item.quantity} {item.unit}</span>
                        <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>

                  {/* Status control */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-steel-400 font-ibm self-center">Изменить статус:</span>
                    {(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map(s => (
                      <button
                        key={s}
                        onClick={() => updateOrderStatus(order.id, s)}
                        disabled={order.status === s}
                        className={`text-xs px-3 py-1 border font-oswald uppercase tracking-wide transition-colors
                          ${order.status === s ? 'opacity-50 cursor-default border-steel-600' : 'border-steel-600 text-steel-400 hover:border-amber-DEFAULT hover:text-amber-DEFAULT'}`}
                      >
                        {statusLabels[s]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {section === 'inventory' && (
          <div>
            <h1 className="font-oswald text-3xl font-bold uppercase mb-6">Управление складом</h1>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="steel-texture border border-steel-600 p-4 flex items-center gap-3">
                <Icon name="Package" size={24} className="text-blue-400" />
                <div>
                  <div className="font-oswald text-2xl font-bold text-blue-400">{products.length}</div>
                  <div className="text-xs text-steel-400 font-ibm uppercase">Всего позиций</div>
                </div>
              </div>
              <div className="steel-texture border border-amber-DEFAULT/30 p-4 flex items-center gap-3">
                <Icon name="AlertTriangle" size={24} className="text-amber-DEFAULT" />
                <div>
                  <div className="font-oswald text-2xl font-bold text-amber-DEFAULT">{lowStockItems.length}</div>
                  <div className="text-xs text-steel-400 font-ibm uppercase">Мало на складе</div>
                </div>
              </div>
              <div className="steel-texture border border-red-600/30 p-4 flex items-center gap-3">
                <Icon name="XCircle" size={24} className="text-red-400" />
                <div>
                  <div className="font-oswald text-2xl font-bold text-red-400">{outOfStockItems.length}</div>
                  <div className="text-xs text-steel-400 font-ibm uppercase">Нет в наличии</div>
                </div>
              </div>
            </div>

            <div className="steel-texture border border-steel-600 overflow-hidden">
              <div className="bg-steel-800 px-4 py-3 border-b border-steel-700">
                <h3 className="font-oswald text-sm font-semibold uppercase tracking-widest">Остатки на складе</h3>
              </div>
              <div className="divide-y divide-steel-700">
                {products.map(p => (
                  <div key={p.id} className="px-4 py-3 flex items-center gap-4">
                    <div className={`w-2 h-10 flex-shrink-0 ${p.stock === 0 ? 'bg-red-500' : p.stock <= p.lowStockThreshold ? 'bg-amber-DEFAULT' : 'bg-green-500'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-oswald text-sm font-semibold text-foreground truncate">{p.name}</div>
                      <div className="text-xs text-steel-400 font-ibm">{p.sku} · {p.brand}</div>
                    </div>
                    <div className="text-xs text-steel-400 font-ibm text-right mr-4 hidden md:block">
                      <div>Мин. остаток: {p.lowStockThreshold}</div>
                      <div>Единица: {p.unit}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStock(p.id, Math.max(0, p.stock - 1))}
                        className="w-7 h-7 flex items-center justify-center border border-steel-600 text-steel-400 hover:text-amber-DEFAULT hover:border-amber-DEFAULT/50 transition-colors"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <input
                        type="number"
                        value={p.stock}
                        onChange={e => updateStock(p.id, Math.max(0, Number(e.target.value)))}
                        className={`w-20 text-center bg-steel-700 border px-2 py-1 text-sm font-oswald font-bold outline-none focus:border-amber-DEFAULT transition-colors
                          ${p.stock === 0 ? 'border-red-500/50 text-red-400' : p.stock <= p.lowStockThreshold ? 'border-amber-DEFAULT/50 text-amber-DEFAULT' : 'border-steel-600 text-green-400'}`}
                      />
                      <button
                        onClick={() => updateStock(p.id, p.stock + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-steel-600 text-steel-400 hover:text-amber-DEFAULT hover:border-amber-DEFAULT/50 transition-colors"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <div className="w-16 text-right">
                      <span className={`text-xs font-ibm ${p.stock === 0 ? 'text-red-400' : p.stock <= p.lowStockThreshold ? 'text-amber-DEFAULT' : 'text-steel-500'}`}>
                        {p.stock === 0 ? 'Нет' : p.stock <= p.lowStockThreshold ? 'Мало' : 'OK'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROMO */}
        {section === 'promo' && (
          <div>
            <h1 className="font-oswald text-3xl font-bold uppercase mb-6">Управление акциями</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="steel-texture border border-steel-600 p-4">
                  <div className="font-oswald text-sm font-semibold mb-1 truncate">{p.name}</div>
                  <div className="text-xs text-steel-400 font-ibm mb-3">{p.price.toLocaleString('ru-RU')} ₽ / {p.unit}</div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      onClick={() => setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, isSale: !pr.isSale } : pr))}
                      className={`w-5 h-5 border cursor-pointer flex items-center justify-center transition-colors ${p.isSale ? 'bg-amber-DEFAULT border-amber-DEFAULT' : 'border-steel-500'}`}
                    >
                      {p.isSale && <Icon name="Check" size={11} className="text-steel-900" />}
                    </div>
                    <span className="text-sm font-ibm text-steel-300">Включить акцию</span>
                  </div>

                  {p.isSale && (
                    <div>
                      <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">Скидка %</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={p.salePercent || 0}
                          onChange={e => setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, salePercent: Number(e.target.value) } : pr))}
                          className="w-20 bg-steel-700 border border-amber-DEFAULT/50 px-3 py-1.5 text-sm font-ibm font-bold text-amber-DEFAULT outline-none"
                        />
                        <span className="text-sm font-ibm text-steel-400">→</span>
                        <span className="font-oswald font-bold text-amber-DEFAULT">
                          {Math.round(p.price * (1 - (p.salePercent || 0) / 100)).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <div
                      onClick={() => setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, isNew: !pr.isNew } : pr))}
                      className={`w-4 h-4 border cursor-pointer flex items-center justify-center transition-colors ${p.isNew ? 'bg-blue-500 border-blue-500' : 'border-steel-500'}`}
                    >
                      {p.isNew && <Icon name="Check" size={9} className="text-white" />}
                    </div>
                    <span className="text-xs font-ibm text-steel-400">Отметить как «Новинка»</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
