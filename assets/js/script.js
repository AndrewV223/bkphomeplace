document.addEventListener('DOMContentLoaded', () => {
  // Lightbox Functionality
 /* const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const images = Array.from(document.querySelectorAll('.gallery-img img'));
  let currentIndex = 0;
  let touchStartX = 0;

  // Initialize Lightbox
  function initLightbox() {
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
      });
    });

    // Lightbox Controls
    document.querySelectorAll('.lightbox-control').forEach(control => {
      control.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.classList.contains('lightbox-prev')) {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
          currentIndex = (currentIndex + 1) % images.length;
        }
        updateLightbox();
      });
    });

    // Close Lightbox
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });*/

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') lightbox.classList.remove('active');
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
      }
    });

    // Touch Support
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;
      if (Math.abs(delta) > 50) {
        delta > 0 ? navigate(1) : navigate(-1);
      }
    });
    
    
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateLightbox();
  }

  function updateLightbox() {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
  }

  // Location Filter System
  async function initLocationFilter() {
    try {
      const response = await fetch('assets/data/locations.json');
      const data = await response.json();
      
      const filterButtons = document.querySelectorAll('.filter-btn');
      const locationGrid = document.getElementById('location-grid');

      function renderLocations(locations) {
        locationGrid.innerHTML = locations.map(loc => `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img src="${loc.image}" class="card-img-top" alt="${loc.name}">
              <div class="card-body">
                <h5 class="card-title">${loc.name}</h5>
                <p class="text-muted">${loc.category}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">${loc.distance} away</small>
                  <a href="${loc.map}" target="_blank" class="btn btn-sm btn-outline-primary"><i class="fas fa-map-marker-alt"></i> Map  </a>
                </div>
              </div>
            </div>
          </div>
        `).join('');
      }
      

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const filter = btn.dataset.filter;
          const filtered = filter === 'all' 
            ? data.locations 
            : data.locations.filter(loc => loc.category === filter);
            
          renderLocations(filtered);
        });
      });

      // Initial render
      renderLocations(data.locations);
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  }

  // Lazy Load Images
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  }

  // Initialize Components
  if (document.querySelector('.gallery-img')) initLightbox();
  if (document.getElementById('location-filter')) initLocationFilter();
  initLazyLoading();
});
document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('assets/data/locations.json');
      const data = await response.json();
      const grid = document.getElementById('locations-grid');

      // Function to render locations
      function renderLocations(locations) {
          grid.innerHTML = locations.map(loc => `
            <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
            <a href="${loc.website}" target="_blank">
            <img src="${loc.image}" class="card-img-top img-fluid" alt="${loc.name}"></a>
            <div class="card-body">
             <h5 class="card-title">${loc.name}</h5>
            <div class="d-flex justify-content-between align-items-center mb-3">
             <span class="badge bg-primary">${loc.category}</span>
            <small class="text-muted">${loc.distance} away</small>
      </div>
          <p class="card-text">${loc.description}</p>
            <div class="mt-auto">
           <small class="text-muted d-block mb-2">
           <i class="fas fa-car me-2"></i>${loc.travel_time.car} by car</small>
              <a href="${loc.map}" target="_blank" 
              class="btn btn-outline-primary w-100">
              <i class="fas fa-map-marker-alt me-2"></i>View on Map</a>
          </div>
       </div>
    </div>
 </div>
          `).join('');
      }

      // Initial render
      renderLocations(data.locations);

      // Filter functionality
      document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
              document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');

              const filter = btn.dataset.filter;
              const filtered = filter === 'all' 
                  ? data.locations 
                  : data.locations.filter(loc => loc.category === filter);

              renderLocations(filtered);
          });
      });

  } catch (error) {
      console.error('Error loading locations:', error);
      document.getElementById('locations-grid').innerHTML = 
          `<div class="col-12 text-center text-danger">Failed to load locations. Please try again later.</div>`;

        }
        // Language Select
       // Language Translation Code (Doesn't seems to work)
const languageSelect = document.getElementById("languageSelect");
let translations = {};

async function loadTranslations() {
    const response = await fetch("assets/data/translations.json");
    translations = await response.json();
}

function changeLanguage(lang) {
    const currentPage = document.body.getAttribute("data-page"); // Get current page name

    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        const page = element.getAttribute("data-page") || currentPage; // Use element's page or fallback to body tag

        if (translations[lang] && translations[lang][page] && translations[lang][page][key]) {
            element.textContent = translations[lang][page][key];
        }
    });

    localStorage.setItem("selectedLanguage", lang);
}

// Fetch translations and apply saved language immediately
(async () => {
    await loadTranslations();

    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    languageSelect.value = savedLang;
    changeLanguage(savedLang);
})();

// Listen for language selection change
languageSelect.addEventListener("change", function () {
    changeLanguage(this.value);
});
});


