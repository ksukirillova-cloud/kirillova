import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  LayoutDashboard,
  MessageSquareQuote,
  Send,
  Sparkles,
  Target,
  Workflow,
  Zap,
  AlertCircle,
} from 'lucide-react';

import imgN3           from './assets/n3-cover.png';
import imgScanlight    from './assets/scanlight-cover.png';
import imgMetro        from './assets/metro-cover.png';
import imgPsychologist from './assets/psychologist-cover.png';
import imgWindows      from './assets/windows-cover.png';
import imgMakeup       from './assets/makeup-cover.jpg';

const telegramUrl = 'https://t.me/ksukirillova';

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: 'easeOut' },
};

// ─── ДАННЫЕ ──────────────────────────────────────────────────────────────────

const painCards = [
  'Клиент спрашивает «а где посмотреть?» — вы кидаете 7 сообщений и прайс файлом',
  'Заявки приходят из Telegram, VK, WhatsApp, комментариев — и часть просто теряется',
  'Услуга нормальная, но снаружи непонятно: что вы делаете, сколько стоит и как начать',
  'Контент есть, но он не ведёт к действию: читают, лайкают и молчат',
];

const scenarios = [
  {
    title: 'Эксперт / консультант',
    text: 'Нужно объяснить, чем вы полезны, какие форматы есть, почему вам можно доверять и куда писать.',
  },
  {
    title: 'Бьюти / студия / услуги',
    text: 'Нужна страница с услугами, ценами, примерами, условиями записи и понятной кнопкой заявки.',
  },
  {
    title: 'Локальный бизнес',
    text: 'Нужно собрать услуги, преимущества, контакты и заявки в одну ссылку, которую удобно отправлять клиентам.',
  },
  {
    title: 'Запуск продукта',
    text: 'Нужно быстро проверить оффер, собрать страницу и не строить большую разработку до первых заявок.',
  },
];

const packages = [
  {
    name: 'Маркетинг-разбор',
    price: 'от 3 500 ₽',
    desc: 'Разбираю сайт, оффер, контент или воронку — показываю, где теряется клиент и что можно быстро исправить.',
    tag: 'быстрый старт',
  },
  {
    name: 'Экспресс-точка входа',
    price: 'от 12 900 ₽',
    desc: 'Мини-сайт до 5 экранов: структура, тексты, дизайн, кнопки заявки. Подходит, если срочно нужна нормальная ссылка для клиентов.',
    tag: 'популярный',
    accent: true,
  },
  {
    name: 'Упаковка + сайт',
    price: 'от 15 000 ₽',
    desc: 'Разбираем аудиторию, оффер, структуру, тексты и собираем страницу, которая объясняет ценность и ведёт к заявке.',
    tag: 'для услуг и экспертов',
  },
  {
    name: 'Сайт + заявки + автоматизация',
    price: 'от 25 000 ₽',
    desc: 'Страница + путь заявки: форма, таблица, уведомления, автоответы и понятная логика обработки лидов.',
    tag: 'для порядка в лидах',
  },
];

// images: массив путей. Metro использует 4 слайда кампании.
const cases = [
  {
    title: 'Упаковка B2B IT-платформы здравоохранения',
    label: 'B2B IT · сайт · позиционирование',
    image: imgN3,
    fit: 'contain',
    bg: '#f0f4ff',
    metric: 'сложный продукт → понятная структура',
    problem: 'Сложный продукт с модулями, интеграциями и разными ролями нужно было объяснить корпоративной аудитории быстро и понятно.',
    solution: 'Собирала позиционирование, структуру сайта и продуктовые страницы: HR и ОТ-портал, телемедицина, ИЭМК, BI-аналитика, AI-ассистенты.',
    result: 'Продукт стало проще презентовать: что это, для кого, какие задачи решает и почему стоит запросить демо.',
    tags: ['B2B IT', 'позиционирование', 'лендинги', 'AI'],
  },
  {
    title: 'Структура и подача B2B-каталога',
    label: 'B2B · каталог · сайт',
    image: imgScanlight,
    fit: 'contain',
    bg: '#f0faf8',
    metric: 'каталог → понятный путь к КП',
    problem: 'В B2B-каталоге с большим количеством категорий важно быстро показать ассортимент, услуги и путь к коммерческому предложению.',
    solution: 'Работала с логикой подачи, структурой разделов и упаковкой смыслов, чтобы пользователю было проще сориентироваться и сделать следующий шаг.',
    result: 'Сайт воспринимается не как склад ссылок, а как понятная точка входа в ассортимент, услуги и консультацию.',
    tags: ['B2B', 'каталог', 'структура', 'КП'],
  },
  {
    title: 'Metro Family Day: промо крупного события',
    label: 'event · спецпроект · продвижение',
    image: imgMetro,
    fit: 'contain',
    bg: '#fdf6ee',
    metric: '30 000 посетителей за 2 дня',
    problem: 'Нужно было упаковать и продвинуть городской семейный фестиваль так, чтобы коммуникация работала на посещаемость, узнаваемость и партнёрскую ценность.',
    solution: 'Промо, контент, наружная реклама, спецвыпуск в газете Metro, digital-размещение на Kudago и Peterburg2, партнёрские интеграции.',
    result: 'Фестиваль собрал 30 000 посетителей за 2 дня. Кампания охватила офлайн, digital и медиа — от сити-форматов до 3462 участников в соцсетях.',
    tags: ['event', 'наружная реклама', 'digital', 'газета Metro'],
  },
  {
    title: 'Психолог: личный сайт эксперта',
    label: 'эксперт · доверие · запись',
    image: imgPsychologist,
    fit: 'cover',
    bg: '#f5ede4',
    metric: 'от хаоса в переписке → к понятной странице с записью',
    problem: 'Для психолога важно не давить продажей, а быстро создать ощущение безопасности, доверия и понятного следующего шага.',
    solution: 'Собрала воздушную экспертную страницу с мягкой типографикой, фото на первом экране, направлениями работы, подходом и кнопкой записи.',
    result: 'Человек заходит и за 30 секунд понимает: с чем можно обратиться, как проходит консультация и куда нажать.',
    tags: ['эксперт', 'доверие', 'запись', 'личный бренд'],
  },
  {
    title: 'Пластиковые окна: светлый сайт под заявки',
    label: 'локальный бизнес · услуги · расчёт',
    image: imgWindows,
    fit: 'cover',
    bg: '#eef6ff',
    metric: 'хаос в мессенджерах → единая точка входа с заявками',
    problem: 'В нише окон клиент хочет быстро понять цену, сроки, гарантии и оставить заявку без лишней теории.',
    solution: 'Собрала светлый сайт с ощущением стекла и воздуха: оффер, преимущества, расчёт стоимости, этапы работы и понятные CTA.',
    result: 'Страница работает как точка входа для рекламы: клиент сам оставляет заявку, заявки не теряются, замерщика вызывают через форму.',
    tags: ['окна', 'замер', 'заявки', 'локальный бизнес'],
  },
  {
    title: 'Обучение макияжу: дерзкая страница эксперта',
    label: 'beauty · эксперт · курс',
    image: imgMakeup,
    fit: 'cover',
    bg: '#fdf0f5',
    metric: 'безликая страница → характер + понятная запись',
    problem: 'Эксперт по макияжу с сильным продуктом — но страница не передавала характер и не снимала страх «у меня не получится».',
    solution: 'Собрала дерзкий визуальный первый экран: крупный оффер, beauty-визуал, плашки с выгодами, форматы обучения и CTA на запись.',
    result: 'Страница продаёт не «уроки», а уверенность и быстрый результат. Клиент понимает характер эксперта ещё на первом экране.',
    tags: ['beauty', 'курс', 'визуал', 'запись'],
  },
];

// Оставьте пустым, пока нет реальных отзывов — секция не отрисуется
const testimonials = [
  // {
  //   text: 'Ксения за неделю разобрала мой хаос и собрала страницу, которую не стыдно отправить клиенту. Первая заявка пришла через 3 дня после запуска.',
  //   name: 'Анна М.',
  //   role: 'психолог, Москва',
  // },
  // {
  //   text: 'Наконец-то сайт, который объясняет, что мы делаем. Раньше я тратила 20 минут на каждого нового клиента в переписке — теперь просто кидаю ссылку.',
  //   name: 'Ольга К.',
  //   role: 'владелец студии',
  // },
];

const process = [
  ['01', 'Вы рассказываете, что продаёте, кому и где сейчас теряются клиенты.'],
  ['02', 'Я собираю структуру: что человек должен понять до заявки.'],
  ['03', 'Формулирую оффер, блоки, тексты и понятный следующий шаг.'],
  ['04', 'Собираю сайт, страницу, схему заявки или простую автоматизацию.'],
  ['05', 'Вы получаете рабочую точку входа, которую можно отправлять клиентам.'],
];

// ─── КОМПОНЕНТЫ ──────────────────────────────────────────────────────────────
function CaseVisual({ image, title, fit, bg }) {
  const isCover = fit === 'cover';

  return (
    <div
      className="overflow-hidden rounded-[2rem]"
      style={{ background: bg || '#f0ede8' }}
    >
      <div className="aspect-[16/10]">
        <img
          src={image}
          alt={title}
          className={`h-full w-full ${
            isCover ? 'object-cover object-top' : 'object-contain p-4'
          }`}
        />
      </div>
    </div>
  );
}
// ── Визуальная панель кейса ───────────────────────────────────────────────────
function CasesSlider({ cases }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go((current - 1 + cases.length) % cases.length);
  const next = () => go((current + 1) % cases.length);

  const item = cases[current];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    exit: (d) => ({
      opacity: 0,
      x: d > 0 ? -40 : 40,
      transition: { duration: 0.3, ease: 'easeIn' },
    }),
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2.4rem] bg-white/60 p-3 backdrop-blur md:p-4">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4"
          >
            {/* Верх: название + теги */}
            <div className="rounded-[2rem] border border-black/10 bg-[#F8F5EF] p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-black/38">
                    {item.label}
                  </p>
                  <h3 className="max-w-4xl text-3xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-5xl">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-bold text-black/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Середина: визуал + главный результат */}
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <CaseVisual image={item.image} title={item.title} fit={item.fit} bg={item.bg} />
              </div>

              <div className="flex min-h-[18rem] flex-col justify-between rounded-[2rem] bg-[#C8FF3D] p-7 text-black md:p-9 lg:col-span-5">
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-black/45">
                    Ключевой результат
                  </p>
                  <p className="text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] md:text-5xl">
                    {item.metric}
                  </p>
                </div>

                <p className="mt-8 max-w-md text-base font-bold leading-relaxed text-black/75 md:text-lg">
                  {item.result}
                </p>
              </div>
            </div>

            {/* Низ: было / сделано */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-black/10 bg-white p-6 md:p-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-black/35">
                  Было
                </p>
                <p className="text-lg leading-relaxed text-black/65">
                  {item.problem}
                </p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-6 md:p-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-black/35">
                  Сделано
                </p>
                <p className="text-lg leading-relaxed text-black/65">
                  {item.solution}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Навигация */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white/70 backdrop-blur transition hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <span className="font-mono text-sm font-bold tabular-nums text-black/40">
            {String(current + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white/70 backdrop-blur transition hover:bg-black hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {cases.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all ${
                i === current
                  ? 'h-2.5 w-8 bg-black'
                  : 'h-2.5 w-2.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ───────────────────────────────────────────────────────

export default function KseniMarketingSystemsLanding() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&display=swap');
        html {
          font-family: 'Inter Tight', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

      <main className="min-h-screen overflow-hidden bg-[#F4F0E8] text-[#111111]">

        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen px-5 py-6 md:px-10 lg:px-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-28 -top-28 h-[34rem] w-[34rem] rounded-full bg-[#1B63FF]/20 blur-3xl" />
            <div className="absolute -left-28 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#C8FF3D]/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 h-[20rem] w-[20rem] rounded-full bg-black/10 blur-3xl" />
          </div>

          <header className="relative z-10 flex items-center justify-between border-b border-black/10 pb-5">
            <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">К</span>
              <span>Ксения</span>
            </a>

            <nav className="hidden items-center gap-7 text-sm text-black/55 md:flex">
              <a href="#approach" className="transition hover:text-black">Подход</a>
              <a href="#services" className="transition hover:text-black">Что делаю</a>
              <a href="#cases" className="transition hover:text-black">Кейсы</a>
              <a href="#packages" className="transition hover:text-black">Форматы</a>
              <a href="#process" className="transition hover:text-black">Процесс</a>
            </nav>

            <a
              href={telegramUrl}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1B63FF]"
            >
              Написать
            </a>
          </header>

          <div id="top" className="relative z-10 grid gap-12 py-14 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:py-20">
            <motion.div {...fadeUp}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-sm text-black/65 backdrop-blur">
                <Sparkles className="h-4 w-4 text-[#1B63FF]" />
                сайты · автоматизация · маркетинг
              </div>

              {/*
                БЫЛО: «Собираю эффективный маркетинг» — самоописание, не оффер.
                СТАЛО: говорим про проблему клиента, а не про себя.
              */}
             <h1 className="max-w-6xl text-[2.8rem] font-extrabold leading-[0.96] tracking-[-0.05em] md:text-[4.8rem] lg:text-[6rem]">
  Сайт и автоматизация заявок
</h1>

<div className="mt-6 flex flex-wrap items-center gap-3">
  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-5 py-3 text-sm font-bold text-black/70 backdrop-blur md:text-base">
    <Zap className="h-4 w-4 text-[#1B63FF]" />
    5–7 дней
  </div>

  <div className="inline-flex items-center gap-3 rounded-full bg-[#C8FF3D] px-6 py-3 text-base font-extrabold text-black shadow-[0_14px_40px_rgba(200,255,61,0.28)] md:text-lg">
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">от</span>
    12 900 ₽
  </div>
</div>

<p className="mt-8 max-w-2xl text-xl leading-relaxed text-black/66 md:text-2xl">
  Упаковка, сайт, заявки и автоматизация — чтобы человек сразу понял, что вы предлагаете, доверился и написал. Без хаоса в переписках.
</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={telegramUrl}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1B63FF] px-7 py-4 text-base font-bold text-white shadow-[0_18px_60px_rgba(27,99,255,0.32)] transition hover:-translate-y-0.5"
                >
                  Обсудить задачу
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/45 px-7 py-4 text-base font-bold backdrop-blur transition hover:bg-white"
                >
                  Посмотреть форматы
                </a>
              </div>
            </motion.div>

            {/* Виджет в hero — убрали захардкоженные «2 слота», показываем реальные факты */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.65, delay: 0.12 }}
              animate={{ y: [0, -8, 0], rotate: [-2, -1, -2] }}
              style={{ transformOrigin: 'center center' }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[3rem] bg-black/10 blur-3xl" />
              <div className="relative rounded-[2.7rem] border border-black/10 bg-[#111] p-4 shadow-2xl">
                <div className="rounded-[2rem] bg-[#F8F5EF] p-5 md:p-7">
                  <div className="flex items-center justify-between text-xs font-medium text-black/50">
                    <span>маркетинг-система</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#C8FF3D]" /> live</span>
                  </div>

                  <div className="mt-8 rounded-[1.6rem] bg-white p-5 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-black/45">Новая заявка</p>
                        <p className="text-2xl font-extrabold tracking-[-0.04em]">клиент понял → написал</p>
                      </div>
                      <Send className="h-6 w-6 text-[#1B63FF]" />
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl bg-[#F4F0E8] p-4">
                        <p className="text-sm text-black/45">точка входа</p>
                        <p className="font-bold">мини-сайт / страница услуги</p>
                      </div>
                      <div className="rounded-2xl bg-[#F4F0E8] p-4">
                        <p className="text-sm text-black/45">что внутри</p>
                        <p className="font-bold">оффер, тексты, цены, доверие, CTA</p>
                      </div>
                      <div className="rounded-2xl bg-[#1B63FF] p-4 text-white">
                        <p className="text-sm text-white/70">после клика</p>
                        <p className="font-bold">форма → таблица → уведомление</p>
                      </div>
                    </div>
                  </div>

                  {/* Убрали «2 экспресс-слота сегодня» — статичная FOMO ломает доверие.
                      Вместо этого — реальные факты про работу. */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[1.6rem] bg-[#C8FF3D] p-5">
                      <p className="text-5xl font-extrabold tracking-[-0.06em]">10+</p>
                      <p className="mt-2 text-sm font-bold">лет в маркетинге</p>
                    </div>
                    <div className="rounded-[1.6rem] bg-black p-5 text-white">
                      <p className="text-5xl font-extrabold tracking-[-0.06em]">0</p>
                      <p className="mt-2 text-sm font-bold text-white/70">заявок «потерялось в личке»</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── БОЛИ ──────────────────────────────────────────────────────────── */}
        <section className="px-5 py-20 md:px-10 lg:px-14">
          <motion.div {...fadeUp} className="mx-auto max-w-7xl rounded-[2.5rem] bg-black p-7 text-white md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Когда бизнес есть, а понятной точки входа нет
              </h2>
              <p className="text-lg leading-relaxed text-white/68 md:text-xl">
                Можно быть сильным специалистом, делать хороший продукт и всё равно терять людей на простом месте: клиент не понял, что вы предлагаете, где посмотреть, сколько стоит и как записаться. Я помогаю собрать это в систему.
              </p>
            </div>

            {/*
              БЫЛО: CheckCircle2 рядом с болью — визуальный конфликт.
                    «Галочка» = «всё ок», а текст = «у тебя проблема».
              СТАЛО: AlertCircle + нейтральный border. Иконка читается как «внимание», не как «ок».
            */}
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {painCards.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/82">
                  <AlertCircle className="mb-4 h-5 w-5 text-[#C8FF3D]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── ПОДХОД ────────────────────────────────────────────────────────── */}
        <section id="approach" className="px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeUp}>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">позиция</p>
              <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Я не делаю «красиво ради красиво»
              </h2>
            </motion.div>

            <motion.div {...fadeUp} className="rounded-[2.2rem] border border-black/10 bg-white/55 p-7 backdrop-blur md:p-9">
              <p className="text-xl leading-relaxed text-black/70 md:text-2xl">
                Маркетинг — это не набор красивых блоков. Это понятная логика: что продаём, кому, почему человеку должно стать спокойнее, куда он нажимает и что происходит после заявки.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {['понять', 'довериться', 'написать'].map((word) => (
                  <div key={word} className="rounded-2xl bg-black px-4 py-3 text-center text-sm font-bold text-white">
                    {word}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── УСЛУГИ ────────────────────────────────────────────────────────── */}
        <section id="services" className="px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">что я собираю</p>
                <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                  Маркетинг, который не разваливается на куски
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-black/62 md:text-xl lg:justify-self-end">
                Сайт отдельно, контент отдельно, заявки отдельно — так бизнес быстро превращается в хаос. Я собираю это в одну простую систему: оффер, страницу, заявки, тексты, контент и базовую автоматизацию.
              </p>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(13rem,auto)]">
              <motion.div
                {...fadeUp}
                className="group relative overflow-hidden rounded-[2rem] bg-[#1B63FF] p-7 text-white shadow-[0_20px_70px_rgba(27,99,255,0.24)] lg:col-span-7 lg:row-span-2 lg:p-10"
              >
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl transition group-hover:scale-125" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1B63FF]">
                      <LayoutDashboard className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-white/14 px-4 py-2 text-sm font-bold text-white/80">главная точка входа</span>
                  </div>
                  <div className="mt-14">
                    <h3 className="max-w-xl text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-6xl">
                      Сайт / страница
                    </h3>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
                      Место, куда можно вести клиента из сторис, рекламы, переписки или профиля. Там он понимает, что вы предлагаете, кому это подходит, сколько стоит и как сделать следующий шаг.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp} className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:col-span-5">
                <Target className="mb-8 h-7 w-7 text-[#1B63FF]" />
                <h3 className="text-3xl font-extrabold tracking-[-0.045em]">Понятный оффер</h3>
                <p className="mt-4 leading-relaxed text-black/60">
                  Что продаём, кому это нужно и почему человеку должно стать спокойнее именно с вашим решением.
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2rem] bg-[#C8FF3D] p-7 text-black transition hover:-translate-y-1 lg:col-span-5">
                <motion.div
                  className="absolute right-7 top-7 rounded-full bg-black px-3 py-1 text-xs font-bold text-white"
                  animate={{ opacity: [1, 0.45, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  new lead
                </motion.div>
                <Send className="mb-8 h-7 w-7 text-black" />
                <h3 className="text-3xl font-extrabold tracking-[-0.045em]">Заявки без хаоса</h3>
                <p className="mt-4 max-w-md leading-relaxed text-black/62">
                  Кнопки, формы, Telegram, таблица, уведомления — чтобы человек написал, а заявка не потерялась.
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="rounded-[2rem] bg-black p-7 text-white transition hover:-translate-y-1 lg:col-span-4">
                <Bot className="mb-8 h-7 w-7 text-[#C8FF3D]" />
                <h3 className="text-3xl font-extrabold tracking-[-0.045em]">AI и автоматизация</h3>
                <p className="mt-4 leading-relaxed text-white/62">
                  Ответы, тексты, контент, таблицы и простая рутина, которую не нужно каждый раз делать руками.
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="rounded-[2rem] border border-black/10 bg-white/55 p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white lg:col-span-4">
                <Sparkles className="mb-8 h-7 w-7 text-[#1B63FF]" />
                <h3 className="text-3xl font-extrabold tracking-[-0.045em]">Контент и доверие</h3>
                <p className="mt-4 leading-relaxed text-black/60">
                  Что показывать, чтобы человек не просто посмотрел, а понял вашу ценность и захотел обратиться.
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="rounded-[2rem] border border-black/10 bg-[#DFE7FF] p-7 transition hover:-translate-y-1 lg:col-span-4">
                <Workflow className="mb-8 h-7 w-7 text-[#1B63FF]" />
                <h3 className="text-3xl font-extrabold tracking-[-0.045em]">Маркетинг-разбор</h3>
                <p className="mt-4 leading-relaxed text-black/62">
                  Где сейчас теряется клиент: в оффере, странице, контенте, кнопке, переписке или обработке заявки.
                </p>
              </motion.div>
            </div>

            <motion.div {...fadeUp} className="mt-6 rounded-[2rem] border border-black/10 bg-white/60 p-6 backdrop-blur md:p-8">
              <p className="max-w-4xl text-xl font-bold leading-relaxed tracking-[-0.03em] text-black/78 md:text-2xl">
                На выходе — не «ещё один сайт», а собранная маркетинг-система: понятно, куда вести клиента, что он должен увидеть и как не потерять его заявку.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── ДЛЯ КОГО ──────────────────────────────────────────────────────── */}
        <section className="px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#DFE7FF] p-7 md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
              <motion.div {...fadeUp}>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">для кого</p>
                <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                  Для тех, кто продаёт услуги и устал объяснять всё вручную
                </h2>
              </motion.div>
              <div className="grid gap-4">
                {scenarios.map((item) => (
                  <motion.div key={item.title} {...fadeUp} className="rounded-3xl bg-white p-6">
                    <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-black/62">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── КЕЙСЫ ─────────────────────────────────────────────────────────── */}
        <section id="cases" className="px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-8">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">портфолио</p>
                <h2 className="text-5xl font-extrabold leading-[0.96] tracking-[-0.05em] md:text-7xl">
                  Работы
                </h2>
              </div>
              <p className="max-w-sm text-base text-black/50">
                {cases.length} проектов — сайты, упаковка, рекламные кампании
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <CasesSlider cases={cases} />
            </motion.div>
          </div>
        </section>

        {/* ─── ОТЗЫВЫ — показываем только если есть данные ─────────────────── */}
        {testimonials.length > 0 && (
          <section className="px-5 py-20 md:px-10 lg:px-14">
            <div className="mx-auto max-w-7xl">
              <motion.div {...fadeUp} className="mb-12">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">клиенты</p>
                <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                  Что говорят после работы
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((t) => (
                  <motion.div
                    key={t.name}
                    {...fadeUp}
                    className="rounded-[2rem] border border-black/10 bg-white/70 p-7 backdrop-blur md:p-9"
                  >
                    <MessageSquareQuote className="mb-6 h-7 w-7 text-[#1B63FF]" />
                    <p className="text-xl leading-relaxed text-black/80">{t.text}</p>
                    <div className="mt-6 border-t border-black/10 pt-5">
                      <p className="font-bold">{t.name}</p>
                      <p className="text-sm text-black/50">{t.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── ФОРМАТЫ ───────────────────────────────────────────────────────── */}
        <section id="packages" className="px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-4xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">форматы работы</p>
              <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Можно начать с маленького, но понятного шага
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-5 lg:grid-cols-4">
              {packages.map((pack) => (
                <motion.div
                  key={pack.name}
                  {...fadeUp}
                  className={`rounded-[2.2rem] p-7 ${
                    pack.accent ? 'bg-[#1B63FF] text-white shadow-[0_20px_70px_rgba(27,99,255,0.28)]' : 'border border-black/10 bg-white/55'
                  }`}
                >
                  <div className={`mb-10 inline-flex rounded-full px-3 py-1 text-sm font-bold ${pack.accent ? 'bg-white text-[#1B63FF]' : 'bg-[#F4F0E8] text-black/60'}`}>
                    {pack.tag}
                  </div>
                  <h3 className="text-2xl font-extrabold leading-tight tracking-[-0.04em]">{pack.name}</h3>
                  <p className={`mt-4 text-4xl font-extrabold tracking-[-0.055em] ${pack.accent ? 'text-[#C8FF3D]' : 'text-[#1B63FF]'}`}>{pack.price}</p>
                  <p className={`mt-6 leading-relaxed ${pack.accent ? 'text-white/78' : 'text-black/62'}`}>{pack.desc}</p>
                  <a href={telegramUrl} className={`mt-10 inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold ${pack.accent ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    Написать
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ПРОЦЕСС ───────────────────────────────────────────────────────── */}
        <section id="process" className="px-5 py-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div {...fadeUp} className="lg:sticky lg:top-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#1B63FF]">как работаем</p>
              <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Быстро, без хаоса и бесконечных созвонов
              </h2>
            </motion.div>

            <div className="space-y-4">
              {process.map(([num, text]) => (
                <motion.div key={num} {...fadeUp} className="grid grid-cols-[72px_1fr] gap-5 rounded-[2rem] border border-black/10 bg-white/48 p-6 backdrop-blur">
                  <div className="text-3xl font-extrabold tracking-[-0.055em] text-[#1B63FF]">{num}</div>
                  <p className="text-xl font-bold leading-snug tracking-[-0.03em]">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ПОЧЕМУ Я — переписано с самоописания на результат клиента ────── */}
        {/*
          БЫЛО: «10+ лет в маркетинге», «опыт в B2B, IT» — это резюме, не аргумент.
          СТАЛО: что получает клиент, а не какой у меня бэкграунд.
        */}
        <section className="px-5 py-20 md:px-10 lg:px-14">
          <motion.div {...fadeUp} className="mx-auto max-w-7xl rounded-[2.5rem] bg-black p-7 text-white md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#C8FF3D]">почему я</p>
                <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                  Я смотрю на сайт как маркетолог, а не как на витрину
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { icon: BriefcaseBusiness, text: 'Вы не объясняете мне, что такое оффер или воронка — я это знаю и применяю сразу' },
                  { icon: Target, text: 'Я нахожу, где конкретно теряется ваш клиент, и чиню это место — не всё подряд' },
                  { icon: Workflow, text: 'Опыт в B2B, IT, retail, СМИ и digital: понимаю разные аудитории и разные пути заявки' },
                  { icon: Zap, text: 'Работаю быстро и без длинных процессов: бриф → структура → результат' },
                ].map((item) => (
                  <div key={item.text} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80">
                    <item.icon className="mb-5 h-5 w-5 text-[#C8FF3D]" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── FOOTER / CTA ──────────────────────────────────────────────────── */}
        <footer className="px-5 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#1B63FF] p-7 text-white md:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1B63FF]">первый шаг</p>
                <h2 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-7xl">
                  Хотите понять, что нужно именно вам?
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
                  Напишите, что у вас за проект: ниша, услуга, где сейчас принимаете заявки и что хотите улучшить. Я подскажу, с чего лучше начать: сайт, упаковка, автоматизация или разбор.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href={telegramUrl}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#C8FF3D] px-8 py-5 text-lg font-extrabold text-black transition hover:-translate-y-0.5"
                >
                  Написать в Telegram
                  <Zap className="h-5 w-5 transition group-hover:rotate-12" />
                </a>
                {/* Альтернатива для тех, кто не пользуется Telegram */}
                <p className="text-sm text-white/50">
                  Нет Telegram?{' '}
                  <a
                    href="mailto:YOUR_EMAIL@example.com"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Напишите на почту
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}