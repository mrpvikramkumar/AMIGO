const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');
let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Fix typo
app = app.replace('to bridgAMIGO Integrators Pvt. Ltd., established on 08 July 2020', 'AMIGO Integrators Pvt. Ltd., established on 08 July 2020');
app = app.replace('was founded with a singular purpose — AMIGO', 'AMIGO');
app = app.replace('applications..', 'applications.');

// 2. Move stats section
const statsStart = app.indexOf('<section id="stats">');
const statsEnd = app.indexOf('</section>', statsStart) + 10;
const statsSection = app.substring(statsStart, statsEnd);

app = app.substring(0, statsStart) + app.substring(statsEnd);

const hwwIdx = app.indexOf('<section id="how-we-work">');
const hwwEnd = app.indexOf('</section>', hwwIdx) + 10;
app = app.substring(0, hwwEnd) + '\n\n      ' + statsSection + app.substring(hwwEnd);

// 3. Remove custom cursor JSX and logic
app = app.replace(/<div className="cursor-dot" id="cursorDot"><\/div>\s*<div className="cursor-ring" id="cursorRing"><\/div>/g, '');
app = app.replace(/\/\/ CUSTOM CURSOR[\s\S]*?(?=\/\/ SCROLL REVEAL)/g, '');
app = app.replace(/const hoverTargets[\s\S]*?(?=\/\/ SCROLL REVEAL)/g, '');

app = app.replace(/document\.removeEventListener\('mousemove', onMouseMove\)\s*/g, '');
app = app.replace(/if \(rafId\) cancelAnimationFrame\(rafId\)\s*/g, '');
app = app.replace(/hoverTargets\.forEach[\s\S]*?\}\)\s*/g, '');

// 4. Update address
app = app.replace(/addressLines:\s*\[[\s\S]*?\],/, "addressLines: [ 'Vaishnavi Tanmayi Residency, #102, 1st Floor', '193 -C, Vengalrao Nagar', 'Hyderabad - 500038-TS' ],");

// 5. Remove credentials grid
app = app.replace(/<div className="credential-grid"[\s\S]*?<\/div>\s*<\/section>/, '</section>');
app = app.replace(/const COMPANY_CREDENTIALS[\s\S]*?(?=export default)/, '');

// 6. Add Go to top button
app = app.replace('</>', '<button id="goTopBtn" className="go-top-btn" onClick={() => window.scrollTo({top: 0, behavior: \'smooth\'})} title="Go to top">↑ Top</button>\n    </>');

app = app.replace(/const onScrollProgress[\s\S]*?(?=\/\/ LOADER)/, `const goTopBtn = document.getElementById('goTopBtn');
    const missionSection = document.getElementById('mission');
    const onScrollProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progressBar) progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
      
      if (goTopBtn && missionSection) {
        if (window.scrollY >= missionSection.offsetTop - 100) {
          goTopBtn.classList.add('visible');
        } else {
          goTopBtn.classList.remove('visible');
        }
      }
    };
    window.addEventListener('scroll', onScrollProgress);

    `);

// 7. Update carousel Buttons
app = app.replace(/<button className="carousel-prev".*?<\/button>/, '<button className="carousel-prev" onClick={() => setCarouselIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}>❮ Prev</button>');
app = app.replace(/<button className="carousel-next".*?<\/button>/, '<button className="carousel-next" onClick={() => setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)}>Next ❯</button>');

// 8. Update CSS
css += `
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
`;

css = css.replace('width: 40px;', 'width: auto; padding: 0 16px;');
css = css.replace('border-radius: 50%;', 'border-radius: 20px;');

fs.writeFileSync('src/App.jsx', app, 'utf8');
fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Success!');
