import { useEffect, useMemo, useState } from 'react';

type Page = 'home' | 'recommend' | 'packages' | 'cart' | 'checkout' | 'dashboard' | 'courses' | 'lesson' | 'studio' | 'portfolio' | 'referrals' | 'support' | 'admin' | 'auth' | 'tools' | 'knowledge' | 'prompts' | 'community' | 'projects';
type IconName = 'spark' | 'arrow' | 'play' | 'check' | 'moon' | 'sun' | 'menu' | 'close' | 'search' | 'bag' | 'user' | 'book' | 'bot' | 'home' | 'bell' | 'bookmark' | 'chart' | 'message' | 'gift' | 'shield' | 'chevron' | 'copy' | 'refresh' | 'calendar' | 'clock' | 'lock' | 'edit';

const packages = [
  { id: 'bronze', name: 'برنزی', price: '۵,۰۰۰,۰۰۰ تومان', tone: 'bronze', description: 'شروع هوشمند و سریع', features: ['ابزارهای عمومی هوش مصنوعی', 'آموزش استفاده از ابزارها'], full: 'ابزارهای عمومی هوش مصنوعی و آموزش استفاده از آن‌ها.' },
  { id: 'silver', name: 'نقره‌ای', price: '۱۰,۰۰۰,۰۰۰ تومان', tone: 'silver', description: 'انتخاب پیشنهادی برای تولیدکنندگان', features: ['تمام امکانات برنزی', 'چت‌بات هوش مصنوعی', 'نورپردازی و فیلم‌برداری', 'تولید محتوا با AI', 'Premiere Pro', 'پرامپت‌نویسی با چت‌بات'], full: 'تمام امکانات برنزی، چت‌بات هوش مصنوعی، آموزش نورپردازی و فیلم‌برداری، تولید محتوا با AI، Premiere Pro و پرامپت‌نویسی با چت‌بات.' },
  { id: 'gold', name: 'طلایی', price: '۱۵,۰۰۰,۰۰۰ تومان', tone: 'gold', description: 'مسیر کامل رشد حرفه‌ای', features: ['تمام امکانات برنزی و نقره‌ای', 'نورپردازی و فیلم‌برداری پیشرفته', 'تولید محتوای تخصصی با هوش مصنوعی', 'Premiere Pro پیشرفته', 'پرامپت‌نویسی و چت‌بات هوش مصنوعی پیشرفته', 'Photoshop', 'After Effects', 'تحلیل پیج و ارائه پیشنهادهای بهبود', 'مشاوره و پشتیبانی'], full: 'تمام امکانات برنزی و نقره‌ای، نورپردازی و فیلم‌برداری پیشرفته، تولید محتوای تخصصی با هوش مصنوعی، Premiere Pro پیشرفته، پرامپت‌نویسی و چت‌بات هوش مصنوعی پیشرفته، Photoshop، After Effects، تحلیل پیج و ارائه پیشنهادهای بهبود، مشاوره و پشتیبانی.' },
] as const;

const courses = [
  { title: 'پرامپت‌نویسی؛ از صفر تا خروجی دقیق', category: 'پرامپت', level: 'برنزی', progress: 72, lessons: 12, color: 'red', icon: '⌁' },
  { title: 'تولید محتوای حرفه‌ای با ابزارهای AI', category: 'هوش مصنوعی', level: 'نقره‌ای', progress: 34, lessons: 18, color: 'blue', icon: '✦' },
  { title: 'فیلم‌برداری و نور برای شبکه‌های اجتماعی', category: 'فیلم‌برداری', level: 'نقره‌ای', progress: 15, lessons: 14, color: 'purple', icon: '◉' },
  { title: 'Premiere Pro؛ تدوین سریع و اصولی', category: 'Premiere', level: 'نقره‌ای', progress: 0, lessons: 21, color: 'orange', icon: '▶' },
  { title: 'موشن گرافیک با After Effects', category: 'After Effects', level: 'طلایی', progress: 0, lessons: 16, color: 'violet', icon: '◇', locked: true },
  { title: 'Photoshop کاربردی برای محتوا', category: 'Photoshop', level: 'طلایی', progress: 0, lessons: 11, color: 'cyan', icon: 'Ps', locked: true },
  { title: 'شروع سریع با پرامپت‌های کاربردی', category: 'رایگان', level: 'دسترسی آزاد', progress: 0, lessons: 4, color: 'blue', icon: 'AI', free: true },
  { title: 'نمونه درس: نور ساده با یک منبع', category: 'رایگان', level: 'نمونه رایگان', progress: 0, lessons: 1, color: 'purple', icon: '01', free: true },
];

const aiTools = [
  { name:'ChatGPT', category:'متن و گفتگو', use:'ایده‌پردازی، ساختاردهی و بازنویسی', price:'اطلاعات قیمت: نیازمند بررسی منبع رسمی', tags:['متن','پرامپت'] },
  { name:'Adobe Firefly', category:'تصویر', use:'ساخت و ویرایش مفهومی تصویر', price:'اطلاعات قیمت: نیازمند بررسی منبع رسمی', tags:['تصویر','طراحی'] },
  { name:'Runway', category:'ویدیو', use:'آزمایش ایده‌های ویدیویی و جلوه‌های مولد', price:'اطلاعات قیمت: نیازمند بررسی منبع رسمی', tags:['ویدیو','حرکت'] },
  { name:'Descript', category:'صدا و تدوین', use:'گردش‌کار مبتنی بر متن برای صدا و ویدیو', price:'اطلاعات قیمت: نیازمند بررسی منبع رسمی', tags:['صدا','تدوین'] },
  { name:'Notion AI', category:'بهره‌وری', use:'خلاصه‌سازی و سازمان‌دهی محتوای کاری', price:'اطلاعات قیمت: نیازمند بررسی منبع رسمی', tags:['برنامه‌ریزی','متن'] },
  { name:'Canva AI', category:'طراحی', use:'ساخت سریع پیش‌نویس‌های گرافیکی', price:'اطلاعات قیمت: نیازمند بررسی منبع رسمی', tags:['طراحی','شبکه اجتماعی'] },
];

const promptCategories = ['همه','ایده‌پردازی','اسکریپت','هوک','کپشن','مقاله','تصویر','ویدیو','شخصیت','تبلیغات','استوری‌بورد','گویندگی','آموزشی','SEO','تدوین','کاور','تقویم','فروشگاه اینترنتی'];
const promptItems = [
  { title:'سناریوی ریلز آموزشی ۳۰ ثانیه‌ای', category:'اسکریپت', desc:'ساخت سناریوی کوتاه با هوک، بدنه و CTA', text:'برای [موضوع] یک سناریوی ۳۰ ثانیه‌ای برای [مخاطب] با لحن [لحن] بنویس. خروجی شامل هوک، سه نما و CTA باشد.', sample:'هوک: اگر فقط ۳۰ ثانیه وقت داری…', tools:'ChatGPT، Claude، Gemini', difficulty:'متوسط', rating:'۴.۸', saves:'۱.۲k', updated:'۱۴۰۴/۰۳/۱۸', tags:['ریلز','آموزشی'], popular:true },
  { title:'تصویر محصول در استودیوی مینیمال', category:'تصویر', desc:'پرامپت ساخت تصویر تبلیغاتی کنترل‌شده', text:'تصویر تبلیغاتی از [محصول] روی پس‌زمینه [رنگ]، نور [نوع نور]، زاویه [زاویه دوربین]، نسبت [ابعاد].', sample:'نور نرم کناری، سایه کنترل‌شده، قاب ۴:۵', tools:'Firefly، Midjourney، DALL·E', difficulty:'پیشرفته', rating:'۴.۶', saves:'۸۴۰', updated:'۱۴۰۴/۰۳/۱۲', tags:['محصول','نور'], popular:true },
  { title:'تقویم محتوای فروشگاه آنلاین', category:'تقویم', desc:'برنامه هفتگی متعادل برای آموزش و فروش', text:'برای فروشگاه [حوزه] با مخاطب [مخاطب] یک تقویم ۷ روزه شامل آموزش، اعتمادسازی، محصول و تعامل بساز.', sample:'شنبه: آموزش مسئله؛ یکشنبه: پشت صحنه…', tools:'ChatGPT، Notion AI', difficulty:'مقدماتی', rating:'۴.۵', saves:'۶۲۵', updated:'۱۴۰۴/۰۳/۰۸', tags:['تقویم','فروش'], popular:false },
  { title:'مقاله ساختاریافته برای جست‌وجو', category:'SEO', desc:'طرح مقاله با نیت جست‌وجوی مشخص', text:'برای کلیدواژه [کلیدواژه] و نیت [نیت جست‌وجو] ساختار مقاله، پرسش‌ها و عنوان‌های جایگزین پیشنهاد بده.', sample:'H1، مقدمه، H2ها و FAQ پیشنهادی', tools:'ChatGPT، Gemini', difficulty:'متوسط', rating:'جدید', saves:'۹۴', updated:'۱۴۰۴/۰۳/۲۱', tags:['مقاله','SEO'], popular:false },
];

const photoUrl = 'https://images.unsplash.com/photo-1735948055457-8d816fb80a87?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1200';

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    spark: <><path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3Z"/><path d="m5 3-.5 2L2.5 5.5l2 .5L5 8l.5-2 2-.5-2-.5L5 3Z"/></>,
    arrow: <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
    play: <path d="m9 7 8 5-8 5V7Z"/>, check: <path d="m5 12 4 4L19 6"/>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>, close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    book: <><path d="M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 3V5Z"/><path d="M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3V5Z"/></>,
    bot: <><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M8 12h.01M16 12h.01M8 16h8"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>, chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M7.5 9C4 9 4 4 7 4c2 0 5 5 5 5M16.5 9C20 9 20 4 17 4c-2 0-5 5-5 5"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
    chevron: <path d="m9 18 6-6-6-6"/>, copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    refresh: <><path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M6.1 9A7 7 0 0 1 18 6l2 6M3.9 12l2 6a7 7 0 0 0 11.9-3"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>, lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    edit: <><path d="M12 20h9"/><path d="m16.5 3.5 4 4L8 20l-5 1 1-5L16.5 3.5Z"/></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, onClick, variant = 'primary', icon, disabled = false, type = 'button' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'dark'; icon?: IconName; disabled?: boolean; type?: 'button' | 'submit' }) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>{children}{icon && <Icon name={icon} size={18}/>}</button>;
}

function Header({ page, go, dark, setDark, lang, setLang, cart, searchOpen, setSearchOpen }: { page: Page; go: (p: Page) => void; dark: boolean; setDark: (v: boolean) => void; lang: string; setLang: (v: string) => void; cart: boolean; searchOpen: boolean; setSearchOpen: (v: boolean) => void }) {
  const [mobile, setMobile] = useState(false);
  const links: [string, Page][] = [['خانه', 'home'], ['دوره‌ها', 'courses'], ['استودیو AI', 'studio'], ['ابزارهای AI', 'tools'], ['بسته‌ها', 'packages']];
  const mobileLinks: [string, Page][] = [...links, ['کتابخانه پرامپت', 'prompts'], ['مقالات و FAQ', 'knowledge'], ['جامعه', 'community']];
  return <>
    <header className="header">
      <div className="container nav">
        <button className="brand" onClick={() => go('home')} aria-label="MO AI Studio">
          <span className="brand-mark"><Icon name="spark" size={22}/></span>
          <span><b>MO AI</b><small>STUDIO</small></span>
        </button>
        <nav className="desktop-nav">{links.map(([label, to]) => <button key={to} className={page === to ? 'active' : ''} onClick={() => go(to)}>{label}</button>)}</nav>
        <div className="nav-actions">
          <button className="icon-btn search-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="جست‌وجو"><Icon name="search"/></button>
          <button className="mini-toggle" onClick={() => setLang(lang === 'FA' ? 'EN' : 'FA')}>{lang}</button>
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="تغییر پوسته"><Icon name={dark ? 'sun' : 'moon'}/></button>
          <button className="icon-btn cart-button" onClick={() => go('cart')} aria-label="سبد خرید"><Icon name="bag"/>{cart && <i/>}</button>
          <Button variant="secondary" onClick={() => go('auth')} icon="user">حساب کاربری</Button>
          <button className="icon-btn mobile-menu" onClick={() => setMobile(!mobile)} aria-label="منو"><Icon name={mobile ? 'close' : 'menu'}/></button>
        </div>
      </div>
      {searchOpen && <div className="search-panel"><div className="container search-box"><Icon name="search"/><input autoFocus placeholder="جست‌وجوی دوره، ابزار یا موضوع..." /><button onClick={() => setSearchOpen(false)}><Icon name="close"/></button></div></div>}
      {mobile && <nav className="mobile-nav">{mobileLinks.map(([label, to]) => <button key={to} onClick={() => {go(to); setMobile(false)}}>{label}<Icon name="chevron"/></button>)}<button onClick={() => {go('auth'); setMobile(false)}}>حساب کاربری<Icon name="user"/></button></nav>}
    </header>
  </>;
}

function PackageCard({ pkg, selected, choose, featured = false }: { pkg: typeof packages[number]; selected?: boolean; choose: () => void; featured?: boolean }) {
  return <article className={`package-card ${pkg.tone} ${featured ? 'featured' : ''} ${selected ? 'selected' : ''}`}>
    {featured && <span className="recommend-tag"><Icon name="spark" size={14}/> پیشنهاد ما</span>}
    <div className="package-top"><span className="package-dot"/><div><h3>{pkg.name}</h3><p>{pkg.description}</p></div></div>
    <div className="price">{pkg.price}</div>
    <ul>{pkg.features.map(item => <li key={item}><span><Icon name="check" size={15}/></span>{item}</li>)}</ul>
    <Button variant={featured ? 'primary' : 'secondary'} onClick={choose}>{selected ? 'انتخاب شده' : 'انتخاب بسته'}</Button>
  </article>;
}

function Home({ go, choose }: { go: (p: Page) => void; choose: (id: string) => void }) {
  return <main>
    <section className="hero">
      <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><Icon name="spark" size={17}/> خانه‌ی خلاقیت هوشمند</div>
          <h1>با هوش مصنوعی، هوشمندانه‌تر <em>محتوا بساز</em> و کسب‌وکارت را رشد بده.</h1>
          <p>از یادگیری ابزارهای AI تا تولید حرفه‌ای ویدیو؛ تمام مهارت‌هایی که برای ساخت محتوای اثرگذار نیاز داری، در یک مسیر منسجم.</p>
          <div className="hero-actions"><Button onClick={() => go('recommend')} icon="arrow">بسته مناسب من کدام است؟</Button><Button variant="ghost" onClick={() => go('courses')} icon="play">مشاهده دوره‌ها</Button></div>
          <div className="trust-row"><span><Icon name="check" size={15}/> آموزش پروژه‌محور</span><span><Icon name="check" size={15}/> ابزارهای کاربردی</span><span><Icon name="check" size={15}/> مسیر روشن یادگیری</span></div>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <div className="studio-card">
            <div className="studio-head"><div><span className="live-dot"/> AI STUDIO</div><span>خروجی شبیه‌سازی‌شده</span></div>
            <div className="prompt-bubble">برای معرفی یک کافه‌ی مینیمال، سه هوک ویدیویی بساز.</div>
            <div className="ai-result"><span className="ai-avatar"><Icon name="spark"/></span><div><small>پیشنهاد MO AI</small><p>«این کافه فقط قهوه سرو نمی‌کند؛ چند دقیقه آرامش برایت می‌سازد...»</p><div className="fake-lines"><i/><i/><i/></div></div></div>
            <div className="studio-tools"><span><Icon name="edit" size={15}/> اسکریپت</span><span><Icon name="message" size={15}/> کپشن</span><span><Icon name="calendar" size={15}/> تقویم</span></div>
          </div>
          <div className="float-card progress-float"><span><Icon name="chart"/></span><div><small>پیشرفت این هفته</small><strong>۳ درس کامل شد</strong></div></div>
          <div className="float-card idea-float"><span><Icon name="spark"/></span><div><small>ایده آماده</small><strong>برای انتشار بعدی</strong></div></div>
        </div>
      </div>
    </section>

    <section className="section benefits"><div className="container">
      <div className="section-heading"><span>چرا MO AI STUDIO؟</span><h2>از ایده تا انتشار، <em>کنار تو هستیم</em></h2><p>ابزار، آموزش و مسیر اجرایی در یک تجربه ساده و فارسی.</p></div>
      <div className="benefit-grid">
        {[['bot','هوش مصنوعی در خدمت خلاقیت','ابزارها را یاد بگیر و برای ساخت ایده، سناریو و کپشن به‌کار ببر.'],['book','یادگیری قدم‌به‌قدم','دوره‌های منظم، تمرین‌های کاربردی و نمایش دقیق پیشرفت.'],['play','مهارت‌های تولید حرفه‌ای','از نور و فیلم‌برداری تا Premiere، After Effects و Photoshop.'],['message','همراهی در مسیر رشد','در بسته طلایی از مشاوره و پشتیبانی تخصصی بهره‌مند شو.']].map(([icon,title,text],i)=><article className="benefit-card" key={title}><b>۰{i+1}</b><span><Icon name={icon as IconName}/></span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </div></section>

    <section className="section course-preview"><div className="container">
      <div className="section-heading row-heading"><div><span>مسیرهای یادگیری</span><h2>مهارت‌هایی برای <em>دنیای واقعی</em></h2></div><Button variant="ghost" onClick={() => go('courses')} icon="arrow">همه دوره‌ها</Button></div>
      <div className="featured-courses">{courses.slice(0,3).map((c,i)=><article className="course-card" key={c.title} onClick={() => go(i===0?'lesson':'courses')}><div className={`course-cover ${c.color}`}><small>{c.level}</small><strong>{c.icon}</strong><span>MO / 0{i+1}</span></div><div className="course-body"><span className="course-category">{c.category}</span><h3>{c.title}</h3><div className="course-meta"><span><Icon name="play" size={15}/>{c.lessons} درس</span><span>سطح کاربردی</span></div></div></article>)}</div>
    </div></section>

    <section className="section packages-section"><div className="container">
      <div className="section-heading"><span>یک انتخاب روشن</span><h2>بسته‌ای برای <em>هر مرحله از رشد</em></h2><p>بدون تخفیف، هزینه اضافه یا پرداخت قسطی؛ قیمت نهایی شفاف است.</p></div>
      <div className="packages-grid">{packages.map((p,i)=><PackageCard pkg={p} featured={i===1} key={p.id} choose={() => choose(p.id)}/>)}</div>
      <div className="compare-link"><button onClick={() => go('packages')}>مقایسه کامل بسته‌ها <Icon name="arrow" size={17}/></button></div>
    </div></section>

    <section className="section portfolio-strip"><div className="container portfolio-grid"><div className="portfolio-image"><img src={photoUrl} alt="فضای کاری خلاق برای تولید محتوا"/><span>نمونه پروژه آموزشی</span></div><div className="portfolio-copy"><span className="overline">کارگاه خلاقیت</span><h2>فقط تماشا نکن؛ <em>بساز و تجربه کن</em></h2><p>هر مهارت با یک خروجی واقعی تمرین می‌شود. نمونه‌کارهای این بخش کاملاً نمایشی‌اند و صرفاً ساختار پروژه‌های آموزشی را نشان می‌دهند.</p><Button variant="secondary" onClick={() => go('portfolio')} icon="arrow">دیدن نمونه‌کارها</Button></div></div></section>

    <section className="final-cta"><div className="container cta-inner"><span className="cta-spark"><Icon name="spark" size={34}/></span><div><small>آماده‌ای شروع کنی؟</small><h2>مسیر محتوای حرفه‌ای از همین‌جا آغاز می‌شود.</h2></div><Button onClick={() => go('recommend')} icon="arrow">پیشنهاد بسته مناسب</Button></div></section>
  </main>;
}

function Packages({ choose, go }: { choose: (id: string) => void; go: (p: Page) => void }) {
  return <main className="page"><div className="container">
    <div className="page-head"><span className="eyebrow"><Icon name="gift"/> انتخاب بسته</span><h1>شفاف مقایسه کن، آگاهانه انتخاب کن.</h1><p>همه قیمت‌ها نهایی و صرفاً برای خرید نمایشی هستند.</p></div>
    <div className="packages-grid">{packages.map((p,i)=><PackageCard pkg={p} featured={i===1} key={p.id} choose={() => choose(p.id)}/>)}</div>
    <div className="comparison"><h2>مقایسه امکانات بسته‌ها</h2><div className="table-wrap"><table><thead><tr><th>امکانات</th>{packages.map(p=><th key={p.id}>{p.name}<small>{p.price}</small></th>)}</tr></thead><tbody>
      {[['ابزارهای عمومی AI',1,1,1],['آموزش استفاده از ابزارها',1,1,1],['چت‌بات و تولید محتوا',0,1,1],['نورپردازی و فیلم‌برداری',0,'استاندارد','پیشرفته'],['تولید محتوا با هوش مصنوعی',0,'استاندارد','تخصصی'],['Premiere Pro',0,'استاندارد','پیشرفته'],['پرامپت‌نویسی و چت‌بات',0,'استاندارد','پیشرفته'],['Photoshop',0,0,1],['After Effects',0,0,1],['تحلیل پیج و پیشنهاد بهبود',0,0,1],['مشاوره و پشتیبانی',0,0,1]].map(row=><tr key={row[0]}><td>{row[0]}</td>{row.slice(1).map((v,i)=><td key={i}>{v === 1 ? <span className="yes"><Icon name="check"/></span> : v === 0 ? <span className="no">—</span> : <small className="level-text">{v}</small>}</td>)}</tr>)}
    </tbody></table></div></div>
    <div className="wizard-callout"><span><Icon name="spark" size={28}/></span><div><h3>برای انتخاب هنوز مطمئن نیستی؟</h3><p>با پاسخ به ده سؤال، مناسب‌ترین بسته را پیدا کن.</p></div><Button onClick={() => go('recommend')} icon="arrow">شروع پیشنهاد هوشمند</Button></div>
  </div></main>;
}

function Recommend({ choose }: { choose: (id: string) => void }) {
  const [step,setStep] = useState(0); const [answers,setAnswers] = useState<string[]>([]);
  const questions = [
    { q:'نوع فعالیت یا کسب‌وکار تو چیست؟', opts:['فریلنسر یا شروع شخصی','فروشگاه یا خدمات کوچک','برند یا تیم حرفه‌ای'] },
    { q:'چه چیزی ارائه می‌کنی؟', opts:['محتوای شخصی و آموزشی','محصول یا خدمات مشخص','چند محصول، خدمت یا کمپین'] },
    { q:'هدف اصلی محتوای تو چیست؟', opts:['یادگیری و شروع حضور آنلاین','فروش و رشد منظم','برندسازی حرفه‌ای و مقیاس‌پذیر'] },
    { q:'بیشتر چه خروجی‌ای نیاز داری؟', opts:['ایده، متن و کپشن','ویدیو، تدوین و پرامپت','خروجی تخصصی، تحلیل و کمپین'] },
    { q:'بودجه مناسب تو کدام بازه است؟', opts:['حدود ۵,۰۰۰,۰۰۰ تومان','حدود ۱۰,۰۰۰,۰۰۰ تومان','تا ۱۵,۰۰۰,۰۰۰ تومان'] },
    { q:'تجربه فعلی تو چقدر است؟', opts:['تازه‌کار','نیمه‌حرفه‌ای','حرفه‌ای و فعال'] },
    { q:'چه سطح کیفیتی انتظار داری؟', opts:['خروجی کاربردی و ساده','کیفیت حرفه‌ای برای انتشار','کنترل پیشرفته و استاندارد برند'] },
    { q:'در کدام پلتفرم منتشر می‌کنی؟', opts:['یک شبکه اجتماعی','اینستاگرام و چند کانال','چند پلتفرم و کمپین حرفه‌ای'] },
    { q:'چند بار محتوا تولید می‌کنی؟', opts:['گاهی یا هفتگی','چند بار در هفته','روزانه و پرتعداد'] },
    { q:'کدام ابزارها برایت مهم‌ترند؟', opts:['ابزارهای عمومی AI','Premiere، فیلم‌برداری و چت‌بات','After Effects، Photoshop و تحلیل پیج'] },
  ];
  const score = answers.reduce((sum,a)=>sum + (questions.flatMap(q=>q.opts).indexOf(a) % 3),0);
  const result = score >= 14 ? packages[2] : score >= 6 ? packages[1] : packages[0];
  const reason = result.id==='gold' ? 'به دلیل نیاز به خروجی تخصصی، ابزارهای حرفه‌ای و تحلیل پیج' : result.id==='silver' ? 'به دلیل تمرکز بر تولید منظم ویدیو، تدوین و چت‌بات' : 'برای شروع هدفمند با ابزارهای عمومی و آموزش پایه';
  if(step>=questions.length) return <main className="page"><div className="narrow result-card"><span className="result-icon"><Icon name="spark" size={38}/></span><small>پیشنهاد شخصی‌سازی‌شده</small><h1>بسته {result.name}</h1><div className="price">{result.price}</div><p><b>{reason}</b><br/>{result.full}</p><Button onClick={()=>choose(result.id)} icon="bag">انتخاب این بسته</Button><button className="text-btn" onClick={()=>{setStep(0);setAnswers([])}}>شروع دوباره</button></div></main>;
  const current = questions[step];
  const selectedAnswer = answers[step];
  const selectAnswer=(opt:string)=>{const next=[...answers];next[step]=opt;setAnswers(next)};
  return <main className="page wizard-page"><div className="narrow">
    <div className="stepper"><span>پیشنهاد بسته</span><b>مرحله {(step+1).toLocaleString('fa-IR')} از {questions.length.toLocaleString('fa-IR')}</b><div><i style={{width:`${((step+1)/questions.length)*100}%`}}/></div></div>
    <div className="question-card"><span className="question-num">{(step+1).toLocaleString('fa-IR')}</span><h1>{current.q}</h1><p>پاسخی را انتخاب کن که به شرایط فعلی تو نزدیک‌تر است.</p><div className="options">{current.opts.map(opt=><button className={selectedAnswer===opt?'selected':''} key={opt} onClick={()=>selectAnswer(opt)}><span>{opt}</span><i>{selectedAnswer===opt&&<Icon name="check" size={12}/>}</i></button>)}</div><div className="wizard-actions"><Button variant="ghost" disabled={step===0} onClick={()=>setStep(step-1)}>مرحله قبل</Button><Button disabled={!selectedAnswer} onClick={()=>setStep(step+1)} icon="arrow">{step===questions.length-1?'دیدن پیشنهاد':'مرحله بعد'}</Button></div></div>
  </div></main>;
}

function Cart({ selected, go, remove }: { selected: typeof packages[number] | null; go: (p: Page)=>void; remove:()=>void }) {
  return <main className="page"><div className="container slim"><div className="page-title-row"><div><span className="overline">سبد خرید نمایشی</span><h1>انتخاب‌های شما</h1></div><span className="secure"><Icon name="shield"/> بدون تراکنش واقعی</span></div>
    {!selected ? <div className="empty"><span><Icon name="bag" size={36}/></span><h2>سبد خرید خالی است</h2><p>یکی از بسته‌ها را انتخاب کن تا اینجا نمایش داده شود.</p><Button onClick={()=>go('packages')}>مشاهده بسته‌ها</Button></div> :
    <div className="cart-layout"><section className="panel"><div className="cart-item"><span className={`package-emblem ${selected.tone}`}><Icon name="spark"/></span><div><small>بسته آموزشی</small><h2>{selected.name}</h2><p>{selected.full}</p></div><div className="cart-price"><strong>{selected.price}</strong><button onClick={remove}>حذف</button></div></div></section><aside className="panel order-summary"><h3>خلاصه سفارش</h3><div><span>قیمت بسته</span><b>{selected.price}</b></div><div><span>تخفیف</span><b>۰ تومان</b></div><div><span>هزینه اضافه</span><b>۰ تومان</b></div><hr/><div className="total"><span>مبلغ نهایی</span><b>{selected.price}</b></div><Button onClick={()=>go('checkout')} icon="arrow">ادامه و تسویه نمایشی</Button><small>هیچ پرداخت واقعی انجام نمی‌شود.</small></aside></div>}
  </div></main>;
}

function Checkout({ selected, go }: { selected: typeof packages[number] | null; go: (p: Page)=>void }) {
  const [status,setStatus]=useState<'form'|'loading'|'success'|'failure'|'pending'>('form'); const [error,setError]=useState('');
  const submit=(e:React.FormEvent<HTMLFormElement>)=>{e.preventDefault();const data=new FormData(e.currentTarget);if(!/^09\d{9}$/.test(String(data.get('phone')))){setError('شماره موبایل را به شکل ۰۹۱۲۳۴۵۶۷۸۹ وارد کنید.');return}setError('');setStatus('loading');setTimeout(()=>setStatus('success'),900)};
  if(!selected) return <Cart selected={null} go={go} remove={()=>{}}/>;
  if(status!=='form' && status!=='loading') return <main className="page"><div className={`payment-state ${status}`}><span><Icon name={status==='success'?'check':status==='failure'?'close':'clock'} size={42}/></span><h1>{status==='success'?'پرداخت نمایشی موفق بود':status==='failure'?'پرداخت نمایشی ناموفق بود':'پرداخت در انتظار بررسی است'}</h1><div className="price">{selected.price}</div><p>{status==='success'?'بسته به حساب نمایشی شما اضافه شد.':status==='failure'?'هیچ مبلغی کسر نشده است. دوباره تلاش کنید.':'این وضعیت صرفاً برای نمایش تجربه کاربری است.'}</p><Button onClick={()=>go(status==='success'?'dashboard':'checkout')}>{status==='success'?'ورود به داشبورد':'بازگشت'}</Button></div></main>;
  return <main className="page"><div className="container checkout"><form className="panel checkout-form" onSubmit={submit}><span className="overline">اطلاعات خریدار</span><h1>تسویه حساب نمایشی</h1><p>برای مشاهده اعتبارسنجی فارسی، اطلاعات نمونه را تکمیل کن.</p><label>نام و نام خانوادگی<input name="name" required placeholder="مثلاً مریم احمدی"/></label><label>شماره موبایل<input name="phone" inputMode="numeric" placeholder="09123456789"/></label>{error&&<div className="form-error">{error}</div>}<label>ایمیل (اختیاری)<input name="email" type="email" placeholder="name@example.com" dir="ltr"/></label><div className="demo-note"><Icon name="shield"/><span><b>درگاه کاملاً نمایشی</b>هیچ اطلاعات یا تراکنشی ثبت نمی‌شود.</span></div><Button type="submit" disabled={status==='loading'}>{status==='loading'?<><span className="spinner"/> در حال پردازش...</>:'پرداخت نمایشی'}</Button><div className="state-test"><span>آزمایش حالت‌ها:</span><button type="button" onClick={()=>setStatus('failure')}>ناموفق</button><button type="button" onClick={()=>setStatus('pending')}>در انتظار</button></div></form><aside className="panel checkout-summary"><span className={`package-emblem ${selected.tone}`}><Icon name="spark" size={28}/></span><h2>بسته {selected.name}</h2><p>{selected.full}</p><hr/><div><span>مبلغ نهایی</span><strong>{selected.price}</strong></div><small>بدون تخفیف، قسط یا هزینه اضافه</small></aside></div></main>;
}

const SideNav = ({page,go}:{page:Page;go:(p:Page)=>void}) => <aside className="side-nav"><div className="profile-mini"><span>م</span><div><b>مریم احمدی</b><small>عضو بسته نقره‌ای</small></div></div>{([['home','dashboard','نمای کلی'],['book','courses','دوره‌های من'],['bot','studio','استودیو AI'],['spark','prompts','کتابخانه پرامپت'],['chart','projects','پروژه‌ها'],['message','community','جامعه'],['gift','referrals','معرفی دوستان'],['shield','admin','دموی مدیریت']] as [IconName,Page,string][]).map(([icon,to,label])=><button className={page===to?'active':''} key={to} onClick={()=>go(to)}><Icon name={icon}/>{label}</button>)}</aside>;

function Dashboard({ go }: { go:(p:Page)=>void }) {
  const [lastTime] = useState(()=>Number(localStorage.getItem('moai:demo-user:lesson-time')||515));
  return <main className="dashboard-shell"><div className="container dash-grid"><SideNav page="dashboard" go={go}/><div className="dash-content">
    <div className="dash-head"><div><small>شنبه، ۲۴ خرداد</small><h1>سلام مریم، آماده‌ای ادامه بدی؟</h1></div><button className="icon-btn"><Icon name="bell"/><i/></button></div>
    <div className="dash-hero"><div><span>بسته فعال: نقره‌ای</span><h2>مسیر تولیدکننده محتوای هوشمند</h2><p>تا تکمیل این مسیر، ۶ درس دیگر باقی مانده است.</p><Button onClick={()=>go('lesson')} icon="play">ادامه یادگیری</Button></div><div className="progress-ring"><b>۴۸٪</b><small>پیشرفت کل</small></div></div>
    <div className="stats-row"><article><span><Icon name="book"/></span><div><b>۸ از ۲۴</b><small>درس تکمیل‌شده</small></div></article><article><span><Icon name="clock"/></span><div><b>۶ ساعت</b><small>زمان یادگیری</small></div></article><article><span><Icon name="bookmark"/></span><div><b>۱۲ مورد</b><small>نشان‌شده‌ها</small></div></article><article><span><Icon name="gift"/></span><div><b>۳ نشان</b><small>دستاوردها</small></div></article></div>
    <div className="continue-card" onClick={()=>go('lesson')}><span className="tiny-cover red"><Icon name="play"/></span><div><small>ادامه تماشا از آخرین موقعیت ذخیره‌شده</small><h3>نقش، هدف و زمینه در یک پرامپت دقیق</h3><div className="bar"><i style={{width:`${Math.min(lastTime/730*100,100)}%`}}/></div></div><b>{Math.floor(lastTime/60).toLocaleString('fa-IR')}:{String(lastTime%60).padStart(2,'0')}</b></div>
    <div className="dash-columns"><section><div className="dash-section-title"><h2>دوره‌های خریداری‌شده</h2><button onClick={()=>go('courses')}>همه دوره‌ها</button></div>{courses.slice(0,3).map(c=><article className="learning-row" key={c.title} onClick={()=>go('lesson')}><span className={`tiny-cover ${c.color}`}>{c.icon}</span><div><h3>{c.title}</h3><div className="bar"><i style={{width:`${c.progress}%`}}/></div><small>{c.progress}٪ کامل شده</small></div><Icon name="chevron"/></article>)}</section>
    <aside><div className="dash-section-title"><h2>دستاوردها</h2></div><div className="achievements"><span><Icon name="spark"/><small>شروع قدرتمند</small></span><span><Icon name="play"/><small>۵ درس پیوسته</small></span><span className="locked"><Icon name="lock"/><small>استاد پرامپت</small></span></div><div className="notification-card"><span><Icon name="bell"/></span><div><b>درس جدید منتشر شد</b><p>ساخت هوک‌های کوتاه با AI</p><small>۲ ساعت پیش</small></div></div></aside></div>
    <div className="dashboard-modules"><section className="panel"><h3>هدف هفتگی و تقویم یادگیری</h3><div className="week-goal"><b>۳ از ۵ درس</b><div className="bar"><i style={{width:'60%'}}/></div></div><p>زنجیره یادگیری: ۴ روز · چالش هفته: تکمیل یک پروژه کوتاه</p></section><section className="panel"><h3>فضای شخصی</h3><div className="tag-cloud"><button onClick={()=>go('projects')}>پروژه‌ها</button><button>یادداشت‌ها</button><button onClick={()=>go('prompts')}>پرامپت‌های ذخیره‌شده</button><button>گواهی‌ها</button><button>نشان‌شده‌ها</button></div></section><section className="panel"><h3>حساب و حریم خصوصی</h3><p>تغییر رمز، ایمیل تأییدشده، نشست‌ها، تاریخچه خرید، خروجی داده و درخواست حذف حساب.</p><Button variant="ghost" icon="shield">تنظیمات حساب</Button></section></div>
  </div></div></main>;
}

function Courses({go}:{go:(p:Page)=>void}) {
  const [filter,setFilter]=useState('همه'); const [search,setSearch]=useState('');
  const visible=courses.filter(c=>(filter==='همه'||c.category===filter)&&c.title.includes(search));
  return <main className="dashboard-shell"><div className="container dash-grid"><SideNav page="courses" go={go}/><div className="dash-content"><div className="dash-head"><div><small>کتابخانه آموزشی</small><h1>دوره‌ها و آموزش‌های رایگان</h1></div></div><div className="free-banner"><span><Icon name="gift"/></span><div><b>بدون خرید شروع کن</b><p>آموزش‌های دارای برچسب «دسترسی آزاد» و نمونه‌درس‌ها برای همه قابل مشاهده‌اند.</p></div></div><div className="course-toolbar"><div><Icon name="search"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="جست‌وجوی دوره..."/></div><span>{visible.length} دوره</span></div><div className="filter-row">{['همه','رایگان','هوش مصنوعی','پرامپت','فیلم‌برداری','Premiere','After Effects','Photoshop'].map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="library-grid">{visible.map(c=><article className={`library-card ${c.locked?'is-locked':''}`} key={c.title} onClick={()=>!c.locked&&go('lesson')}><div className={`course-cover ${c.color}`}><small className={c.free?'free-label':''}>{c.level}</small><strong>{c.locked?<Icon name="lock" size={35}/>:c.icon}</strong></div><div><span className="course-category">{c.category}</span><h3>{c.title}</h3><div className="course-meta"><span>{c.lessons} درس</span><span>{c.free?'رایگان':c.progress ? `${c.progress}٪ پیشرفت`:'شروع نشده'}</span></div>{c.locked?<button>نیازمند بسته طلایی <Icon name="lock" size={14}/></button>:<div className="bar"><i style={{width:`${c.progress}%`}}/></div>}</div></article>)}</div>{!visible.length&&<div className="empty"><h2>دوره‌ای پیدا نشد</h2><p>عبارت یا فیلتر دیگری را امتحان کن.</p></div>}</div></div></main>;
}

function Lesson({go}:{go:(p:Page)=>void}) {
  const [done,setDone]=useState(false); const [note,setNote]=useState('نکته: پرامپت خوب باید نقش، هدف و محدودیت خروجی را روشن کند.');
  const [playing,setPlaying]=useState(false); const [time,setTime]=useState(()=>Number(localStorage.getItem('moai:demo-user:lesson-time')||515));
  useEffect(()=>{localStorage.setItem('moai:demo-user:lesson-time',String(time));localStorage.setItem('moai:demo-user:last-lesson','prompt-role-context')},[time]);
  useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setTime(t=>Math.min(t+1,730)),1000);return()=>window.clearInterval(timer)},[playing]);
  const timeLabel=(value:number)=>`${Math.floor(value/60).toLocaleString('fa-IR')}:${String(value%60).padStart(2,'0')}`;
  return <main className="lesson-page"><div className="lesson-top"><button onClick={()=>go('courses')}><Icon name="arrow"/> بازگشت به دوره‌ها</button><span>پرامپت‌نویسی؛ از صفر تا خروجی دقیق</span><b>۷۲٪ پیشرفت</b></div><div className="mobile-progress"><span>پیشرفت یادگیری</span><div><i style={{width:'72%'}}/></div><b>۷۲٪</b></div><div className="lesson-layout"><aside className="curriculum"><h2>سرفصل دوره</h2><div className="curriculum-progress"><div><i style={{width:'72%'}}/></div><small>۸ از ۱۲ درس</small></div>{['شروع و تعریف پرامپت','شناخت ساختار خروجی','نقش، هدف و زمینه','تکنیک محدودیت‌گذاری','تمرین ساخت کپشن'].map((x,i)=><button className={i===2?'active':i<2?'done':''} key={x}><span>{i<2?<Icon name="check" size={14}/>:i+1}</span><div><b>{x}</b><small>۰۸:۳۵ دقیقه</small></div>{i>2&&<Icon name="lock" size={14}/>}</button>)}</aside><section className="lesson-main"><div className="video-frame"><div><button className="video-play" onClick={()=>setPlaying(!playing)} aria-label={playing?'توقف':'پخش'}><Icon name={playing?'close':'play'} size={30}/></button><p>{playing?'در حال پخش شبیه‌سازی‌شده':'ویدیوی آموزشی نمایشی'}</p><small>موقعیت برای کاربر نمایشی در مرورگر ذخیره می‌شود</small></div><input className="video-scrubber" type="range" min="0" max="730" value={time} onChange={e=>setTime(Number(e.target.value))}/><span className="video-time">{timeLabel(time)} / ۱۲:۱۰</span></div><div className="restore-note"><Icon name="refresh"/><span><b>ادامه از آخرین موقعیت</b> این درس پس از خروج، ورود دوباره یا تازه‌سازی از همین ثانیه ادامه پیدا می‌کند.</span></div><div className="lesson-info"><span className="overline">فصل اول · درس سوم</span><h1>نقش، هدف و زمینه در یک پرامپت دقیق</h1><p>در این درس یاد می‌گیری چطور با تعریف نقش و زمینه، خروجی قابل استفاده‌تری از ابزارهای هوش مصنوعی بگیری.</p><div className="lesson-actions"><Button variant={done?'secondary':'primary'} onClick={()=>setDone(!done)} icon="check">{done?'تکمیل شد':'علامت‌گذاری به‌عنوان کامل'}</Button><Button variant="ghost" icon="bookmark">ذخیره درس</Button></div></div><div className="notes"><div><h3>یادداشت‌های من</h3><span><Icon name="edit"/> قابل ویرایش</span></div><textarea value={note} onChange={e=>setNote(e.target.value)}/><small>یادداشت‌ها فقط در این دموی مرورگر نگه داشته می‌شوند.</small></div><div className="lesson-nav"><button><Icon name="chevron"/> درس قبلی<small>شناخت ساختار خروجی</small></button><button>درس بعدی <Icon name="arrow"/><small>تکنیک محدودیت‌گذاری</small></button></div></section></div></main>;
}

function Studio({go}:{go:(p:Page)=>void}) {
  const [tab,setTab]=useState('generator'); const [kind,setKind]=useState('ایده'); const [prompt,setPrompt]=useState('معرفی یک فروشگاه آنلاین محصولات دست‌ساز'); const [loading,setLoading]=useState(false); const [output,setOutput]=useState('سه زاویه محتوایی پیشنهادی:\n۱. داستانی که پشت هر محصول دست‌ساز پنهان است.\n۲. تفاوت خرید یک اثر منحصربه‌فرد با محصول انبوه.\n۳. از میز کار هنرمند تا خانه‌ی شما؛ مسیر ساخت.');
  const generate=()=>{setLoading(true);setTimeout(()=>{setOutput(`${kind} شبیه‌سازی‌شده برای «${prompt}»:\n۱. با یک سؤال کنجکاوی‌برانگیز شروع کن.\n۲. مسئله واقعی مخاطب را در یک جمله بگو.\n۳. با دعوت به اقدام روشن، گفتگو را ادامه بده.`);setLoading(false)},800)};
  return <main className="dashboard-shell"><div className="container dash-grid"><SideNav page="studio" go={go}/><div className="dash-content"><div className="dash-head"><div><small>فضای خلاقیت نمایشی</small><h1>استودیو هوش مصنوعی</h1></div><span className="sim-label"><i/> خروجی‌ها شبیه‌سازی‌شده‌اند</span></div><div className="studio-tabs"><button className={tab==='generator'?'active':''} onClick={()=>setTab('generator')}><Icon name="spark"/> تولید محتوا</button><button className={tab==='chat'?'active':''} onClick={()=>setTab('chat')}><Icon name="message"/> چت نمایشی</button><button className={tab==='calendar'?'active':''} onClick={()=>setTab('calendar')}><Icon name="calendar"/> تقویم محتوا</button></div>
  {tab==='generator'&&<div className="generator-layout"><section className="panel generator-form"><h2>چه چیزی بسازیم؟</h2><div className="content-kinds">{['ایده','هوک','اسکریپت','کپشن','CTA'].map(x=><button className={kind===x?'active':''} onClick={()=>setKind(x)} key={x}>{x}</button>)}</div><label>موضوع یا توضیح محتوا<textarea value={prompt} onChange={e=>setPrompt(e.target.value)}/></label><label>لحن محتوا<select><option>صمیمی و حرفه‌ای</option><option>آموزشی</option><option>کوتاه و مستقیم</option></select></label><Button onClick={generate} disabled={loading} icon="spark">{loading?'در حال ساخت...':'ساخت خروجی نمایشی'}</Button></section><section className="panel output-card"><div><span>خروجی {kind}</span><small>شبیه‌سازی‌شده</small></div>{loading?<div className="skeleton"><i/><i/><i/><i/></div>:<textarea value={output} onChange={e=>setOutput(e.target.value)}/>}<div className="output-actions"><Button variant="ghost" icon="copy">کپی</Button><Button variant="ghost" onClick={generate} icon="refresh">تولید دوباره</Button><Button variant="ghost" icon="bookmark">ذخیره</Button></div></section></div>}
  {tab==='chat'&&<div className="chat-workspace"><aside className="panel chat-capabilities"><span className="sim-label"><i/> برنامه آینده · بدون اتصال زنده</span><h3>دستیار محتوای هوشمند</h3><p>رابط آماده برای اتصال آینده به سرویس SaaS؛ پاسخ فعلی کاملاً شبیه‌سازی‌شده است.</p>{[['search','کشف ابزار','پیشنهاد ابزار متناسب با کار'],['chart','گردش‌کار هدایت‌شده','حرکت مرحله‌به‌مرحله تا خروجی'],['spark','پیشنهاد زمینه‌ای','توجه به هدف، کانال و مخاطب'],['refresh','اصلاح نتیجه','توضیح دلیل و پیشنهاد نسخه بهتر']].map(([icon,title,text])=><button key={title}><Icon name={icon as IconName}/><span><b>{title}</b><small>{text}</small></span><Icon name="chevron" size={15}/></button>)}</aside><div className="panel chat-demo"><div className="chat-statebar"><span><i/> آماده دریافت پیام</span><small>حافظه گفتگو: فقط همین نشست نمایشی</small></div><div className="chat-messages"><div className="chat-user">برای یک ریلز آموزشی، ساختار ۳۰ ثانیه‌ای پیشنهاد بده.</div><div className="chat-ai"><span><Icon name="bot"/></span><p><b>پاسخ شبیه‌سازی‌شده:</b><br/>۰ تا ۳ ثانیه: هوک تصویری<br/>۳ تا ۲۰ ثانیه: نکته اصلی در سه بخش<br/>۲۰ تا ۳۰ ثانیه: جمع‌بندی و دعوت به ذخیره<br/><button>شروع گردش‌کار ساخت ریلز</button></p></div><div className="suggestion-chips"><button>ابزار مناسب چیست؟</button><button>نسخه رسمی‌تر</button><button>تبدیل به استوری‌بورد</button></div></div><div className="chat-input"><input placeholder="پیام نمایشی خود را بنویسید..."/><Button icon="arrow">ارسال</Button></div><small className="chat-disclaimer">ممکن است خروجی شبیه‌سازی‌شده دقیق نباشد؛ قبل از انتشار بررسی کنید.</small></div></div>}
  {tab==='calendar'&&<div className="calendar-grid">{['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه'].map((d,i)=><article key={d}><div><b>{d}</b><span>{(24+i).toLocaleString('fa-IR')}</span></div><textarea defaultValue={i%2===0?'ریلز آموزشی: ۳ اشتباه رایج':'پشت‌صحنه تولید محتوا'}/><small>قابل ویرایش</small></article>)}</div>}
  </div></div></main>;
}

function Portfolio() {
  return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow"><Icon name="play"/> پروژه‌های تمرینی</span><h1>نمونه‌کارهای داستانی، نه ادعای آماری.</h1><p>این پروژه‌ها و برندها کاملاً ساختگی‌اند و فقط برای نمایش ساختار خروجی دوره‌ها طراحی شده‌اند.</p></div><div className="portfolio-cards">{[['قصه‌ی قهوه آبان','هویت محتوایی و ۱۲ سناریوی ویدیویی','استراتژی محتوا'],['استودیو سفال خاک','تقویم یک‌ماهه و مجموعه هوک‌های روایی','تولید با AI'],['نفس؛ اپلیکیشن تمرکز','ویدیوی معرفی محصول و تدوین ریتمیک','فیلم و تدوین']].map((x,i)=><article key={x[0]}><div className={`folio-art art-${i}`}><span>MO / CASE 0{i+1}</span><strong>{i===0?'آبان':i===1?'خاک':'نفس'}</strong></div><span>{x[2]}</span><h2>{x[0]}</h2><p>{x[1]}</p><button>مشاهده پروژه <Icon name="arrow"/></button></article>)}</div></div></main>;
}

function ToolsDirectory() {
  const [search,setSearch]=useState(''); const [filter,setFilter]=useState('همه'); const [compare,setCompare]=useState<string[]>(['ChatGPT','Adobe Firefly']);
  const categories=['همه',...new Set(aiTools.map(t=>t.category))];
  const visible=aiTools.filter(t=>(filter==='همه'||t.category===filter)&&(t.name.toLowerCase().includes(search.toLowerCase())||t.use.includes(search)));
  const toggleCompare=(name:string)=>setCompare(x=>x.includes(name)?x.filter(n=>n!==name):x.length<3?[...x,name]:[x[1],name]);
  return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow"><Icon name="bot"/> دایرکتوری آموزشی</span><h1>ابزار مناسب را برای هر کار پیدا کن.</h1><p>اطلاعات صرفاً برای آشنایی و طراحی گردش‌کار است؛ قیمت و قابلیت‌های واقعی باید در منبع رسمی هر ابزار بررسی شوند.</p></div><div className="directory-toolbar"><div><Icon name="search"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="جست‌وجوی ابزار یا کاربرد..."/></div><select value={filter} onChange={e=>setFilter(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</select></div><div className="tool-grid">{visible.map(tool=><article className="tool-card" key={tool.name}><div><span>{tool.name.slice(0,2)}</span><small>{tool.category}</small></div><h2>{tool.name}</h2><p>{tool.use}</p><div className="tag-cloud">{tool.tags.map(t=><i key={t}>{t}</i>)}</div><small className="price-placeholder">{tool.price}</small><button className={compare.includes(tool.name)?'selected':''} onClick={()=>toggleCompare(tool.name)}><Icon name={compare.includes(tool.name)?'check':'chart'} size={16}/>{compare.includes(tool.name)?'در مقایسه':'افزودن به مقایسه'}</button></article>)}</div><section className="tool-comparison"><div className="section-heading"><span>مقایسه کنار هم</span><h2>تصمیم‌گیری بر اساس نیاز، نه ادعا</h2><p>امتیازها کیفی، آموزشی و قابل ویرایش‌اند؛ نتیجه قطعی درباره عملکرد واقعی ابزارها نیستند.</p></div><div className="table-wrap"><table><thead><tr><th>معیار</th>{compare.map(n=><th key={n}>{n}</th>)}</tr></thead><tbody>{[['قابلیت‌ها','متناسب با کاربرد انتخابی'],['کیفیت','نیازمند آزمون با ورودی یکسان'],['هزینه','بررسی در منبع رسمی'],['سرعت','وابسته به پروژه و سرویس'],['سهولت استفاده','بر اساس تجربه شخصی'],['کاربرد مناسب','مطابق توضیح کارت ابزار']].map(row=><tr key={row[0]}><td>{row[0]}</td>{compare.map(n=><td key={n}>{row[1]}</td>)}</tr>)}</tbody></table></div></section></div></main>;
}

function KnowledgeHub() {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('همه'); const [open,setOpen]=useState(0);
  const articles=[['پرامپت بهتر با زمینه‌سازی دقیق','پرامپت','۲۱ خرداد ۱۴۰۴'],['روندهای محتوای کوتاه؛ چه چیزی را باید آزمایش کنیم؟','ترند محتوا','۱۸ خرداد ۱۴۰۴'],['چطور گردش‌کار AI را مستند کنیم؟','ابزار و فرایند','۱۲ خرداد ۱۴۰۴'],['راهنمای انتخاب نسبت تصویر برای شبکه‌های اجتماعی','تولید ویدیو','۸ خرداد ۱۴۰۴']];
  const faqs=[['تفاوت بسته‌ها چیست؟','برنزی برای شروع با ابزارهای عمومی، نقره‌ای برای تولید منظم و بسته طلایی برای مهارت‌های پیشرفته، تحلیل پیج و پشتیبانی طراحی شده است.'],['پرداخت چگونه انجام می‌شود؟','در این نمونه هیچ پرداخت واقعی انجام نمی‌شود. قیمت‌ها ثابت‌اند و تخفیف، قسط یا هزینه اضافه وجود ندارد.'],['دسترسی دوره‌ها تا چه زمانی است؟','این نمونه فقط تجربه دسترسی را نمایش می‌دهد؛ شرایط نهایی باید پیش از راه‌اندازی سرویس مشخص شود.'],['به‌روزرسانی دوره‌ها چگونه اعلام می‌شود؟','اعلان‌های داخل داشبورد و مرکز اعلان برای این منظور پیش‌بینی شده‌اند.'],['اطلاعات ابزارهای AI قطعی است؟','خیر؛ قابلیت و قیمت باید در وب‌سایت رسمی هر ابزار بررسی شود.'],['امکان بازگشت وجه وجود دارد؟','سیاست بازگشت وجه هنوز در این نمونه تعریف نشده و باید پیش از فروش واقعی به‌صورت شفاف تدوین شود.'],['پشتیبانی از چه طریقی است؟','فرم تیکت و گفت‌وگوی نمایشی وجود دارد؛ کانال‌های تماس واقعی بعداً تنظیم می‌شوند.'],['پیشرفت یادگیری چگونه ذخیره می‌شود؟','در نمونه فعلی موقعیت آخرین ویدیو در مرورگر و با شناسه کاربر نمایشی ذخیره می‌شود.']];
  const visible=articles.filter(a=>(category==='همه'||a[1]===category)&&a[0].includes(query));
  return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow"><Icon name="book"/> مقالات و روندها</span><h1>یادگیری به‌روز، بدون ادعای قطعی.</h1><p>محتوای آموزشی نمونه برای دنبال‌کردن فرایندها و روندهای تولید محتوا.</p></div><div className="knowledge-filters"><div><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="جست‌وجوی مقاله..."/></div>{['همه','پرامپت','ترند محتوا','ابزار و فرایند','تولید ویدیو'].map(x=><button className={category===x?'active':''} onClick={()=>setCategory(x)} key={x}>{x}</button>)}</div><div className="article-grid">{visible.map((a,i)=><article key={a[0]}><div className={`article-art art-${i%3}`}><span>MO / INSIGHT</span><Icon name={i%2?'chart':'spark'} size={38}/></div><small>{a[1]} · {a[2]}</small><h2>{a[0]}</h2><p>مروری کاربردی با مثال‌ها، چک‌لیست و پیشنهادهایی برای آزمایش در پروژه بعدی.</p><button>مطالعه مقاله <Icon name="arrow"/></button></article>)}</div><section className="faq-section"><div className="section-heading"><span>پرسش‌های پرتکرار</span><h2>پاسخ‌های روشن پیش از شروع</h2></div><div className="faq-list">{faqs.map((f,i)=><article className={open===i?'open':''} key={f[0]}><button onClick={()=>setOpen(open===i?-1:i)}><b>{f[0]}</b><Icon name={open===i?'close':'chevron'}/></button>{open===i&&<p>{f[1]}</p>}</article>)}</div></section></div></main>;
}

function PromptLibrary() {
  const [tab,setTab]=useState<'library'|'builder'|'collections'>('library'); const [search,setSearch]=useState(''); const [category,setCategory]=useState('همه'); const [selected,setSelected]=useState(promptItems[0]); const [bookmarks,setBookmarks]=useState<string[]>([]);
  const [builder,setBuilder]=useState({topic:'معرفی محصول دست‌ساز',product:'فنجان سرامیکی',style:'مینیمال',audience:'علاقه‌مندان دکور',duration:'۱۵ ثانیه',ratio:'9:16',camera:'حرکت آرام رو به جلو',light:'نور نرم پنجره',mood:'آرام و گرم',tool:'Runway'});
  const visible=promptItems.filter(p=>(category==='همه'||p.category===category)&&(p.title.includes(search)||p.desc.includes(search)));
  const structured=`موضوع: ${builder.topic}\nمحصول: ${builder.product}\nسبک بصری: ${builder.style}\nمخاطب: ${builder.audience}\nمدت و نسبت: ${builder.duration}، ${builder.ratio}\nدوربین: ${builder.camera}\nنور و حس: ${builder.light}، ${builder.mood}\nبهینه‌سازی نمایشی برای: ${builder.tool}`;
  return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow"><Icon name="spark"/> فضای حرفه‌ای پرامپت</span><h1>پرامپت را پیدا کن، بساز و برای پروژه نگه دار.</h1><p>همه خروجی‌ها نمونه‌اند و برای اتصال آینده به ابزارهای مختلف ساختاربندی شده‌اند.</p></div><div className="hub-tabs"><button className={tab==='library'?'active':''} onClick={()=>setTab('library')}>کتابخانه</button><button className={tab==='builder'?'active':''} onClick={()=>setTab('builder')}>سازنده هوشمند</button><button className={tab==='collections'?'active':''} onClick={()=>setTab('collections')}>مجموعه‌ها و گردش‌کار</button></div>
  {tab==='library'&&<><div className="prompt-toolbar"><div><Icon name="search"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="جست‌وجو در عنوان، توضیح یا تگ..."/></div><select><option>محبوب‌ترین</option><option>جدیدترین</option><option>سطح دشواری</option><option>بیشترین ذخیره</option></select></div><div className="prompt-categories">{promptCategories.map(x=><button className={category===x?'active':''} onClick={()=>setCategory(x)} key={x}>{x}</button>)}</div><div className="prompt-layout"><div className="prompt-list">{visible.map(p=><article className={selected.title===p.title?'selected':''} onClick={()=>setSelected(p)} key={p.title}><div><span>{p.category}</span>{p.popular&&<i>محبوب</i>}</div><h3>{p.title}</h3><p>{p.desc}</p><small>{p.difficulty} · امتیاز {p.rating} · {p.saves} ذخیره</small></article>)}</div><section className="panel prompt-detail"><div className="prompt-detail-head"><div><span>{selected.category}</span><h2>{selected.title}</h2></div><button className={bookmarks.includes(selected.title)?'saved':''} onClick={()=>setBookmarks(x=>x.includes(selected.title)?x.filter(b=>b!==selected.title):[...x,selected.title])}><Icon name="bookmark"/></button></div><p>{selected.desc}</p><label>متن کامل و قابل ویرایش<textarea defaultValue={selected.text}/></label><div className="prompt-inputs"><label>موضوع<input placeholder="موضوع را وارد کنید"/></label><label>مخاطب<input placeholder="مخاطب هدف"/></label></div><div className="sample-output"><b>نمونه خروجی</b><p>{selected.sample}</p></div><ul><li><b>روش استفاده:</b> متغیرهای داخل کروشه را جایگزین و نتیجه را بازبینی کن.</li><li><b>ابزارهای سازگار:</b> {selected.tools}</li><li><b>آخرین به‌روزرسانی:</b> {selected.updated}</li><li><b>تگ‌ها:</b> {selected.tags.join('، ')}</li></ul><div className="output-actions"><Button icon="copy">کپی</Button><Button variant="ghost" icon="bookmark">افزودن به پروژه</Button><Button variant="ghost">امتیاز و گزارش</Button></div><details><summary>تاریخچه نسخه‌ها</summary><p>نسخه ۱.۲: افزودن محدودیت خروجی · نسخه ۱.۱: بهبود ساختار نقش</p></details></section></div></>}
  {tab==='builder'&&<div className="builder-layout"><section className="panel builder-form"><h2>ورودی‌های سازنده</h2><div className="builder-fields">{Object.entries(builder).map(([key,value])=><label key={key}>{({topic:'موضوع',product:'محصول',style:'سبک بصری',audience:'مخاطب',duration:'مدت',ratio:'نسبت تصویر',camera:'حرکت دوربین',light:'نورپردازی',mood:'حس‌وحال',tool:'ابزار هدف'} as Record<string,string>)[key]}<input value={value} onChange={e=>setBuilder({...builder,[key]:e.target.value})}/></label>)}</div><label className="upload-placeholder"><Icon name="play"/><span><b>تصویر مرجع اختیاری</b><small>در نسخه نمایشی آپلود نمی‌شود؛ فقط برای ابزارهای پشتیبان برنامه‌ریزی شده است.</small></span></label></section><section className="panel builder-output"><div><h2>پرامپت ساختاریافته</h2><small>خروجی شبیه‌سازی‌شده</small></div><textarea value={structured} readOnly/><div className="component-explain"><b>اجزای پرامپت</b><p>موضوع جهت اصلی را تعیین می‌کند؛ سبک و حس لحن بصری را می‌سازند؛ حرکت، نور و نسبت تصویر کنترل اجرایی می‌دهند.</p></div><div className="output-actions"><Button icon="copy">کپی</Button><Button variant="ghost">ترجمه</Button><Button variant="ghost">بهینه‌سازی برای {builder.tool}</Button></div><div className="variation-grid"><button>ساخت ۳ تنوع</button><button>اصلاح نتیجه ضعیف</button><button>مقایسه نسخه‌ها</button><button>ذخیره در تاریخچه</button></div></section></div>}
  {tab==='collections'&&<div className="collection-grid"><article><Icon name="bookmark"/><h3>مجموعه‌های شخصی</h3><p>پرامپت‌های ذخیره‌شده را براساس کمپین یا مشتری مرتب کن.</p><Button variant="ghost">ساخت مجموعه</Button></article><article><Icon name="chart"/><h3>لیست پرامپت پروژه</h3><p>نسخه منتخب، تاریخچه تغییر و خروجی نمونه را کنار هم نگه دار.</p><Button variant="ghost">مشاهده پروژه‌ها</Button></article><article><Icon name="user"/><h3>ارسال کاربران</h3><p>پرامپت پیشنهادی پس از بررسی مدیر منتشر می‌شود.</p><Button variant="ghost">ارسال برای تأیید</Button></article></div>}
  </div></main>;
}

function CommunityProjects({page}:{page:'community'|'projects'}) {
  if(page==='projects') return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow"><Icon name="chart"/> پروژه و تمرین عملی</span><h1>از بریف تا بازخورد، یک مسیر روشن.</h1><p>آپلود و اشتراک‌گذاری در این نسخه نمایشی‌اند و فایل واقعی ارسال نمی‌شود.</p></div><div className="project-board">{['بریف و برنامه‌ریزی','در حال ساخت','ارسال برای بازخورد','نیازمند اصلاح','تکمیل‌شده'].map((x,i)=><section key={x}><div><b>{x}</b><span>{i===0?'۲':'۱'}</span></div>{i<3&&<article><small>ماموریت هفته</small><h3>{i===0?'ریلز معرفی یک محصول':i===1?'استوری‌بورد ۶ نما':'نسخه اول تدوین'}</h3><p>خروجی، لینک نمونه‌کار و توضیح تصمیم‌های خلاقانه را اضافه کن.</p><div className="tag-cloud"><i>{i===2?'ارسال مجدد':'خصوصی'}</i><i>+۱۲۰ امتیاز</i></div><button>مشاهده جزئیات <Icon name="arrow"/></button></article>}</section>)}</div><div className="game-grid"><article><Icon name="gift"/><h3>سطح ۷ · سازنده پیوسته</h3><p>۲۴۰ امتیاز تا سطح بعدی · زنجیره ۴ روزه</p></article><article><Icon name="spark"/><h3>چالش هفتگی</h3><p>یک هوک را در سه لحن متفاوت بازنویسی کن.</p></article><article><Icon name="shield"/><h3>اشتراک‌گذاری امن</h3><p>هر پروژه را عمومی، خصوصی یا فقط برای بازخورد تنظیم کن.</p></article></div></div></main>;
  return <main className="page"><div className="container"><div className="page-head"><span className="eyebrow"><Icon name="message"/> جامعه یادگیری</span><h1>پرسش، بازخورد و همکاری محترمانه.</h1><p>محتوای جامعه و کاربران در این صفحه کاملاً نمایشی است.</p></div><div className="community-layout"><aside className="panel community-nav">{['گفت‌وگوهای تازه','پرسش و پاسخ','گروه‌های تخصصی','نقد پروژه','رویدادها و جلسه زنده','پیدا کردن هم‌تیمی','ذخیره‌شده‌ها'].map((x,i)=><button className={i===0?'active':''} key={x}><Icon name={i===1?'message':i===3?'play':i===4?'calendar':'user'} size={17}/>{x}</button>)}</aside><section className="community-feed"><div className="panel new-post"><input placeholder="یک پرسش یا تجربه را به اشتراک بگذار..."/><div><button>افزودن پروژه</button><Button>انتشار نمایشی</Button></div></div>{[['چطور برای یک محصول ساده، هوک تصویری پیدا می‌کنید؟','بحث · پرامپت و ایده'],['نسخه اول پروژه نورپردازی من؛ بازخورد می‌خواهم','نقد پروژه · فیلم‌برداری'],['گروه تمرین تدوین این هفته','گروه · Premiere']].map((p,i)=><article className="panel post-card" key={p[0]}><div><span>ک</span><div><b>کاربر نمایشی {i+1}</b><small>{p[1]} · امروز</small></div><button>گزارش</button></div><h2>{p[0]}</h2><p>این متن نمونه برای نمایش گفت‌وگو، پاسخ، دنبال‌کردن و بازخورد سازنده است.</p><div><button>پسندیدن · {i+2}</button><button>پاسخ · {i+1}</button><button>ذخیره</button><button>دنبال‌کردن</button></div></article>)}</section><aside className="panel event-list"><h3>رویدادهای پیش رو</h3><article><small>جلسه زنده نمایشی</small><b>بررسی پروژه‌های هفته</b><span>پنجشنبه · ۱۹:۰۰</span></article><article><small>کارگاه ضبط‌شده</small><b>طراحی گردش‌کار AI</b><span>قابل مشاهده در آینده</span></article><div className="future-ready"><b>آماده توسعه آینده</b><p>وبینار، ضبط جلسات، اعلان، نصب PWA و یادگیری آفلاین محدود در ساختار محصول پیش‌بینی شده‌اند.</p></div></aside></div></div></main>;
}

function SimplePortal({page,go}:{page:Page;go:(p:Page)=>void}) {
  const [supportMessages,setSupportMessages]=useState(['سلام مریم، چطور می‌تونیم راهنمایی‌ات کنیم؟']); const [supportText,setSupportText]=useState('');
  const sendSupport=()=>{if(!supportText.trim())return;setSupportMessages([...supportMessages,supportText,'پیام شما ثبت شد. این پاسخ خودکار و نمایشی است.']);setSupportText('')};
  if(page==='auth') return <main className="page auth-page"><div className="auth-card"><span className="brand-mark"><Icon name="spark"/></span><h1>ورود به حساب نمایشی</h1><p>برای تجربه رابط داشبورد، اطلاعات دلخواه وارد کن.</p><label>شماره موبایل<input placeholder="09123456789"/></label><label>رمز عبور<input type="password" placeholder="حداقل ۶ کاراکتر"/></label><Button onClick={()=>go('dashboard')}>ورود نمایشی</Button><button className="text-btn">حساب ندارم؛ ثبت‌نام نمایشی</button></div></main>;
  return <main className="dashboard-shell"><div className="container dash-grid"><SideNav page={page} go={go}/><div className="dash-content">
    {page==='referrals'&&<><div className="dash-head"><div><small>معرفی به دوستان</small><h1>یادگیری را به اشتراک بگذار</h1></div></div><div className="referral-hero"><span><Icon name="gift" size={38}/></span><h2>لینک دعوت نمایشی تو</h2><p>این بخش هیچ پاداش مالی یا تخفیفی ایجاد نمی‌کند و صرفاً دموی تجربه ارجاع است.</p><div><input readOnly value="moai.studio/invite/MARYAM"/><Button icon="copy">کپی لینک</Button></div></div></>}
    {page==='support'&&<><div className="dash-head"><div><small>مرکز راهنمایی</small><h1>چطور می‌توانیم کمک کنیم؟</h1></div><span className="sim-label"><i/> گفت‌وگوی نمایشی</span></div><div className="support-layout"><section className="panel support-ticket"><h2>درخواست پشتیبانی</h2><label>موضوع<select><option>سؤال درباره دوره</option><option>دسترسی به بسته</option><option>مشکل فنی</option><option>پرداخت نمایشی</option></select></label><label>راه تماس ترجیحی<select><option>ایمیل ثبت‌شده</option><option>شماره تماس — بعداً تنظیم می‌شود</option></select></label><label>پیام<textarea placeholder="مشکل یا سؤال خود را بنویسید..."/></label><div className="contact-placeholders"><span><b>ایمیل پشتیبانی</b>support@example.com</span><span><b>تلفن</b>در زمان راه‌اندازی درج می‌شود</span></div><Button>ثبت تیکت نمایشی</Button></section><aside className="panel support-chat"><div><span><Icon name="message"/></span><h3>گفت‌وگوی پشتیبانی</h3><small>پاسخ‌ها خودکار و فقط برای نمایش رابط‌اند</small></div><div className="support-messages">{supportMessages.map((m,i)=><p className={i%3===1?'mine':''} key={i}>{m}</p>)}</div><div className="support-send"><input value={supportText} onChange={e=>setSupportText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendSupport()} placeholder="پیام بنویسید..."/><button onClick={sendSupport}><Icon name="arrow"/></button></div></aside></div></>}
    {page==='admin'&&<Admin/>}
  </div></div></main>;
}

function Admin(){
  const [tab,setTab]=useState('کاربران'); const data:Record<string,string[][]>={کاربران:[['مریم احمدی','نقره‌ای','فعال'],['علی رضایی','برنزی','فعال'],['نگار محمدی','طلایی','فعال']],نقش‌ها:[['مدیر محتوا','دوره و مقاله','فعال'],['پشتیبان','تیکت‌ها','فعال']],بسته‌ها:packages.map(p=>[p.name,p.price,'منتشرشده']),دوره‌ها:courses.slice(0,4).map(c=>[c.title,c.level,`${c.lessons} درس`]),درس‌ها:[['نقش و زمینه','پرامپت‌نویسی','منتشرشده'],['هوک تصویری','تولید محتوا','پیش‌نویس']],سفارش‌ها:[['MO-1042','۱۰,۰۰۰,۰۰۰ تومان','موفق'],['MO-1041','۵,۰۰۰,۰۰۰ تومان','در انتظار']],مقالات:[['پرامپت بهتر','پرامپت','منتشرشده']],پرامپت‌ها:[['سناریوی ریلز','ارسال مدیر','تأییدشده'],['کاور محصول','ارسال کاربر','در بررسی']],ابزارها:[['ChatGPT','متن','نیازمند بازبینی'],['Firefly','تصویر','منتشرشده']],پروژه‌ها:[['ریلز محصول','بازخورد','در حال بررسی']],مالی:[['گزارش فروش نمایشی','خرداد ۱۴۰۴','آماده']],API:[['سرویس AI آینده','۰ درخواست واقعی','غیرفعال']],سرویس:[['پرداخت','دمو','بدون اتصال'],['اعلان PWA','آینده','برنامه‌ریزی']],امنیت:[['ورود مدیر نمایشی','نشست مرورگر','امروز']],اعلان‌ها:[['درس جدید Premiere','همه کاربران','پیش‌نویس'],['به‌روزرسانی دوره AI','بسته نقره‌ای','منتشرشده']]};
  return <><div className="dash-head"><div><small>محیط مدیریت نمایشی</small><h1>مدیریت محتوا و کاربران</h1></div><Button icon="edit">ایجاد مورد جدید</Button></div><div className="admin-stats"><article><b>۱۲۴</b><span>کاربر نمایشی</span></article><article><b>۶</b><span>دوره</span></article><article><b>۳</b><span>بسته فعال</span></article><article><b>۱۸</b><span>سفارش نمایشی</span></article></div><div className="admin-tabs">{Object.keys(data).map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div><div className="panel admin-table"><div className="admin-table-head"><h2>{tab}</h2><div><Icon name="search"/><input placeholder={`جست‌وجو در ${tab}...`}/></div></div>{data[tab].map((r,i)=><div className="admin-row" key={i}><b>{r[0]}</b><span>{r[1]}</span><em>{r[2]}</em><button><Icon name="edit" size={17}/></button></div>)}</div></>;
}

function Footer({go}:{go:(p:Page)=>void}) {
  return <footer><div className="container footer-grid"><div><div className="brand"><span className="brand-mark"><Icon name="spark"/></span><span><b>MO AI</b><small>STUDIO</small></span></div><p>آموزش و ابزار برای ساخت محتوای هوشمند، خلاق و اثرگذار.</p></div><div><b>یادگیری</b><button onClick={()=>go('courses')}>دوره‌ها و آموزش رایگان</button><button onClick={()=>go('prompts')}>کتابخانه پرامپت</button><button onClick={()=>go('knowledge')}>مقالات و FAQ</button></div><div><b>ابزار و جامعه</b><button onClick={()=>go('tools')}>دایرکتوری ابزارها</button><button onClick={()=>go('community')}>جامعه</button><button onClick={()=>go('support')}>پشتیبانی</button></div><div><b>خبرنامه نمایشی</b><p>برای دریافت نکته‌های آموزشی عضو شو.</p><div className="newsletter"><input placeholder="ایمیل شما" dir="ltr"/><button><Icon name="arrow"/></button></div></div></div><div className="container copyright"><span>© ۱۴۰۴ MO AI STUDIO — نسخه نمایشی</span><span>بدون تراکنش، آمار یا نظر مشتری ساختگی</span></div></footer>;
}

export default function App() {
  const [page,setPage]=useState<Page>('home'); const [dark,setDark]=useState(true); const [lang,setLang]=useState('FA'); const [selectedId,setSelectedId]=useState<string|null>(null); const [searchOpen,setSearchOpen]=useState(false);
  const selected=useMemo(()=>packages.find(p=>p.id===selectedId)||null,[selectedId]);
  const go=(p:Page)=>{setPage(p);setSearchOpen(false);window.scrollTo({top:0,behavior:'smooth'})};
  const choose=(id:string)=>{setSelectedId(id);go('cart')};
  let content:React.ReactNode;
  if(page==='home') content=<Home go={go} choose={choose}/>;
  else if(page==='packages') content=<Packages choose={choose} go={go}/>;
  else if(page==='recommend') content=<Recommend choose={choose}/>;
  else if(page==='cart') content=<Cart selected={selected} go={go} remove={()=>setSelectedId(null)}/>;
  else if(page==='checkout') content=<Checkout selected={selected} go={go}/>;
  else if(page==='dashboard') content=<Dashboard go={go}/>;
  else if(page==='courses') content=<Courses go={go}/>;
  else if(page==='lesson') content=<Lesson go={go}/>;
  else if(page==='studio') content=<Studio go={go}/>;
  else if(page==='portfolio') content=<Portfolio/>;
  else if(page==='tools') content=<ToolsDirectory/>;
  else if(page==='knowledge') content=<KnowledgeHub/>;
  else if(page==='prompts') content=<PromptLibrary/>;
  else if(page==='community'||page==='projects') content=<CommunityProjects page={page}/>;
  else content=<SimplePortal page={page} go={go}/>;
  return <div className={dark?'app dark':'app light'} dir={lang==='FA'?'rtl':'ltr'}><Header page={page} go={go} dark={dark} setDark={setDark} lang={lang} setLang={setLang} cart={!!selected} searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>{content}{!['dashboard','courses','lesson','studio','referrals','support','admin'].includes(page)&&<Footer go={go}/>}<nav className="mobile-dock"><button className={page==='dashboard'?'active':''} onClick={()=>go('dashboard')}><Icon name="home"/><span>خانه من</span></button><button className={page==='courses'?'active':''} onClick={()=>go('courses')}><Icon name="book"/><span>یادگیری</span></button><button className={page==='studio'?'active':''} onClick={()=>go('studio')}><Icon name="bot"/><span>استودیو</span></button><button className={page==='prompts'?'active':''} onClick={()=>go('prompts')}><Icon name="spark"/><span>پرامپت</span></button><button onClick={()=>go('auth')}><Icon name="user"/><span>حساب</span></button></nav></div>;
}
