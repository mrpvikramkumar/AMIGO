import React, { useEffect, useState, useRef } from 'react'
import { MEGA_MENU_DATA, SERVICE_DETAILS } from './serviceData';

const CONTACT_DETAILS = {
  corpAddressLines: [
    'Vaishnavi Tanmayi Residency, #102, 1st Floor',
    '193 -C, Vengalrao Nagar',
    'Hyderabad - 500038-TS',
  ],
  opAddressLines: [
    'Flat- 404, Ankura Apartments',
    'Road No.05, Shailajapuri colony, Mansoorabadh',
    'Nagole, Hyderabad - 500068',
  ],
  phoneDisplay: '+91 90001 20988',
  phoneHref: 'tel:+919000120988',
  email: 'amigo@amigointegrators.com',
  emailHref: 'mailto:amigo@amigointegrators.com',
  hours: [
    'Monday - Saturday: 9:00 AM - 6:30 PM',
    'Sunday: Closed',
  ],
}

const PROFILE_HIGHLIGHTS = [
  {
    title: 'Core Competencies',
    items: [
      'Electrical & Mechanical Integration of Missile Systems',
      'Cable Harness Design & Manufacturing',
      'Relay Unit Wiring & Assembly',
      'PCB Fabrication & Assembly',
      'Power Supply Rack Design & Integration',
      'Connectorization (Series-II, Series-III) Test & Patch Cables',
      'Specialized Harnessing for Automotive Charging Systems',
    ],
  },
  {
    title: 'Leadership Expertise',
    items: [
      'Ex-ANALOGICS leadership with AGNI Missile System experience',
      'Electrical & Mechanical Integration',
      'Phase Checks & System Testing',
      'Mission-critical defence system validation',
    ],
  },
  {
    title: 'Key Projects & Achievements (2020\u20132026)',
    items: [
      'Successfully executed Missile Harness Preparation for multiple defence programs',
      'Developed LED Units for STAR Project',
      'Completed PCB Fabrication & Assembly for high-reliability applications',
      'Designed and assembled Power Supply Racks for leading defence partners',
      'Delivered Electrical Integration for Pralay Missile (Phase I & II) in 2021',
      'Executed Relay Unit Assembly for L&T',
      'Supplied Electrical & Electronic Components to DRDO, RCI, ASL, and SPIC',
      'Specialized in Connectorization & Test Cable Manufacturing',
      'Developed Cable Harnesses for Domestic EV Charging Guns',
    ],
  },
  {
    title: 'Our Strengths',
    items: [
      'Proven expertise in defence-grade integration systems',
      'Commitment to quality, precision, and timely delivery',
      'Strong vendor relationships with premier defense organizations',
      'Robust compliance with statutory and financial regulations',
      'Agile and technically skilled workforce',
    ],
  }
]

const GALLERY_IMAGES = [
  { src: '/profile/images/image-001.png', caption: 'Missile Cable Harness' },
  { src: '/profile/images/image-002.png', caption: 'Missile Cable Harness' },
  { src: '/profile/images/image-003.jpg', caption: 'Power Supply Racks' },
  { src: '/profile/images/image-004.jpg', caption: 'Power Supply Racks' },
  { src: '/profile/images/image-005.png', caption: 'LED Display Units' },
  { src: '/profile/images/image-006.jpg', caption: 'LED Display Units' },
  { src: '/profile/images/image-007.png', caption: 'PCB Fabrication & Assembly' },
  { src: '/profile/images/image-008.png', caption: 'PCB Fabrication & Assembly' },
  { src: '/profile/images/image-009.png', caption: 'PCB Potting & Conformal Coating' },
  { src: '/profile/images/image-010.png', caption: 'Supply of Connectors & Items' },
  { src: '/profile/images/image-011.jpg', caption: 'Wiring & Assembly of Relay Units' },
  { src: '/profile/images/image-012.jpg', caption: 'Car Charging Gun Assembly' },
]

const CLIENTS_LIST = [
  { name: 'Paras Defence', img: '/clients/Paras.png' },
  { name: 'RCI', img: '/clients/rci.svg' },
  { name: 'DRDO', img: '/clients/DRDO - Image.png' },
  { name: 'BEL', img: '/clients/BEL.png' },
  { name: 'BDL', img: '/clients/BDL.png' },
  { name: 'L&T Defence', img: '/clients/L&T Defence.jpg' },
  { name: 'Indian Railways', img: '/clients/Indian Railways.jpg' },
  { name: 'ASL', img: '/clients/ASL.jpg' },
  { name: 'NSTL', img: '/clients/NSTL.png' }
];

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({ type: 'idle', message: '' })
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    const loader = document.getElementById('loader')
    if (loader) loader.classList.remove('hide')

    setTimeout(() => {
      window.history.pushState({}, '', path)
      setCurrentPath(path)
      window.scrollTo(0, 0)
      setTimeout(() => loader?.classList.add('hide'), 600)
    }, 400)
  }

  useEffect(() => {
    // SCROLL PROGRESS BAR + GO-TOP + NAVBAR
    const progressBar = document.getElementById('scroll-progress')
    const goTopBtn = document.getElementById('goTopBtn')
    const missionSection = document.getElementById('mission')
    const navbar = document.getElementById('navbar')

    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (progressBar) progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%'

      // Go-top button visibility
      if (goTopBtn) {
        if (window.scrollY > 300) {
          goTopBtn.classList.add('visible')
        } else {
          goTopBtn.classList.remove('visible')
        }
      }

      // Navbar: scrolled class for transparent bg
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)

    // LOADER
    const loader = document.getElementById('loader')
    const hideLoader = () => setTimeout(() => loader?.classList.add('hide'), 1200)
    hideLoader()
    window.addEventListener('load', hideLoader)

    // HAMBURGER
    const ham = document.getElementById('hamburger')
    const mMenu = document.getElementById('mobileMenu')
    const onHamClick = () => {
      ham?.classList.toggle('active')
      mMenu?.classList.toggle('open')
    }
    ham?.addEventListener('click', onHamClick)
    window.closeMobile = function closeMobile() {
      ham?.classList.remove('active')
      mMenu?.classList.remove('open')
    }

    // CUSTOM CURSOR
    const dot = document.getElementById('cursorDot')
    const ring = document.getElementById('cursorRing')
    let rx = 0, ry = 0, dx = 0, dy = 0
    const onMouseMove = (e) => {
      dx = e.clientX
      dy = e.clientY
      if (dot) { dot.style.left = dx + 'px'; dot.style.top = dy + 'px' }
    }
    document.addEventListener('mousemove', onMouseMove)
    let rafId = 0
    const animRing = () => {
      rx += (dx - rx) * 0.12
      ry += (dy - ry) * 0.12
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)

    // HOVER EVENTS
    const hoverTargets = document.querySelectorAll('a,button,.mission-card,.step-card,.highlight-card')
    const onEnter = () => { if (ring) { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'rgba(0,59,115,0.8)' } }
    const onLeave = () => { if (ring) { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.borderColor = 'rgba(0,59,115,0.5)' } }
    hoverTargets.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    // CAROUSEL
    const carouselTimer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
    }, 4000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('load', hideLoader)
      if (ham) ham.removeEventListener('click', onHamClick)
      document.removeEventListener('mousemove', onMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
      hoverTargets.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
      clearInterval(carouselTimer)
    }
  }, [])

  useEffect(() => {
    // SCROLL REVEAL (Re-run on path change)
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    reveals.forEach(el => { el.classList.remove('visible'); obs.observe(el) })

    // COUNT UP
    function countUp(el, target, duration = 1800) {
      let start = 0
      const step = (ts) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '')
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = target + (el.dataset.suffix || '')
      }
      requestAnimationFrame(step)
    }
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('[data-count]').forEach(el => countUp(el, parseInt(el.dataset.count, 10)))
          statsObs.disconnect()
        }
      })
    }, { threshold: 0.3 })
    const statsEl = document.getElementById('stats')
    if (statsEl) statsObs.observe(statsEl)

    // HERO TEXT STAGGER
    const staggerTimer = setTimeout(() => {
      document.querySelectorAll('.hero-badge, .hero-h1, .hero-p, .hero-btns').forEach((el, i) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(24px)'
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, 1000 + i * 150)
      })
    }, 100)

    return () => {
      obs.disconnect()
      statsObs.disconnect()
      clearTimeout(staggerTimer)
    }
  }, [currentPath])

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    setIsSubmitting(true)
    setFormState({ type: 'idle', message: '' })

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          enquiryType: payload.enquiryType,
          service: payload.service,
          message: payload.message,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send your request right now.')
      }

      form.reset()
      setFormState({
        type: 'success',
        message: result.message || 'Thank you. Your request has been sent successfully.',
      })
    } catch (error) {
      setFormState({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToPrevSlide = () => setCarouselIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))
  const goToNextSlide = () => setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)

  return (
    <>
      <div id="scroll-progress"></div>

      {/* Custom cursor */}
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Missile loader */}
      <div id="loader">
        <svg className="loader-missile" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="loaderBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00264A" />
              <stop offset="50%" stopColor="#00509E" />
              <stop offset="100%" stopColor="#00264A" />
            </linearGradient>
            <linearGradient id="loaderFlameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffea00" />
              <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M42 80 Q50 110 58 80 Z" fill="url(#loaderFlameGrad)" />
          <path d="M40 60 L20 80 L20 85 L40 75 Z" fill="#003B73" />
          <path d="M60 60 L80 80 L80 85 L60 75 Z" fill="#003B73" />
          <path d="M50 10 Q40 25 40 40 L40 80 L60 80 L60 40 Q60 25 50 10 Z" fill="url(#loaderBodyGrad)" />
          <path d="M50 10 Q45 17.5 43.5 25 L56.5 25 Q55 17.5 50 10 Z" fill="#1E293B" />
        </svg>
        <p className="loader-text">Loading...</p>
      </div>

      <nav id="navbar">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="nav-logo">
          <img src="/AMIGO-BG-REMOVED.png" alt="AMIGO Integrators Pvt. Ltd" style={{ height: 120, width: 120, marginLeft: 30 }} />
        </a>
        <ul className="nav-links">
          <li><a href="/about-us" onClick={(e) => { e.preventDefault(); navigate('/about-us'); }}>About Us</a></li>
          <li className="mega-dropdown">
            <a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>Services</a>
            <div className="mega-menu" style={{ marginTop: 14 }}>
              {Object.entries(MEGA_MENU_DATA).map(([catKey, category]) => (
                <div key={catKey} className="mega-menu-col">
                  <h4>{category.title}</h4>
                  <ul>
                    {category.items.map(item => (
                      <li key={item.id}>
                        <a href={`/${catKey}/${item.id}`} onClick={(e) => { e.preventDefault(); navigate(`/${catKey}/${item.id}`); }}>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li><a href="/gallery" onClick={(e) => { e.preventDefault(); navigate('/gallery'); }}>Gallery</a></li>
          <li><a href="/contact-us" className="nav-cta" onClick={(e) => { e.preventDefault(); navigate('/contact-us'); }}>Contact Us</a></li>
        </ul >
        <div className="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </nav >

      <div className="mobile-menu" id="mobileMenu">
        <a href="/about-us" onClick={(e) => { e.preventDefault(); navigate('/about-us'); window.closeMobile?.(); }}>About Us</a>
        <div style={{ fontWeight: 600, fontSize: '16px', padding: '12px 0', borderBottom: '1px solid var(--gray-mid)' }}>Services</div>
        <div className="mobile-dropdown" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
          {Object.entries(MEGA_MENU_DATA).map(([catKey, category]) => (
            <React.Fragment key={catKey}>
              <div style={{ paddingLeft: '16px', fontWeight: 'bold', margin: '12px 0 4px', fontSize: '14px', color: 'var(--red)' }}>{category.title}</div>
              {category.items.map(item => (
                <a key={item.id} href={`/${catKey}/${item.id}`} style={{ paddingLeft: '24px', fontSize: '14px', paddingTop: '6px', paddingBottom: '6px' }} onClick={(e) => { e.preventDefault(); navigate(`/${catKey}/${item.id}`); window.closeMobile?.(); }}>
                  - {item.title}
                </a>
              ))}
            </React.Fragment>
          ))}
        </div>
        <a href="/gallery" onClick={(e) => { e.preventDefault(); navigate('/gallery'); window.closeMobile?.(); }}>Gallery</a>
        <a href="/contact-us" onClick={(e) => { e.preventDefault(); navigate('/contact-us'); window.closeMobile?.(); }}>Contact Us</a>
      </div>

      {/* ─── HERO ─── */}
      {
        (currentPath === '/' || currentPath === '') && (
          <section id="hero">
            <div className="hero-bg-grid"></div>
            <div className="hero-bg-glow"></div>
            <div className="hero-circuit-lines">
              <svg className="circuit-svg" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 200 L200 200 L200 120 L400 120 L400 200 L600 200 L600 80 L800 80 L800 200 L1000 200 L1000 140 L1200 140 L1200 200 L1440 200" stroke="#003B73" strokeWidth="2" fill="none" />
                <circle cx="200" cy="200" r="6" fill="#003B73" /><circle cx="400" cy="120" r="6" fill="#003B73" />
                <circle cx="600" cy="200" r="6" fill="#003B73" /><circle cx="800" cy="80" r="6" fill="#003B73" />
                <circle cx="1000" cy="200" r="6" fill="#003B73" /><circle cx="1200" cy="140" r="6" fill="#003B73" />
                <path d="M0 260 L300 260 L300 180 L500 180 L500 260 L700 260 L700 160 L900 160 L900 260 L1100 260" stroke="#003B73" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
            </div>
            <div className="hero-inner">
              <div className="hero-content">
                <div className="hero-badge"><span className="dot"></span> Electronic Systems Integrator</div>
                <h1 className="hero-h1" style={{ fontSize: '36px', lineHeight: '1.2' }}>Engineering Precision.<br /><span className="accent">Delivering Reliable Connectivity.</span></h1>
                <div className="hero-p" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p>We are a specialized engineering and manufacturing company providing high-quality electrical, electronic, and electromechanical solutions for Defence, Automotive, Railway, and Industrial applications.</p>
                  <p>Our expertise includes Defence Cable Harness Manufacturing, PCB Design and Assembly, Relay Unit Wiring and Testing, Mechanical Box Preparation, Test JIG and Rack Electrical Harness Preparation, and Mechanical Assembly. We also provide EV Battery Charging Cables and Locomotive Cable solutions engineered to meet demanding operational and performance requirements.</p>
                  <p>In addition to our engineering and manufacturing capabilities, we supply and trade a wide range of Defence and industrial-grade products, including specialized cables, MIL-grade connectors, relays, PCB components, and other critical electrical and electronic components.</p>
                  <p>With a strong focus on quality, precision, reliability, and technical excellence, we are committed to delivering customized solutions that meet specific project requirements and industry standards. From component sourcing and prototyping to assembly, wiring, testing, and final integration, we support our customers throughout the product development and manufacturing lifecycle.</p>
                  <p><strong style={{ color: 'var(--red)' }}>Precision Engineered. Quality Assured. Mission Ready.</strong></p>
                </div>
                <div className="hero-btns" style={{ marginTop: '16px' }}>
                  <a href="/about-us" className="btn-primary" onClick={(e) => { e.preventDefault(); navigate('/about-us'); }}>Discover More</a>
                  <a href="/contact-us" className="btn-outline" onClick={(e) => { e.preventDefault(); navigate('/contact-us'); }}>Get In Touch</a>
                </div>
              </div>
              <div className="hero-visual">
                <div className="missile-visual" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                  <style>
                    {`
                      @keyframes flicker { 0% { opacity: 0.7; transform: scaleY(0.9); } 100% { opacity: 1; transform: scaleY(1.1); } }
                      .flame-anim { animation: flicker 0.15s infinite alternate; transform-origin: center top; }
                      @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
                      .missile-float { animation: float 4s ease-in-out infinite; }
                    `}
                  </style>
                  <svg viewBox="0 0 200 600" width="100%" height="500px" xmlns="http://www.w3.org/2000/svg" className="missile-float">
                    <defs>
                      <linearGradient id="missileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b3b3b3" />
                        <stop offset="50%" stopColor="#f0f0f0" />
                        <stop offset="100%" stopColor="#7a7a7a" />
                      </linearGradient>
                      <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffea00" />
                        <stop offset="50%" stopColor="#ff5500" />
                        <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Flame */}
                    <path d="M 85 450 Q 100 650 115 450 Z" fill="url(#flameGrad)" className="flame-anim" />
                    {/* Fins Bottom */}
                    <path d="M 80 380 L 40 450 L 40 460 L 80 440 Z" fill="#003B73" />
                    <path d="M 120 380 L 160 450 L 160 460 L 120 440 Z" fill="#003B73" />
                    {/* Fins Middle */}
                    <path d="M 80 230 L 55 270 L 55 300 L 80 290 Z" fill="#003B73" />
                    <path d="M 120 230 L 145 270 L 145 300 L 120 290 Z" fill="#003B73" />
                    {/* Missile Body */}
                    <path d="M 100 40 Q 80 90 80 150 L 80 450 L 120 450 L 120 150 Q 120 90 100 40 Z" fill="url(#missileGrad)" />
                    {/* Dark Tip */}
                    <path d="M 100 40 Q 90 65 85 100 L 115 100 Q 110 65 100 40 Z" fill="#222" />
                    <path d="M 100 40 Q 98 45 99 50 L 101 50 Q 102 45 100 40 Z" fill="#003B73" />
                    {/* Bands */}
                    <rect x="80" y="150" width="40" height="5" fill="#333" />
                    <rect x="80" y="360" width="40" height="5" fill="#333" />
                    {/* BRAHMOS Text */}
                    <text x="-340" y="107" transform="rotate(-90)" fill="#003B73" fontSize="26" fontWeight="900" letterSpacing="5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>BRAHMOS</text>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* ─── ABOUT US ─── */}
      {
        (currentPath === '/about-us') && (
          <>
            <section id="mission">
              <div className="container">
                <div className="mission-grid">
                  <div className="reveal-left">
                    <span className="section-tag">Our Mission</span>
                    <h2 className="section-h2">Integrating <span className="red">Tomorrow's</span> Electronics, Today</h2>
                    <p className="section-p">AMIGO Integrators Pvt. Ltd., established on 08 July 2020, is a specialized engineering company delivering high-reliability solutions in the defence sector. Our core expertise lies in Cable Harnessing, Electrical &amp; Mechanical Integration, and system-level assembly for mission-critical applications.</p>
                    <ul className="values-list">
                      <li>Precision engineering with ISO-grade quality control standards across all PCB and IC integrations.</li>
                      <li>End-to-end solutions from schematic design to final product delivery and field support.</li>
                      <li>Committed to innovation, leveraging the latest semiconductor and embedded technologies.</li>
                      <li>Sustainable and reliable — our systems are built to last, with full lifecycle support.</li>
                    </ul>
                  </div>
                  <div className="mission-visual reveal-right">
                    <div className="mission-card"><div className="mission-card-icon">🎯</div><h3>Our Vision</h3><p>To become India's leading electronic systems integrator, known for precision, reliability, and innovation in every component we deliver.</p></div>
                    <div className="mission-card" style={{ transitionDelay: '0.1s' }}><div className="mission-card-icon">⚡</div><h3>What We Do</h3><p>PCB design &amp; fabrication, IC integration, breadboard prototyping, embedded system assembly, and custom electronic solutions for OEM and industrial clients.</p></div>
                    <div className="mission-card" style={{ transitionDelay: '0.2s' }}><div className="mission-card-icon">🔬</div><h3>Our Commitment</h3><p>Every component is sourced, tested, and integrated with meticulous attention to specification — because in electronics, precision is everything.</p></div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── COMPANY PROFILE ─── */}
            <section id="company-profile">
              <div className="container">
                <div className="profile-highlights">
                  {PROFILE_HIGHLIGHTS.map((group) => (
                    <article key={group.title} className="highlight-card mission-card">
                      <h3>{group.title}</h3>
                      <ul>{group.items.map((item) => (<li key={item}>{item}</li>))}</ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )
      }

      {/* ─── GALLERY ─── */}
      {
        (currentPath === '/gallery') && (
          <section id="gallery" style={{ padding: '72px 0', background: 'var(--white)' }}>
            <div className="container">
              {/* Full-width carousel */}
              <div className="carousel-section">
                <h3 className="section-h2" style={{ fontSize: '28px', marginBottom: '24px' }}>Project <span className="red">Gallery</span></h3>
                <div className="carousel-container">
                  <div className="carousel-track" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                    {GALLERY_IMAGES.map((img, i) => (
                      <div key={i} className="carousel-slide">
                        <img src={img.src} alt={img.caption} />
                        <div className="carousel-caption">{img.caption}</div>
                      </div>
                    ))}
                  </div>
                  <button className="carousel-prev" onClick={goToPrevSlide} title="Previous image">&#10094;</button>
                  <button className="carousel-next" onClick={goToNextSlide} title="Next image">&#10095;</button>
                  <div className="carousel-dots">
                    {GALLERY_IMAGES.map((_, i) => (
                      <span key={i} className={`carousel-dot-item ${i === carouselIndex ? 'active' : ''}`} onClick={() => setCarouselIndex(i)}></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* ─── SERVICES ─── */}
      {
        (currentPath === '/' || currentPath.startsWith('/services')) && (
          <>
            {/* ─── HOW WE WORK ─── */}
            <section id="how-we-work">
              <div className="container">
                <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} className="reveal">
                  <span className="section-tag">How We Work</span>
                  <h2 className="section-h2">Our <span className="red">Process</span></h2>
                  <p className="section-p">A streamlined, transparent workflow from first consultation to final delivery — ensuring quality at every stage.</p>
                </div>
                <div className="steps-grid" style={{ marginTop: 64 }}>
                  <div className="step-card reveal" style={{ transitionDelay: '0s' }}><div className="step-num">01</div><div className="step-icon">📋</div><h3>Requirement Analysis</h3><p>We begin by deeply understanding your project scope, technical specifications, component needs, and timeline constraints through detailed consultation.</p></div>
                  <div className="step-card reveal" style={{ transitionDelay: '0.1s' }}><div className="step-num">02</div><div className="step-icon">🖥️</div><h3>Design &amp; Prototyping</h3><p>Our engineers create schematic designs, PCB layouts, and breadboard prototypes — iterating quickly to validate circuitry before full production.</p></div>
                  <div className="step-card reveal" style={{ transitionDelay: '0.2s' }}><div className="step-num">03</div><div className="step-icon">⚙️</div><h3>Integration &amp; Assembly</h3><p>Precision integration of ICs, passive components, and connectors using SMT and through-hole techniques, with strict ESD protocols throughout.</p></div>
                  <div className="step-card reveal" style={{ transitionDelay: '0.3s' }}><div className="step-num">04</div><div className="step-icon">✅</div><h3>Test &amp; Delivery</h3><p>Rigorous functional testing, quality inspection, and burn-in validation before delivery — backed by our post-delivery technical support guarantee.</p></div>
                </div>
              </div>
            </section>

            {/* ─── STATS ─── */}
            {/* <section id="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal"><div className="stat-num" data-count="200">0</div><div className="stat-label">Projects Done</div></div>
            <div className="stat-item reveal" style={{ transitionDelay: '0.1s' }}><div className="stat-num" data-count="50">0</div><div className="stat-label">Clients Served</div></div>
            <div className="stat-item reveal" style={{ transitionDelay: '0.2s' }}><div className="stat-num" data-count="5">0</div><div className="stat-label">Years Experience</div></div>
            <div className="stat-item reveal" style={{ transitionDelay: '0.3s' }}><div className="stat-num" data-count="99" data-suffix="%">0</div><div className="stat-label">Satisfaction</div></div>
          </div>
        </div>
      </section> */}

            {/* ─── CLIENTS SCROLL ─── */}
            {
              currentPath === '/' && (
                <section id="clients-list" style={{ padding: '60px 0', background: 'var(--white)', overflow: 'hidden' }}>
                  <div className="container" style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h3 className="section-h2" style={{ fontSize: '28px' }}>Our <span className="red">Clients</span></h3>
                  </div>
                  <div style={{ position: 'relative', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <style>
                      {`
                        @keyframes scrollLeft {
                          0% { transform: translateX(0); }
                          100% { transform: translateX(-50%); }
                        }
                        .clients-track {
                          display: inline-block;
                          animation: scrollLeft 30s linear infinite;
                        }
                        .clients-track:hover {
                          animation-play-state: paused;
                        }
                        .client-logo {
                          display: inline-flex;
                          align-items: center;
                          gap: 16px;
                          padding: 16px 32px;
                          margin: 0 16px;
                          font-size: 18px;
                          font-weight: 700;
                          color: #1E293B;
                          background: #f8f9fa;
                          border: 1px solid #eaeaea;
                          border-radius: 12px;
                          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
                        }
                        .client-logo:hover {
                          transform: translateY(-4px);
                          box-shadow: 0 8px 24px rgba(0, 59, 115, 0.12);
                          border-color: rgba(0, 59, 115, 0.2);
                        }
                        .client-logo img {
                          width: 48px;
                          height: 48px;
                          object-fit: contain;
                          filter: grayscale(100%) opacity(0.8);
                          transition: filter 0.3s ease;
                        }
                        .client-logo:hover img {
                          filter: grayscale(0%) opacity(1);
                        }
                      `}
                    </style>
                    <div className="clients-track">
                      {[...CLIENTS_LIST, ...CLIENTS_LIST, ...CLIENTS_LIST].map((client, idx) => (
                        <div key={idx} className="client-logo">
                          <img src={client.img} alt={client.name} />
                          <span>{client.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }
          </>
        )
      }

      {/* ─── DYNAMIC SERVICE DETAILS ─── */}
      {
        (() => {
          const parts = currentPath.split('/').filter(Boolean);
          if (parts.length === 2) {
            const [catKey, itemId] = parts;
            if (MEGA_MENU_DATA[catKey] && SERVICE_DETAILS[itemId]) {
              const detail = SERVICE_DETAILS[itemId];
              return (
                <section id="service-detail" style={{ background: 'var(--white)', minHeight: '80vh', paddingTop: '140px' }}>
                  <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                      <span className="section-tag" style={{ marginBottom: 24 }}>{detail.tag}</span>
                      <h2 className="section-h2" style={{ marginBottom: 32, fontSize: 'clamp(32px, 4vw, 56px)' }}>{detail.title}</h2>
                      <p className="section-p" style={{ fontSize: '18px', color: 'var(--gray-text)', marginBottom: 48, lineHeight: 1.8, maxWidth: '100%' }}>
                        {detail.description}
                      </p>

                      <h3 style={{ fontSize: '22px', marginBottom: 24, fontWeight: 700, color: 'var(--black)' }}>Key Capabilities & Features</h3>
                      <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 56 }}>
                        {detail.features.map((feature, idx) => (
                          <div key={idx} style={{ background: 'var(--gray-light)', padding: '24px', borderRadius: 12, borderLeft: '4px solid var(--red)', fontWeight: 600, color: 'var(--black)', fontSize: '15px' }}>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div style={{ padding: '40px', background: 'var(--red-dark)', borderRadius: 16, color: 'white', textAlign: 'center', marginTop: 40 }}>
                        <h3 style={{ fontSize: '24px', marginBottom: 16 }}>Ready to get started?</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: '16px' }}>Contact our engineering team to discuss your specific requirements.</p>
                        <a href="/contact-us" className="btn-primary" onClick={(e) => { e.preventDefault(); navigate('/contact-us'); }} style={{ background: 'var(--white)', color: 'var(--red-dark)', padding: '16px 40px', fontSize: '16px' }}>Enquire Now</a>
                      </div>
                    </div>
                  </div>
                </section>
              )
            }
          }
          return null;
        })()
      }

      {/* ─── ELECTRICAL & ELECTRONICS ─── */}
      {
        (currentPath.startsWith('/services')) && (
          <>
            {/* ─── ELECTRICAL ─── */}
            <section id="electrical">
              <div className="container">
                <div style={{ maxWidth: 640, marginBottom: 56 }} className="reveal">
                  <span className="section-tag">Electrical</span>
                  <h2 className="section-h2">Electrical <span className="red">Systems &amp; Solutions</span></h2>
                  <p className="section-p">Robust electrical infrastructure and control systems designed for reliability, safety, and industrial-grade performance.</p>
                </div>
                <div className="services-grid">
                  <div className="service-card reveal" style={{ transitionDelay: '0s' }}><div className="service-card-icon">⚡</div><h3>Control Panel Design</h3><p>Custom LT/HT control panels with PLC integration, SCADA compatibility, and full IEC compliance for manufacturing and process industries.</p><div className="tag-list"><span className="tag">PLC</span><span className="tag">SCADA</span><span className="tag">IEC</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.1s' }}><div className="service-card-icon">🔌</div><h3>Power Distribution</h3><p>Design and commissioning of power distribution boards, bus-bar systems, and UPS solutions ensuring uninterrupted supply chains.</p><div className="tag-list"><span className="tag">LT/HT</span><span className="tag">UPS</span><span className="tag">Bus-bar</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.2s' }}><div className="service-card-icon">🏭</div><h3>Industrial Wiring</h3><p>Precision cable management, trunking, and industrial wiring for automation lines, conveyor systems, and OEM machinery.</p><div className="tag-list"><span className="tag">Automation</span><span className="tag">OEM</span><span className="tag">Cable Mgmt</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.3s' }}><div className="service-card-icon">🛡️</div><h3>Safety Systems</h3><p>Emergency stop circuits, safety relay integration, and functional safety design in compliance with ISO 13849 standards.</p><div className="tag-list"><span className="tag">ISO 13849</span><span className="tag">E-Stop</span><span className="tag">Safety PLC</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.4s' }}><div className="service-card-icon">📊</div><h3>Energy Monitoring</h3><p>Smart energy meters, power quality analyzers, and IoT-enabled dashboards to optimize consumption and reduce operational costs.</p><div className="tag-list"><span className="tag">IoT</span><span className="tag">Smart Meter</span><span className="tag">PMAC</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.5s' }}><div className="service-card-icon">🔧</div><h3>AMC &amp; Retrofitting</h3><p>Annual maintenance contracts and legacy system upgrades — breathing new efficiency into existing electrical infrastructure.</p><div className="tag-list"><span className="tag">AMC</span><span className="tag">Retrofit</span><span className="tag">Upgrades</span></div></div>
                </div>
              </div>
            </section>

            {/* ─── ELECTRONICS ─── */}
            <section id="electronics">
              <div className="container">
                <div style={{ maxWidth: 640, marginBottom: 56 }} className="reveal">
                  <span className="section-tag">Electronics</span>
                  <h2 className="section-h2">Electronic <span className="red">Components &amp; Integration</span></h2>
                  <p className="section-p">From bare PCBs to complex IC-level assemblies — we handle every layer of your electronic stack with precision and expertise.</p>
                </div>
                <div className="services-grid">
                  <div className="service-card reveal" style={{ transitionDelay: '0s' }}><div className="service-card-icon">🔲</div><h3>PCB Design &amp; Fabrication</h3><p>Multi-layer PCB design using Altium &amp; KiCad, with in-house DFM review, impedance control, and rapid prototyping turnaround.</p><div className="tag-list"><span className="tag">Altium</span><span className="tag">KiCad</span><span className="tag">Multi-layer</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.1s' }}><div className="service-card-icon">🧩</div><h3>IC Integration</h3><p>Precision placement and soldering of surface-mount and through-hole ICs — from microcontrollers and FPGAs to analog signal chains.</p><div className="tag-list"><span className="tag">SMT</span><span className="tag">Through-hole</span><span className="tag">FPGA</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.2s' }}><div className="service-card-icon">🍞</div><h3>Breadboard Prototyping</h3><p>Rapid proof-of-concept builds using breadboards and development kits, enabling fast validation before committing to PCB production.</p><div className="tag-list"><span className="tag">Arduino</span><span className="tag">Raspberry Pi</span><span className="tag">ESP32</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.3s' }}><div className="service-card-icon">💻</div><h3>Embedded Systems</h3><p>Firmware development, RTOS integration, and hardware-software co-design for microcontroller-based products and IoT nodes.</p><div className="tag-list"><span className="tag">RTOS</span><span className="tag">Firmware</span><span className="tag">IoT</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.4s' }}><div className="service-card-icon">🔍</div><h3>Testing &amp; Inspection</h3><p>AOI, ICT, and functional testing with full traceability reports — ensuring every board meets specification before it ships.</p><div className="tag-list"><span className="tag">AOI</span><span className="tag">ICT</span><span className="tag">X-Ray</span></div></div>
                  <div className="service-card reveal" style={{ transitionDelay: '0.5s' }}><div className="service-card-icon">📦</div><h3>Box Build Assembly</h3><p>Complete box-build and system integration services — from sub-assembly to final enclosure wiring, labeling, and delivery.</p><div className="tag-list"><span className="tag">Box Build</span><span className="tag">Harness</span><span className="tag">Final Assembly</span></div></div>
                </div>
              </div>
            </section>
          </>
        )
      }

      {/* ─── LOCATION & CONTACT ─── */}
      {
        (currentPath === '/' || currentPath === '/contact-us') && (
          <section id="location">
            <div className="container">
              <div style={{ marginBottom: 56 }} className="reveal">
                <span className="section-tag">Find Us</span>
                <h2 className="section-h2">We're Located in <span className="red">Hyderabad</span></h2>
                <p className="section-p">Visit our facility or get in touch — we're always ready to discuss your next electronics project.</p>
              </div>
              <div className="location-grid" style={{ alignItems: 'stretch' }}>
                <div className="location-info reveal-left">
                  <div className="location-detail"><div className="loc-icon">🏢</div><div className="loc-text"><h4>Corporate Address</h4><p>{CONTACT_DETAILS.corpAddressLines.map((line, i) => (<React.Fragment key={line}>{line}{i < CONTACT_DETAILS.corpAddressLines.length - 1 ? <br /> : null}</React.Fragment>))}</p></div></div>
                  <div className="location-detail"><div className="loc-icon">🏭</div><div className="loc-text"><h4>Operational Address</h4><p>{CONTACT_DETAILS.opAddressLines.map((line, i) => (<React.Fragment key={line}>{line}{i < CONTACT_DETAILS.opAddressLines.length - 1 ? <br /> : null}</React.Fragment>))}</p></div></div>
                  <div className="location-detail"><div className="loc-icon">📞</div><div className="loc-text"><h4>Phone</h4><p><a href={CONTACT_DETAILS.phoneHref}>{CONTACT_DETAILS.phoneDisplay}</a></p></div></div>
                  <div className="location-detail"><div className="loc-icon">📧</div><div className="loc-text"><h4>Email</h4><p><a href={CONTACT_DETAILS.emailHref}>{CONTACT_DETAILS.email}</a></p></div></div>
                  <div className="location-detail"><div className="loc-icon">🕐</div><div className="loc-text"><h4>Working Hours</h4><p>{CONTACT_DETAILS.hours.map((line, i) => (<React.Fragment key={line}>{line}{i < CONTACT_DETAILS.hours.length - 1 ? <br /> : null}</React.Fragment>))}</p></div></div>
                </div>

                <div className="map-container reveal-right" style={{ minHeight: '380px', height: '100%', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1132.2145794121145!2d78.56602724926998!3d17.34925658362218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9f005e1988e3%3A0x274c0bf73eb08eba!2sAnkura%20Homes!5e0!3m2!1sen!2sin!4v1784113053251!5m2!1sen!2sin" width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AMIGO Integrators Operational Address"></iframe>
                </div>
              </div>

              <div className="contact-form-wrapper reveal" style={{ marginTop: 64, maxWidth: '800px', margin: '64px auto 0', background: 'var(--white)', padding: 48, borderRadius: 24, boxShadow: '0 16px 48px rgba(0,0,0,0.05)', border: '1px solid var(--gray-mid)' }}>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <h4 style={{ marginBottom: 16, fontSize: '26px', textAlign: 'center', color: 'var(--black)' }}>Send a Request</h4>
                  <p style={{ textAlign: 'center', color: 'var(--gray-text)', marginBottom: 32 }}>Fill out the form below and our team will get back to you shortly.</p>
                  <div className="contact-form-grid">
                    <input name="name" placeholder="Your Name" required />
                    <input name="email" placeholder="Your Email" required />
                    <input name="phone" placeholder="Phone (optional)" />
                    <input name="company" placeholder="Company (optional)" />
                  </div>
                  <select name="enquiryType" style={{ marginTop: 16 }} defaultValue="">
                    <option value="" disabled>I am a...</option>
                    <option value="client">Client / Customer</option>
                    <option value="job_seeker">Job Applicant / Career</option>
                    <option value="partner">Business Partner / Vendor</option>
                    <option value="other">Other</option>
                  </select>
                  <input name="service" placeholder="Service you're interested in (optional)" style={{ marginTop: 16 }} />
                  <textarea name="message" placeholder="Tell us about your project..." required style={{ marginTop: 16, minHeight: '140px' }}></textarea>
                  <button className="btn-primary" type="submit" style={{ marginTop: 24, width: '100%', fontSize: '16px', padding: '16px' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                  {formState.message ? (
                    <p className={`contact-status ${formState.type}`} aria-live="polite" style={{ marginTop: 16, textAlign: 'center' }}>{formState.message}</p>
                  ) : null}
                </form>
              </div>
            </div>
          </section>
        )
      }

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand" style={{ marginTop: -10 }}>
            <a href="#" className="footer-logo">
              <img src="/AMIGO-BG-REMOVED.png" alt="AMIGO Integrators Pvt. Ltd" style={{ height: 100, width: 'auto', marginLeft: 0 }} />
            </a>
          </div>
          <div className="footer-col">

          </div>
          <div className="footer-col">

          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href={CONTACT_DETAILS.emailHref}>{CONTACT_DETAILS.email}</a></li>
              <li><a href={CONTACT_DETAILS.phoneHref}>{CONTACT_DETAILS.phoneDisplay}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 AMIGO Integrators Pvt. Ltd. All rights reserved.</span>
          <span>Designed in Hyderabad, India</span>
        </div>
      </footer>

      <button id="goTopBtn" className="go-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Go to top">&uarr;</button>
    </>
  )
}
