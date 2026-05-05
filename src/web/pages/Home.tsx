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
  return (
    <section id="hero" style={{ background: "#FFFAF5", padding: "5rem 0 3rem", position: "relative", overflow: "hidden", maxWidth: "100%" }}>
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
          <span className="ws-tag">Сайт під ключ</span>
          <span className="ws-tag">Фіксована ціна</span>
          <span className="ws-tag">Готовність до реклами</span>
        </div>

        {/* Headline */}
        <h1 className="fade-up fade-up-delay-1" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1.1, color: "#4A2E1A", maxWidth: "800px", marginBottom: "1.5rem" }}>
          За 4 тижні запустимо сайт,{" "}
          <span className="ws-gradient-text">який приводить заявки</span>,{" "}
          а не зливає трафік
        </h1>

        {/* Sub */}
        <p className="fade-up fade-up-delay-2" style={{ fontFamily: "Nunito, sans-serif", fontSize: "1.15rem", color: "#5C3D2E", maxWidth: "560px", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          Розробляємо сайти під ключ — від дизайну до запуску.
        </p>

        {/* CTAs */}
        <div className="fade-up fade-up-delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2rem" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Дізнатися вартість →
          </button>
          <button className="btn-outline" onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}>
            Наші послуги
          </button>
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
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

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
              <div className="ws-card" style={{ height: "100%", border: "1px solid #E8D5C0", padding: "2rem 1.75rem" }}>
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
      pain: "Є ідея для бізнесу, але немає сайту",
      result: "Отримуєте готовий сайт під ключ за 4 тижні",
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      pain: "Не знаєте з чого почати і скільки це коштує",
      result: "Чіткий план, фіксована ціна — без сюрпризів",
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      pain: "Боїтесь витратити гроші і не отримати результат",
      result: "Сайт готовий до реклами і налаштований на заявки",
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
            Є ідея — зробимо сайт який продає
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#9E7A65", fontSize: "1rem", maxWidth: "460px", lineHeight: 1.75, margin: "0 auto" }}>
            Беремо на себе все — від структури до запуску
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px", margin: "0 auto" }}>
          {items.map((item, i) => (
            <div key={i} className={`fade-up fade-up-delay-${i + 1}`} style={{ background: "#FFFAF5", borderRadius: "1.25rem", padding: "1.5rem", border: "1px solid #E8D5C0", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              {/* Icon */}
              <div style={{ width: "3rem", height: "3rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #C9603A, #E8895A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFAF5", flexShrink: 0 }}>
                {item.icon}
              </div>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#9E7A65", margin: "0 0 0.4rem", lineHeight: 1.5 }}>
                  {item.pain}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#C9603A" strokeWidth="3" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#4A2E1A", margin: 0, lineHeight: 1.5 }}>
                    {item.result}
                  </p>
                </div>
              </div>
            </div>
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
  const [form, setForm] = useState({ name: "", phone: "" });
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

        <div className="ws-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>

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
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#9E7A65", margin: 0 }}>Розрахуємо вартість і розповімо про етапи запуску</p>
                </div>

                <div>
                  <label style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#5C3D2E", display: "block", marginBottom: "0.5rem" }}>Ваше ім'я *</label>
                  <input
                    className="ws-input"
                    type="text"
                    name="name"
                    placeholder="Іван Іваненко"
                    autoComplete="name"
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
                    autoComplete="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "#C9603A", margin: 0, textAlign: "center" }}>
                    Помилка відправки. Спробуйте ще раз або напишіть на hello@warmsides.com
                  </p>
                )}
                <button type="submit" className="btn-primary" style={{ width: "100%", textAlign: "center", marginTop: "0.25rem" }}>
                  Дізнатися вартість
                </button>
                <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.8rem", color: "#9E7A65", textAlign: "center", margin: 0 }}>
                  Менеджер Вікторія · Зазвичай відповідаємо за 1–2 год
                </p>
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
      <Solution />
      <Results />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}
