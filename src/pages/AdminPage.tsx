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
    pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    confirmed: 'text-blue-600 bg-blue-50 border-blue-200',
    processing: 'text-purple-600 bg-purple-50 border-purple-200',
    shipped: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    delivered: 'text-green-600 bg-green-50 border-green-200',
    cancelled: 'text-red-500 bg-red-50 border-red-200',
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
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-200">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors text-xs font-golos mb-3">
            <Icon name="ArrowLeft" size={14} /> На сайт
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={14} className="text-white" />
            </div>
            <div>
              <div className="font-montserrat text-sm font-bold uppercase text-foreground">Панель</div>
              <div className="text-[10px] text-slate-400 font-golos">управления</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-golos transition-colors text-left rounded-lg
                ${section === item.id ? 'bg-blue-50 text-blue-500 border-l-2 border-blue-500' : 'text-slate-600 hover:text-foreground hover:bg-slate-50'}`}
            >
              <Icon name={item.icon as 'Package'} size={16} />
              {item.label}
              {item.id === 'inventory' && (lowStockItems.length + outOfStockItems.length) > 0 && (
                <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold px-1.5 rounded-full">
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
      <main className="flex-1 overflow-auto p-6 bg-slate-50">

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <h1 className="font-montserrat text-3xl font-bold uppercase mb-6">Обзор магазина</h1>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Выручка', value: `${(totalRevenue / 1000).toFixed(0)} тыс. ₽`, icon: 'TrendingUp', color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Заказов всего', value: orders.length, icon: 'ShoppingBag', color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Мало на складе', value: lowStockItems.length, icon: 'AlertTriangle', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                { label: 'Нет в наличии', value: outOfStockItems.length, icon: 'XCircle', color: 'text-red-500', bg: 'bg-red-50' },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={s.icon as 'TrendingUp'} size={22} className={s.color} />
                  </div>
                  <div>
                    <div className={`font-montserrat text-2xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-slate-400 font-golos uppercase tracking-wide">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warnings */}
            {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
              <div className="bg-white border border-yellow-200 rounded-xl p-5 mb-6">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-wide text-yellow-600 mb-3 flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} /> Уведомления о запасах
                </h3>
                <div className="space-y-2">
                  {outOfStockItems.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-sm font-golos">
                      <span className="text-red-500 flex items-center gap-2"><Icon name="XCircle" size={13} />{p.name}</span>
                      <span className="text-red-500 text-xs">Нет в наличии</span>
                    </div>
                  ))}
                  {lowStockItems.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-sm font-golos">
                      <span className="text-yellow-600 flex items-center gap-2"><Icon name="AlertTriangle" size={13} />{p.name}</span>
                      <span className="text-yellow-600 text-xs">Осталось: {p.stock} {p.unit}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSection('inventory')} className="mt-3 text-xs text-blue-500 hover:text-blue-600 font-golos">
                  Перейти к управлению складом →
                </button>
              </div>
            )}

            {/* Recent orders */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-montserrat text-base font-semibold uppercase">Последние заказы</h3>
                <button onClick={() => setSection('orders')} className="text-xs text-blue-500 font-golos">Все заказы →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-golos">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide bg-slate-50">
                      <th className="text-left py-2 pr-4">Номер</th>
                      <th className="text-left py-2 pr-4">Клиент</th>
                      <th className="text-left py-2 pr-4">Статус</th>
                      <th className="text-right py-2">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 4).map(o => (
                      <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-4 font-semibold text-blue-500">#{o.orderNumber}</td>
                        <td className="py-3 pr-4 text-slate-600">{o.userName}</td>
                        <td className="py-3 pr-4">
                          <span className={`text-xs px-2 py-0.5 border rounded font-montserrat uppercase ${statusColors[o.status]}`}>{statusLabels[o.status]}</span>
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
              <h1 className="font-montserrat text-3xl font-bold uppercase">Товары <span className="text-slate-400 text-xl">({products.length})</span></h1>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded-lg transition-colors"
              >
                <Icon name="Plus" size={16} /> Добавить товар
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-golos">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                      <th className="text-left py-3 px-4">Артикул</th>
                      <th className="text-left py-3 px-4">Название</th>
                      <th className="text-left py-3 px-4">Категория</th>
                      <th className="text-right py-3 px-4">Цена</th>
                      <th className="text-right py-3 px-4">Остаток</th>
                      <th className="text-center py-3 px-4">Акция</th>
                      <th className="text-center py-3 px-4">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-400 text-xs">{p.sku}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-foreground">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.brand}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{p.subcategory}</td>
                        <td className="py-3 px-4 text-right font-semibold">{p.price.toLocaleString('ru-RU')} ₽ / {p.unit}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock <= p.lowStockThreshold ? 'text-yellow-500' : 'text-green-500'}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {p.isSale ? (
                            <span className="text-xs bg-blue-50 border border-blue-200 text-blue-600 px-2 py-0.5 rounded font-montserrat">-{p.salePercent}%</span>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors border border-slate-200 hover:border-blue-300 rounded"
                            >
                              <Icon name="Pencil" size={12} />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors border border-slate-200 hover:border-red-300 rounded">
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
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 animate-scale-in overflow-y-auto max-h-[90vh]">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-montserrat text-xl font-bold uppercase">Редактировать товар</h2>
                    <button onClick={() => setEditingProduct(null)}><Icon name="X" size={20} className="text-slate-400 hover:text-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: 'name', label: 'Название' },
                      { key: 'brand', label: 'Бренд' },
                      { key: 'sku', label: 'Артикул' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">{f.label}</label>
                        <input
                          value={editingProduct[f.key as keyof Product] as string}
                          onChange={e => setEditingProduct({ ...editingProduct, [f.key]: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">Цена (₽)</label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">Остаток</label>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => setEditingProduct({ ...editingProduct, isSale: !editingProduct.isSale })}
                          className={`w-5 h-5 border rounded cursor-pointer flex items-center justify-center transition-colors ${editingProduct.isSale ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}
                        >
                          {editingProduct.isSale && <Icon name="Check" size={12} className="text-white" />}
                        </div>
                        <span className="text-sm font-golos text-slate-600">Акционный товар</span>
                      </div>
                      {editingProduct.isSale && (
                        <div>
                          <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">Скидка %</label>
                          <input
                            type="number"
                            value={editingProduct.salePercent || 0}
                            onChange={e => setEditingProduct({ ...editingProduct, salePercent: Number(e.target.value) })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground outline-none focus:border-blue-400 transition-colors"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">Описание</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-golos text-foreground outline-none focus:border-blue-400 transition-colors resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
                        setEditingProduct(null);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-montserrat font-semibold uppercase tracking-wide py-2.5 rounded-lg transition-colors"
                    >
                      Сохранить
                    </button>
                    <button onClick={() => setEditingProduct(null)} className="flex-1 border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-500 font-montserrat uppercase tracking-wide py-2.5 rounded-lg transition-colors">
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
            <h1 className="font-montserrat text-3xl font-bold uppercase mb-6">Заказы</h1>

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
                  className={`px-4 py-1.5 text-xs font-montserrat uppercase tracking-wide border rounded-lg transition-colors
                    ${orderFilter === f.id ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-montserrat text-lg font-bold text-blue-500">#{order.orderNumber}</span>
                        <span className={`text-xs px-2 py-0.5 border rounded font-montserrat uppercase ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                        <span className={`text-xs px-2 py-0.5 border rounded font-montserrat uppercase ${order.paymentStatus === 'paid' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-500 bg-red-50 border-red-200'}`}>
                          {order.paymentStatus === 'paid' ? 'Оплачен' : 'Не оплачен'}
                        </span>
                      </div>
                      <div className="text-sm font-golos text-slate-600">
                        <span className="font-medium text-foreground">{order.userName}</span>
                        <span className="mx-2 text-slate-300">·</span>
                        {order.userPhone}
                        <span className="mx-2 text-slate-300">·</span>
                        {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                      </div>
                      {order.deliveryAddress && (
                        <div className="text-xs text-slate-400 font-golos mt-1 flex items-center gap-1">
                          <Icon name="MapPin" size={11} className="text-blue-500" />
                          {order.deliveryAddress}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-montserrat text-2xl font-bold text-foreground">{order.totalAmount.toLocaleString('ru-RU')} ₽</div>
                      <div className="text-xs text-slate-400 font-golos">{order.items.length} поз.</div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4 text-xs font-golos text-slate-600 space-y-1">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{item.productName} {item.variantName && `(${item.variantName})`} × {item.quantity} {item.unit}</span>
                        <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>

                  {/* Status control */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400 font-golos self-center">Изменить статус:</span>
                    {(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map(s => (
                      <button
                        key={s}
                        onClick={() => updateOrderStatus(order.id, s)}
                        disabled={order.status === s}
                        className={`text-xs px-3 py-1 border rounded-lg font-montserrat uppercase tracking-wide transition-colors
                          ${order.status === s ? 'opacity-50 cursor-default border-slate-200 text-slate-400' : 'border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-500'}`}
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
            <h1 className="font-montserrat text-3xl font-bold uppercase mb-6">Управление складом</h1>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                <Icon name="Package" size={24} className="text-blue-500" />
                <div>
                  <div className="font-montserrat text-2xl font-bold text-blue-500">{products.length}</div>
                  <div className="text-xs text-slate-400 font-golos uppercase">Всего позиций</div>
                </div>
              </div>
              <div className="bg-white border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                <Icon name="AlertTriangle" size={24} className="text-yellow-500" />
                <div>
                  <div className="font-montserrat text-2xl font-bold text-yellow-500">{lowStockItems.length}</div>
                  <div className="text-xs text-slate-400 font-golos uppercase">Мало на складе</div>
                </div>
              </div>
              <div className="bg-white border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <Icon name="XCircle" size={24} className="text-red-500" />
                <div>
                  <div className="font-montserrat text-2xl font-bold text-red-500">{outOfStockItems.length}</div>
                  <div className="text-xs text-slate-400 font-golos uppercase">Нет в наличии</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest">Остатки на складе</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {products.map(p => (
                  <div key={p.id} className="px-4 py-3 flex items-center gap-4">
                    <div className={`w-2 h-10 flex-shrink-0 rounded-full ${p.stock === 0 ? 'bg-red-400' : p.stock <= p.lowStockThreshold ? 'bg-yellow-400' : 'bg-green-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-montserrat text-sm font-semibold text-foreground truncate">{p.name}</div>
                      <div className="text-xs text-slate-400 font-golos">{p.sku} · {p.brand}</div>
                    </div>
                    <div className="text-xs text-slate-400 font-golos text-right mr-4 hidden md:block">
                      <div>Мин. остаток: {p.lowStockThreshold}</div>
                      <div>Единица: {p.unit}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStock(p.id, Math.max(0, p.stock - 1))}
                        className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 rounded transition-colors"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <input
                        type="number"
                        value={p.stock}
                        onChange={e => updateStock(p.id, Math.max(0, Number(e.target.value)))}
                        className={`w-20 text-center bg-slate-50 border rounded-lg px-2 py-1 text-sm font-montserrat font-bold outline-none focus:border-blue-400 transition-colors
                          ${p.stock === 0 ? 'border-red-200 text-red-500' : p.stock <= p.lowStockThreshold ? 'border-yellow-200 text-yellow-500' : 'border-slate-200 text-green-500'}`}
                      />
                      <button
                        onClick={() => updateStock(p.id, p.stock + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 rounded transition-colors"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <div className="w-16 text-right">
                      <span className={`text-xs font-golos ${p.stock === 0 ? 'text-red-500' : p.stock <= p.lowStockThreshold ? 'text-yellow-500' : 'text-slate-400'}`}>
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
            <h1 className="font-montserrat text-3xl font-bold uppercase mb-6">Управление акциями</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="font-montserrat text-sm font-semibold mb-1 truncate">{p.name}</div>
                  <div className="text-xs text-slate-400 font-golos mb-3">{p.price.toLocaleString('ru-RU')} ₽ / {p.unit}</div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      onClick={() => setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, isSale: !pr.isSale } : pr))}
                      className={`w-5 h-5 border rounded cursor-pointer flex items-center justify-center transition-colors ${p.isSale ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}
                    >
                      {p.isSale && <Icon name="Check" size={11} className="text-white" />}
                    </div>
                    <span className="text-sm font-golos text-slate-600">Включить акцию</span>
                  </div>

                  {p.isSale && (
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-widest font-montserrat mb-1.5">Скидка %</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={p.salePercent || 0}
                          onChange={e => setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, salePercent: Number(e.target.value) } : pr))}
                          className="w-20 bg-slate-50 border border-blue-300 rounded-lg px-3 py-1.5 text-sm font-golos font-bold text-blue-500 outline-none focus:border-blue-400 transition-colors"
                        />
                        <span className="text-sm font-golos text-slate-400">→</span>
                        <span className="font-montserrat font-bold text-blue-500">
                          {Math.round(p.price * (1 - (p.salePercent || 0) / 100)).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <div
                      onClick={() => setProducts(prev => prev.map(pr => pr.id === p.id ? { ...pr, isNew: !pr.isNew } : pr))}
                      className={`w-4 h-4 border rounded cursor-pointer flex items-center justify-center transition-colors ${p.isNew ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}
                    >
                      {p.isNew && <Icon name="Check" size={9} className="text-white" />}
                    </div>
                    <span className="text-xs font-golos text-slate-400">Отметить как «Новинка»</span>
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
