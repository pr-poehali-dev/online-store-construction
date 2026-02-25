export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  variants: ProductVariant[];
  stock: number;
  lowStockThreshold: number;
  sku: string;
  brand: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  salePercent?: number;
  weight?: number;
}

export const categories = [
  { id: 'cement', name: 'Цемент и смеси', icon: 'Package', count: 48 },
  { id: 'brick', name: 'Кирпич и блоки', icon: 'Layers', count: 63 },
  { id: 'lumber', name: 'Пиломатериалы', icon: 'TreePine', count: 35 },
  { id: 'metal', name: 'Металлопрокат', icon: 'Wrench', count: 72 },
  { id: 'insulation', name: 'Утеплители', icon: 'Wind', count: 29 },
  { id: 'roofing', name: 'Кровля', icon: 'Home', count: 41 },
  { id: 'tools', name: 'Инструменты', icon: 'Hammer', count: 156 },
  { id: 'plumbing', name: 'Сантехника', icon: 'Droplets', count: 94 },
];

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Цемент М500 Д0',
    category: 'cement',
    subcategory: 'Портландцемент',
    price: 480,
    unit: 'мешок 50кг',
    description: 'Портландцемент М500 Д0 — высокопрочный цемент без добавок. Применяется для производства высококачественных бетонных и железобетонных конструкций.',
    specs: {
      'Марка': 'М500',
      'Добавки': 'Д0 (без добавок)',
      'Масса': '50 кг',
      'Тонкость помола': '≥ 92%',
      'Водопотребность': '26-28%',
      'Срок схватывания нач.': 'не ранее 45 мин',
      'ГОСТ': '31108-2016',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Фасовка', value: '25 кг', priceModifier: -240, stock: 450 },
      { id: 'v2', name: 'Фасовка', value: '50 кг', priceModifier: 0, stock: 820 },
    ],
    stock: 820,
    lowStockThreshold: 50,
    sku: 'CEM-500-D0-50',
    brand: 'ЕвроЦемент',
    tags: ['цемент', 'м500', 'строительство', 'бетон'],
    rating: 4.8,
    reviewCount: 124,
    weight: 50,
  },
  {
    id: 'p002',
    name: 'Кирпич рядовой полнотелый',
    category: 'brick',
    subcategory: 'Красный кирпич',
    price: 18,
    unit: 'шт',
    description: 'Кирпич керамический одинарный полнотелый рядовой. Используется для кладки несущих стен, фундаментов и подвалов.',
    specs: {
      'Размер': '250×120×65 мм',
      'Марка': 'М150',
      'Морозостойкость': 'F50',
      'Водопоглощение': '≤ 8%',
      'Теплопроводность': '0.81 Вт/(м·°C)',
      'ГОСТ': '530-2012',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Цвет', value: 'Красный', priceModifier: 0, stock: 15000 },
      { id: 'v2', name: 'Цвет', value: 'Темно-красный', priceModifier: 1, stock: 8000 },
      { id: 'v3', name: 'Цвет', value: 'Персиковый', priceModifier: 2, stock: 3200 },
    ],
    stock: 15000,
    lowStockThreshold: 1000,
    sku: 'BRK-FULL-M150',
    brand: 'КирпичЗавод №1',
    tags: ['кирпич', 'полнотелый', 'стены', 'фундамент'],
    rating: 4.6,
    reviewCount: 89,
    isNew: false,
    weight: 3.3,
  },
  {
    id: 'p003',
    name: 'Доска обрезная 50×150×6000',
    category: 'lumber',
    subcategory: 'Обрезная доска',
    price: 320,
    unit: 'пог.м',
    description: 'Доска обрезная хвойных пород (сосна/ель). Камерная сушка, влажность 12-16%. Применяется в строительстве, производстве мебели и опалубки.',
    specs: {
      'Сечение': '50×150 мм',
      'Длина': '6000 мм',
      'Порода': 'Сосна/Ель',
      'Влажность': '12-16%',
      'Сорт': '2-й',
      'ГОСТ': '8486-86',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Сорт', value: '1-й сорт', priceModifier: 80, stock: 200 },
      { id: 'v2', name: 'Сорт', value: '2-й сорт', priceModifier: 0, stock: 650 },
      { id: 'v3', name: 'Сорт', value: '3-й сорт', priceModifier: -60, stock: 400 },
    ],
    stock: 650,
    lowStockThreshold: 50,
    sku: 'LUM-50-150-6000',
    brand: 'СибЛес',
    tags: ['доска', 'пиломатериал', 'опалубка', 'сосна'],
    rating: 4.7,
    reviewCount: 56,
    isSale: true,
    salePercent: 15,
    weight: 18,
  },
  {
    id: 'p004',
    name: 'Арматура А500С 12мм',
    category: 'metal',
    subcategory: 'Арматура',
    price: 85,
    unit: 'пог.м',
    description: 'Арматурный прокат класса А500С диаметром 12 мм. Горячекатаная ребристая арматура для армирования железобетонных конструкций.',
    specs: {
      'Диаметр': '12 мм',
      'Класс': 'А500С',
      'Длина стержня': '11,7 м',
      'Предел текучести': '≥ 500 МПа',
      'ГОСТ': '52544-2006',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Диаметр', value: '8 мм', priceModifier: -30, stock: 2000 },
      { id: 'v2', name: 'Диаметр', value: '10 мм', priceModifier: -10, stock: 1500 },
      { id: 'v3', name: 'Диаметр', value: '12 мм', priceModifier: 0, stock: 1200 },
      { id: 'v4', name: 'Диаметр', value: '16 мм', priceModifier: 40, stock: 800 },
    ],
    stock: 1200,
    lowStockThreshold: 100,
    sku: 'MTL-ARM-A500-12',
    brand: 'СеверСталь',
    tags: ['арматура', 'металл', 'железобетон', 'армирование'],
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    weight: 0.888,
  },
  {
    id: 'p005',
    name: 'Минвата ROCKWOOL Лайт Баттс',
    category: 'insulation',
    subcategory: 'Минеральная вата',
    price: 2840,
    unit: 'упаковка',
    description: 'Плиты из каменной ваты для теплоизоляции стен, полов и перекрытий. Негорючий материал, высокая звукоизоляция.',
    specs: {
      'Размер плиты': '600×800 мм',
      'Толщина': '100 мм',
      'Кол-во в упаковке': '5 плит (2,4 м²)',
      'Теплопроводность': '0.036 Вт/(м·°C)',
      'Группа горючести': 'НГ',
      'Плотность': '37 кг/м³',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Толщина', value: '50 мм', priceModifier: -1200, stock: 180 },
      { id: 'v2', name: 'Толщина', value: '100 мм', priceModifier: 0, stock: 95 },
      { id: 'v3', name: 'Толщина', value: '150 мм', priceModifier: 1400, stock: 60 },
    ],
    stock: 95,
    lowStockThreshold: 20,
    sku: 'INS-RW-LIGHT-100',
    brand: 'ROCKWOOL',
    tags: ['утеплитель', 'минвата', 'теплоизоляция', 'rockwool'],
    rating: 4.7,
    reviewCount: 78,
    isNew: true,
    weight: 12,
  },
  {
    id: 'p006',
    name: 'Профнастил С20 оцинкованный',
    category: 'roofing',
    subcategory: 'Профнастил',
    price: 580,
    unit: 'м²',
    description: 'Профлист оцинкованный с полимерным покрытием. Применяется для устройства кровли, ограждений и облицовки фасадов.',
    specs: {
      'Высота волны': '20 мм',
      'Ширина': '1100 мм',
      'Покрытие': 'Полиэстер 25 мкм',
      'Толщина металла': '0.5 мм',
      'Гарантия': '10 лет',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Цвет', value: 'RAL 3005 (Вишня)', priceModifier: 20, stock: 450 },
      { id: 'v2', name: 'Цвет', value: 'RAL 6005 (Зелёный)', priceModifier: 20, stock: 320 },
      { id: 'v3', name: 'Цвет', value: 'RAL 8017 (Коричневый)', priceModifier: 20, stock: 280 },
      { id: 'v4', name: 'Цвет', value: 'Оцинкованный', priceModifier: 0, stock: 600 },
    ],
    stock: 600,
    lowStockThreshold: 50,
    sku: 'ROF-C20-ZINC',
    brand: 'МеталлПрофиль',
    tags: ['профнастил', 'кровля', 'металл', 'ограждение'],
    rating: 4.5,
    reviewCount: 145,
    isSale: true,
    salePercent: 10,
    weight: 5,
  },
  {
    id: 'p007',
    name: 'Перфоратор Bosch GBH 2-26 DRE',
    category: 'tools',
    subcategory: 'Перфораторы',
    price: 14990,
    unit: 'шт',
    description: 'Профессиональный перфоратор с патроном SDS-plus. Три режима работы: сверление, сверление с ударом, долбление.',
    specs: {
      'Мощность': '800 Вт',
      'Частота ударов': '0-4200 уд/мин',
      'Энергия удара': '2.7 Дж',
      'Вес': '2.7 кг',
      'Патрон': 'SDS-plus',
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Комплектация', value: 'Без кейса', priceModifier: 0, stock: 25 },
      { id: 'v2', name: 'Комплектация', value: 'С кейсом', priceModifier: 1500, stock: 12 },
    ],
    stock: 25,
    lowStockThreshold: 5,
    sku: 'TLS-BSH-GBH226',
    brand: 'Bosch',
    tags: ['перфоратор', 'инструмент', 'bosch', 'электроинструмент'],
    rating: 4.9,
    reviewCount: 312,
    weight: 2.7,
  },
  {
    id: 'p008',
    name: 'Клей плиточный UNIS Горизонт',
    category: 'cement',
    subcategory: 'Клеи и смеси',
    price: 290,
    unit: 'мешок 25кг',
    description: 'Цементный клей для укладки керамической плитки и керамогранита на горизонтальные основания.',
    specs: {
      'Класс': 'С1',
      'Расход': '3-5 кг/м²',
      'Открытое время': '20 мин',
      'Морозостойкость': 'Не менее F50',
      'ГОСТ': ''
    },
    images: [],
    variants: [
      { id: 'v1', name: 'Фасовка', value: '5 кг', priceModifier: -240, stock: 200 },
      { id: 'v2', name: 'Фасовка', value: '25 кг', priceModifier: 0, stock: 380 },
    ],
    stock: 380,
    lowStockThreshold: 30,
    sku: 'CEM-UNIS-HOR-25',
    brand: 'UNIS',
    tags: ['плиточный клей', 'плитка', 'unis', 'смесь'],
    rating: 4.6,
    reviewCount: 67,
    isNew: true,
    weight: 25,
  },
];

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  totalAmount: number;
  deliveryAmount: number;
  createdAt: string;
  updatedAt: string;
  comment?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantName?: string;
  quantity: number;
  price: number;
  unit: string;
}

export const orders: Order[] = [
  {
    id: 'o001',
    orderNumber: '2024-001',
    userId: 'u001',
    userName: 'Александр Петров',
    userEmail: 'a.petrov@mail.ru',
    userPhone: '+7 (916) 123-45-67',
    items: [
      { productId: 'p001', productName: 'Цемент М500 Д0', variantName: '50 кг', quantity: 20, price: 480, unit: 'мешок' },
      { productId: 'p007', productName: 'Арматура А500С 12мм', variantName: '12 мм', quantity: 100, price: 85, unit: 'пог.м' },
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryType: 'delivery',
    deliveryAddress: 'г. Москва, ул. Строителей, д. 14',
    totalAmount: 18100,
    deliveryAmount: 1500,
    createdAt: '2024-03-10T10:30:00',
    updatedAt: '2024-03-13T14:20:00',
    trackingNumber: 'MSK-2024-001-TRK',
  },
  {
    id: 'o002',
    orderNumber: '2024-002',
    userId: 'u002',
    userName: 'ООО СтройГрупп',
    userEmail: 'info@stroigroup.ru',
    userPhone: '+7 (495) 987-65-43',
    items: [
      { productId: 'p002', productName: 'Кирпич рядовой полнотелый', variantName: 'Красный', quantity: 5000, price: 18, unit: 'шт' },
    ],
    status: 'processing',
    paymentStatus: 'paid',
    deliveryType: 'delivery',
    deliveryAddress: 'Московская обл., г. Одинцово, ул. Советская, 22',
    totalAmount: 92500,
    deliveryAmount: 2500,
    createdAt: '2024-03-12T09:15:00',
    updatedAt: '2024-03-12T11:00:00',
  },
  {
    id: 'o003',
    orderNumber: '2024-003',
    userId: 'u003',
    userName: 'Дмитрий Иванов',
    userEmail: 'd.ivanov@gmail.com',
    userPhone: '+7 (926) 555-11-22',
    items: [
      { productId: 'p005', productName: 'Минвата ROCKWOOL Лайт Баттс', variantName: '100 мм', quantity: 10, price: 2840, unit: 'упак.' },
      { productId: 'p006', productName: 'Профнастил С20', variantName: 'RAL 6005', quantity: 30, price: 600, unit: 'м²' },
    ],
    status: 'confirmed',
    paymentStatus: 'paid',
    deliveryType: 'pickup',
    totalAmount: 46400,
    deliveryAmount: 0,
    createdAt: '2024-03-14T16:40:00',
    updatedAt: '2024-03-14T17:10:00',
  },
  {
    id: 'o004',
    orderNumber: '2024-004',
    userId: 'u004',
    userName: 'Марина Козлова',
    userEmail: 'm.kozlova@yandex.ru',
    userPhone: '+7 (903) 777-88-99',
    items: [
      { productId: 'p008', productName: 'Клей плиточный UNIS Горизонт', variantName: '25 кг', quantity: 5, price: 290, unit: 'мешок' },
      { productId: 'p003', productName: 'Доска обрезная', variantName: '2-й сорт', quantity: 20, price: 320, unit: 'пог.м' },
    ],
    status: 'pending',
    paymentStatus: 'unpaid',
    deliveryType: 'delivery',
    deliveryAddress: 'г. Москва, пр-т Мира, д. 88, кв. 12',
    totalAmount: 7900,
    deliveryAmount: 800,
    createdAt: '2024-03-15T11:20:00',
    updatedAt: '2024-03-15T11:20:00',
  },
];

export const blogPosts = [
  {
    id: 'b001',
    title: 'Как выбрать цемент для фундамента: М400 vs М500',
    excerpt: 'Разбираем ключевые отличия марок цемента и когда каждая из них нужна в строительстве.',
    category: 'Советы',
    author: 'Алексей Громов',
    date: '2024-03-10',
    readTime: '5 мин',
    image: '',
  },
  {
    id: 'b002',
    title: 'Утепление стен изнутри: минвата vs пенополистирол',
    excerpt: 'Сравниваем два самых популярных утеплителя для внутренней отделки. Плюсы, минусы, цены.',
    category: 'Материалы',
    author: 'Сергей Волков',
    date: '2024-03-07',
    readTime: '7 мин',
    image: '',
  },
  {
    id: 'b003',
    title: 'Опыт кирпичной кладки: советы от мастеров',
    excerpt: 'Профессиональные строители делятся секретами качественной кладки кирпича.',
    category: 'Технологии',
    author: 'Иван Кузнецов',
    date: '2024-03-01',
    readTime: '6 мин',
    image: '',
  },
];
