'use client';

/* oxlint-disable next/no-img-element -- relative public paths keep the static export portable across GitHub Pages and Tilda */

import {
  ArrowDown,
  Clock3,
  Gift,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type Service = {
  name: string;
  description: string;
  details?: string[];
  prices: { time: string; value: string }[];
  note?: string;
};

type ServiceGroup = {
  id: string;
  title: string;
  intro: string;
  services: Service[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: 'massage',
    title: 'Массажи',
    intro: 'Полноценные сеансы на 60–120 минут: от традиционной тайской техники до массажа камнями и имбирного слим-ритуала.',
    services: [
      {
        name: 'Традиционный тайский',
        description: 'Йога-массаж в тайской пижаме для расслабления уставшего тела. Выполняется без масла.',
        prices: [{ time: '1 час', value: '4 400 ₽' }, { time: '1,5 часа', value: '5 900 ₽' }, { time: '2 часа', value: '7 400 ₽' }],
      },
      {
        name: 'Балийский релакс',
        description: 'Расслабляющий массаж с ароматными маслами или кремами. Аромат можно подобрать перед началом сеанса.',
        prices: [{ time: '1 час', value: '4 600 ₽' }, { time: '1,5 часа', value: '6 100 ₽' }, { time: '2 часа', value: '7 600 ₽' }],
        note: 'Горячее масло — дополнительно 50 ₽.',
      },
      {
        name: 'Заросли Пачули',
        description: 'Массаж тела с горячими травяными мешочками.',
        prices: [{ time: '1 час', value: '4 700 ₽' }, { time: '1,5 часа', value: '6 200 ₽' }],
      },
      {
        name: 'Изумрудная гора',
        description: 'Массаж горячими камнями для глубокого прогревания и расслабления.',
        prices: [{ time: '1 час', value: '4 700 ₽' }, { time: '1,5 часа', value: '6 200 ₽' }, { time: '2 часа', value: '7 700 ₽' }],
      },
      {
        name: 'Лимфодренажный массаж',
        description: 'Массаж с имбирным маслом. На исходном сайте процедура описана как направленная на выведение лишней жидкости и уменьшение отёков.',
        prices: [{ time: '1 час', value: '4 700 ₽' }, { time: '1,5 часа', value: '6 200 ₽' }],
      },
      {
        name: 'Имбирный слим',
        description: 'Интенсивный массаж с разогревающим имбирным маслом.',
        prices: [{ time: '1 час', value: '4 800 ₽' }, { time: '1,5 часа', value: '6 300 ₽' }],
      },
    ],
  },
  {
    id: 'mono',
    title: 'Моно-массажи',
    intro: 'Локальная работа с выбранной зоной. Каждый вариант длится 40 минут и стоит 3 300 ₽.',
    services: [
      { name: 'Третий глаз', description: 'Массаж головы, висков и лица по энергетическим точкам.', prices: [{ time: '40 минут', value: '3 300 ₽' }] },
      { name: 'Королевская осанка', description: 'Массаж спины с тайским бальзамом.', prices: [{ time: '40 минут', value: '3 300 ₽' }] },
      { name: 'Папайя', description: 'Массаж ягодиц и тазобедренной области.', prices: [{ time: '40 минут', value: '3 300 ₽' }] },
      { name: 'Линия жизни', description: 'Массаж рук по меридианам.', prices: [{ time: '40 минут', value: '3 300 ₽' }] },
      { name: 'Тук-тук', description: 'Массаж ног по энергетическим точкам на ступнях с деревянными палочками и кремом.', prices: [{ time: '40 минут', value: '3 300 ₽' }] },
    ],
  },
  {
    id: 'mix',
    title: 'Коктейль-микс',
    intro: 'Комбинации нескольких азиатских техник в одном сеансе.',
    services: [
      { name: 'Май Тай', description: 'Микс тайского йога-массажа и массажа ног деревянными палочками с кремом.', prices: [{ time: '1,5 часа', value: '5 900 ₽' }, { time: '2 часа', value: '7 400 ₽' }] },
      { name: 'Бали Шприц', description: 'Микс балийского релакс-массажа с маслами и массажа ног деревянными палочками с кремом.', prices: [{ time: '1,5 часа', value: '6 100 ₽' }, { time: '2 часа', value: '7 600 ₽' }] },
      { name: 'Азиатская эйфория', description: 'Сочетание традиционного тайского массажа и релакс-массажа с маслом.', prices: [{ time: '2 часа', value: '7 600 ₽' }] },
      { name: 'Тропикана', description: 'Релакс-массаж с маслами в сочетании с горячими травяными мешочками.', prices: [{ time: '1,5 часа', value: '6 200 ₽' }, { time: '2 часа', value: '7 700 ₽' }] },
    ],
  },
  {
    id: 'spa',
    title: 'SPA-программы',
    intro: 'Многоэтапные ритуалы с парением, уходом за кожей и массажем.',
    services: [
      { name: 'Кедровая фитобочка', description: 'Короткий самостоятельный ритуал парения в кедровой фитобочке.', prices: [{ time: '25 минут', value: '1 600 ₽' }] },
      { name: 'Пина Колада', description: 'Программа для расслабления и обновления кожи.', details: ['Фитобочка или тайская травяная парная', 'Скрабирование всего тела', 'Релакс-массаж с маслами'], prices: [{ time: '1,5 часа', value: '7 300 ₽' }] },
      { name: 'Каменный цветок', description: 'Тёплый ритуал с парением, уходом за телом и массажем камнями.', details: ['Фитобочка или тайская травяная парная', 'Скрабирование всего тела', 'Массаж горячими камнями'], prices: [{ time: '2 часа', value: '8 900 ₽' }] },
      { name: 'Сияние молодости', description: 'Комплексный SPA-уход за лицом и головой.', details: ['Умывание лица и лёгкий скраб', 'Массаж лица с кремом', 'Питательная маска и увлажняющий тоник', 'Массаж головы'], prices: [{ time: '1 час', value: '5 300 ₽' }] },
      { name: 'Джунгли', description: 'Полный ритуал с парением, уходом за кожей лица и тела и завершающим массажем.', details: ['Фитобочка или тайская травяная парная', 'Скрабирование всего тела', 'Обёртывание', 'SPA-уход за лицом', 'Релакс-массаж с маслами'], prices: [{ time: '2 часа', value: '9 300 ₽' }] },
      { name: 'Золотой слон', description: 'Расширенная SPA-программа для неспешного глубокого отдыха.', details: ['Фитобочка или тайская травяная парная', 'Скрабирование всего тела', 'Обёртывание', 'SPA-уход за лицом', 'Релакс-массаж с маслами'], prices: [{ time: '2,5 часа', value: '10 900 ₽' }] },
      { name: 'Супер Мамочка', description: 'SPA-программа с отдельным ритуалом для зоны живота.', details: ['Фитобочка или тайская травяная парная', 'Массаж зоны живота горячими травяными мешочками со специальным ритуалом', 'Релакс-массаж с маслами'], prices: [{ time: '1,5 часа', value: '6 300 ₽' }, { time: '2 часа', value: '7 700 ₽' }] },
      { name: 'Бангкок забрал его', description: 'SPA-программа для мужчин.', details: ['Фитобочка или тайская травяная парная', 'Скрабирование всего тела', 'Релакс-массаж с маслами или кремами на выбор'], prices: [{ time: '2 часа', value: '8 800 ₽' }] },
      { name: 'Сиамская кошка', description: 'Многоэтапная программа с уходом и имбирным слим-массажем.', details: ['Фитобочка или тайская травяная парная', 'Скрабирование всего тела', 'Обёртывание — рекомендуем водорослевое', 'SPA-уход за лицом', 'Слим-массаж с имбирным маслом'], prices: [{ time: '2 часа', value: '9 500 ₽' }] },
    ],
  },
  {
    id: 'couples',
    title: 'SPA для двоих',
    intro: 'Совместные программы для пары — все этапы проходят в одном общем ритме.',
    services: [
      { name: 'В гармонии', description: 'Фитобочка и «Азиатская эйфория» — сочетание традиционного тайского и балийского релакс-массажа.', prices: [{ time: '2,5 часа', value: '15 000 ₽' }] },
      { name: 'Тарзан и Орхидея', description: 'Совместный SPA-ритуал с уходом за телом.', details: ['Фитобочка', 'Скрабирование всего тела', 'Релакс-массаж с маслами'], prices: [{ time: '2,5 часа', value: '17 200 ₽' }] },
      { name: 'Океан любви', description: 'Самая насыщенная программа для двоих с уходом за лицом и телом.', details: ['Фитобочка', 'Скрабирование всего тела', 'Обёртывание', 'SPA-уход за лицом', 'Релакс-массаж с маслами'], prices: [{ time: '3 часа', value: '21 200 ₽' }] },
    ],
  },
  {
    id: 'oksana',
    title: 'Массаж лица и тела',
    intro: 'Авторская методика Оксаны — программы для лица и тела от мастера с медицинским образованием.',
    services: [
      { name: 'Архитектура лица', description: 'Авторская программа с детальной работой с лицом, шеей и зоной декольте.', details: ['Массаж шейно-воротниковой зоны', 'Проработка области первого позвонка', 'Массаж зоны декольте', 'Детальная проработка лица', 'Лёгкий массаж ног до колена'], prices: [{ time: '1 час', value: '4 600 ₽' }, { time: '1,5 часа', value: '6 100 ₽' }, { time: '2 часа', value: '7 600 ₽' }] },
      { name: 'Счастье для тела', description: 'Расслабляющий массаж всего тела и лица.', prices: [{ time: '1 час', value: '4 600 ₽' }, { time: '1,5 часа', value: '6 100 ₽' }, { time: '2 часа', value: '7 600 ₽' }] },
    ],
  },
];

const featured = [
  { goal: 'Хочу расслабиться', name: 'Балийский релакс', text: 'Мягкий масляный массаж, когда хочется снять напряжение и спокойно перезагрузиться.', time: '60–120 минут', price: 'от 4 600 ₽', href: '#category-massage' },
  { goal: 'Нужна глубокая проработка', name: 'Традиционный тайский', text: 'Йога-массаж в тайской пижаме для уставшего тела. Выполняется без масла.', time: '60–120 минут', price: 'от 4 400 ₽', href: '#category-massage' },
  { goal: 'Хочу отдохнуть вдвоём', name: 'SPA для двоих', text: 'Совместный ритуал с фитобочкой, массажем и уходом за телом в одном ритме.', time: '2,5–3 часа', price: 'от 15 000 ₽', href: '#category-couples' },
];

const masters = [
  { name: 'Эка', origin: 'Премиум-мастер с Бали', image: './images/master-1.png', text: 'Бережно чувствует темперамент гостя, подбирает технику и силу воздействия. Особенно уверенно выполняет комплексные SPA-программы.' },
  { name: 'Нан', origin: 'Премиум-мастер из Таиланда', image: './images/master-2.png', text: 'Мастер с 30-летним стажем и сильной, глубокой техникой для тех, кто любит выразительную проработку тела.' },
  { name: 'Аю', origin: 'Премиум-мастер с Бали', image: './images/master-3.png', text: 'Сочетает хваткую и мягкую манеру массажа, создавая глубокое расслабление и ощущение перезагрузки.' },
  { name: 'Оксана', origin: 'Мастер с медицинским образованием', image: './images/master-4.jpg', text: 'Практикует расслабляющий массаж тела с маслами и миксом техник, архитектурный и подтягивающий массаж лица.' },
];

const passes = [
  { amount: '20 000 ₽', discount: '10%', example: '4 140 ₽', regular: '4 600 ₽' },
  { amount: '30 000 ₽', discount: '15%', example: '3 910 ₽', regular: '4 600 ₽' },
  { amount: '50 000 ₽', discount: '20%', example: '3 680 ₽', regular: '4 600 ₽' },
  { amount: '70 000 ₽', discount: '25%', example: '3 450 ₽', regular: '4 600 ₽' },
  { amount: '100 000 ₽', discount: '30%', example: '3 220 ₽', regular: '4 600 ₽' },
];

function serviceWord(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return 'услуга';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'услуги';
  return 'услуг';
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jungle Spa — на главную">
          <img src="./images/logo-mark.svg" alt="" />
          <span>Jungle Spa</span>
        </a>
        <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Основная навигация">
          <a href="#ritual" onClick={closeMenu}>О нас</a>
          <a href="#services" onClick={closeMenu}>Услуги</a>
          <a href="#masters" onClick={closeMenu}>Мастера</a>
          <a href="#passes" onClick={closeMenu}>Абонементы</a>
          <a href="#contacts" onClick={closeMenu}>Контакты</a>
          <a className="nav-book" href="https://wa.me/79154501155" target="_blank" rel="noreferrer">Записаться</a>
        </nav>
        <Button className="menu-button" variant="ghost" size="icon-lg" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src="./images/hero.jpg" alt="Тропические листья после дождя" />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="eyebrow">Массаж и SPA в Королёве</p>
          <h1>Jungle Spa</h1>
          <p className="hero-kicker">Место, где тело выдыхает</p>
          <p className="hero-lead">Тайские, балийские и русские мастера, бережные SPA-ритуалы и спокойное чаепитие после каждого сеанса.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://wa.me/79154501155" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Записаться в WhatsApp</a>
            <a className="button button-quiet" href="#services">Услуги и цены <ArrowDown aria-hidden="true" /></a>
          </div>
          <nav className="hero-shortcuts" aria-label="Быстрая навигация по странице">
            <a href="#ritual">О нас</a>
            <a href="#masters">Мастера</a>
            <a href="#passes">Абонементы</a>
            <a href="#gift">Сертификаты</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="hero-note">
            <span>Азиатские и русские мастера</span><span>ул. Исаева, 7</span><span>от 1 600 ₽</span>
          </div>
        </div>
      </section>

      <section className="intro section shell" id="ritual">
        <div className="intro-heading"><p className="eyebrow dark">Расслабим тело и душу</p><h2>Джунгли посреди города</h2></div>
        <div className="intro-copy">
          <p>Здесь пахнет имбирём и маслами, тихо играет музыка, а каждая процедура складывается в цельный ритуал — от омовения ног или горячих полотенец до имбирного напитка после сеанса.</p>
        </div>
      </section>

      <section className="ritual-grid shell" aria-label="Особенности ритуалов">
        <article className="ritual-card ritual-asian">
          <div className="ritual-photo"><img src="./images/gallery-2.jpg" alt="Массаж рук с маслом" /></div>
          <div className="ritual-copy">
            <p className="eyebrow dark">Азиатские джунгли</p><h3>Тайские и балийские мастера</h3>
            <p>Сеанс начинается с омовения ног и завершается чайной церемонией с имбирным напитком.</p>
          </div>
        </article>
        <article className="ritual-card ritual-city">
          <div className="ritual-photo"><img src="./images/gallery-1.jpg" alt="Чайная церемония после SPA-процедуры" /></div>
          <div className="ritual-copy">
            <p className="eyebrow dark">Городские джунгли</p><h3>Русские мастера</h3>
            <p>Перед массажем — горячие полотенца, после — чай. В работе мастер использует масло или крем.</p>
          </div>
        </article>
      </section>

      <section className="featured section">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow dark">Подберите по настроению</p><h2>Что хочется сейчас?</h2></div><p>Выберите ближайшее состояние — мы сразу покажем подходящий раздел услуг.</p></div>
          <div className="featured-grid">
            {featured.map((service) => (
              <a className="featured-card" href={service.href} key={service.name} aria-label={`${service.goal}: ${service.name}`}>
                <div>
                  <p className="service-time">{service.goal}</p>
                  <h3>{service.name}</h3>
                  <p>{service.text}</p>
                </div>
                <div className="featured-card-footer">
                  <span>{service.time}</span>
                  <strong>{service.price}</strong>
                  <ArrowDown aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog section" id="services">
        <div className="shell">
          <div className="catalog-head"><div><p className="eyebrow dark">Все услуги и цены</p><h2>Найдите свой ритуал</h2></div><p>Нажмите на категорию, чтобы посмотреть состав, длительность и точную стоимость каждой процедуры.</p></div>
          <Accordion className="service-accordion" multiple defaultValue={['massage']}>
            {serviceGroups.map((group) => (
              <AccordionItem key={group.id} value={group.id} className="service-group" id={`category-${group.id}`}>
                <AccordionTrigger className="service-trigger">
                  <span className="service-trigger-copy">
                    <strong>{group.title}</strong>
                    <span>{group.intro}</span>
                  </span>
                  <small><strong>{group.services.length}</strong> {serviceWord(group.services.length)}</small>
                </AccordionTrigger>
                <AccordionContent className="service-panel">
                  <div className="service-list">
                    {group.services.map((service) => (
                      <article className="service-row" key={service.name}>
                        <div className="service-main">
                          <h3>{service.name}</h3><p>{service.description}</p>
                          {service.details && <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                          {service.note && <p className="service-note">{service.note}</p>}
                        </div>
                        <div className="price-list" aria-label={`Цены на ${service.name}`}>
                          <div className="price-list-head"><span>Длительность</span><span>Стоимость</span></div>
                          {service.prices.map((price) => <div className="price" key={`${price.time}-${price.value}`}><span><Clock3 aria-hidden="true" />{price.time}</span><strong>{price.value}</strong></div>)}
                        </div>
                      </article>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="catalog-note">Цены перенесены с прайс-листа действующего сайта. Перед записью администратор подтвердит стоимость выбранной программы.</p>
        </div>
      </section>

      <section className="gift-section" id="gift">
        <img src="./images/ritual.jpg" alt="Подарочные сертификаты Jungle Spa" />
        <div className="gift-overlay" />
        <div className="gift-content shell"><Gift aria-hidden="true" /><p className="eyebrow">Подарочный сертификат</p><h2>Подарите несколько часов тишины</h2><p>Выберите конкретный ритуал или подходящий номинал вместе с администратором. Сертификат можно заказать в WhatsApp.</p><a className="button button-primary" href="https://wa.me/79154501155" target="_blank" rel="noreferrer">Выбрать сертификат</a></div>
      </section>

      <section className="masters section" id="masters">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow dark">Команда Jungle Spa</p><h2>Мастера, которым доверяют</h2></div><p>Сила воздействия и техника подбираются под состояние и пожелания гостя.</p></div>
          <div className="master-grid">
            {masters.map((master) => <article className="master-card" key={master.name}><img src={master.image} alt={`Мастер ${master.name}`} loading="lazy" /><div><p className="master-origin">{master.origin}</p><h3>{master.name}</h3><p>{master.text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="passes section" id="passes">
        <div className="shell pass-layout">
          <div className="pass-copy"><p className="eyebrow">Абонементы</p><h2>Чем чаще приходите, тем выгоднее</h2><p>Балансом абонемента могут пользоваться несколько человек. Скидка применяется к процедурам согласно выбранному номиналу.</p><div className="pass-icons"><span><Users aria-hidden="true" /> Можно делиться</span><span><Sparkles aria-hidden="true" /> Скидка до 30%</span></div></div>
          <div className="pass-table-wrap">
            <table className="pass-table">
              <caption>Скидки по абонементам Jungle Spa</caption>
              <thead><tr><th scope="col">Номинал</th><th scope="col">Скидка</th><th scope="col"><span>Наглядный пример</span><small>«Балийский релакс» · 1 час</small></th></tr></thead>
              <tbody>{passes.map((pass) => <tr key={pass.amount}><td>{pass.amount}</td><td><strong>{pass.discount}</strong></td><td><span className="pass-example"><strong>{pass.example}</strong><del aria-label={`Обычная цена ${pass.regular}`}>{pass.regular}</del></span></td></tr>)}</tbody>
            </table>
            <ul className="pass-terms"><li>20 000 и 30 000 ₽ — срок действия 6 месяцев.</li><li>50 000, 70 000 и 100 000 ₽ — срок действия 1 год.</li><li>Скидка не распространяется на косметику и организацию мероприятий.</li><li>Для программ на двоих действует особое условие — уточните размер скидки у администратора.</li></ul>
          </div>
        </div>
      </section>

      <section className="contacts section" id="contacts">
        <div className="shell contact-layout">
          <div><p className="eyebrow">Контакты</p><h2>Ваши джунгли — в Королёве</h2><p>Напишите администратору, чтобы подобрать программу, мастера и удобное время.</p></div>
          <address className="contact-card">
            <a href="tel:+79154501155"><Phone aria-hidden="true" /><span><small>Позвонить</small>+7 915 450-11-55</span></a>
            <a href="mailto:junglespa@yandex.ru"><Mail aria-hidden="true" /><span><small>Написать на почту</small>junglespa@yandex.ru</span></a>
            <a href="https://yandex.ru/maps/?text=Московская%20область%2C%20Королёв%2C%20улица%20Исаева%2C%207" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><small>Построить маршрут</small>Московская область, Королёв,<br />ул. Исаева, 7, пом. 5</span></a>
          </address>
          <div className="contact-actions"><a className="button button-primary" href="https://wa.me/79154501155" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Записаться в WhatsApp</a><a className="button button-telegram" href="https://t.me/junglespa" target="_blank" rel="noreferrer">Открыть Telegram</a></div>
        </div>
      </section>

      <footer><div className="shell"><a className="brand" href="#top"><img src="./images/logo-mark.svg" alt="" /><span>Jungle Spa</span></a><p>Массаж и SPA в Королёве</p><p>© 2026 Jungle Spa</p></div></footer>
    </main>
  );
}
