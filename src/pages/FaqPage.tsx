import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface FaqPageProps {
  onNavigate: (page: string) => void;
}

const faqs = [
  { q: 'Как оформить заказ?', a: 'Выберите нужные товары в каталоге, добавьте в корзину и нажмите «Оформить заказ». Заполните форму с контактными данными. Мы перезвоним для подтверждения в течение 30 минут.' },
  { q: 'Какой минимальный заказ?', a: 'Минимальной суммы заказа нет. Однако стоимость доставки фиксированная, поэтому при крупных заказах она более выгодна. При заказе от 50 000 ₽ доставка по Москве бесплатна.' },
  { q: 'Можно ли вернуть товар?', a: 'Да, в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и надлежащем состоянии. Для возврата свяжитесь с нами по телефону.' },
  { q: 'Работаете ли с юридическими лицами?', a: 'Да, мы работаем с ИП и ООО. Предоставляем полный пакет документов: счёт, накладную, счёт-фактуру. Для постоянных клиентов — специальные условия.' },
  { q: 'Есть ли скидки при оптовых закупках?', a: 'При заказе от 100 000 ₽ — скидка 3%, от 300 000 ₽ — 5%, от 500 000 ₽ — 7%. Для строительных компаний с постоянными закупками — индивидуальные условия.' },
  { q: 'Как отследить заказ?', a: 'После отправки заказа вам придёт SMS с трек-номером. Также статус заказа доступен в личном кабинете на сайте.' },
  { q: 'Есть ли самовывоз?', a: 'Да, самовывоз бесплатный. Адрес: г. Москва, ул. Строителей, д. 14. График: Пн-Пт 8:00–19:00, Сб 9:00–17:00.' },
  { q: 'Как быстро доставляют?', a: 'По Москве — в течение 1 рабочего дня. По Московской области — 1–2 дня. По России — от 3 до 7 дней в зависимости от региона.' },
];

export default function FaqPage({ onNavigate }: FaqPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">FAQ</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-amber-DEFAULT" />
            <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Помощь</span>
          </div>
          <h1 className="font-oswald text-4xl font-bold uppercase">Частые вопросы</h1>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="steel-texture border border-steel-600 hover:border-steel-500 transition-colors overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-oswald text-base font-medium uppercase tracking-wide pr-4">{faq.q}</span>
                <Icon
                  name={openIndex === i ? 'ChevronUp' : 'ChevronDown'}
                  size={18}
                  className={`flex-shrink-0 transition-colors ${openIndex === i ? 'text-amber-DEFAULT' : 'text-steel-400'}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 pt-0 font-ibm text-sm text-steel-300 leading-relaxed border-t border-steel-700 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 steel-texture border border-amber-DEFAULT/30 p-6 text-center">
          <Icon name="HelpCircle" size={32} className="text-amber-DEFAULT mx-auto mb-3" />
          <h3 className="font-oswald text-lg font-bold uppercase mb-2">Не нашли ответ?</h3>
          <p className="text-steel-300 font-ibm text-sm mb-4">Свяжитесь с нами удобным способом — поможем!</p>
          <button onClick={() => onNavigate('contact')} className="bg-amber-DEFAULT hover:bg-amber-500 text-steel-900 font-oswald font-semibold uppercase tracking-wide px-8 py-3 transition-colors">
            Написать нам
          </button>
        </div>
      </div>
    </div>
  );
}
