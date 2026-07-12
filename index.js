// shivayur.in Dynamic Functionality

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStatsCounter();
  initServiceDrawer();
  initPortfolioDrawer();
  initProjectPlanner();
  initBookingModal();
  initTestimonialSlider();
  initIntersectionAnimations();
  initNewsletterSubscription();
  initHero3D();
});

// 1. Navigation & Hamburger Menu
function initNavigation() {
  const header = document.querySelector('.main-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navItems = document.querySelectorAll('.nav-item');

  // Change Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavOnScroll();
  });

  // Toggle Hamburger Menu
  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    drawerOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  drawerOverlay.addEventListener('click', toggleMenu);

  // Close menu on nav item click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Active navigation highlight based on scroll position
  const sections = document.querySelectorAll('section, footer');
  function updateActiveNavOnScroll() {
    let current = '';
    const scrollPos = window.scrollY + 120; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }
}

// 2. Stats Section Number Increments
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'));
        let currentVal = 0;
        const duration = 1500; // ms
        const stepTime = Math.max(Math.floor(duration / targetVal), 15);
        
        const counter = setInterval(() => {
          currentVal += 1;
          
          // Format text based on stat card
          if (target.innerHTML.includes('%') || targetVal === 99) {
            target.innerText = currentVal + '%';
          } else if (target.innerHTML.includes('+') || targetVal === 150) {
            target.innerText = currentVal + '+';
          } else if (target.innerHTML.includes('/7') || targetVal === 24) {
            target.innerText = currentVal + '/7';
          } else if (target.innerHTML.includes('x') || targetVal === 5) {
            target.innerText = currentVal + 'x';
          } else {
            target.innerText = currentVal;
          }

          if (currentVal >= targetVal) {
            clearInterval(counter);
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  };

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
  });

  statNumbers.forEach(stat => statsObserver.observe(stat));
}

// 3. Services Details Drawer (Modals)
const servicesData = {
  web: {
    title: "Website Designing",
    image: "assets/service-web.jpg",
    desc: "We engineer pixel-perfect, high-performance websites. Combining modern animation frameworks with semantic code structure, we ensure your site is fast, responsive, SEO-ready, and optimized to convert cold traffic into loyal clients.",
    deliverables: [
      "Custom Wireframe & UI/UX Figma Design",
      "Responsive Frontend Development (React/HTML5)",
      "Technical SEO Auditing & Optimization",
      "Interactive 3D Element Integration",
      "Google Analytics & Heatmap Setup"
    ],
    tech: ["Figma", "HTML5/CSS3", "JavaScript", "React", "Node.js", "Vite"]
  },
  video: {
    title: "Video Editing",
    image: "assets/service-video-motion.jpg",
    desc: "Storytelling is the key to digital attention. Our video editing pipeline focuses on seamless narrative flows, professional color grading, multi-cam synchronization, audio design, and custom speed-ramping tailored for high retention.",
    deliverables: [
      "Cinematic Directorial Narrative Cuts",
      "Pro Audio Balancing & Sound Design",
      "Color Correction & Grading (LUTs)",
      "Dynamic Subtitles & Graphics Overlay",
      "High-Compression Multi-Platform Exports"
    ],
    tech: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Audition"]
  },
  motion: {
    title: "Motion Graphics",
    image: "assets/service-video-motion.jpg",
    desc: "Breathe motion into static graphics. We design beautiful vector fluid motions, character explainers, logo animations, and UI demo walk-throughs to present complex technical topics in an engaging visual package.",
    deliverables: [
      "2D Explainer Video Animating",
      "Dynamic Logo Animation & Intros",
      "Web Lottie File Integration Assets",
      "Kinetic Typography Templates",
      "Custom Visual Effects (VFX)"
    ],
    tech: ["After Effects", "Adobe Illustrator", "Cinema 4D", "Lottie"]
  },
  logo: {
    title: "Logo Making & Branding",
    image: "assets/logo.png",
    desc: "Your brand is a visual promise. We build memorable vector logo grids, monogram variants, and design manuals containing corporate typography, palettes, and placement parameters to unify your brand image across all mediums.",
    deliverables: [
      "Primary Logo Mark Grid",
      "Monogram & Secondary Variants",
      "Full Typography & Color Guides",
      "Scalable Source Vectors (AI, SVG)",
      "Branded Layout & Stationery Kits"
    ],
    tech: ["Adobe Illustrator", "Figma", "Vector Grids", "Brand Theory"]
  },
  "3d": {
    title: "3D Menu Designing",
    image: "assets/service-3d.jpg",
    desc: "Deliver physical depth over the web. We build custom real-time 3D menu interfaces and asset viewers utilizing Three.js and WebGL. Allow users to inspect, rotate, and interact with elements on touch displays.",
    deliverables: [
      "Low-Poly 3D Asset Modeling (Blender)",
      "Three.js Real-time Interactive WebGL",
      "Fluid Animation Controllers",
      "Fast Asset Compression (GLTF/DRACO)",
      "Universal Mobile Touch Interactions"
    ],
    tech: ["Three.js", "WebGL", "Blender", "GLSL Shaders", "JavaScript"]
  },
  ai: {
    title: "AI Ads Making",
    image: "assets/service-ai.jpg",
    desc: "Outpace traditional marketing with high-throughput AI creatives. We develop structured prompt architectures, voice synthesis models, and dynamic templates to automatically export variations optimized for high CTR.",
    deliverables: [
      "Visual Prompt Design Models",
      "AI Voice-Over & Sound Matching",
      "Marketing Copy & Script Creation",
      "Varied Social Formats Layouts",
      "Ad Variant Optimization Review"
    ],
    tech: ["Midjourney", "Runway Gen-2", "ElevenLabs", "ChatGPT", "Premiere"]
  }
};

let activeDrawerServiceKey = '';

function initServiceDrawer() {
  const serviceCards = document.querySelectorAll('.service-card');
  const drawer = document.getElementById('serviceDrawer');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  const titleEl = document.getElementById('drawerTitle');
  const imageEl = document.getElementById('drawerImage');
  const descEl = document.getElementById('drawerDesc');
  const deliverablesEl = document.getElementById('drawerDeliverables');
  const techEl = document.getElementById('drawerTech');

  // Open Drawer on card click
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceKey = card.getAttribute('data-service');
      const data = servicesData[serviceKey];
      
      if (!data) return;

      activeDrawerServiceKey = serviceKey;

      // Populate elements
      titleEl.innerText = data.title;
      imageEl.src = data.image;
      descEl.innerText = data.desc;

      // Populate deliverables
      deliverablesEl.innerHTML = '';
      data.deliverables.forEach(del => {
        const li = document.createElement('li');
        li.innerText = del;
        deliverablesEl.appendChild(li);
      });

      // Populate Tech tags
      techEl.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'drawer-tag';
        span.innerText = t;
        techEl.appendChild(span);
      });

      // Show Drawer & Overlay
      drawer.classList.add('open');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Drawer
  function closeDrawer() {
    drawer.classList.remove('open');
    if (!document.getElementById('navMenu').classList.contains('active') && 
        !document.getElementById('portfolioDrawer').classList.contains('open')) {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  closeBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer if anchor CTA clicked
  document.getElementById('drawerCtaBtn').addEventListener('click', () => {
    closeDrawer();
    // Auto-select corresponding service pill in Project Planner
    const pill = document.querySelector(`.service-pill[data-service="${activeDrawerServiceKey}"]`);
    if (pill && !pill.classList.contains('active')) {
      pill.click(); // click it programmatically to activate
    }
  });
}

// Portfolio Projects Case Studies Data
const portfolioData = {
  aether: {
    title: "Aether Web Experience",
    client: "Aether Technologies LLC",
    category: "Website Designing",
    image: "assets/service-web.jpg",
    challenge: "Aether Tech needed a corporate portal that simplified cloud infrastructure visual workflows while maintaining under 1.5-second load times globally to combat drop-off.",
    solution: "We engineered a static site utilizing modern bundler compression and optimized canvas vectors. Set up micro-interactions for step-by-step product walkthroughs.",
    outcome: "Achieved a 98% Lighthouse Speed Score. Direct demo registration conversions spiked by 133% during the first month post-launch.",
    tech: ["HTML5", "CSS Grid", "Vite", "SEO Semantics", "Web Graphics"],
    serviceKey: "web"
  },
  nexus: {
    title: "Future Nexus Promo",
    client: "Nexus EV Automotive",
    category: "Video & Motion Production",
    image: "assets/service-video-motion.jpg",
    challenge: "Nexus wanted a high-energy commercial promo video for their electric super-car concept launch, requiring high-futility visuals and sync visual assets.",
    solution: "Combined dynamic camera trackings, kinetic typographic screens, and cinematic audio design. Integrated neon light trail visual overlays in Post-Production.",
    outcome: "Earned 2.4 Million video impressions during the launching campaign, multiplying EV waitlist sign-ups by 2.5x.",
    tech: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Audition"],
    serviceKey: "motion"
  },
  neofood: {
    title: "Neofood Interactive Menu",
    client: "Lumina Bistro Group",
    category: "3D Menu Designing",
    image: "assets/service-3d.jpg",
    challenge: "Lumina wanted to reduce table turn time and boost digital delivery order values by letting users interactively configure dishes.",
    solution: "Modeled photorealistic low-poly food items in Blender. Built a responsive web browser WebGL scene using Three.js for smooth rotation on mobile devices.",
    outcome: "Boosted digital dessert add-ons by 45% and reduced order processing overhead. Online table bookings grew by 67%.",
    tech: ["Three.js", "WebGL", "Blender", "JavaScript", "Draco GLTF"],
    serviceKey: "3d"
  },
  omni: {
    title: "Omni-Channel AI Launch",
    client: "Vance Retail Corporation",
    category: "AI Ads Making",
    image: "assets/service-ai.jpg",
    challenge: "Vance needed 500 localized variant creatives for multi-city seasonal campaigns, facing tight budgets and a 48-hour deadline.",
    solution: "Constructed programmatic generative model templates. Automatically processed Midjourney product assets, layered with AI synthetic voiceovers.",
    outcome: "Exported all assets in 24 hours. Facebook campaign Cost-Per-Click (CPC) dropped by 35% compared to stock banner baselines.",
    tech: ["ChatGPT", "Midjourney", "Runway Gen-2", "ElevenLabs", "Premiere"],
    serviceKey: "ai"
  }
};

function initPortfolioDrawer() {
  const cards = document.querySelectorAll('.portfolio-card');
  const drawer = document.getElementById('portfolioDrawer');
  const closeBtn = document.getElementById('closePDrawerBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  const titleEl = document.getElementById('pDrawerTitle');
  const imageEl = document.getElementById('pDrawerImage');
  const clientEl = document.getElementById('pDrawerClient');
  const categoryEl = document.getElementById('pDrawerCategory');
  const challengeEl = document.getElementById('pDrawerChallenge');
  const solutionEl = document.getElementById('pDrawerSolution');
  const outcomeEl = document.getElementById('pDrawerOutcome');
  const techEl = document.getElementById('pDrawerTech');
  const ctaBtn = document.getElementById('pDrawerCtaBtn');

  let activeProjectKey = '';

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projKey = card.getAttribute('data-project');
      const data = portfolioData[projKey];
      if (!data) return;

      activeProjectKey = projKey;

      // Populate Elements
      titleEl.innerText = data.title;
      imageEl.src = data.image;
      clientEl.innerText = data.client;
      categoryEl.innerText = data.category;
      challengeEl.innerText = data.challenge;
      solutionEl.innerText = data.solution;
      outcomeEl.innerText = data.outcome;

      // Populate Tech Tags
      techEl.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'drawer-tag';
        span.innerText = t;
        techEl.appendChild(span);
      });

      // Show drawer
      drawer.classList.add('open');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeDrawer() {
    drawer.classList.remove('open');
    if (!document.getElementById('navMenu').classList.contains('active') && 
        !document.getElementById('serviceDrawer').classList.contains('open')) {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  closeBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  ctaBtn.addEventListener('click', () => {
    closeDrawer();
    const data = portfolioData[activeProjectKey];
    if (data && data.serviceKey) {
      // Auto-select corresponding service pill in Project Planner
      const pill = document.querySelector(`.service-pill[data-service="${data.serviceKey}"]`);
      if (pill && !pill.classList.contains('active')) {
        pill.click();
      }
    }
  });
}

// 4. Project Planner / Interactive Quote Builder
const servicePricing = {
  web: { name: "Website Design", time: 4, tech: ["React", "HTML5", "Node.js", "Vite"], priceINR: 10000, priceUSD: 120, type: "flat" },
  video: { name: "Video Editing", time: 2, tech: ["Premiere Pro", "DaVinci Resolve"], priceINR: 200, priceUSD: 3, type: "perMin" },
  motion: { name: "Motion Graphics", time: 3, tech: ["After Effects", "Lottie"], priceINR: 400, priceUSD: 5, type: "perMin" },
  logo: { name: "Logo Making", time: 1, tech: ["Adobe Illustrator", "Branding Guide"], priceINR: 700, priceUSD: 10, type: "flat" },
  "3d": { name: "3D Menu Design", time: 6, tech: ["Three.js", "WebGL", "Blender"], priceINR: 1500, priceUSD: 20, type: "flat" },
  ai: { name: "AI Ads Making", time: 2, tech: ["Midjourney", "Runway Gen-2"], priceINR: 8000, priceUSD: 100, type: "flat" }
};

function initProjectPlanner() {
  const form = document.getElementById('projectPlannerForm');
  const pills = document.querySelectorAll('.service-pill');
  const timelineInput = document.getElementById('projectTimeline');
  const timelineVal = document.getElementById('timelineValue');
  const durationGroup = document.getElementById('videoDurationGroup');
  const durationInput = document.getElementById('videoDuration');
  const durationVal = document.getElementById('durationValue');
  const currencyToggles = document.querySelectorAll('.currency-toggle');
  
  // Summary/Visual panel elements
  const summaryServices = document.getElementById('summaryServicesCount');
  const summaryTech = document.getElementById('summaryTechStack');
  const summaryTimeline = document.getElementById('summaryTimeline');
  const summaryPrice = document.getElementById('summaryPrice');
  const servicesError = document.getElementById('servicesError');

  let selectedServices = [];
  let activeCurrency = 'INR';
  let videoDuration = 5; // Mins

  // Currency Toggle Events
  currencyToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      currencyToggles.forEach(t => {
        t.classList.remove('active');
        t.style.background = 'transparent';
        t.style.color = 'var(--text-secondary)';
      });
      toggle.classList.add('active');
      toggle.style.background = 'var(--gradient-primary)';
      toggle.style.color = '#000';
      
      activeCurrency = toggle.getAttribute('data-currency');
      updateCalculator();
    });
  });

  // Video Duration Event
  durationInput.addEventListener('input', (e) => {
    videoDuration = parseInt(e.target.value);
    durationVal.innerText = `${videoDuration} Mins`;
    updateCalculator();
  });

  // Toggle Service pills
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      const serviceKey = pill.getAttribute('data-service');
      
      if (pill.classList.contains('active')) {
        selectedServices.push(serviceKey);
      } else {
        selectedServices = selectedServices.filter(key => key !== serviceKey);
      }

      // Show/Hide video duration slider if Video or Motion are selected
      if (selectedServices.includes('video') || selectedServices.includes('motion')) {
        durationGroup.classList.remove('hidden');
      } else {
        durationGroup.classList.add('hidden');
      }

      updateCalculator();
    });
  });

  // Update slider display
  timelineInput.addEventListener('input', (e) => {
    timelineVal.innerText = `${e.target.value} Weeks`;
    summaryTimeline.innerText = `${e.target.value} Weeks`;
  });

  function updateCalculator() {
    const totalSelected = selectedServices.length;
    
    if (totalSelected > 0) {
      servicesError.style.display = 'none';
      
      let basePrice = 0;
      let totalTime = 0;
      let allTech = [];

      selectedServices.forEach(key => {
        const config = servicePricing[key];
        totalTime += config.time;
        allTech = allTech.concat(config.tech);

        let itemPrice = activeCurrency === 'INR' ? config.priceINR : config.priceUSD;
        if (config.type === 'perMin') {
          itemPrice = itemPrice * videoDuration; // Multiply per min rate by video duration
        }
        basePrice += itemPrice;
      });

      // Compress timeline if multiple services are built in parallel
      totalTime = Math.max(Math.ceil(totalTime * 0.7), 2);
      
      // Filter unique tech
      allTech = [...new Set(allTech)].slice(0, 5); // show top 5

      // Update Visuals
      summaryServices.innerText = `${totalSelected} Selected`;
      
      // Set recommended slider value
      timelineInput.value = totalTime;
      timelineVal.innerText = `${totalTime} Weeks`;
      summaryTimeline.innerText = `${totalTime} Weeks`;
      
      // Render Tech Tags
      summaryTech.innerHTML = '';
      allTech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'drawer-tag';
        span.style.fontSize = '0.75rem';
        span.style.padding = '2px 8px';
        span.innerText = t;
        summaryTech.appendChild(span);
      });

      const currSymbol = activeCurrency === 'INR' ? '₹' : '$';
      // Format with thousands separator for INR
      const formatPrice = (p) => activeCurrency === 'INR' ? p.toLocaleString('en-IN') : p.toString();
      summaryPrice.innerText = `${currSymbol}${formatPrice(basePrice)} - ${currSymbol}${formatPrice(Math.ceil(basePrice * 1.3))}`;
    } else {
      // Reset defaults
      summaryServices.innerText = "0 Selected";
      summaryTech.innerHTML = "-";
      summaryTimeline.innerText = "4 Weeks";
      summaryPrice.innerText = activeCurrency === 'INR' ? "₹0 - ₹0" : "$0 - $0";
      timelineInput.value = 4;
      timelineVal.innerText = "4 Weeks";
    }
  }

  // Handle Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate Services Pill selection
    if (selectedServices.length === 0) {
      servicesError.style.display = 'block';
      servicesError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Standard Form Validation
    const nameInput = document.getElementById('clientName');
    const emailInput = document.getElementById('clientEmail');
    const descInput = document.getElementById('projectDesc');
    let hasError = false;

    [nameInput, emailInput, descInput].forEach(input => {
      if (!input.value.trim() || (input.type === 'email' && !validateEmail(input.value))) {
        input.classList.add('invalid');
        hasError = true;
      } else {
        input.classList.remove('invalid');
      }
    });

    if (hasError) return;

    // Show loading spinner during submit
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    btnText.style.opacity = '0';
    btnSpinner.classList.remove('hidden');
    submitBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      btnSpinner.classList.add('hidden');
      btnText.style.opacity = '1';
      submitBtn.style.pointerEvents = 'auto';

      // Capture specifications and build blueprint details
      const servicesNames = selectedServices.map(key => servicePricing[key].name);
      
      let basePrice = 0;
      selectedServices.forEach(key => {
        const config = servicePricing[key];
        let price = activeCurrency === 'INR' ? config.priceINR : config.priceUSD;
        if (config.type === 'perMin') {
          price = price * videoDuration;
        }
        basePrice += price;
      });
      
      const currSymbol = activeCurrency === 'INR' ? '₹' : '$';
      const formatPrice = (p) => activeCurrency === 'INR' ? p.toLocaleString('en-IN') : p.toString();
      const budgetRange = `${currSymbol}${formatPrice(basePrice)} - ${currSymbol}${formatPrice(Math.ceil(basePrice * 1.3))}`;
      const timelineValStr = `${timelineInput.value} Weeks`;
      
      const proposalId = `SHV-${Math.floor(Math.random() * 90000) + 10000}`;
      const submissionData = {
        id: proposalId,
        name: nameInput.value,
        email: emailInput.value,
        services: servicesNames,
        timeline: timelineValStr,
        budget: budgetRange,
        description: descInput.value,
        timestamp: new Date().toISOString()
      };

      // Save submission in localStorage
      const existing = JSON.parse(localStorage.getItem('shivayur_quotes') || '[]');
      existing.push(submissionData);
      localStorage.setItem('shivayur_quotes', JSON.stringify(existing));

      // Extract unique tech recommendation list
      let selectedTechs = [];
      selectedServices.forEach(key => {
        selectedTechs = selectedTechs.concat(servicePricing[key].tech);
      });
      const uniqueTechs = [...new Set(selectedTechs)].slice(0, 5).join(', ');

      // Render the detailed success receipt inside the success box
      const successBox = document.getElementById('formSuccess');
      successBox.innerHTML = `
        <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
        <h3>Proposal Registered!</h3>
        <p class="text-sm text-secondary">A blueprint has been prepared and queued for human review.</p>
        
        <div class="planner-visual-card mt-4" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; text-align: left; margin-top: 20px; font-size: 0.9rem;">
          <div class="estimator-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;"><span>Proposal ID:</span><strong>${proposalId}</strong></div>
          <div class="estimator-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;"><span>Client:</span><strong>${nameInput.value}</strong></div>
          <div class="estimator-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;"><span>Selected Services:</span><strong>${servicesNames.join(', ')}</strong></div>
          ${(selectedServices.includes('video') || selectedServices.includes('motion')) ? `<div class="estimator-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;"><span>Video Duration:</span><strong>${videoDuration} Mins</strong></div>` : ''}
          <div class="estimator-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;"><span>Speed/Timeline:</span><strong>${timelineValStr}</strong></div>
          <div class="estimator-row" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.85rem;"><span>Recommended Tech:</span><strong style="color: var(--primary); font-size: 0.75rem;">${uniqueTechs}</strong></div>
          <div class="price-indicator" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">Estimated Value Range:</span>
            <strong style="font-size: 1.3rem; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${budgetRange}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; margin-top: 24px;">
          <button class="btn btn-primary" id="downloadProposalBtn" style="padding: 10px 20px; font-size: 0.85rem;"><i class="fa-solid fa-download"></i> Save Quote</button>
          <button class="btn btn-secondary" id="resetSuccessFormBtn" style="padding: 10px 20px; font-size: 0.85rem;">Build Another</button>
        </div>
      `;

      // Log receipt for debugging / visual verification
      console.log("SHIVAYUR.IN SUBMISSION REGISTERED:\n", submissionData);

      // Handle download proposal file
      document.getElementById('downloadProposalBtn').addEventListener('click', () => {
        const fileContent = `SHIVAYUR.IN - SERVICE ESTIMATE PROPOSAL\n========================================\nProposal ID: ${proposalId}\nClient Name: ${nameInput.value}\nEmail: ${emailInput.value}\nDate: ${new Date().toLocaleDateString()}\n\nSelected Services:\n${servicesNames.map(s => `- ${s}`).join('\n')}\n${(selectedServices.includes('video') || selectedServices.includes('motion')) ? `Video Duration: ${videoDuration} Mins\n` : ''}\nRecommended Tech Stack:\n${uniqueTechs}\n\nProjected Timeline: ${timelineValStr}\nEstimated Budget Range: ${budgetRange}\n\nProject Scope & Specifications:\n"${descInput.value}"\n\n========================================\nThank you for choosing Shivayur.in. Our team will review this blueprint and email you within 12 hours with structural designs.\n`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Shivayur_Proposal_${proposalId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      // Reset Form handler inside success box
      document.getElementById('resetSuccessFormBtn').addEventListener('click', () => {
        form.reset();
        pills.forEach(pill => pill.classList.remove('active'));
        selectedServices = [];
        durationGroup.classList.add('hidden');
        updateCalculator();
        successBox.classList.add('hidden');
        form.classList.remove('hidden');
      });

      form.classList.add('hidden');
      successBox.classList.remove('hidden');
    }, 2000);
  });
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.classList.remove('invalid');
      }
    });
  });
}

// 5. Testimonial Slider / Carousel
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  
  let currentIndex = 0;
  let autoSlideTimer;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentIndex = (index + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
    resetAutoSlide();
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
    resetAutoSlide();
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.getAttribute('data-index')));
      resetAutoSlide();
    });
  });

  // Auto slide setting
  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 7000); // rotate every 7 seconds
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  startAutoSlide();
}

// 6. Scroll Animations System
function initIntersectionAnimations() {
  // We can add simple fade-in classes
  const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .stat-card, .planner-visual-card, .planner-form-container');
  
  // Style configurations
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
  });

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(revealOnScroll, {
    threshold: 0.15
  });

  revealElements.forEach(el => scrollObserver.observe(el));
}

// 7. Footer Newsletter Form
function initNewsletterSubscription() {
  const form = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('subscribeEmail');
  const msgEl = document.getElementById('subscribeMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      msgEl.innerText = "Please enter a valid email address.";
      msgEl.className = "subscribe-msg error mt-2";
      return;
    }

    msgEl.innerText = "Connecting to Cosmos...";
    msgEl.className = "subscribe-msg mt-2";
    msgEl.style.display = "block";

    setTimeout(() => {
      msgEl.innerText = "Subscribed successfully!";
      msgEl.className = "subscribe-msg success mt-2";
      emailInput.value = '';
    }, 1500);
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}

// 8. 3D Animations inside Hero section using Three.js
function initHero3D() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 24;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3D Objects: 1. Animated Terrain Cyber-Grid Wave
  const gridGeometry = new THREE.PlaneGeometry(120, 120, 32, 32);
  const gridMaterial = new THREE.MeshBasicMaterial({
    color: 0x4facfe,
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });
  const terrain = new THREE.Mesh(gridGeometry, gridMaterial);
  terrain.rotation.x = -Math.PI / 2.3; // tilt to ground plane
  terrain.position.y = -11;
  terrain.position.z = -10;
  scene.add(terrain);

  // 3D Objects: 2. Rotating Torus Knot (Floating on the right column)
  const knotGeometry = new THREE.TorusKnotGeometry(5.5, 1.8, 100, 16);
  const knotMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.14
  });
  const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
  scene.add(torusKnot);

  // Align Torus Knot to right column dynamically based on screen width
  function positionKnot() {
    if (window.innerWidth < 768) {
      torusKnot.position.x = 0;
      torusKnot.position.y = -2;
      torusKnot.scale.set(0.7, 0.7, 0.7);
    } else if (window.innerWidth < 1024) {
      torusKnot.position.x = 4.5;
      torusKnot.position.y = 0.5;
      torusKnot.scale.set(0.85, 0.85, 0.85);
    } else {
      torusKnot.position.x = 6.2;
      torusKnot.position.y = 1.0;
      torusKnot.scale.set(1.0, 1.0, 1.0);
    }
  }
  positionKnot();

  // 3D Objects: 3. Floating Star Particle Cloud (Spanned in space)
  const particlesCount = 350;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 55;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Canvas circle texture for glowing soft stars
  const createCircleTexture = () => {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(pCanvas);
  };

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.45,
    map: createCircleTexture(),
    transparent: true,
    color: 0xb927fc,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Mouse interactivity variables
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  });

  // JS-driven 3D Mouse Tilt effect on the floating Logo card
  const card = document.querySelector('.hero-card-floating');
  if (card) {
    window.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      
      const rotateX = -(e.clientY - cardY) / 10;
      const rotateY = (e.clientX - cardX) / 10;
      
      const clampedX = Math.max(-15, Math.min(15, rotateX));
      const clampedY = Math.max(-15, Math.min(15, rotateY));
      
      card.style.transform = `perspective(1000px) rotateX(${clampedX}deg) rotateY(${clampedY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  }

  // Animation Loop
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // 1. Rotate the Torus Knot mesh
    torusKnot.rotation.x = elapsedTime * 0.08;
    torusKnot.rotation.y = elapsedTime * 0.11;

    // 2. Rotate the particles system slowly
    particles.rotation.y = -elapsedTime * 0.03;
    particles.rotation.x = elapsedTime * 0.01;

    // 3. Animate Cyber Grid Terrain vertices (Sine waves)
    const posArr = gridGeometry.attributes.position.array;
    const timeFactor = elapsedTime * 1.5;
    for (let i = 0; i < posArr.length; i += 3) {
      const xVal = posArr[i];
      const yVal = posArr[i + 1];
      // Wave equation combining trigonometric components
      posArr[i + 2] = Math.sin(xVal * 0.08 + timeFactor) * 2.2 + Math.cos(yVal * 0.08 + timeFactor) * 2.2;
    }
    gridGeometry.attributes.position.needsUpdate = true;

    // 4. Parallax Camera easing based on mouse
    targetX = mouseX * 4.5;
    targetY = mouseY * 3.5;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  tick();

  // Resize handler
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    positionKnot();
  });
}

// 9. Booking Modal popup handlers
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const overlay = document.getElementById('bookingOverlay');
  const openNavBtn = document.getElementById('bookCallNavBtn');
  const openMobileBtn = document.getElementById('bookCallMobileBtn');
  const closeBtn = document.getElementById('closeBookingBtn');
  const mockSubmitBtn = document.getElementById('confirmMockBookingBtn');
  
  const openBtns = [openNavBtn, openMobileBtn];
  
  openBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  function closeModal() {
    modal.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Handle mock slot selection
  const slots = document.querySelectorAll('.slot-pill');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
    });
  });

  const activeDays = document.querySelectorAll('.day-num.active-day');
  activeDays.forEach(day => {
    day.addEventListener('click', () => {
      activeDays.forEach(d => d.style.background = 'none');
      day.style.background = 'rgba(79, 172, 254, 0.2)';
    });
  });

  if (mockSubmitBtn) {
    mockSubmitBtn.addEventListener('click', () => {
      const activeDayEl = Array.from(activeDays).find(d => d.style.background.includes('rgba'));
      const dayText = activeDayEl ? activeDayEl.innerText : '14';
      const activeSlotEl = document.querySelector('.slot-pill.active');
      const slotText = activeSlotEl ? activeSlotEl.innerText : '02:30 PM';

      alert(`Booking Request Sent!\nSelected Date: July ${dayText}, 2026 at ${slotText}.\nWe will send a calendar invite to shivayur.co.uk@gmail.com shortly.`);
      closeModal();
    });
  }
}
