import Icon from '@/components/ui/icon';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Контакты</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-amber-DEFAULT" />
            <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Связь</span>
          </div>
          <h1 className="font-oswald text-4xl font-bold uppercase">Контакты</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: 'MapPin', title: 'Адрес', lines: ['г. Москва, ул. Строителей, д. 14', 'Рядом с м. Юго-Западная'] },
              { icon: 'Phone', title: 'Телефон', lines: ['+7 (495) 123-45-67', '+7 (800) 100-22-33 (бесплатно)'] },
              { icon: 'Mail', title: 'Email', lines: ['info@stroymarket.ru', 'zakaz@stroymarket.ru'] },
              { icon: 'Clock', title: 'Режим работы', lines: ['Пн-Пт: 8:00 – 19:00', 'Суббота: 9:00 – 17:00', 'Воскресенье: выходной'] },
            ].map((item, i) => (
              <div key={i} className="steel-texture border border-steel-600 p-5 flex items-start gap-4 amber-line">
                <Icon name={item.icon as 'MapPin'} size={22} className="text-amber-DEFAULT mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-oswald text-sm font-semibold uppercase tracking-wide mb-1">{item.title}</div>
                  {item.lines.map((line, j) => (
                    <div key={j} className="text-steel-300 font-ibm text-sm">{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="steel-texture border border-steel-600 p-6">
            <h2 className="font-oswald text-xl font-bold uppercase mb-5">Написать нам</h2>
            <div className="space-y-4">
              {[
                { label: 'Имя', placeholder: 'Ваше имя', type: 'text' },
                { label: 'Телефон', placeholder: '+7 (___) ___-__-__', type: 'tel' },
                { label: 'Email', placeholder: 'your@email.ru', type: 'email' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-steel-400 uppercase tracking-widest font-oswald mb-1.5">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Ваш вопрос или заявка..."
                  className="w-full bg-steel-700 border border-steel-600 px-3 py-2.5 text-sm font-ibm text-foreground placeholder-steel-500 outline-none focus:border-amber-DEFAULT transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide py-3 transition-colors flex items-center justify-center gap-2">
                <Icon name="Send" size={16} /> Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
