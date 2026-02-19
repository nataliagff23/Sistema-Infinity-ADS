import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id: 0,
    phase: "PREPARACIÓN",
    title: "Antes de Empezar",
    icon: "⚙️",
    color: "#C9A84C",
    description: "Reúne todo lo necesario antes de iniciar el proceso creativo.",
    details: [
      "Tener a mano el Documento Matriz de Creativos con: Briefing de la empresa + transcripción del Workshop.",
      "Tener listo el link de Canva del cliente.",
      "Abrir el ChatGPT del equipo.",
    ],
    output: "Documentos listos y organizados para alimentar los GPTs.",
    link: null,
    linkLabel: null,
    duration: "5-10 min",
    inputNeeded: "Briefing + Workshop + Canva",
    outputDeliverable: "Documentos organizados",
  },
  {
    id: 1,
    phase: "PASO 1",
    title: "Análisis del Consumidor",
    icon: "🧠",
    color: "#4A7BF7",
    description:
      "Transforma cualquier descripción o transcripción de un cliente en un análisis estratégico completo de mercado, basado en psicología del consumidor y listo para usar en campañas Meta Ads.",
    details: [
      "Pegar documentos de Briefing o Workshop y solicitar que haga el análisis.",
      "El resultado se pega en el Documento Matriz.",
      "Importante: leer bien para confirmar que el análisis sea correcto y no dé información errada o se enfoque en lo que no es.",
    ],
    output:
      "Insights organizados: dolores, deseos, creencias, tensiones, segmentos y mecanismos.",
    link: "https://chatgpt.com/g/g-69246916acc88191bec3f58daaf5d713-infinitus-ads-1-analista-de-mercado-consumidor",
    linkLabel: "Abrir Analista de Mercado",
    duration: "15-20 min",
    inputNeeded: "Briefing + Workshop",
    outputDeliverable: "Análisis de mercado completo",
  },
  {
    id: 2,
    phase: "PASO 2",
    title: "Headline Engine",
    icon: "✍️",
    color: "#F7A94A",
    description:
      "Crea headlines y textos visuales de alto impacto para Meta Ads. Copy directo basado en psicología de conversión que detiene el scroll y genera resultados medibles.",
    details: [
      "Pegar el Análisis de Mercado generado en el paso anterior.",
      "Generar 20 ideas de headlines (variedad de ángulos).",
      "Hacer curación para quedarnos con 10 titulares finalistas.",
      "Ajustar esos 10 de forma manual (claridad, intención, emoción, promesa, compliance).",
      "Pasan a curación de contenido para orden y validación final.",
    ],
    output: "10 headlines pulidos listos para testear.",
    link: "https://chatgpt.com/g/g-69246916acc88191bec3f58daaf5d713-infinitus-ads-1-analista-de-mercado-consumidor",
    linkLabel: "Abrir Headline Engine",
    duration: "20-30 min",
    inputNeeded: "Análisis de mercado",
    outputDeliverable: "20 headlines → 10 finalistas",
  },
  {
    id: 3,
    phase: "PASO 3",
    title: "Curador de Contenido",
    icon: "📋",
    color: "#5BC4A8",
    description:
      "Curará y editará los 10 copys que le des en un formato claro, listo para pegar en el GPT de Imágenes.",
    details: [
      "Pegar los 10 copys seleccionados para testear.",
      "Luego pasar al documento de curación de contenido.",
    ],
    output: "10 copys curados y formateados para el siguiente paso.",
    link: "https://chatgpt.com/g/g-69921df6889c8191a274c98c89dd78b0-3-curador-de-headline-imperians",
    linkLabel: "Abrir Curador de Headline",
    duration: "10-15 min",
    inputNeeded: "10 headlines finalistas",
    outputDeliverable: "Copys curados y formateados",
  },
  {
    id: 4,
    phase: "PASO 4",
    title: "Creación de Imágenes",
    icon: "🎨",
    color: "#E55B8E",
    description:
      "Crea imágenes publicitarias de referencia/uso para Meta ADS. Diseños estratégicos aplicados a publicidad.",
    details: [
      "Hacer anuncio por anuncio.",
      "Pegar 1 texto de imagen en 1 texto de imagen por chat (pueden abrir 3 chats al mismo tiempo).",
    ],
    output: "Imágenes 1080x1080 con HOOK, BODY, SUBBODY y CTA.",
    link: "https://chatgpt.com/g/g-697d4f8b0c288191a692c6f4ace98f9f-creador-de-imagenes-imperians",
    linkLabel: "Abrir Creador de Imágenes",
    duration: "30-45 min",
    inputNeeded: "Copys curados + colores",
    outputDeliverable: "Imágenes publicitarias",
    formatInfo: {
      formato: "1080 x 1080",
      colores: "Elegir 2-3 colores máximo",
      estructura: ["HOOK", "BODY", "SUBBODY (cuando aplique)", "CTA (EN MAYÚSCULA)"],
    },
  },
  {
    id: 5,
    phase: "PASO 5",
    title: "The Copy Emperor",
    icon: "👑",
    color: "#9B5BF7",
    description:
      "Convierte cualquier anuncio en una máquina de conversiones. Comparte tu creatividad y obtén copys imperiales con las fórmulas que dominan la publicidad digital.",
    details: [
      "Hacer anuncio por anuncio.",
      "Pegar 1 texto de imagen en 1 texto de imagen por chat (pueden abrir 3 chats al mismo tiempo).",
    ],
    output: "Copys de ads optimizados para conversión.",
    link: "https://chatgpt.com/g/g-698e537c99ac8191b54cae07a857cce6-5-the-copy-emperor-imperians",
    linkLabel: "Abrir Copy Emperor",
    duration: "20-30 min",
    inputNeeded: "Texto de imagen por anuncio",
    outputDeliverable: "Copys imperiales de ads",
  },
  {
    id: 6,
    phase: "PASO 6",
    title: "Auditor de Ads",
    icon: "🔍",
    color: "#F75B5B",
    description:
      "Analiza tus creatividades de Meta Ads como QA: diseño + conversión + compliance, con un score sobre 100.",
    details: [
      "Subir la creatividad terminada para revisión.",
      "Recibir un reporte accionable con riesgos de rechazo y mejoras concretas para publicar y vender mejor.",
    ],
    output: "Score /100 + reporte con mejoras concretas.",
    link: "https://chatgpt.com/g/g-698d3c1f7d708191894ab43badf1ba16-6-auditor-de-ads-imperians-agency",
    linkLabel: "Abrir Auditor de Ads",
    duration: "10-15 min",
    inputNeeded: "Creatividad terminada",
    outputDeliverable: "Score + reporte de mejoras",
  },
  {
    id: 7,
    phase: "PASO 7",
    title: "Testear & Resultados",
    icon: "📊",
    color: "#C9A84C",
    description:
      "Lanza los anuncios en Meta Ads, monitorea métricas clave y optimiza en base a datos reales.",
    details: [
      "Subir las creatividades aprobadas a Meta Ads Manager.",
      "Configurar el A/B testing con los 10 anuncios.",
      "Monitorear CTR, CPL, ROAS y conversiones.",
      "Escalar los ganadores y pausar los que no performan.",
    ],
    output: "Campañas activas con datos para optimización continua.",
    link: null,
    linkLabel: null,
    duration: "Ongoing",
    inputNeeded: "Creatividades aprobadas",
    outputDeliverable: "Campañas live + métricas",
  },
];

const GoldShimmer = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C9A84C" />
        <stop offset="50%" stopColor="#F0D78C" />
        <stop offset="100%" stopColor="#C9A84C" />
      </linearGradient>
    </defs>
  </svg>
);

const ProgressLine = ({ activeStep, totalSteps }) => {
  const pct = (activeStep / (totalSteps - 1)) * 100;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 4,
        background: "rgba(201,168,76,0.15)",
        borderRadius: 2,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, #C9A84C, #F0D78C, #C9A84C)",
          borderRadius: 2,
          transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 12px rgba(201,168,76,0.4)",
        }}
      />
    </div>
  );
};

export default function InfinitusAdsPlatform() {
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const contentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToStep = (idx) => {
    if (idx === activeStep || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveStep(idx);
      setAnimating(false);
    }, 250);
  };

  const step = STEPS[activeStep];
  const isMobile = windowWidth < 640;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B1120",
        color: "#E8E4DD",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GoldShimmer />

      {/* Ambient BG */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(74,123,247,0.03) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          padding: "28px 32px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src="/logo-imperians.png"
            alt="Imperians"
            style={{
              height: 48,
              width: "auto",
              objectFit: "contain",
            }}
          />
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 3,
                color: "#F0D78C",
                fontFamily: "'Cinzel', serif",
              }}
            >
              IMPERIANS
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 4,
                color: "rgba(201,168,76,0.6)",
                marginTop: 1,
                fontFamily: "'Cinzel', serif",
              }}
            >
              ADS AGENCY
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            letterSpacing: 3,
            color: "rgba(201,168,76,0.5)",
            textTransform: "uppercase",
          }}
        >
          Infinitus Ads System
        </div>
      </header>

      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "48px 32px 20px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease",
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: 6,
            color: "rgba(201,168,76,0.6)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          Sistema de Diversidad Creativa Estratégica
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 400,
            letterSpacing: 2,
            margin: 0,
            background:
              "linear-gradient(135deg, #C9A84C 0%, #F0D78C 40%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Cinzel', serif",
          }}
        >
          INFINITUS ADS
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "rgba(232,228,221,0.5)",
            maxWidth: 520,
            margin: "12px auto 0",
            lineHeight: 1.7,
          }}
        >
          7 pasos para crear anuncios de alto rendimiento con inteligencia
          artificial
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px 48px",
        }}
      >
        {/* Step Nav Pills */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToStep(i)}
              style={{
                border:
                  i === activeStep
                    ? "1px solid rgba(201,168,76,0.6)"
                    : "1px solid rgba(201,168,76,0.12)",
                background:
                  i === activeStep
                    ? "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))"
                    : "rgba(201,168,76,0.03)",
                color:
                  i === activeStep ? "#F0D78C" : "rgba(232,228,221,0.45)",
                borderRadius: 24,
                padding: "8px 16px",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: 0.5,
              }}
            >
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span style={{ display: isMobile ? "none" : "inline" }}>
                {s.title}
              </span>
              <span style={{ display: isMobile ? "inline" : "none" }}>
                {i}
              </span>
            </button>
          ))}
        </div>

        <ProgressLine activeStep={activeStep} totalSteps={STEPS.length} />

        {/* Step Content Card */}
        <div
          ref={contentRef}
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "all 0.25s ease",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(15,22,42,0.95), rgba(11,17,32,0.98))",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                padding: "28px 32px 24px",
                borderBottom: "1px solid rgba(201,168,76,0.08)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 250 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${step.color}22, ${step.color}08)`,
                      border: `1px solid ${step.color}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: 4,
                        color: step.color,
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      {step.phase}
                    </div>
                    <h2
                      style={{
                        fontSize: 26,
                        fontWeight: 600,
                        margin: 0,
                        color: "#F0D78C",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {step.title}
                    </h2>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "rgba(232,228,221,0.65)",
                    margin: "12px 0 0",
                    maxWidth: 600,
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Meta badges */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  alignSelf: "flex-start",
                }}
              >
                <div
                  style={{
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center",
                    minWidth: 90,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: 2,
                      color: "rgba(201,168,76,0.5)",
                      marginBottom: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    Duración
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: "#F0D78C",
                      fontWeight: 600,
                    }}
                  >
                    {step.duration}
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    textAlign: "center",
                    minWidth: 90,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: 2,
                      color: "rgba(201,168,76,0.5)",
                      marginBottom: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    Paso
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: "#F0D78C",
                      fontWeight: 600,
                    }}
                  >
                    {activeStep + 1} / {STEPS.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 0,
              }}
            >
              {/* Left: Instructions */}
              <div
                style={{
                  padding: "28px 32px",
                  borderRight: isMobile
                    ? "none"
                    : "1px solid rgba(201,168,76,0.06)",
                  borderBottom: isMobile
                    ? "1px solid rgba(201,168,76,0.06)"
                    : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: 3,
                    color: step.color,
                    marginBottom: 16,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Instrucciones
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {step.details.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          background: `${step.color}15`,
                          border: `1px solid ${step.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: step.color,
                          flexShrink: 0,
                          marginTop: 1,
                          fontFamily: "monospace",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          lineHeight: 1.65,
                          color: "rgba(232,228,221,0.7)",
                        }}
                      >
                        {d}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Format info for step 4 */}
                {step.formatInfo && (
                  <div
                    style={{
                      marginTop: 20,
                      padding: 16,
                      background: "rgba(201,168,76,0.04)",
                      border: "1px solid rgba(201,168,76,0.1)",
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: 2,
                        color: "rgba(201,168,76,0.6)",
                        marginBottom: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      Formato de Texto
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(232,228,221,0.6)",
                        lineHeight: 1.8,
                      }}
                    >
                      <div>
                        <strong style={{ color: "#F0D78C" }}>Formato:</strong>{" "}
                        {step.formatInfo.formato}
                      </div>
                      <div>
                        <strong style={{ color: "#F0D78C" }}>Colores:</strong>{" "}
                        {step.formatInfo.colores}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <strong style={{ color: "#F0D78C" }}>
                          Estructura:
                        </strong>
                      </div>
                      {step.formatInfo.estructura.map((item, i) => (
                        <div key={i} style={{ paddingLeft: 12 }}>
                          → {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Output + CTA */}
              <div style={{ padding: "28px 32px" }}>
                {/* Input / Output Flow */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(74,123,247,0.06)",
                      border: "1px solid rgba(74,123,247,0.15)",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: 2,
                        color: "#4A7BF7",
                        marginBottom: 6,
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      📥 Input Necesario
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "rgba(232,228,221,0.7)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.inputNeeded}
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      color: "rgba(201,168,76,0.3)",
                      fontSize: 18,
                    }}
                  >
                    ↓
                  </div>

                  <div
                    style={{
                      background: "rgba(91,196,168,0.06)",
                      border: "1px solid rgba(91,196,168,0.15)",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: 2,
                        color: "#5BC4A8",
                        marginBottom: 6,
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      📤 Output / Resultado
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "rgba(232,228,221,0.7)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.output}
                    </div>
                  </div>
                </div>

                {/* GPT Link CTA */}
                {step.link ? (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "16px 24px",
                      background:
                        "linear-gradient(135deg, #C9A84C, #D4B65E)",
                      borderRadius: 14,
                      color: "#0B1120",
                      fontSize: 16,
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: 1,
                      fontFamily: "'Poppins', sans-serif",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 24px rgba(201,168,76,0.25)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 8px 32px rgba(201,168,76,0.4)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 24px rgba(201,168,76,0.25)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span style={{ fontSize: 18 }}>🚀</span>
                    {step.linkLabel}
                  </a>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      padding: "16px 24px",
                      background: "rgba(91,196,168,0.08)",
                      border: "1px solid rgba(91,196,168,0.25)",
                      borderRadius: 14,
                      color: "#5BC4A8",
                      fontSize: 15,
                      letterSpacing: 0.5,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(91,196,168,0.15)",
                        border: "2px solid #5BC4A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {activeStep === 0
                      ? "Paso de preparación manual"
                      : "Paso ejecutado en Meta Ads Manager"}
                  </div>
                )}

                {/* Nav */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => goToStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    style={{
                      flex: 1,
                      padding: "12px 20px",
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.15)",
                      borderRadius: 10,
                      color:
                        activeStep === 0
                          ? "rgba(232,228,221,0.2)"
                          : "rgba(232,228,221,0.7)",
                      fontSize: 14,
                      cursor:
                        activeStep === 0 ? "not-allowed" : "pointer",
                      fontFamily: "'Poppins', sans-serif",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() =>
                      goToStep(
                        Math.min(STEPS.length - 1, activeStep + 1)
                      )
                    }
                    disabled={activeStep === STEPS.length - 1}
                    style={{
                      flex: 1,
                      padding: "12px 20px",
                      background:
                        activeStep === STEPS.length - 1
                          ? "rgba(201,168,76,0.06)"
                          : "rgba(201,168,76,0.12)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: 10,
                      color:
                        activeStep === STEPS.length - 1
                          ? "rgba(232,228,221,0.2)"
                          : "#F0D78C",
                      fontSize: 14,
                      cursor:
                        activeStep === STEPS.length - 1
                          ? "not-allowed"
                          : "pointer",
                      fontFamily: "'Poppins', sans-serif",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Bar */}
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              color: "rgba(201,168,76,0.4)",
              textAlign: "center",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Acceso Rápido a los GPTs
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 10,
            }}
          >
            {STEPS.filter((s) => s.link).map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 16px",
                  background: "rgba(15,22,42,0.8)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}55`;
                  e.currentTarget.style.background = `${s.color}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(201,168,76,0.1)";
                  e.currentTarget.style.background = "rgba(15,22,42,0.8)";
                }}
              >
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: s.color,
                      letterSpacing: 1,
                      marginBottom: 2,
                    }}
                  >
                    {s.phase}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(232,228,221,0.7)",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {s.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              color: "rgba(201,168,76,0.3)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            IMPERIANS ADS AGENCY © 2025
          </div>
        </div>
      </div>
    </div>
  );
}
