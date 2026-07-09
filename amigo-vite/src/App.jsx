import React, { useEffect, useState, useRef } from 'react'

const CONTACT_DETAILS = {
  addressLines: [
    'Vaishnavi Tanmayi Residency, #102, 1st Floor',
    '193 -C, Vengalrao Nagar',
    'Hyderabad - 500038-TS',
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

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({ type: 'idle', message: '' })
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

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
      if (goTopBtn && missionSection) {
        if (window.scrollY >= missionSection.offsetTop - 100) {
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

    const hoverTargets = document.querySelectorAll('a,button,.mission-card,.step-card,.highlight-card')
    const onEnter = () => { if (ring) { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'rgba(232,16,16,0.8)' } }
    const onLeave = () => { if (ring) { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.borderColor = 'rgba(232,16,16,0.5)' } }
    hoverTargets.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    // SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    reveals.forEach(el => obs.observe(el))

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

    // Carousel Autoplay
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
      obs.disconnect()
      statsObs.disconnect()
      clearTimeout(staggerTimer)
      clearInterval(carouselTimer)
    }
  }, [])

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

      {/* Logo loader */}
      <div id="loader">
        <img src="/AMIGO-BG-REMOVED.png" alt="Loading" className="loader-logo" />
        <p className="loader-text">AMIGO Integrators</p>
      </div>

      <nav id="navbar">
        <a href="#" className="nav-logo">
          <img src="/AMIGO-BG-REMOVED.png" alt="AMIGO Integrators Pvt. Ltd" style={{ height: 120, width: 120, marginLeft: 30 }} />
        </a>
        <ul className="nav-links">
          <li><a href="#mission">About Us</a></li>
          <li><a href="#electrical">Electrical</a></li>
          <li><a href="#electronics">Electronics</a></li>
          <li><a href="#location" className="nav-cta">Contact Us</a></li>
        </ul>
        <div className="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu">
        <a href="#mission" onClick={() => window.closeMobile?.()}>About Us</a>
        <a href="#electrical" onClick={() => window.closeMobile?.()}>Electrical</a>
        <a href="#electronics" onClick={() => window.closeMobile?.()}>Electronics</a>
        <a href="#how-we-work" onClick={() => window.closeMobile?.()}>How We Work</a>
        <a href="#location" onClick={() => window.closeMobile?.()}>Contact Us</a>
      </div>

      {/* ─── HERO ─── */}
      <section id="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-bg-glow"></div>
        <div className="hero-circuit-lines">
          <svg className="circuit-svg" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200 L200 200 L200 120 L400 120 L400 200 L600 200 L600 80 L800 80 L800 200 L1000 200 L1000 140 L1200 140 L1200 200 L1440 200" stroke="#E81010" strokeWidth="2" fill="none" />
            <circle cx="200" cy="200" r="6" fill="#E81010" /><circle cx="400" cy="120" r="6" fill="#E81010" />
            <circle cx="600" cy="200" r="6" fill="#E81010" /><circle cx="800" cy="80" r="6" fill="#E81010" />
            <circle cx="1000" cy="200" r="6" fill="#E81010" /><circle cx="1200" cy="140" r="6" fill="#E81010" />
            <path d="M0 260 L300 260 L300 180 L500 180 L500 260 L700 260 L700 160 L900 160 L900 260 L1100 260" stroke="#E81010" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge"><span className="dot"></span> Electronic Systems Integrator</div>
            <h1 className="hero-h1">Precision Built<span className="accent">Electronics</span>Integration</h1>
            <p className="hero-p">From PCBs and ICs to complete electronic assemblies — we design, build, and integrate cutting-edge electronic systems for industry and innovation.</p>
            <div className="hero-btns">
              <a href="#mission" className="btn-primary">Discover More</a>
              <a href="#location" className="btn-outline">Get In Touch</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="pcb-board" id="pcbBoard">
              <div className="pcb-trace" style={{ width: 180, height: 3, top: 80, left: 30 }}></div>
              <div className="pcb-trace" style={{ width: 3, height: 80, top: 80, left: 80 }}></div>
              <div className="pcb-trace" style={{ width: 120, height: 3, top: 160, left: 80 }}></div>
              <div className="pcb-trace" style={{ width: 3, height: 60, top: 220, left: 200 }}></div>
              <div className="pcb-trace" style={{ width: 100, height: 3, top: 280, left: 100 }}></div>
              <div className="pcb-trace" style={{ width: 3, height: 100, top: 180, left: 300 }}></div>
              <div className="pcb-trace" style={{ width: 80, height: 3, top: 180, left: 220 }}></div>
              <div className="ic-chip" style={{ width: 80, height: 50, top: 100, left: 140 }} data-label="IC-01"></div>
              <div className="ic-chip" style={{ width: 60, height: 40, top: 200, left: 60 }} data-label="MCU"></div>
              <div className="ic-chip" style={{ width: 50, height: 50, top: 60, left: 260 }} data-label="OSC"></div>
              <div className="pin-row" style={{ top: 95, left: 148 }}><div className="pin"></div><div className="pin"></div><div className="pin"></div><div className="pin"></div></div>
              <div className="pin-row" style={{ top: 148, left: 148, transform: 'rotate(180deg)' }}><div className="pin"></div><div className="pin"></div><div className="pin"></div><div className="pin"></div></div>
              <div className="led-dot" style={{ width: 12, height: 12, background: '#E81010', top: 240, left: 260, boxShadow: '0 0 10px #E81010' }}></div>
              <div className="led-dot" style={{ width: 10, height: 10, background: '#00ff88', top: 40, left: 40, boxShadow: '0 0 10px #00ff88', animationDelay: '0.7s' }}></div>
              <div className="led-dot" style={{ width: 8, height: 8, background: '#ffaa00', top: 300, left: 180, boxShadow: '0 0 8px #ffaa00', animationDelay: '1.3s' }}></div>
              <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', border: '2px solid #2a5a2a', top: 12, left: 12 }}></div>
              <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', border: '2px solid #2a5a2a', top: 12, right: 12 }}></div>
              <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', border: '2px solid #2a5a2a', bottom: 12, left: 12 }}></div>
              <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', border: '2px solid #2a5a2a', bottom: 12, right: 12 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
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

          {/* Full-width carousel */}
          <div className="carousel-section" style={{ marginTop: '48px' }}>
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

      {/* ─── LOCATION & CONTACT ─── */}
      <section id="location">
        <div className="container">
          <div style={{ marginBottom: 56 }} className="reveal">
            <span className="section-tag">Find Us</span>
            <h2 className="section-h2">We're Located in <span className="red">Hyderabad</span></h2>
            <p className="section-p">Visit our facility or get in touch — we're always ready to discuss your next electronics project.</p>
          </div>
          <div className="location-grid">
            <div className="location-info reveal-left">
              <div className="location-detail"><div className="loc-icon">📍</div><div className="loc-text"><h4>Address</h4><p>{CONTACT_DETAILS.addressLines.map((line, i) => (<React.Fragment key={line}>{line}{i < CONTACT_DETAILS.addressLines.length - 1 ? <br /> : null}</React.Fragment>))}</p></div></div>
              <div className="location-detail"><div className="loc-icon">📞</div><div className="loc-text"><h4>Phone</h4><p><a href={CONTACT_DETAILS.phoneHref}>{CONTACT_DETAILS.phoneDisplay}</a></p></div></div>
              <div className="location-detail"><div className="loc-icon">📧</div><div className="loc-text"><h4>Email</h4><p><a href={CONTACT_DETAILS.emailHref}>{CONTACT_DETAILS.email}</a></p></div></div>
              <div className="location-detail"><div className="loc-icon">🕐</div><div className="loc-text"><h4>Working Hours</h4><p>{CONTACT_DETAILS.hours.map((line, i) => (<React.Fragment key={line}>{line}{i < CONTACT_DETAILS.hours.length - 1 ? <br /> : null}</React.Fragment>))}</p></div></div>
            </div>

            <div className="contact-form-wrapper reveal-right">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <h4 style={{ marginBottom: 16, fontSize: '20px' }}>Send a Request</h4>
                <div className="contact-form-grid">
                  <input name="name" placeholder="Your Name" required />
                  <input name="email" placeholder="Your Email" required />
                  <input name="phone" placeholder="Phone (optional)" />
                  <input name="company" placeholder="Company (optional)" />
                </div>
                <select name="enquiryType" style={{ marginTop: 12 }} defaultValue="">
                  <option value="" disabled>I am a...</option>
                  <option value="client">Client / Customer</option>
                  <option value="job_seeker">Job Applicant / Career</option>
                  <option value="partner">Business Partner / Vendor</option>
                  <option value="other">Other</option>
                </select>
                <input name="service" placeholder="Service you're interested in (optional)" style={{ marginTop: 12 }} />
                <textarea name="message" placeholder="Tell us about your project..." required style={{ marginTop: 12 }}></textarea>
                <button className="btn-primary" type="submit" style={{ marginTop: 16, width: '100%' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </button>
                {formState.message ? (
                  <p className={`contact-status ${formState.type}`} aria-live="polite">{formState.message}</p>
                ) : null}
              </form>
            </div>
          </div>

          <div className="map-container reveal" style={{ marginTop: 48 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.0!2d78.4475!3d17.4350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c7e9b5b1f7%3A0x48c3e0ece5e8c4a8!2sVengalrao%20Nagar%2C%20Hyderabad%2C%20Telangana%20500038!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AMIGO Integrators Location - Vengalrao Nagar"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand" style={{ marginTop: -80 }}>
            <a href="#" className="footer-logo">
              <img src="/AMIGO-BG-REMOVED.png" alt="AMIGO Integrators Pvt. Ltd" style={{ height: 150, width: 150, marginLeft: 0 }} />
            </a>
            <p style={{ marginTop: -50 }}>Precision electronics integration for modern industry. PCBs, ICs, breadboards, and complete embedded systems built to specification and tested to perfection.</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#mission">About Us</a></li>
              <li><a href="#how-we-work">How We Work</a></li>
              <li><a href="#location">Our Location</a></li>
              <li><a href="#location">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#electrical">PCB Design &amp; Fab</a></li>
              <li><a href="#electrical">IC Integration</a></li>
              <li><a href="#electronics">Embedded Systems</a></li>
              <li><a href="#electronics">Prototyping</a></li>
              <li><a href="#electronics">Quality Testing</a></li>
            </ul>
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
