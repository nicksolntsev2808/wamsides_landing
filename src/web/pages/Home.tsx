import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/* ─── FADE-UP HOOK ─── */
function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── NAV ─── */
function Nav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <nav className="ws-nav" style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div className="ws-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px", position: "relative" }}>
        {/* Logo */}
        <a href="https://warmsides.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
          <div className="ws-logo-mark">W</div>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#4A2E1A", letterSpacing: "-0.01em" }}>
            Warmsides
          </span>
        </a>

        {/* Desktop links — hidden on mobile via media query in CSS */}
        <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {[
            ["Проблема", "problem"],
            ["Рішення", "solution"],
            ["Послуги", "services"],
            ["Відгуки", "reviews"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "1rem", color: "#5C3D2E", padding: 0, whiteSpace: "nowrap" }}
            >
              {label}
            </button>
          ))}
          <button
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}
            onClick={() => scrollTo("contact")}
          >
            Зв'язатися
          </button>
        </div>

        {/* Hamburger — shown only on mobile via CSS */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </div>
      </div>

      {/* Mobile dropdown — outside container so it spans full width */}
      {open && (
        <div style={{ background: "#FFFAF5", borderBottom: "1px solid #E8D5C0", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[["Проблема", "problem"], ["Рішення", "solution"], ["Послуги", "services"], ["Відгуки", "reviews"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "1rem", color: "#5C3D2E", textAlign: "left", padding: "0.35rem 0" }}>
              {label}
            </button>
          ))}
          <button className="btn-primary" style={{ width: "fit-content" }} onClick={() => scrollTo("contact")}>Зв'язатися</button>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="hero" style={{ background: "#FFFAF5", padding: "6rem 0 5rem", position: "relative", overflow: "hidden", maxWidth: "100%" }}>
      {/* Decorative blob — clipped to section */}
      <div
        className="ws-blob"
        style={{
          width: "400px", height: "400px",
          background: "linear-gradient(135deg, rgba(201,96,58,0.08), rgba(232,137,90,0.06))",
          top: "-80px", right: "-100px",
          zIndex: 0,
        }}
      />
      <div className="ws-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Badges */}
        <div className="fade-up" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <span className="ws-tag">UX-орієнтована структура</span>
          <span className="ws-tag">Готовність до реклами за 4 тижні</span>
        </div>

        {/* Headline */}
        <h1 className="fade-up fade-up-delay-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1.1, color: "#4A2E1A", maxWidth: "800px", marginBottom: "1.5rem" }}>
          За 4 тижні запустимо лендинг,{" "}
          <span className="ws-gradient-text">який приводить заявки</span>,{" "}
          а не зливає трафік
        </h1>

        {/* Sub */}
        <p className="fade-up fade-up-delay-2" style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.15rem", color: "#5C3D2E", maxWidth: "560px", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          Warmsides — тепла студія, яка проектує лендинги з UX-логіки, а не з картинок. Структура під вашу ЦА, mobile-first підхід, результат, який можна виміряти.
        </p>

        {/* CTAs */}
        <div className="fade-up fade-up-delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Дізнатися вартість
          </button>
          <button className="btn-outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            Наші послуги
          </button>
        </div>

        {/* Year badge */}
        <div className="fade-up fade-up-delay-4" style={{ marginTop: "3.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "3rem", height: "1px", background: "#E8D5C0" }}></div>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#9E7A65", letterSpacing: "0.08em", textTransform: "uppercase" }}>2016 — 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM ─── */
function Problem() {
  const problems = [
    "Студії продають шаблонні рішення — однакові для всіх",
    "Дизайн заради дизайну, без сенсів та аргументів",
    "Лендинг не враховує контексту та особливостей ЦА",
    "Немає аналізу результатів та поведінки відвідувачів",
  ];

  return (
    <section id="problem" style={{ background: "#F0E6D3", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <span className="ws-tag">Проблема</span>
          <div className="ws-divider"></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.75rem" }}>
            Чому більшість лендингів не працює?
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "1rem", maxWidth: "520px", lineHeight: 1.75 }}>
            Часто бізнес вкладає гроші в рекламу, але лендинг не конвертує. Ось чому це відбувається.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {problems.map((text, i) => (
            <div
              key={i}
              className={`ws-card fade-up fade-up-delay-${i + 1}`}
              style={{ background: "#2C1A0E", border: "1px solid rgba(232,213,192,0.1)" }}
            >
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "rgba(201,96,58,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p style={{ fontFamily: "Nunito, sans-serif", color: "#F0E6D3", fontSize: "1rem", lineHeight: 1.65, margin: 0 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUTION ─── */
function Solution() {
  const features = [
    "Структура під конкретну ЦА та контекст використання",
    "Mobile-first підхід в проектуванні та дизайні",
    "Сенси, які перекривають страхи та заперечення клієнтів",
    "Чистота без зайвого візуального шуму",
    "Збір та аналіз даних для покращення ефективності",
  ];

  return (
    <section id="solution" style={{ background: "#FFFAF5", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="ws-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left */}
          <div>
            <div className="fade-up">
              <span className="ws-tag">Рішення</span>
              <div className="ws-divider"></div>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "1.25rem", lineHeight: 1.2 }}>
                Ми робимо лендинги, які ведуть до дії
              </h2>
            </div>
            <p className="fade-up fade-up-delay-1" style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              Ми починаємо не з картинок, а з UX-логіки: хто ваш користувач, з якою метою він прийшов і який крок має зробити далі.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {features.map((f, i) => (
                <div key={i} className={`fade-up fade-up-delay-${(i % 4) + 1}`} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <div className="ws-check">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#FFFAF5" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA card */}
          <div className="fade-up fade-up-delay-2">
            <div className="ws-card" style={{ padding: "2.5rem", border: "1px solid #E8D5C0" }}>
              <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
                {[["4", "тижні до запуску"], ["10+", "років досвіду"], ["40+", "проєктів"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#C9603A", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", marginTop: "0.25rem" }}>{label}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                У результаті ви отримуєте не просто сторінку, а інструмент для стабільного потоку заявок. Ми не роздуваємо бюджет — робимо раціонально.
              </p>
              <button
                className="btn-primary"
                style={{ width: "100%", textAlign: "center" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Дізнатися вартість
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
  const services = [
    {
      tag: "Рітейл",
      title: "Маркетингові лендинги для рітейлу",
      desc: "Розробляємо швидкі маркетингові лендинги під акції, сезонні кампанії та запуск нових продуктів. Працюємо в жорстких дедлайнах, синхронізуємо з рекламою та медіапланом.",
      stats: [["45%", "зростання конверсії після UX-оптимізації"]],
    },
    {
      tag: "Освіта",
      title: "Лендинги для онлайн-освіти",
      desc: "Будуємо структуру під складні продукти: курси, менторські програми, запуск потоків. Пропрацьовуємо офер, сегменти аудиторії, болі та тригери довіри.",
      stats: [["+27%", "збільшення середнього чеку"], ["−30%", "відмов на мобільних"]],
    },
    {
      tag: "Послуги",
      title: "Лендинги для продажу послуг",
      desc: "Працюємо з різними нішами, структуруємо складні послуги так, щоб клієнту було легко зрозуміти цінність і зробити перший крок. Середній термін окупності — 1–3 місяці.",
      stats: [["1–3", "місяці до окупності"]],
    },
  ];

  return (
    <section id="services" style={{ background: "#F0E6D3", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <span className="ws-tag">Наша спеціалізація</span>
          <div className="ws-divider"></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.75rem" }}>
            Що ми робимо
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {services.map((s, i) => (
            <div key={i} className={`ws-card fade-up fade-up-delay-${i + 1}`} style={{ display: "flex", flexDirection: "column" }}>
              <span className="ws-tag" style={{ marginBottom: "1.25rem", alignSelf: "flex-start" }}>{s.tag}</span>
              <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#4A2E1A", marginTop: 0, marginBottom: "0.875rem", lineHeight: 1.3 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>
                {s.desc}
              </p>
              <div style={{ borderTop: "1px solid #E8D5C0", paddingTop: "1.25rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {s.stats.map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#C9603A", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.78rem", color: "#9E7A65", marginTop: "0.2rem", lineHeight: 1.4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RESULTS ─── */
function Results() {
  const items = [
    { icon: "◎", title: "Чітка структура", desc: "Кожен блок має свою роль: пояснити, переконати, зняти сумніви або підсилити довіру." },
    { icon: "⚡", title: "Швидкий запуск", desc: "Чотири тижні від старту до готового результату — за умови оперативного зворотного зв'язку." },
    { icon: "◈", title: "Розумні гроші", desc: "Ми не роздуваємо бюджет і не пропонуємо зайвих рішень. Раціонально та по суті." },
    { icon: "◆", title: "Стратегія продажу", desc: "Лендинг працює як системний інструмент, а не набір екранів." },
  ];

  return (
    <section id="results" style={{ background: "#FFFAF5", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <span className="ws-tag">Результат</span>
          <div className="ws-divider"></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0, maxWidth: "600px", lineHeight: 1.2 }}>
            Ви отримаєте лендинг, побудований навколо вашої бізнес-цілі
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {items.map((item, i) => (
            <div key={i} className={`ws-card fade-up fade-up-delay-${i + 1}`}>
              <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#C9603A", marginBottom: "0.75rem" }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#4A2E1A", marginTop: 0, marginBottom: "0.625rem" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="fade-up" style={{ marginTop: "3rem", background: "linear-gradient(135deg, #C9603A, #E8895A)", borderRadius: "1.5rem", padding: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#FFFAF5", margin: 0, marginBottom: "0.5rem" }}>
              Ми не роздуваємо бюджет — робимо раціонально
            </h3>
            <p style={{ fontFamily: "Nunito, sans-serif", color: "rgba(255,250,245,0.8)", margin: 0, fontSize: "1rem" }}>
              Дізнайтеся точну вартість під ваш проєкт
            </p>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "#FFFAF5", color: "#C9603A", fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "1rem", padding: "0.875rem 2rem", borderRadius: "0.625rem", border: "none", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease", whiteSpace: "nowrap" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
          >
            Дізнатися вартість
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── TIMELINE ─── */
function Timeline() {
  const steps = [
    { week: "01", title: "Тиждень 1", desc: "Формуємо задачу, офер, воронку. Визначаємо структуру та функціонал лендингу." },
    { week: "02", title: "Тиждень 2", desc: "Будуємо деталізований UX-прототип під вашу цільову аудиторію." },
    { week: "03", title: "Тиждень 3", desc: "Готуємо дизайн із фокусом на мобільні пристрої та конверсію." },
    { week: "04", title: "Тиждень 4 🚀", desc: "Верстаємо, програмуємо функціонал, наповнюємо контентом, тестуємо та навчаємо адмінці." },
    { week: "∞", title: "Після запуску", desc: "Аналізуємо поведінку користувачів та вносимо зміни для покращення ефективності." },
  ];

  return (
    <section id="timeline" style={{ background: "#F0E6D3", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "3.5rem" }}>
          <span className="ws-tag">Календар запуску</span>
          <div className="ws-divider"></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.5rem" }}>
            4 тижні від старту до готового результату
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "0.95rem" }}>
            За умови оперативного зворотного зв'язку
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {steps.map((step, i) => (
            <div key={i} className={`fade-up fade-up-delay-${(i % 4) + 1}`} style={{ display: "flex", gap: "1.5rem", alignItems: "stretch", paddingBottom: i < steps.length - 1 ? "0" : "0" }}>
              {/* Left: dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div className="timeline-dot">{step.week}</div>
                {i < steps.length - 1 && (
                  <div style={{ width: "2px", flex: 1, minHeight: "2rem", background: "linear-gradient(to bottom, #C9603A, #E8D5C0)", margin: "0.25rem 0" }} />
                )}
              </div>
              {/* Right: content */}
              <div style={{ paddingBottom: i < steps.length - 1 ? "2rem" : "0", paddingTop: "0.625rem" }}>
                <h4 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#4A2E1A", margin: 0, marginBottom: "0.375rem" }}>
                  {step.title}
                </h4>
                <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHO IT'S FOR ─── */
function WhoFor() {
  const items = [
    "Кому важливий не просто запуск, а реальні заявки та продажі",
    "Кому потрібно вкластися в розумний бюджет без зайвих рішень",
    "Кому потрібні досвічені спеціалісти, а не фріланс-ентузіасти",
  ];

  return (
    <section id="who" style={{ background: "#FFFAF5", padding: "6rem 0" }}>
      <div className="ws-container ws-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div>
          <div className="fade-up">
            <span className="ws-tag">Кому підходить</span>
            <div className="ws-divider"></div>
            <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "1rem", lineHeight: 1.2 }}>
              Кому потрібен наш підхід?
            </h2>
            <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              Наш підхід — це про результат, а не про формальність.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map((item, i) => (
              <div key={i} className={`fade-up fade-up-delay-${i + 1}`} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div className="ws-check">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#FFFAF5" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.95rem", lineHeight: 1.65, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual element */}
        <div className="fade-up fade-up-delay-2" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "380px" }}>
            <div style={{ background: "linear-gradient(135deg, #C9603A, #E8895A)", borderRadius: "2rem", padding: "2.5rem", color: "#FFFAF5" }}>
              <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 900, fontSize: "4rem", lineHeight: 1, marginBottom: "0.5rem" }}>10+</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.1rem", opacity: 0.9, marginBottom: "2rem" }}>років у веб-розробці</div>
              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "2rem", lineHeight: 1 }}>40+</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", opacity: 0.8, marginTop: "0.25rem" }}>проєктів</div>
                </div>
                <div>
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "2rem", lineHeight: 1 }}>4</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", opacity: 0.8, marginTop: "0.25rem" }}>тижні</div>
                </div>
                <div>
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "2rem", lineHeight: 1 }}>3</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", opacity: 0.8, marginTop: "0.25rem" }}>країни</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function Reviews() {
  const reviews = [
    {
      quote: "Нарешті лендинг працює! Раніше ми вже запускали лендинг, але якість лідів була низькою. З Warmsides пропрацювали цільову аудиторію, їх потреби і структуру сторінки. Це кардинально вплинуло на якість заявок.",
      name: "Наталія Сотніченко",
      role: "Співвласниця школи англійської NaEasy",
    },
    {
      quote: "Все по суті 🔥 Запустили інтернет-магазин із чітким планом розвитку функціоналу. Зручна та зрозуміла адмінка, детальна статистика. Продовжуємо успішно розвивати магазин.",
      name: "Андрій Савченко",
      role: "Маркетинговий директор Vapors",
    },
    {
      quote: "Лайк за свіжий погляд. Під час проєктування дизайнери Warmsides запропонували свіжі ідеї та прості рішення, які зробили продукт зручнішим і логічнішим для користувачів.",
      name: "Євген Костін",
      role: "CEO Freudika",
    },
    {
      quote: "Smooth launch 👍 We launched our corporate website with Warmsides, and the process was clear and well organized. They helped us structure the content and stay within a reasonable budget.",
      name: "Erwin Hunsen",
      role: "Product Manager at Prepr",
    },
  ];

  return (
    <section id="reviews" style={{ background: "#F0E6D3", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "3rem" }}>
          <span className="ws-tag">Відгуки клієнтів</span>
          <div className="ws-divider"></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0 }}>
            Що говорять клієнти
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {reviews.map((r, i) => (
            <div key={i} className={`ws-card fade-up fade-up-delay-${(i % 4) + 1}`} style={{ display: "flex", flexDirection: "column" }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#C9603A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.9rem", lineHeight: 1.7, flex: 1, marginBottom: "1.5rem" }}>
                "{r.quote}"
              </p>
              <div style={{ borderTop: "1px solid #E8D5C0", paddingTop: "1rem" }}>
                <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#4A2E1A" }}>{r.name}</div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", marginTop: "0.2rem" }}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function SectionTracker({ eventName }: { eventName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          if (typeof window.gtag === "function") {
            window.gtag("event", eventName, {
              event_category: "engagement",
              event_label: eventName,
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eventName]);
  return <div ref={ref} style={{ height: 0, pointerEvents: "none" }} />;
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", comment: "" });
  const [sent, setSent] = useState(() => new URLSearchParams(window.location.search).get("success") === "true");
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    let fired = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          if (typeof window.gtag === "function") {
            window.gtag("event", "form_view", {
              event_category: "engagement",
              event_label: "contact_form",
            });
          }
          if (typeof window.fbq === "function") {
            window.fbq("track", "ViewContent", {
              content_name: "contact_form",
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: form.name,
        phone: form.phone,
        service: form.service,
        comment: form.comment,
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        window.location.href = "/success.html?success=true";
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <>
    <SectionTracker eventName="scroll_to_form" />
    <section id="contact" style={{ background: "#FFFAF5", padding: "6rem 0" }}>
      <div className="ws-container">
        <div className="ws-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="fade-up">
              <span className="ws-tag">Контакт</span>
              <div className="ws-divider"></div>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "1rem", lineHeight: 1.2 }}>
                Дізнайтеся бюджет
              </h2>
              <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                Під час зустрічі-знайомства:
              </p>
            </div>
            <div className="fade-up fade-up-delay-1" style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
              {["Розберемо вашу задачу", "Запропонуємо оптимальне рішення", "Зорієнтуємо по бюджету"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <div className="ws-check">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#FFFAF5" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.95rem", lineHeight: 1.65, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="fade-up fade-up-delay-2" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { icon: "📍", text: "Київ, Харків · Амстердам" },
                { icon: "📞", text: "+380 67 531 19 52" },
                { icon: "✉️", text: "hello@warmsides.com" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.95rem" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="fade-up fade-up-delay-1">
            <div ref={formRef} className="ws-card" style={{ padding: "2.5rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                  <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "linear-gradient(135deg, #C9603A, #E8895A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.75rem", boxShadow: "0 8px 24px rgba(201,96,58,0.3)" }}>
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#FFFAF5" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#4A2E1A", marginBottom: "0.75rem" }}>Дякуємо за заявку!</h3>
                  <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    Менеджер Вікторія зв'яжеться з вами<br />протягом 1–2 годин у робочий час.
                  </p>
                  <div style={{ background: "#FFF3ED", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "1.75rem" }}>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", color: "#9E7A65", margin: 0 }}>
                      Якщо терміново — напишіть нам одразу у Telegram
                    </p>
                    <a href="https://t.me/NS940828" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#C9603A", textDecoration: "none" }}>
                      @NS940828
                    </a>
                  </div>
                  <a href="/" style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#9E7A65", textDecoration: "underline" }}>
                    Повернутися на головну
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  name="contact"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <div style={{ marginBottom: "0.25rem" }}>
                    <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#4A2E1A", margin: "0 0 0.25rem" }}>Залишити заявку</h3>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#9E7A65", margin: 0 }}>Всі поля обов'язкові, крім коментаря</p>
                  </div>

                  <div>
                    <label style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#5C3D2E", display: "block", marginBottom: "0.5rem" }}>Ваше ім'я *</label>
                    <input
                      className="ws-input"
                      type="text"
                      name="name"
                      placeholder="Іван Іваненко"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#5C3D2E", display: "block", marginBottom: "0.5rem" }}>Телефон або email *</label>
                    <input
                      className="ws-input"
                      type="text"
                      name="phone"
                      placeholder="+380 50 123-45-67 або hello@example.com"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#5C3D2E", display: "block", marginBottom: "0.5rem" }}>Тип послуги *</label>
                    <div style={{ position: "relative" }}>
                      <select
                        className="ws-input"
                        name="service"
                        value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        required
                        style={{ appearance: "none", WebkitAppearance: "none", cursor: "pointer", color: form.service ? "#4A2E1A" : "#9E7A65" }}
                      >
                        <option value="" disabled>Оберіть послугу</option>
                        <option value="Розробка сайту">Розробка сайту</option>
                        <option value="Інтернет-магазин">Інтернет-магазин</option>
                        <option value="Мобільний застосунок">Мобільний застосунок</option>
                        <option value="Інше">Інше</option>
                      </select>
                      <svg style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9E7A65" }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#5C3D2E", display: "block", marginBottom: "0.5rem" }}>
                      Коментар <span style={{ fontWeight: 400, color: "#9E7A65" }}>(необов'язково)</span>
                    </label>
                    <textarea
                      className="ws-input"
                      name="comment"
                      placeholder="Розкажіть про проєкт: що потрібно зробити, які терміни, особливі побажання..."
                      value={form.comment}
                      onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                      rows={4}
                      style={{ resize: "vertical", minHeight: "7rem" }}
                    />
                  </div>

                  {error && (
                    <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#C9603A", margin: 0, textAlign: "center" }}>
                      Помилка відправки. Спробуйте ще раз або напишіть на hello@warmsides.com
                    </p>
                  )}
                  <button type="submit" className="btn-primary" style={{ width: "100%", textAlign: "center", marginTop: "0.25rem" }}>
                    Відправити заявку
                  </button>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", textAlign: "center", margin: 0 }}>
                    Менеджер Вікторія · Зазвичай відповідаємо за 1–2 год
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="ws-footer" style={{ padding: "3rem 0" }}>
      <div className="ws-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(240,230,211,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="ws-logo-mark">W</div>
            <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#FFFAF5" }}>Warmsides</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Telegram", href: "#" },
              { label: "WhatsApp", href: "#" },
              { label: "hello@warmsides.com", href: "mailto:hello@warmsides.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", color: "#F0E6D3", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.opacity = "1"}
                onMouseLeave={e => (e.target as HTMLElement).style.opacity = "0.8"}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", margin: 0 }}>
            © 2016 — 2026 Warmsides. All rights reserved.
          </p>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", margin: 0 }}>
            Київ · Харків · Амстердам
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  useFadeUp();

  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Results />
      <Timeline />
      <WhoFor />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}
