import Icon from '@/components/ui/icon';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-steel-900 border-t border-steel-700 mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-DEFAULT flex items-center justify-center">
                <Icon name="Hammer" size={16} className="text-steel-900" />
              </div>
              <div className="font-oswald text-lg font-bold tracking-wider uppercase">
                Строй<span className="text-amber-DEFAULT">Маркет</span>
              </div>
            </div>
            <p className="text-steel-300 text-sm leading-relaxed font-ibm mb-4">
              Профессиональные строительные материалы с 2008 года. Более 10 000 позиций в наличии.
            </p>
            <div className="flex gap-3">
              {(['MessageCircle', 'Send', 'Phone'] as const).map((iconName) => (
                <button key={iconName} className="w-8 h-8 bg-steel-700 hover:bg-amber-DEFAULT group transition-colors flex items-center justify-center">
                  <Icon name={iconName} size={14} className="text-steel-300 group-hover:text-steel-900 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-oswald text-sm font-semibold uppercase tracking-widest text-foreground mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-steel-300 font-ibm">
              {['Цемент и смеси', 'Кирпич и блоки', 'Пиломатериалы', 'Металлопрокат', 'Утеплители', 'Кровля', 'Инструменты'].map(cat => (
                <li key={cat}>
                  <button onClick={() => onNavigate('catalog')} className="hover-amber transition-colors text-left">{cat}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-oswald text-sm font-semibold uppercase tracking-widest text-foreground mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-steel-300 font-ibm">
              {[
                { label: 'О компании', page: 'about' },
                { label: 'Доставка и оплата', page: 'delivery' },
                { label: 'Акции и скидки', page: 'promo' },
                { label: 'Блог', page: 'blog' },
                { label: 'FAQ', page: 'faq' },
                { label: 'Контакты', page: 'contact' },
              ].map(item => (
                <li key={item.page}>
                  <button onClick={() => onNavigate(item.page)} className="hover-amber transition-colors">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-oswald text-sm font-semibold uppercase tracking-widest text-foreground mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-steel-300 font-ibm">
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={14} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                <span>г. Москва, ул. Строителей, д. 14</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={14} className="text-amber-DEFAULT flex-shrink-0" />
                <a href="tel:+74951234567" className="hover-amber transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={14} className="text-amber-DEFAULT flex-shrink-0" />
                <a href="mailto:info@stroymarket.ru" className="hover-amber transition-colors">info@stroymarket.ru</a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Clock" size={14} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                <span>Пн-Пт: 8:00–19:00<br />Сб: 9:00–17:00<br />Вс: Выходной</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-steel-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-steel-500 font-ibm">
          <span>© 2024 СтройМаркет. Все права защищены.</span>
          <div className="flex gap-4">
            <button className="hover-amber transition-colors">Политика конфиденциальности</button>
            <button className="hover-amber transition-colors">Условия использования</button>
          </div>
        </div>
      </div>
    </footer>
  );
}