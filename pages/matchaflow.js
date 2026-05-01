import Head from "next/head"
import dynamic from "next/dynamic"
import { useState } from "react"

const IntroAnimation = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false }
)

const StackedCardsInteraction = dynamic(
  () => import("@/components/ui/stacked-cards-interaction").then(mod => ({ default: mod.StackedCardsInteraction })),
  { ssr: false }
)

const HoverBrandLogo = dynamic(
  () => import("@/components/ui/hover-brand-logo"),
  { ssr: false }
)

const menuItems = [
  {
    name: "Matcha Latte",
    desc: "Notre classique onctueux, lait d'avoine et matcha ceremonial grade.",
    price: "6.50",
    tag: "Best-seller",
    category: "Chaud",
    image: "/matcha/menu-latte.jpg",
  },
  {
    name: "Matcha Ice",
    desc: "Frappé glacé au matcha, une fraîcheur incomparable.",
    price: "7.00",
    tag: "Rafraîchissant",
    category: "Froid",
    image: "/matcha/menu-ice.jpg",
  },
  {
    name: "Matcha Premium",
    desc: "Matcha ceremonial pur, préparé à la traditionnelle avec un chasen.",
    price: "8.50",
    tag: "Premium",
    category: "Chaud",
    image: "/matcha/menu-premium.jpg",
  },
  {
    name: "Matcha Bubble",
    desc: "Thé au matcha avec perles de tapioca maison.",
    price: "7.50",
    tag: "Gourmand",
    category: "Froid",
    image: "/matcha/menu-bubble.jpg",
  },
  {
    name: "Matcha Smoothie",
    desc: "Blend de matcha, banane, épinards et lait de coco.",
    price: "8.00",
    tag: "Healthy",
    category: "Froid",
    image: "/matcha/menu-smoothie.jpg",
  },
  {
    name: "Matcha Chai",
    desc: "Fusion épicée entre le chai masala et notre matcha signature.",
    price: "7.00",
    tag: "Unique",
    category: "Chaud",
    image: "/matcha/menu-chai.jpg",
  },
]

const menuCategories = ["Tout", "Chaud", "Froid"]

const steps = [
  {
    num: "01",
    title: "Sélection",
    desc: "Nos feuilles de thé vert sont cultivées dans l'ombre à Uji, Japon, puis broyées lentement entre pierres de granit.",
  },
  {
    num: "02",
    title: "Préparation",
    desc: "Chaque boisson est préparée à la commande avec précision, fouettée au chasen pour une texture parfaite.",
  },
  {
    num: "03",
    title: "Dégustation",
    desc: "Savourez l'équilibre entre umami, douceur végétale et onctuosité. Une expérience sensorielle complète.",
  },
]

const sectionStyle = (bg = "#f0ebe0") => ({
  padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
  background: bg,
})

const sectionInner = { maxWidth: "1100px", margin: "0 auto" }

const heading2 = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  color: "#2a2a1e",
  margin: "0 0 1rem 0",
}

const label = {
  fontSize: "0.7rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#6b7a3a",
  marginBottom: "0.75rem",
  fontWeight: 600,
}

export default function MatchaFlow() {
  const [activeCategory, setActiveCategory] = useState("Tout")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const filteredItems = activeCategory === "Tout"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  const navLinks = [
    { label: "Notre Histoire", id: "notre-histoire" },
    { label: "La Carte", id: "la-carte" },
    { label: "L'Expérience", id: "lexperience" },
    { label: "Réserver", id: "reservation" },
    { label: "Contact", id: "contact" },
  ]

  const [reservation, setReservation] = useState({
    name: "", email: "", date: "", time: "", guests: "2", message: ""
  })
  const [reservationSent, setReservationSent] = useState(false)

  const handleReservation = (e) => {
    e.preventDefault()
    setReservationSent(true)
    setTimeout(() => setReservationSent(false), 4000)
    setReservation({ name: "", email: "", date: "", time: "", guests: "2", message: "" })
  }

  return (
    <>
      <Head>
        <title>MatchaFlow — L'Art du Matcha</title>
        <meta
          name="description"
          content="MatchaFlow, restaurant de matcha artisanal. Découvrez notre sélection de boissons au matcha ceremonial grade."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          background: "#f0ebe0",
          color: "#2a2a1e",
          overflowX: "hidden",
        }}
      >
        {/* ── NAVBAR ── */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "clamp(1rem, 3vw, 1.25rem) clamp(1rem, 5vw, 2.5rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(16px)",
            background: "rgba(240, 235, 224, 0.8)",
            borderBottom: "1px solid rgba(107, 122, 58, 0.12)",
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              fontWeight: 600,
              color: "#6b7a3a",
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            MatchaFlow
          </a>
          {/* Desktop nav */}
          <div className="desktop-nav">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  color: "#5a5a48",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#6b7a3a")}
                onMouseLeave={(e) => (e.target.style.color = "#5a5a48")}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#reservation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "9999px",
                background: "#6b7a3a",
                color: "#f5f0e1",
                textDecoration: "none",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                transition: "background 0.3s",
                marginLeft: "1rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#5a6a2e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#6b7a3a")}
            >
              Réserver
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            className="mobile-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
            }}
          >
            <span style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#6b7a3a",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#6b7a3a",
              borderRadius: 2,
              transition: "all 0.3s",
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#6b7a3a",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </nav>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(240,235,224,0.98)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
            className="mobile-menu-overlay"
          >
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#2a2a1e",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "9999px",
                background: "#6b7a3a",
                color: "#f5f0e1",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                marginTop: "1rem",
              }}
            >
              Réserver
            </a>
          </div>
        )}

        {/* ── HERO ANIMATION ── */}
        <section
          style={{
            height: "100vh",
            minHeight: "min(700px, 100svh)",
            position: "relative",
          }}
        >
          <IntroAnimation />
        </section>

        {/* ── NOTRE BOUTIQUE ── */}
        <section
          id="notre-boutique"
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            background: "linear-gradient(180deg, #f5f0e1 0%, #f0ebe0 100%)",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 5vw, 4rem)",
              alignItems: "center",
            }}
            className="grid-2col"
          >
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#6b7a3a",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Notre Boutique
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#2a2a1e",
                  margin: "0 0 1.25rem 0",
                }}
              >
                Un lieu, <span style={{ color: "#6b7a3a" }}>une expérience</span>
              </h2>
              <p
                style={{
                  color: "#6b5e4e",
                  lineHeight: 1.8,
                  fontSize: "0.92rem",
                  marginBottom: "1.25rem",
                }}
              >
                Entrez dans un espace où le minimalisme japonais rencontre le chic parisien.
                Notre boutique est conçue comme un havre de paix, idéal pour savourer un matcha
                en toute sérénité.
              </p>
              <p
                style={{
                  color: "#6b5e4e",
                  lineHeight: 1.8,
                  fontSize: "0.92rem",
                  marginBottom: "2rem",
                }}
              >
                Chaque détail — de la céramique artisanale à l'éclairage tamisé — a été
                pensé pour sublimer votre moment matcha.
              </p>
              <div style={{ display: "flex", gap: "clamp(1.5rem, 4vw, 2.5rem)", flexWrap: "wrap" }}>
                {[
                  { val: "42R", label: "Faubourg Saint-Honoré" },
                  { val: "Paris", label: "8ème arrondissement" },
                  { val: "50+", label: "Places assises" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.75rem",
                        color: "#6b7a3a",
                        fontWeight: 500,
                      }}
                    >
                      {stat.val}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#8a8578",
                        letterSpacing: "0.05em",
                        marginTop: "0.2rem",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "420px",
              }}
            >
              <StackedCardsInteraction
                cards={[
                  {
                    image: "/matcha/shop-interior.jpg",
                    title: "L'Espace",
                    description: "Un cadre épuré inspiré du Japon.",
                  },
                  {
                    image: "/matcha/shop-cosy.jpg",
                  },
                  {
                    image: "/matcha/shop-counter.jpg",
                    title: "L'Ambiance",
                    description: "Sérénité et douceur de vivre.",
                  },
                ]}
                spreadDistance={130}
                rotationAngle={10}
              />
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="notre-histoire"
          style={{
            ...sectionStyle("#f0ebe0"),
          }}
        >
          <div
            style={{
              ...sectionInner,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 5vw, 4rem)",
              alignItems: "center",
            }}
            className="grid-2col"
          >
            <div>
              <div style={label}>Notre Histoire</div>
              <h2 style={heading2}>
                Du jardin d'Uji
                <br />
                <span style={{ color: "#6b7a3a" }}>à votre tasse</span>
              </h2>
              <p
                style={{
                  color: "#6b5e4e",
                  lineHeight: 1.8,
                  fontSize: "0.92rem",
                  marginBottom: "1.25rem",
                }}
              >
                MatchaFlow est né d'une passion pour le thé vert japonais et d'un
                désir de partager l'authenticité du matcha ceremonial. Nos
                feuilles sont soigneusement sélectionnées dans les plantations
                ombragées d'Uji, au Japon, puis broyées lentement entre des
                pierres de granit traditionnelles.
              </p>
              <p
                style={{
                  color: "#6b5e4e",
                  lineHeight: 1.8,
                  fontSize: "0.92rem",
                  marginBottom: "2rem",
                }}
              >
                Chaque boisson est une célébration de ce rituel centenaire,
                réinventée avec créativité pour le palais contemporain.
              </p>
              <div style={{ display: "flex", gap: "clamp(1.5rem, 4vw, 2.5rem)", flexWrap: "wrap" }}>
                {[
                  { val: "100%", label: "Ceremonial Grade" },
                  { val: "Uji", label: "Origine Japon" },
                  { val: "2024", label: "Fondation" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.75rem",
                        color: "#6b7a3a",
                        fontWeight: 500,
                      }}
                    >
                      {stat.val}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#8a8578",
                        letterSpacing: "0.05em",
                        marginTop: "0.2rem",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                aspectRatio: "4/5",
                position: "relative",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&q=80"
                alt="Matcha preparation"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(240,235,224,0.4) 100%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── MENU ── */}
        <section
          id="la-carte"
          style={{
            ...sectionStyle("#e8e3d8"),
          }}
        >
          <div style={sectionInner}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={label}>La Carte</div>
              <h2 style={heading2}>Nos Boissons Signature</h2>
              <p
                style={{
                  color: "#6b5e4e",
                  maxWidth: "42ch",
                  margin: "0.5rem auto 0",
                  lineHeight: 1.7,
                  fontSize: "0.92rem",
                }}
              >
                Chaque création est le fruit d'un savoir-faire artisanal,
                sublimant les notes umami du matcha ceremonial.
              </p>
            </div>

            {/* Category filters */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {menuCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "9999px",
                    border: activeCategory === cat
                      ? "1px solid #6b7a3a"
                      : "1px solid rgba(107,122,58,0.2)",
                    background: activeCategory === cat ? "#6b7a3a" : "transparent",
                    color: activeCategory === cat ? "#f5f0e1" : "#6b7a3a",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "1.25rem",
              }}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.name}
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(107, 122, 58, 0.1)",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)"
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px rgba(107,122,58,0.08)"
                    e.currentTarget.style.borderColor =
                      "rgba(107,122,58,0.22)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.borderColor =
                      "rgba(107,122,58,0.1)"
                  }}
                >
                  {/* Menu item image */}
                  <div
                    style={{
                      position: "relative",
                      height: "160px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 40%, rgba(232,227,216,0.6) 100%)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        right: "0.75rem",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.7rem",
                        borderRadius: "9999px",
                        background: "rgba(107,122,58,0.85)",
                        color: "#f5f0e1",
                        whiteSpace: "nowrap",
                        fontWeight: 600,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "#2a2a1e",
                          margin: 0,
                        }}
                      >
                        {item.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "9999px",
                          background: "rgba(107,122,58,0.08)",
                          color: "#6b7a3a",
                          whiteSpace: "nowrap",
                          fontWeight: 600,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#7a7568",
                        fontSize: "0.82rem",
                        lineHeight: 1.7,
                        margin: "0 0 0.75rem 0",
                      }}
                    >
                      {item.desc}
                    </p>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.3rem",
                        color: "#6b7a3a",
                        fontWeight: 500,
                      }}
                    >
                      {item.price}€
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section
          id="lexperience"
          style={{
            ...sectionStyle("#f0ebe0"),
          }}
        >
          <div style={sectionInner}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={label}>L'Expérience</div>
              <h2 style={heading2}>Notre Rituel</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
              className="grid-3col"
            >
              {steps.map((step, i) => (
                <div key={step.num}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                      fontWeight: 700,
                      color: "rgba(107, 122, 58, 0.12)",
                      lineHeight: 1,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                      fontWeight: 500,
                      color: "#2a2a1e",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#6b5e4e",
                      lineHeight: 1.8,
                      fontSize: "0.88rem",
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            textAlign: "center",
            background:
              "linear-gradient(180deg, #f0ebe0 0%, #e8e3d8 50%, #f0ebe0 100%)",
          }}
        >
          <h2
            style={{
              ...heading2,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Prêt à <span style={{ color: "#6b7a3a" }}>savourer</span> ?
          </h2>
          <p
            style={{
              color: "#6b5e4e",
              maxWidth: "38ch",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
              fontSize: "0.92rem",
            }}
          >
            Rejoignez-nous pour une expérience matcha unique. Sans additifs, sans
            compromis, juste l'essentiel.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#la-carte"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.875rem 2.25rem",
                borderRadius: "9999px",
                background: "#6b7a3a",
                color: "#f5f0e1",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "all 0.3s",
                boxShadow: "0 4px 20px rgba(107,122,58,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5a6a2e"
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(107,122,58,0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#6b7a3a"
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(107,122,58,0.2)"
              }}
            >
              Voir la carte
            </a>
            <a
              href="#reservation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                borderRadius: "9999px",
                border: "1px solid rgba(107,122,58,0.3)",
                background: "transparent",
                color: "#6b7a3a",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(107,122,58,0.08)"
                e.currentTarget.style.borderColor = "#6b7a3a"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = "rgba(107,122,58,0.3)"
              }}
            >
              Réserver une table
            </a>
          </div>
        </section>

        {/* ── RESERVATION ── */}
        <section
          id="reservation"
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            background: "#f0ebe0",
          }}
        >
          <div style={sectionInner}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={label}>Réservation</div>
              <h2 style={heading2}>
                Réservez votre <span style={{ color: "#6b7a3a" }}>table</span>
              </h2>
              <p
                style={{
                  color: "#6b5e4e",
                  maxWidth: "42ch",
                  margin: "0.5rem auto 0",
                  lineHeight: 1.7,
                  fontSize: "0.92rem",
                }}
              >
                Garantissez votre place pour un moment matcha inoubliable.
                Réservez en quelques clics, nous confirmons sous 2h.
              </p>
            </div>

            <form
              onSubmit={handleReservation}
              style={{
                maxWidth: "560px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-grid-2">
                <input
                  type="text"
                  placeholder="Votre nom"
                  required
                  value={reservation.name}
                  onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(107,122,58,0.2)",
                    background: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    color: "#2a2a1e",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b7a3a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107,122,58,0.2)")}
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  required
                  value={reservation.email}
                  onChange={(e) => setReservation({ ...reservation, email: e.target.value })}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(107,122,58,0.2)",
                    background: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    color: "#2a2a1e",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b7a3a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107,122,58,0.2)")}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }} className="form-grid-3">
                <input
                  type="date"
                  required
                  value={reservation.date}
                  onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(107,122,58,0.2)",
                    background: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    color: "#2a2a1e",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b7a3a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107,122,58,0.2)")}
                />
                <input
                  type="time"
                  required
                  value={reservation.time}
                  onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(107,122,58,0.2)",
                    background: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    color: "#2a2a1e",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b7a3a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107,122,58,0.2)")}
                />
                <select
                  value={reservation.guests}
                  onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(107,122,58,0.2)",
                    background: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    color: "#2a2a1e",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b7a3a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107,122,58,0.2)")}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} personne{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Message (optionnel) — allergies, occasion spéciale..."
                rows={3}
                value={reservation.message}
                onChange={(e) => setReservation({ ...reservation, message: e.target.value })}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(107,122,58,0.2)",
                  background: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  color: "#2a2a1e",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6b7a3a")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(107,122,58,0.2)")}
              />
              <button
                type="submit"
                style={{
                  padding: "0.95rem 2rem",
                  borderRadius: "9999px",
                  background: "#6b7a3a",
                  color: "#f5f0e1",
                  border: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 20px rgba(107,122,58,0.2)",
                  marginTop: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5a6a2e"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(107,122,58,0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#6b7a3a"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(107,122,58,0.2)"
                }}
              >
                Confirmer la réservation
              </button>

              {reservationSent && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    background: "rgba(107,122,58,0.1)",
                    border: "1px solid rgba(107,122,58,0.2)",
                    color: "#6b7a3a",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                  }}
                >
                  Demande envoyée ! Nous vous confirmons par email sous 2 heures.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          style={{
            padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
            borderTop: "1px solid rgba(107, 122, 58, 0.1)",
            background: "#e8e3d8",
          }}
        >
          <div
            style={{
              ...sectionInner,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 4vw, 3rem)",
            }}
            className="grid-contact"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "clamp(1rem, 3vw, 2rem)",
              }}
              className="grid-contact-info"
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#6b7a3a",
                    marginBottom: "0.75rem",
                  }}
                >
                  MatchaFlow
                </div>
                <p
                  style={{
                    color: "#7a7568",
                    lineHeight: 1.7,
                    fontSize: "0.85rem",
                  }}
                >
                  L'art du matcha, réinventé avec passion et authenticité.
                </p>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b7a3a",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Adresse & Horaires
                </h4>
                <p
                  style={{
                    color: "#6b5e4e",
                    lineHeight: 1.8,
                    fontSize: "0.85rem",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  42 Rue du Faubourg Saint-Honoré
                  <br />
                  75008 Paris, France
                </p>
                <p
                  style={{
                    color: "#6b5e4e",
                    lineHeight: 1.8,
                    fontSize: "0.85rem",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Lun – Sam : 8h – 20h
                  <br />
                  Dimanche : 9h – 18h
                </p>
                <a
                  href="tel:+33142683000"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#6b7a3a",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#5a6a2e")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a3a")}
                >
                  01 42 68 30 00
                </a>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b7a3a",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Suivez-nous
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {["Instagram", "TikTok", "Facebook"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      style={{
                        color: "#6b5e4e",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        transition: "color 0.3s",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "#6b7a3a")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "#6b5e4e")
                      }
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(107,122,58,0.12)",
                height: "clamp(200px, 40vw, 280px)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.3!2d2.3125!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3!2s42+Rue+du+Faubourg+Saint-Honor%C3%A9!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MatchaFlow - Google Maps"
              />
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            padding: "1.75rem clamp(1.5rem, 5vw, 4rem)",
            borderTop: "1px solid rgba(107, 122, 58, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            fontSize: "0.75rem",
            color: "#9a9588",
            background: "#e8e3d8",
          }}
        >
          <span>© 2024 MatchaFlow. Tous droits réservés.</span>
          <span style={{ color: "#6b7a3a" }}>
            Fait avec amour & matcha
          </span>
        </footer>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          background: #f0ebe0;
        }
        .desktop-nav {
          display: flex;
          gap: 2.25rem;
          align-items: center;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ── Tablet (<=1024px) ── */
        @media (max-width: 1024px) {
          .grid-contact-info {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* ── Mobile (<=768px) ── */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-burger {
            display: flex !important;
          }
          .grid-2col {
            grid-template-columns: 1fr !important;
          }
          .grid-3col {
            grid-template-columns: 1fr !important;
          }
          .grid-contact {
            grid-template-columns: 1fr !important;
          }
          .grid-contact-info {
            grid-template-columns: 1fr !important;
          }
          .form-grid-3 {
            grid-template-columns: 1fr !important;
          }
          .mobile-menu-overlay {
            top: 60px !important;
          }
        }

        /* ── Small mobile (<=480px) ── */
        @media (max-width: 480px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
