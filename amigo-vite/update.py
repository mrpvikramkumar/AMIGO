import sys
import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_jsx = f.read()

with open('src/index.css', 'r', encoding='utf-8') as f:
    index_css = f.read()

# 1. Fix Mission typo
app_jsx = app_jsx.replace(
    'AMIGO Integrators Pvt. Ltd. was founded with a singular purpose — to bridgAMIGO Integrators Pvt. Ltd., established on 08 July 2020, is a specialized engineering company delivering high-reliability solutions in the defence sector. Our core expertise lies in Cable Harnessing, Electrical & Mechanical Integration, and system-level assembly for mission-critical applications..',
    'AMIGO Integrators Pvt. Ltd., established on 08 July 2020, is a specialized engineering company delivering high-reliability solutions in the defence sector. Our core expertise lies in Cable Harnessing, Electrical & Mechanical Integration, and system-level assembly for mission-critical applications.'
)

# 2. Move stats section
stats_start = app_jsx.find('<section id="stats">')
stats_end = app_jsx.find('</section>', stats_start) + len('</section>')
stats_section = app_jsx[stats_start:stats_end]

app_jsx = app_jsx[:stats_start] + app_jsx[stats_end:]

hww_end = app_jsx.find('</section>', app_jsx.find('<section id="how-we-work">')) + len('</section>')
app_jsx = app_jsx[:hww_end] + '\n\n' + stats_section + app_jsx[hww_end:]

# 3. Remove custom cursor JSX and logic
app_jsx = re.sub(r'<div className="cursor-dot" id="cursorDot"></div>\s*<div className="cursor-ring" id="cursorRing"></div>', '', app_jsx)
app_jsx = re.sub(r'// CUSTOM CURSOR.*?(?=(// SCROLL REVEAL))', '', app_jsx, flags=re.DOTALL)
app_jsx = re.sub(r'document\.removeEventListener\(\'mousemove\', onMouseMove\)\s*if \(rafId\) cancelAnimationFrame\(rafId\)\s*hoverTargets\.forEach\(el => \{\s*el\.removeEventListener\(\'mouseenter\', onEnter\)\s*el\.removeEventListener\(\'mouseleave\', onLeave\)\s*\}\)', '', app_jsx)
# Remove const hoverTargets and onEnter, onLeave if they are still there
app_jsx = re.sub(r'const hoverTargets.*?(?=(// SCROLL REVEAL))', '', app_jsx, flags=re.DOTALL)

# 4. Update address
app_jsx = re.sub(
    r'addressLines:\s*\[.*?\],',
    '''addressLines: [
    'Vaishnavi Tanmayi Residency, #102, 1st Floor',
    '193 -C, Vengalrao Nagar',
    'Hyderabad - 500038-TS',
  ],''',
    app_jsx,
    flags=re.DOTALL
)

# 5. Remove credentials grid
app_jsx = re.sub(r'<div className="credential-grid".*?</div>\s*</div>\s*</section>', '</div>\\n      </section>', app_jsx, flags=re.DOTALL)
# And remove COMPANY_CREDENTIALS array
app_jsx = re.sub(r'const COMPANY_CREDENTIALS.*?(?=export default)', '', app_jsx, flags=re.DOTALL)

# 6. Add Go to top button
gotop_jsx = '''<button id="goTopBtn" className="go-top-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} title="Go to top">? Top</button>\\n    </>'''
app_jsx = app_jsx.replace('</>', gotop_jsx)

# Add Go To Top logic
gotop_logic = '''
    const goTopBtn = document.getElementById('goTopBtn')
    const missionSection = document.getElementById('mission')
    const onScrollProgress = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (progressBar) progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%'
      
      if (goTopBtn && missionSection) {
        if (window.scrollY >= missionSection.offsetTop - 100) {
          goTopBtn.classList.add('visible')
        } else {
          goTopBtn.classList.remove('visible')
        }
      }
    }
'''
app_jsx = re.sub(r'const onScrollProgress = \(\) => \{.*?\}', gotop_logic.strip(), app_jsx, flags=re.DOTALL)

# Update CSS for Go Top Button and wider contact form
new_css = '''
/* Go Top Button */
.go-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  background: var(--red);
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(232, 16, 16, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.go-top-btn.visible {
  opacity: 1;
  pointer-events: auto;
}
.go-top-btn:hover {
  background: #c00d0d;
  transform: translateY(-3px);
}

/* Wider Contact Form */
@media (min-width: 900px) {
  .location-grid {
    grid-template-columns: 1fr 1.5fr !important;
  }
}
'''
index_css += new_css

# Also update Carousel Buttons to be text based
app_jsx = app_jsx.replace('<button className="carousel-prev" onClick={() => setCarouselIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}>&#10094;</button>',
                          '<button className="carousel-prev" onClick={() => setCarouselIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}>? Prev</button>')
app_jsx = app_jsx.replace('<button className="carousel-next" onClick={() => setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)}>&#10095;</button>',
                          '<button className="carousel-next" onClick={() => setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)}>Next ?</button>')

# Update carousel CSS to accommodate text buttons
index_css = index_css.replace('width: 40px;', 'width: auto; padding: 0 16px;')
index_css = index_css.replace('border-radius: 50%;', 'border-radius: 20px;')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_jsx)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(index_css)

print('Success')
