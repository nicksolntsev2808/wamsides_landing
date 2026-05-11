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
          {[["Рішення", "solution"], ["Послуги", "services"], ["Відгуки", "reviews"]].map(([label, id]) => (
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
  const [heroPhone, setHeroPhone] = useState("");
  const [heroSent, setHeroSent] = useState(false);
  const [heroError, setHeroError] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroError(false);
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: "",
        phone: heroPhone,
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        window.gtag?.("event", "generate_lead", {
          event_category: "conversion",
          event_label: "hero_form",
        });
        window.fbq?.("track", "Lead");
        window.location.href = "/success.html?success=true";
      } else {
        setHeroError(true);
      }
    } catch {
      setHeroError(true);
    }
  };

  return (
    <section id="hero" style={{ background: "#FFFAF5", padding: "5rem 0 3rem", position: "relative", overflow: "clip", maxWidth: "100%" }}>
      {/* Decorative blob — clipped to section */}
      <div
        className="ws-blob"
        style={{
          width: "400px", height: "400px",
          background: "linear-gradient(135deg, rgba(201,96,58,0.08), rgba(232,137,90,0.06))",
          top: "-80px", right: "-100px",
          zIndex: 0,
          overflow: "hidden",
        }}
      />
      <div className="ws-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Badges */}
        <div className="fade-up" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <span className="ws-tag">Сайт під ключ</span>
          <span className="ws-tag">Фіксована ціна</span>
          <span className="ws-tag">Готовність до реклами</span>
        </div>

        {/* Headline */}
        <h1 className="fade-up fade-up-delay-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1.1, color: "#4A2E1A", maxWidth: "800px", marginBottom: "1.5rem" }}>
          Сайт під ключ{" — "}
          <span className="ws-gradient-text">готовий за 2–4 тижні</span>
        </h1>

        {/* Sub */}
        <p className="fade-up fade-up-delay-2" style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.15rem", color: "#5C3D2E", maxWidth: "560px", lineHeight: 1.75, marginBottom: "2rem" }}>
          Лендінги, інтернет-магазини та корпоративні сайти. Фіксована ціна, без прихованих доплат.
        </p>

        {/* Inline hero form */}
        <div className="fade-up fade-up-delay-3" style={{ maxWidth: "480px" }}>
          {heroSent ? (
            <div className="ws-card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, color: "#4A2E1A", margin: 0 }}>
                Дякуємо! Зв'яжемося протягом 10 хвилин ⚡
              </p>
            </div>
          ) : (
            <form onSubmit={handleHeroSubmit} name="contact" data-netlify="true" netlify-honeypot="bot-field" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="name" value="" />
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  className="ws-input"
                  type="tel"
                  name="phone"
                  placeholder="+380 __ ___ __ __"
                  autoComplete="tel"
                  value={heroPhone}
                  onChange={e => setHeroPhone(e.target.value)}
                  required
                  style={{ flex: 1, minWidth: 0 }}
                />
                <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap", fontSize: "1rem", padding: "0.9rem 1.5rem" }}>
                  Отримати ціну →
                </button>
              </div>
              {heroError && (
                <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#C9603A", margin: 0 }}>
                  Помилка. Спробуйте ще раз.
                </p>
              )}
              <a
                href="https://t.me/NS940828"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  window.gtag?.("event", "telegram_click", { event_category: "conversion", event_label: "hero" });
                  window.fbq?.("trackCustom", "TelegramClick");
                }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  padding: "0.8rem 1.5rem", borderRadius: "0.75rem",
                  background: "#E8F4FD", border: "1px solid #B8D8EC",
                  fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem",
                  color: "#2AABEE", textDecoration: "none", transition: "background 0.2s",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#2AABEE">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Написати в Telegram
              </a>
            </form>
          )}
        </div>

        {/* Social proof */}
        <div className="fade-up fade-up-delay-4" style={{ marginTop: "1.75rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {[
              { initials: "АК", bg: "#C9603A" },
              { initials: "МС", bg: "#8B6347" },
              { initials: "ОП", bg: "#5C3D2E" },
              { initials: "ДЛ", bg: "#C9603A" },
              { initials: "ІВ", bg: "#8B6347" },
            ].map((a, i) => (
              <div key={i} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: a.bg, border: "2px solid #FFFAF5", marginLeft: i === 0 ? 0 : "-0.6rem", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 - i }}>
                <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#FFFAF5" }}>{a.initials}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "2px" }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C9603A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#5C3D2E" }}>
              <strong>100+ підприємців</strong> вже обрали нас
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── SOLUTION ─── */
function Solution() {
  const steps = [
    {
      num: "01",
      title: "Аналіз",
      desc: "Вивчаємо ваш бізнес, ЦА та конкурентів. Формуємо офер і структуру.",
      details: "30-хвилинний дзвінок, де розберемо вашу нішу, аудиторію та конкурентів. Ви отримаєте чіткий план з термінами та фіксованою ціною — безкоштовно.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Структура",
      desc: "Будуємо UX-прототип під вашу аудиторію. Кожен блок має свою роль.",
      details: "Створюємо wireframe кожної сторінки. Ви бачите структуру до початку дизайну і можете внести зміни. Жодної роботи «наосліп».",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Дизайн",
      desc: "Створюємо mobile-first дизайн з фокусом на конверсію, а не красу заради краси.",
      details: "Презентуємо дизайн у Figma. До 3 раундів правок включено. Ви затверджуєте кожну сторінку перед версткою — без сюрпризів.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Запуск",
      desc: "Верстаємо, тестуємо та запускаємо. Готовність до реклами за 4 тижні.",
      details: "Адаптивна верстка, підключення аналітики (GA4, Meta Pixel), тестування на всіх пристроях. Після запуску — 30 днів безкоштовної підтримки.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (i: number) => {
    const wasOpen = expandedStep === i;
    setExpandedStep(wasOpen ? null : i);
    if (!wasOpen) {
      window.gtag?.("event", "step_expand", {
        event_category: "engagement",
        event_label: steps[i].title,
      });
    }
  };

  return (
    <section id="solution" style={{ background: "#FFFAF5", padding: "4.5rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <span className="ws-tag">Як ми працюємо</span>
          <div className="ws-divider" style={{ margin: "1rem auto" }}></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.75rem" }}>
            Від ідеї до сайту за 4 тижні
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.75, margin: "0 auto" }}>
            Чіткий процес без хаосу та затримок
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {steps.map((step, i) => (
            <div key={i} className={`fade-up fade-up-delay-${i + 1}`} style={{ position: "relative" }}>
              <div
                className="ws-card"
                onClick={() => toggleStep(i)}
                style={{ height: "100%", border: "1px solid #E8D5C0", padding: "2rem 1.75rem", cursor: "pointer", transition: "box-shadow 0.25s ease" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #C9603A, #E8895A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFAF5" }}>
                    {step.icon}
                  </div>
                  <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#E8D5C0" }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#4A2E1A", margin: "0 0 0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
                {expandedStep === i && (
                  <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #E8D5C0", animation: "fadeInDown 0.25s ease" }}>
                    <p style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
                      {step.details}
                    </p>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem" }}>
                  <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#C9603A" }}>
                    {expandedStep === i ? "Згорнути" : "Детальніше"}
                  </span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="2.5"
                    style={{ transform: expandedStep === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ display: "none" }} className="step-arrow" />
              )}
            </div>
          ))}
        </div>

        <div className="fade-up" style={{ textAlign: "center" }}>
          <button
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Розпочати проєкт →
          </button>
        </div>
      </div>
    </section>
  );
}


/* ─── RESULTS ─── */
function Results() {
  const items = [
    {
      title: "Конверсія в заявки",
      stat: "до 5%",
      desc: "Структура сторінки заточена під конверсію — кожен блок веде до дії",
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Завантаження за 1.2 сек",
      stat: "98/100",
      desc: "Google PageSpeed — ваш сайт не втрачає клієнтів через повільність",
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Mobile-first дизайн",
      stat: "80%",
      desc: "трафіку йде зі смартфонів — ваш сайт буде ідеальним на кожному екрані",
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
    },
  ];

  return (
    <section style={{ background: "#F0E6D3", padding: "4.5rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <span className="ws-tag">Що ви отримаєте</span>
          <div className="ws-divider" style={{ margin: "1rem auto" }}></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.75rem" }}>
            Результати, які відчуває бізнес
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "1rem", maxWidth: "460px", lineHeight: 1.75, margin: "0 auto" }}>
            Не просто красивий сайт — а робочий інструмент продажів
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
          {items.map((item, i) => (
            <div key={i} className={`ws-card fade-up fade-up-delay-${i + 1}`} style={{ border: "1px solid #E8D5C0", textAlign: "center", padding: "2rem 1.5rem" }}>
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "1rem", background: "linear-gradient(135deg, #C9603A, #E8895A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFAF5", margin: "0 auto 1rem" }}>
                {item.icon}
              </div>
              <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "2rem", color: "#C9603A", display: "block", marginBottom: "0.25rem" }}>
                {item.stat}
              </span>
              <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#4A2E1A", margin: "0 0 0.5rem" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.875rem", color: "#9E7A65", margin: 0, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ─── PORTFOLIO ─── */
function PortfolioCard({ title, tag, desc, result, images }: { title: string; tag: string; desc: string; result: string; images: string[] }) {
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setSlide(i => (i + 1) % images.length), 2000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        >
          <img src={images[slide]} alt={title} style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain", borderRadius: "0.5rem" }} />
          <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "2.5rem", height: "2.5rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        </div>
      )}

      <div className="ws-card" style={{ padding: 0, overflow: "hidden", border: "1px solid #E8D5C0", maxWidth: "420px", margin: "0 auto", width: "100%" }}>
        {/* Slideshow image */}
        <div
          style={{ height: "220px", overflow: "hidden", background: "#2C1A0E", position: "relative", cursor: "pointer" }}
          onClick={() => setLightbox(true)}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={title}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                opacity: i === slide ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          ))}
          {/* Dot indicators */}
          {images.length > 1 && (
            <div style={{ position: "absolute", bottom: "0.6rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.35rem", zIndex: 2 }}>
              {images.map((_, i) => (
                <div key={i} style={{ width: i === slide ? "1.25rem" : "0.4rem", height: "0.4rem", borderRadius: "1rem", background: i === slide ? "#C9603A" : "rgba(255,250,245,0.7)", transition: "all 0.3s" }} />
              ))}
            </div>
          )}
          {/* Expand hint */}
          <div style={{ position: "absolute", top: "0.6rem", right: "0.6rem", background: "rgba(0,0,0,0.4)", borderRadius: "0.4rem", padding: "0.2rem 0.4rem" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#FFFAF5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "1.25rem" }}>
          <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#C9603A", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(201,96,58,0.1)", padding: "0.2rem 0.6rem", borderRadius: "2rem", display: "inline-block", marginBottom: "0.6rem" }}>
            {tag}
          </span>
          <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#4A2E1A", margin: "0 0 0.4rem" }}>
            {title}
          </h3>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#C9603A", margin: "0 0 0.4rem", lineHeight: 1.4 }}>
            📈 {result}
          </p>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#5C3D2E", lineHeight: 1.6, margin: "0 0 1rem" }}>
            {desc}
          </p>
          <button
            className="btn-primary"
            style={{ width: "100%", textAlign: "center", fontSize: "0.875rem", padding: "0.65rem" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Хочу такий сайт →
          </button>
        </div>
      </div>
    </>
  );
}

function Portfolio() {
  const [active, setActive] = useState(0);
  const startX = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          window.gtag?.("event", "portfolio_view", {
            event_category: "engagement",
            event_label: "portfolio_section",
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cases = [
    {
      title: "Daddy Smoke",
      tag: "Інтернет-магазин",
      result: "Перші 30 замовлень за тиждень після запуску",
      desc: "Дизайн та розробка інтернет-магазину для українського виробника мангалів, грилів та BBQ обладнання",
      images: ["/portfolio/daddy-smoke-1.png", "/portfolio/daddy-smoke-2.png"],
    },
    {
      title: "Finik",
      tag: "Інтернет-магазин",
      result: "Конверсія 4.2% з першого місяця реклами",
      desc: "Сучасний інтернет-магазин сухофруктів, горіхів та східних солодощів з mobile-first дизайном",
      images: ["/portfolio/finik-3.png", "/portfolio/finik-1.png", "/portfolio/finik-2.png"],
    },
    {
      title: "Speak Up",
      tag: "Освітня платформа",
      result: "Час реєстрації скоротився з 5 до 2 хвилин",
      desc: "Корпоративний сайт та інтерактивна онлайн-платформа для вивчення англійської мови",
      images: ["/portfolio/speakup-1.png", "/portfolio/speakup-2.png", "/portfolio/speakup-3.png", "/portfolio/speakup-4.png"],
    },
    {
      title: "Play Vision",
      tag: "PWA-платформа",
      result: "500+ користувачів за перший місяць",
      desc: "Футбольна освітня PWA-платформа: хаб знань з фільтрацією курсів, менторинг, івенти та AI-помічник",
      images: ["/portfolio/play-vision-lap.png", "/portfolio/play-vision-tab.png", "/portfolio/play-vision-mb.png", "/portfolio/play-vision-desc.png"],
    },
    {
      title: "Beauty Shop",
      tag: "Інтернет-магазин",
      result: "PageSpeed 96/100 на мобільному",
      desc: "Онлайн-магазин косметики та інструментів для б'юті-майстрів: каталог, кошик, промокоди, особистий кабінет",
      images: ["/portfolio/beauty-shop-desc.png", "/portfolio/beauty-shop-lap.png", "/portfolio/beauty-shop-tab.png", "/portfolio/beauty-shop-mb.png"],
    },
  ];

  const fireCardClick = (method: string) => {
    window.gtag?.("event", "portfolio_card_click", {
      event_category: "engagement",
      event_label: method,
    });
  };

  const goNext = () => {
    setActive(i => Math.min(i + 1, cases.length - 1));
    fireCardClick("arrow");
  };
  const goPrev = () => {
    setActive(i => Math.max(i - 1, 0));
    fireCardClick("arrow");
  };

  // Cards behind active — peeking from the right-bottom
  const STACK_OFFSET_X = 14; // px per layer shift right
  const STACK_OFFSET_Y = 10; // px per layer shift down
  const STACK_ROTATE  =  2; // deg per layer tilt

  return (
    <section ref={sectionRef} style={{ background: "#FFFAF5", padding: "4.5rem 0", overflow: "clip" }}>
      <div className="ws-container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: "2.5rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <span className="ws-tag">Наші роботи</span>
            <div className="ws-divider"></div>
            <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.25rem" }}>
              Проєкти які ми реалізували
            </h2>
            <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "0.9rem", margin: 0 }}>
              {active + 1} / {cases.length}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, marginTop: "0.5rem" }}>
            <button
              onClick={goPrev}
              disabled={active === 0}
              style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "1px solid #E8D5C0", background: active === 0 ? "#F0E6D3" : "#FFFAF5", cursor: active === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={active === 0 ? "#C9B8A8" : "#4A2E1A"} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={goNext}
              disabled={active === cases.length - 1}
              style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "none", background: active === cases.length - 1 ? "#F0E6D3" : "#C9603A", cursor: active === cases.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={active === cases.length - 1 ? "#C9B8A8" : "#FFFAF5"} strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Deck wrapper — gives height for absolute children */}
        <div
          style={{ position: "relative", touchAction: "pan-y", userSelect: "none", overflow: "hidden", paddingBottom: "1rem" }}
          onTouchStart={e => {
            startX.current = e.touches[0].clientX;
            setDragging(true);
            setDragDelta(0);
          }}
          onTouchMove={e => {
            setDragDelta(e.touches[0].clientX - startX.current);
          }}
          onTouchEnd={() => {
            if (dragDelta < -40) { goNext(); fireCardClick("swipe"); }
            else if (dragDelta > 40) { goPrev(); fireCardClick("swipe"); }
            setDragging(false);
            setDragDelta(0);
          }}
        >
          {/* Invisible spacer — takes the height of one card so container doesn't collapse */}
          <div style={{ visibility: "hidden", pointerEvents: "none" }}>
            <PortfolioCard {...cases[active]} />
          </div>

          {/* All cards rendered absolutely, peeking from behind */}
          {[...cases].reverse().map((c, ri) => {
            const i = cases.length - 1 - ri; // original index
            const stackIndex = i - active;   // <0 = past, 0 = active, >0 = upcoming
            if (stackIndex < 0) return null;

            const isActive = stackIndex === 0;
            const zIndex = cases.length - stackIndex;

            const translateX = isActive
              ? dragging ? dragDelta * 0.25 : 0
              : stackIndex * STACK_OFFSET_X;
            const translateY = isActive ? 0 : stackIndex * STACK_OFFSET_Y;
            const rotate = isActive
              ? dragging ? dragDelta * 0.025 : 0
              : stackIndex * STACK_ROTATE;
            const scale = isActive ? 1 : Math.max(1 - stackIndex * 0.02, 0.94);
            const opacity = stackIndex > 2 ? 0 : 1;

            return (
              <div
                key={c.title}
                onClick={!isActive ? () => { setActive(i); fireCardClick("card"); } : undefined}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex,
                  opacity,
                  transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                  transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.34,1.4,0.64,1), opacity 0.3s",
                  transformOrigin: "top left",
                  cursor: isActive ? (dragging ? "grabbing" : "grab") : "pointer",
                  boxShadow: isActive
                    ? "0 16px 48px rgba(74,46,26,0.2)"
                    : `0 4px 16px rgba(74,46,26,0.08)`,
                }}
              >
                <PortfolioCard {...c} />
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "1rem",
                background: i === active ? "#C9603A" : "#E8D5C0",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}


/* ─── REVIEWS ─── */
function Reviews() {
  const reviews = [
    {
      quote: "З Warmsides пропрацювали цільову аудиторію і структуру сторінки. Конверсія в заявку зросла з 1.2% до 4.8% — це кардинально вплинуло на якість і кількість клієнтів.",
      name: "Наталія Сотніченко",
      role: "Співвласниця школи англійської NaEasy",
      initials: "НС",
      color: "#C9603A",
      photo: "/avatars/natalia.jpg",
    },
    {
      quote: "Запустили інтернет-магазин із чітким планом. Перші 30 замовлень отримали вже за перший тиждень після запуску реклами. Зручна адмінка, детальна статистика. 🔥",
      name: "Анна Савченко",
      role: "Маркетинговий директор Vapors",
      initials: "АС",
      color: "#8B6347",
      photo: "/avatars/andriy.jpg",
    },
    {
      quote: "Warmsides запропонували прості рішення, які зробили продукт зручнішим. Час на онбординг нових користувачів скоротився вдвічі — з 6 до 3 хвилин.",
      name: "Євген Костін",
      role: "CEO Freudika",
      initials: "ЄК",
      color: "#5C3D2E",
      photo: "/avatars/evgen.jpg",
    },

  ];

  return (
    <section id="reviews" style={{ background: "#F0E6D3", padding: "4.5rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "2rem" }}>
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
              <div style={{ borderTop: "1px solid #E8D5C0", paddingTop: "1rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #E8D5C0" }}>
                  <img
                    src={r.photo}
                    alt={r.name}
                    width="44"
                    height="44"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#4A2E1A" }}>{r.name}</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", marginTop: "0.2rem" }}>{r.role}</div>
                </div>
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
  const [form, setForm] = useState({ phone: "" });
  const [sent, setSent] = useState(() => new URLSearchParams(window.location.search).get("success") === "true");
  const [error, setError] = useState(false);
  const [priceRevealed, setPriceRevealed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleRevealPrice = () => {
    setPriceRevealed(true);
    window.gtag?.("event", "price_reveal_click", {
      event_category: "engagement",
      event_label: "price_block",
    });
    window.fbq?.("trackCustom", "PriceReveal");
  };

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
        name: "",
        phone: form.phone,
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
    <section id="contact" style={{ background: "#FFFAF5", padding: "4.5rem 0" }}>
      <div className="ws-container">

        {/* Heading */}
        <div className="fade-up" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <span className="ws-tag">Контакт</span>
          <div className="ws-divider" style={{ margin: "1rem auto" }}></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#4A2E1A", marginTop: 0, marginBottom: "0.5rem", lineHeight: 1.2 }}>
            Отримайте план і вартість безкоштовно
          </h2>
        </div>

        <div className="ws-grid-2col" style={{ display: "grid", gap: "2rem", alignItems: "start" }}>

          {/* Left — Form */}
          <div ref={formRef} className="fade-up ws-card" style={{ padding: "2.5rem" }}>
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
                  <a href="https://t.me/NS940828" target="_blank" rel="noopener noreferrer" onClick={() => {
                    window.gtag?.("event", "telegram_click", { event_category: "conversion", event_label: "contact_section" });
                    window.fbq?.("trackCustom", "TelegramClick");
                  }} style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#C9603A", textDecoration: "none" }}>
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
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#9E7A65", margin: "0 0 1rem" }}>Розрахуємо вартість і розповімо про етапи запуску</p>

                  {/* Price badge — reveal on click */}
                  {!priceRevealed ? (
                    <div
                      onClick={handleRevealPrice}
                      style={{
                        background: "linear-gradient(135deg, #C9603A, #E8895A)",
                        borderRadius: "1rem",
                        padding: "1rem 1.25rem",
                        marginBottom: "0.25rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        animation: "pulse-cta 2s ease-in-out infinite",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ fontSize: "1.3rem" }}>👆</span>
                        <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#FFFAF5", lineHeight: 1.3 }}>
                          Натисни, щоб дізнатися вартість
                        </span>
                      </div>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="rgba(255,250,245,0.8)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ) : (
                    <div style={{
                      background: "linear-gradient(135deg, #C9603A, #E8895A)",
                      borderRadius: "1rem",
                      padding: "1rem 1.25rem",
                      marginBottom: "0.25rem",
                      animation: "fadeInDown 0.35s ease",
                    }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.3rem" }}>
                        <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#FFFAF5", lineHeight: 1 }}>від $199</span>
                      </div>
                      <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "rgba(255,250,245,0.8)" }}>точну вартість розрахуємо під ваше завдання</span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#5C3D2E", display: "block", marginBottom: "0.5rem" }}>Телефон *</label>
                  <input
                    className="ws-input"
                    type="tel"
                    name="phone"
                    placeholder="+380 00 000 00 00"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </div>
                <input type="hidden" name="name" value="" />

                {error && (
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#C9603A", margin: 0, textAlign: "center" }}>
                    Помилка відправки. Спробуйте ще раз або напишіть на hello@warmsides.com
                  </p>
                )}
                <button type="submit" className="btn-primary" style={{ width: "100%", textAlign: "center", marginTop: "0.25rem" }}>
                  Отримати план за 10 хвилин →
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.25rem 0" }}>
                  <div style={{ flex: 1, height: "1px", background: "#E8D5C0" }} />
                  <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65" }}>або</span>
                  <div style={{ flex: 1, height: "1px", background: "#E8D5C0" }} />
                </div>

                <a
                  href="https://t.me/NS940828"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    window.gtag?.("event", "telegram_click", { event_category: "conversion", event_label: "contact_form" });
                    window.fbq?.("trackCustom", "TelegramClick");
                  }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.85rem 1.5rem", borderRadius: "0.75rem",
                    background: "#E8F4FD", border: "1px solid #B8D8EC",
                    fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem",
                    color: "#2AABEE", textDecoration: "none", transition: "background 0.2s",
                    width: "100%", boxSizing: "border-box",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2AABEE">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Написати в Telegram
                </a>
                </button>

              </form>
            )}
          </div>

          {/* Right — value props */}
          <div className="fade-up fade-up-delay-1">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                {
                  icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  title: "Безкоштовна консультація",
                  desc: "Розберемо вашу ідею і запропонуємо рішення",
                },
                {
                  icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Розрахунок вартості",
                  desc: "Отримаєте точну цифру під ваш проєкт",
                },
                {
                  icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Відповідь за 10 хвилин",
                  desc: "Менеджер зв'яжеться і відповість на всі питання",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem", background: "#FFF3ED", border: "1px solid #E8D5C0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#4A2E1A", margin: "0 0 0.2rem" }}>{item.title}</p>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#9E7A65", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingTop: "1.5rem", borderTop: "1px solid #E8D5C0" }}>
              {[
                { icon: "📍", text: "Одеса · Амстердам" },
                { icon: "📞", text: "+380 67 531 19 52", href: "tel:+380675311952" },
                { icon: "✉️", text: "hello@warmsides.com" },
              ].map(({ icon, text, href }: { icon: string; text: string; href?: string }) => (
                <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  {href ? (
                    <a href={href} onClick={() => {
                      window.gtag?.("event", "phone_click", { event_category: "conversion", event_label: "contact_info" });
                      window.fbq?.("trackCustom", "PhoneClick");
                    }} style={{ fontFamily: "Nunito, sans-serif", color: "#C9603A", fontSize: "0.95rem", textDecoration: "none", fontWeight: 600 }}>{text}</a>
                  ) : (
                    <span style={{ fontFamily: "Nunito, sans-serif", color: "#5C3D2E", fontSize: "0.95rem" }}>{text}</span>
                  )}
                </div>
              ))}
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
              { label: "Telegram", href: "https://t.me/NS940828", event: "telegram_click" },
              { label: "WhatsApp", href: "https://wa.me/380675311952", event: "whatsapp_click" },
              { label: "hello@warmsides.com", href: "mailto:hello@warmsides.com", event: "email_click" },
            ].map(({ label, href, event }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", color: "#F0E6D3", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }}
                onClick={() => {
                  window.gtag?.("event", event, { event_category: "conversion", event_label: "footer" });
                  if (event === "telegram_click") window.fbq?.("trackCustom", "TelegramClick");
                  if (event === "whatsapp_click") window.fbq?.("trackCustom", "WhatsAppClick");
                }}
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
            Одеса · Амстердам
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      q: "Скільки часу займе розробка?",
      a: "Лендінг — 1–2 тижні, корпоративний сайт — 3–4 тижні, інтернет-магазин — 4–6 тижнів. Це фіксований дедлайн, а не приблизна оцінка.",
    },
    {
      q: "Що якщо мені не сподобається результат?",
      a: "Ми презентуємо дизайн до верстки і вносимо правки до затвердження. До 3 раундів правок включено. Якщо після запуску щось потрібно змінити — перші 2 тижні правки безкоштовно.",
    },
    {
      q: "Чи є підтримка після здачі проєкту?",
      a: "Так. Протягом 30 днів після запуску ми на зв'язку і виправляємо баги безкоштовно. Подальша підтримка обговорюється окремо.",
    },
    {
      q: "Що потрібно від мене для старту?",
      a: "Тільки ваша ідея або приклади сайтів, які подобаються. Тексти, фото та структуру ми допоможемо підготувати.",
    },
  ];

  const handleToggle = (i: number) => {
    const wasOpen = open === i;
    setOpen(wasOpen ? null : i);
    if (!wasOpen) {
      window.gtag?.("event", "faq_click", {
        event_category: "engagement",
        event_label: items[i].q,
      });
    }
  };

  return (
    <section style={{ background: "#F0E6D3", padding: "4rem 0" }}>
      <div className="ws-container">
        <div className="fade-up" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <span className="ws-tag">Питання та відповіді</span>
          <div className="ws-divider" style={{ margin: "1rem auto" }}></div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#4A2E1A", marginTop: 0 }}>
            Часті запитання
          </h2>
        </div>

        <div className="fade-up" style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{ background: "#FFFAF5", borderRadius: "1rem", border: "1px solid #E8D5C0", overflow: "hidden" }}
            >
              <button
                onClick={() => handleToggle(i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "1.25rem 1.5rem", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "1rem", textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#4A2E1A", lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <svg
                  width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="2.5"
                  style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.25rem" }}>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", color: "#5C3D2E", lineHeight: 1.7, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── PAGE ─── */

function StickyButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling 300px, hide when contact section is visible
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        const contactVisible = rect.top < window.innerHeight * 0.8;
        setVisible(window.scrollY > 300 && !contactVisible);
      } else {
        setVisible(window.scrollY > 300);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.gtag?.('event', 'sticky_cta_click', {
      event_category: 'engagement',
      event_label: 'sticky_button',
    });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(120px)',
        zIndex: 1000,
        background: '#C9603A',
        color: '#FFFAF5',
        border: 'none',
        borderRadius: '3rem',
        padding: '0.85rem 2rem',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 800,
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(201,96,58,0.45)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.4,0.64,1)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      Отримати план і ціну →
    </button>
  );
}

export default function Home() {
  useFadeUp();

  return (
    <>
      <Nav />
      <Hero />
      <Solution />
      <Results />
      <Portfolio />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <StickyButton />
    </>
  );
}
