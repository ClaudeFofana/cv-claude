import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Code,
  Server,
  ShoppingBag,
  Palette,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Terminal,
  Award,
  Image as ImageIcon,
  ExternalLink,
  Printer
} from 'lucide-react';
import { IMAGES } from './config/images';

gsap.registerPlugin(ScrollTrigger);

// Smart Image Component with fallback
function SmartImage({ src, alt, className, fallbackText }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-gradient-to-br from-encre/10 to-corail/10 flex flex-col items-center justify-center p-4 text-center ${className}`}>
        <ImageIcon className="w-8 h-8 text-corail/50 mb-2" />
        {fallbackText && <span className="font-mono text-xs text-graphite/60">{fallbackText}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef(null);

  const handleDownloadCV = (e) => {
    e.preventDefault();
    // Open printable CV document formatted for PDF export
    const win = window.open('/cv-sie-claude-fofana.html?print=true', '_blank');
    if (win) win.focus();
  };

  // Navbar morphing on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations with context cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.hero-avatar', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
        .fromTo('.hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .fromTo('.hero-subtitle', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, '-=0.4');

      // ScrollTrigger for About Section
      gsap.fromTo(
        '.about-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
          },
        }
      );

      // ScrollTrigger for Experience Cards
      const expCards = gsap.utils.toArray('.exp-card');
      expCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });

      // ScrollTrigger for Skills Section
      gsap.fromTo(
        '.skill-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 75%',
          },
        }
      );

      // SVG Radar polygon animation
      gsap.fromTo(
        '.radar-polygon',
        { strokeDashoffset: 1000, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.85,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.radar-container',
            start: 'top 80%',
          },
        }
      );

      // ScrollTrigger for Formation Cards
      gsap.fromTo(
        '.formation-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#formation',
            start: 'top 80%',
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Experiences Data - Exact updates from user
  const experiences = [
    {
      period: '07/2025 — 02/2026',
      role: 'Stagiaire Informaticien',
      company: 'DSI à la DGI (Direction Générale des Impôts)',
      location: 'Abidjan, Côte d\'Ivoire',
      description:
        'Administration système et support informatique pour la numérisation des processus.',
      highlights: [
        'Support informatique pour l\'ensemble des services'
      ],
      icon: ShieldCheck,
    },
    {
      period: '2023',
      role: 'Informaticien dans une microfinance de la place',
      company: 'Institution de Micro-finance',
      location: 'Abidjan, Côte d\'Ivoire',
      description:
        'Gestion du système d\'information, création de bases de données et suivi télématique.',
      highlights: [
        'Création de la base de données pour la microfinance',
        'Gestion du parc automobile des véhicules de transport via le système GPS'
      ],
      icon: Server,
    },
    {
      period: '2021 — Présent',
      role: 'Fondateur & Développeur Full Stack',
      company: 'fsc_multiservices',
      location: 'Abidjan & E-Commerce',
      description:
        'Conception, développement et administration de la plateforme e-commerce fsc_multiservices, tout en assurant la direction artistique et le design graphique publicitaire.',
      highlights: [
        'Création d\'interfaces e-commerce cinématiques avec React & Tailwind',
        'Design visuel complet et création d\'affiches publicitaires haute conversion',
        'Intégration de passerelles de paiement sécurisées et gestion des stocks en temps réel.'
      ],
      icon: ShoppingBag,
    },
  ];

  // Skills Data - Exact percentages & lists requested by user
  const skills = [
    {
      name: 'Développement Full Stack',
      level: 60,
      icon: Code,
      details: 'React, Next.js, Node.js, TypeScript, JavaScript, HTML, CSS'
    },
    {
      name: 'Direction DSI & Systèmes',
      level: 60,
      icon: Server,
      details: 'Infrastructures, Sécurité IT, Gouvernance'
    },
    {
      name: 'E-Commerce & Platforming',
      level: 80,
      icon: ShoppingBag,
      details: 'fsc_multiservices, Payment APIs'
    },
  ];

  // Formation Data - Exact updates from user
  const formations = [
    {
      year: '2020 — 2026',
      degree: 'Master / Diplôme d\'Ingénieur en Systèmes & Applications',
      institution: 'Académie des Sciences Technologiques et Comptable (ASTC)',
      details: 'Spécialisation en architectures logicielles distribuées, Sécurité informatique et gestion de projets IT.',
    },
    {
      year: '2016 — 2020',
      degree: 'BTS en Informatique Développeur d’Application',
      institution: 'Académie des Sciences Technologiques et Comptable (ASTC)',
      details: 'Solides fondations en algorithmique, administration réseaux, bases de données relationnelles et web dev.',
    },
    {
      year: '2016',
      degree: 'Baccalauréat Scientifique (Série Scientifique D)',
      institution: 'Lycée Moderne de Dabakala',
      details: 'Spécialité Physique-Chimie, Mathématiques et Sciences de la Vie et de la Terre.',
    },
  ];

  return (
    <div ref={mainRef} className="min-h-screen bg-neige text-graphite font-sans relative selection:bg-corail selection:text-white">

      {/* A. NAVBAR — "La Signature Flottante" */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[92%] max-w-5xl rounded-full px-6 py-3.5 flex items-center justify-between ${isScrolled
          ? 'bg-neige/85 backdrop-blur-xl border border-encre/10 shadow-xl text-encre'
          : 'bg-encre/30 backdrop-blur-md border border-white/10 text-neige'
          }`}
      >
        {/* Badge Initiales */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-corail text-white font-serif font-bold text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            SF
          </div>
          <span className="font-semibold text-sm tracking-tight hidden sm:inline-block">
            Sié Claude Fofana
          </span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
          <a href="#about" className="link-hover opacity-80 hover:opacity-100">À propos</a>
          <a href="#experience" className="link-hover opacity-80 hover:opacity-100">Expérience</a>
          <a href="#portfolio" className="link-hover opacity-80 hover:opacity-100">Réalisations</a>
          <a href="#skills" className="link-hover opacity-80 hover:opacity-100">Compétences</a>
          <a href="#formation" className="link-hover opacity-80 hover:opacity-100">Formation</a>
          <a href="#contact" className="link-hover opacity-80 hover:opacity-100">Contact</a>
        </nav>

        {/* CTA Button */}
        <button
          onClick={handleDownloadCV}
          className="btn-magnetic px-4 py-2 rounded-full bg-corail text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md hover:bg-[#d5533c] transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Télécharger le CV</span>
        </button>
      </header>

      {/* B. SECTION HERO — "La Première Impression" */}
      <section
        id="hero"
        className="relative min-h-[100dvh] bg-encre text-neige flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Background Texture & Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-encre via-encre/90 to-encre pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* User Profile Photo */}
          <div className="hero-avatar w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-corail/80 shadow-2xl flex items-center justify-center bg-cardDark text-neige font-serif text-4xl md:text-5xl font-bold mb-8 relative group overflow-hidden">
            <SmartImage
              src={IMAGES.profile.src}
              alt={IMAGES.profile.alt}
              className="w-full h-full object-cover rounded-full"
              fallbackText={IMAGES.profile.fallbackInitials}
            />
          </div>

          {/* Name & Title */}
          <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-neige mb-3 font-sans">
            Sié Claude Fofana
          </h1>

          <p className="hero-subtitle text-2xl sm:text-3xl md:text-4xl font-serif italic text-corail font-normal mb-8">
            Développeur Full Stack &amp; Designer
          </p>

          {/* Stats in Monospace */}
          <div className="hero-stats flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-neige/70 bg-white/5 border border-white/10 px-6 py-3 rounded-full mb-10 backdrop-blur-md">
            <span className="flex items-center gap-2">
              <span className="text-corail font-bold">[10+]</span> Projets développés
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-corail" /> Abidjan, CI
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownloadCV}
              className="btn-magnetic px-7 py-3.5 rounded-full bg-corail text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-corail/25 hover:bg-[#d5533c]"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger le CV</span>
            </button>

            <a
              href="#contact"
              className="btn-magnetic px-7 py-3.5 rounded-full border border-white/20 hover:border-corail text-neige hover:text-corail font-semibold text-sm sm:text-base transition-colors"
            >
              <span>Me contacter</span>
            </a>
          </div>

        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neige/50 hover:text-corail transition-colors flex flex-col items-center gap-1 text-xs font-mono animate-bounce"
        >
          <span>DECOUVRIR</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </section>

      {/* C. SECTION À PROPOS — "Le Manifeste Personnel" */}
      <section id="about" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-corail block mb-3">
              [ Présentation ]
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-encre font-normal leading-snug mb-6">
              Transformer la vision stratégique en solutions numériques performantes.
            </h2>
            <p className="font-mono text-sm text-graphite/60">
              « Chaque ligne de code doit servir une vision, chaque pixel doit captiver l'attention. »
            </p>
          </div>

          {/* Vertical Separator */}
          <div className="hidden lg:block lg:col-span-1 h-full min-h-[300px] flex justify-center">
            <div className="w-[2px] h-full bg-corail/30 rounded-full" />
          </div>

          {/* Right Column: Bio & Cards */}
          <div className="lg:col-span-6 space-y-8">
            <p className="text-lg md:text-xl text-graphite/90 leading-relaxed font-normal">
              Ingénieur Logiciel & Développeur Full Stack, je conçois des solutions numériques modernes,
              performantes et évolutives, en conciliant excellence technique, innovation et expérience utilisateur.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-[2rem] bg-white border border-encre/5 shadow-sm space-y-3 card-hover">
                <div className="w-10 h-10 rounded-full bg-corail/10 text-corail flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-encre text-lg">Ingénierie Full Stack</h3>
                <p className="text-sm text-graphite/70 leading-relaxed">
                  Conception d'applications web et mobile avec React, Next.js, Node.js et intégration de services e-commerce à forte charge. Plus de 10 projets développés.
                </p>
              </div>

              <div className="p-6 rounded-[2rem] bg-white border border-encre/5 shadow-sm space-y-3 card-hover">
                <div className="w-10 h-10 rounded-full bg-corail/10 text-corail flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-encre text-lg">Gouvernance DSI</h3>
                <p className="text-sm text-graphite/70 leading-relaxed">
                  Expérience avérée en direction des systèmes d'information, sécurisation des données financières et administration des systèmes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* D. SECTION EXPÉRIENCE — "La Timeline Vivante" */}
      <section id="experience" className="py-24 bg-white/60 border-y border-encre/5 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-corail block mb-3">
              [ Parcours Professionnel ]
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-encre font-normal">
              Expériences marquantes &amp; responsabilités
            </h2>
          </div>

          {/* Timeline Container */}
          <div className="relative">

            {/* Center Vertical Fine Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-corail/25 -translate-x-1/2" />

            {/* Timeline Cards */}
            <div className="space-y-12">
              {experiences.map((exp, idx) => {
                const IconComponent = exp.icon;
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`exp-card relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''
                      }`}
                  >

                    {/* Timeline Pulse Dot */}
                    <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-neige border-4 border-corail shadow-md flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-corail animate-pulse" />
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-[45%] ml-14 md:ml-0 p-8 rounded-[2rem] bg-white border border-encre/5 shadow-md card-hover relative">

                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="font-mono text-xs text-corail font-semibold px-3 py-1 bg-corail/10 rounded-full">
                          {exp.period}
                        </span>
                        <IconComponent className="w-5 h-5 text-graphite/40" />
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-encre mb-1">
                        {exp.role}
                      </h3>

                      <h4 className="text-sm font-semibold text-corail mb-4">
                        {exp.company} • <span className="font-normal text-graphite/60">{exp.location}</span>
                      </h4>

                      <p className="text-sm text-graphite/80 leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-encre/5">
                        {exp.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-graphite/70">
                            <CheckCircle2 className="w-3.5 h-3.5 text-corail shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* PORTFOLIO & REALS */}
      <section id="portfolio" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-corail block mb-3">
            [ Galerie &amp; Projets Web ]
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-encre font-normal">
            Projets E-Commerce &amp; Créations Visuelles
          </h2>
        </div>

        {/* E-Commerce Web Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {IMAGES.projects.map((proj) => (
            <div key={proj.id} className="portfolio-card bg-white rounded-[2.5rem] overflow-hidden border border-encre/5 shadow-md card-hover flex flex-col">
              <div className="h-60 relative overflow-hidden bg-[#F5F3EE] flex items-center justify-center p-4">
                <SmartImage
                  src={proj.src}
                  alt={proj.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  fallbackText={`Projet: ${proj.title}`}
                />
                <span className="absolute top-4 left-4 bg-encre/80 backdrop-blur-md text-neige font-mono text-xs px-3 py-1 rounded-full">
                  {proj.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-encre mb-1">{proj.title}</h3>
                  <p className="text-xs text-graphite/70 leading-relaxed">{proj.description}</p>
                </div>

                {proj.url !== '#' && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-corail font-semibold hover:underline pt-2"
                  >
                    <span>Visiter le site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Graphic Design & Advertising Posters */}
        <div className="bg-encre text-neige p-8 sm:p-12 rounded-[3rem] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono text-corail uppercase tracking-widest block mb-1">
                Design Graphique &amp; Publicité
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif italic">
                Quelques Affiches Publicitaires &amp; Visuels de Marque
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {IMAGES.affiches.map((affiche, idx) => (
              <div key={idx} className="group relative rounded-[2rem] overflow-hidden bg-[#18181C] border border-white/10 aspect-[3/4] flex items-center justify-center p-3">
                <SmartImage
                  src={affiche.src}
                  alt={affiche.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  fallbackText={`Affiche #${idx + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-encre via-encre/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="text-[10px] font-mono text-corail uppercase tracking-wider block">
                    {affiche.tag}
                  </span>
                  <h4 className="font-bold text-sm text-neige">{affiche.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* E. SECTION COMPÉTENCES — "Le Tableau de Bord" */}
      <section id="skills" className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-t border-encre/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-corail block mb-3">
            [ Métriques &amp; Maîtrise ]
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-encre font-normal">
            Tableau de bord des compétences
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Radar Chart SVG Widget */}
          <div className="lg:col-span-5 radar-container bg-white p-8 rounded-[2.5rem] border border-encre/5 shadow-lg flex flex-col items-center justify-center text-center">
            <h3 className="font-mono text-xs uppercase tracking-widest text-graphite/60 mb-6">
              [ Visualisation Radar ]
            </h3>

            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Concentric Circles */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={80 * r}
                    fill="none"
                    stroke="#1C1C1E"
                    strokeOpacity="0.08"
                    strokeDasharray="2,2"
                  />
                ))}

                {/* Axes Lines */}
                {[0, 120, 240].map((angle, i) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x2 = 100 + 80 * Math.cos(rad);
                  const y2 = 100 + 80 * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2={x2}
                      y2={y2}
                      stroke="#1C1C1E"
                      strokeOpacity="0.12"
                    />
                  );
                })}

                {/* Triangle Shape based on 3 skill levels (60%, 60%, 80%) */}
                <polygon
                  className="radar-polygon"
                  points={`
                    ${100 + 80 * 0.60 * Math.cos((-90 * Math.PI) / 180)},${100 + 80 * 0.60 * Math.sin((-90 * Math.PI) / 180)}
                    ${100 + 80 * 0.60 * Math.cos((30 * Math.PI) / 180)},${100 + 80 * 0.60 * Math.sin((30 * Math.PI) / 180)}
                    ${100 + 80 * 0.80 * Math.cos((150 * Math.PI) / 180)},${100 + 80 * 0.80 * Math.sin((150 * Math.PI) / 180)}
                  `}
                  fill="rgba(232, 99, 74, 0.25)"
                  stroke="#E8634A"
                  strokeWidth="2.5"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
              </svg>
            </div>

            <p className="font-mono text-xs text-graphite/60 mt-4">
              Analyse multi-axiale des compétences clés
            </p>
          </div>

          {/* Skills Grid - Exactly 3 cards requested */}
          <div className="lg:col-span-7 space-y-4">
            {skills.map((skill, idx) => {
              const IconComp = skill.icon;
              return (
                <div
                  key={idx}
                  className="skill-card p-6 rounded-[2rem] bg-white border border-encre/5 shadow-sm card-hover flex items-center gap-6"
                >
                  {/* Circular Progress Ring */}
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        fill="none"
                        stroke="#1C1C1E"
                        strokeOpacity="0.08"
                        strokeWidth="5"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        fill="none"
                        stroke="#E8634A"
                        strokeWidth="5"
                        strokeDasharray="163.3"
                        strokeDashoffset={163.3 - (163.3 * skill.level) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className="absolute font-mono text-xs font-bold text-encre">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Skill Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComp className="w-4 h-4 text-corail" />
                      <h4 className="font-bold text-encre text-base">{skill.name}</h4>
                    </div>
                    <p className="text-xs font-mono text-graphite/60">{skill.details}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* F. SECTION FORMATION — "Les Fondations" */}
      <section id="formation" className="py-24 bg-encre text-neige px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-corail block mb-3">
              [ Parcours Académique ]
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-neige font-normal">
              Formation &amp; Diplômes
            </h2>
          </div>

          <div className="space-y-6">
            {formations.map((form, idx) => (
              <div
                key={idx}
                className="formation-card p-8 rounded-[2rem] bg-[#27272A] border border-white/10 hover:border-corail/40 transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-corail font-semibold px-3 py-1 bg-corail/15 rounded-full inline-block">
                    {form.year}
                  </span>
                  <h3 className="text-xl font-bold text-neige">{form.degree}</h3>
                  <h4 className="text-sm text-neige/70 font-medium">{form.institution}</h4>
                  <p className="text-xs text-neige/50 leading-relaxed pt-1">{form.details}</p>
                </div>

                <div className="shrink-0">
                  <Award className="w-8 h-8 text-corail/60" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* G. SECTION CONTACT — "Le Pont" */}
      <section id="contact" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-encre via-[#232326] to-encre text-neige p-10 sm:p-16 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">

          <div className="absolute -top-24 -right-24 w-96 h-96 bg-corail/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Header */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-corail block">
                [ Contact ]
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-neige font-normal leading-tight">
                Travaillons ensemble.
              </h2>
              <p className="text-neige/70 text-base sm:text-lg leading-relaxed">
                Une idée de projet e-commerce, une mission de conseil IT ou une opportunité de développement Full Stack ? Contactez-moi directement.
              </p>

              <button
                onClick={handleDownloadCV}
                className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full bg-corail text-white font-bold text-sm sm:text-base shadow-xl hover:bg-[#d5533c] transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Télécharger le CV complet</span>
              </button>
            </div>

            {/* Right Contact Cards */}
            <div className="lg:col-span-6 space-y-4">

              <a
                href="mailto:sieclaudefofana01@gmail.com"
                className="p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:border-corail/50 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-corail/15 text-corail flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neige/50 uppercase block">Email Direct</span>
                    <span className="font-semibold text-neige text-sm sm:text-base group-hover:text-corail transition-colors">
                      sieclaudefofana01@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neige/40 group-hover:text-corail group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href="tel:+2250769518370"
                className="p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:border-corail/50 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-corail/15 text-corail flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neige/50 uppercase block">Téléphone / WhatsApp</span>
                    <span className="font-semibold text-neige text-sm sm:text-base group-hover:text-corail transition-colors">
                      +225 0769518370
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neige/40 group-hover:text-corail group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a href="https://share.google/CKocTBf45OKbTnz5T">
                <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-corail/15 text-corail flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neige/50 uppercase block">Projet E-Commerce</span>
                      <span className="font-semibold text-neige text-sm sm:text-base">
                        fsc_multiservices
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          </div>

        </div>
      </section >

      {/* H. PIED DE PAGE */}
      < footer className="bg-surfaceDark text-neige/70 rounded-t-[4rem] px-8 py-12" >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8 mb-8">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-corail text-white font-serif font-bold text-sm flex items-center justify-center">
              SF
            </div>
            <span className="font-bold text-neige text-base">Sié Claude Fofana</span>
          </div>

          {/* En ligne indicator */}
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs text-neige/90">Disponible pour nouvelles opportunités</span>
          </div>

        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neige/40 gap-4">
          <p>© 2026 Sié Claude Fofana. Tous droits réservés.</p>
          <p className="uppercase tracking-wider">Preset A — Architecte Minimal</p>
        </div>
      </footer >

    </div >
  );
}
