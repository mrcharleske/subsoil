// app.js - Loads content from JSON and populates the page

// Fetch and load content
async function loadContent() {
  try {
    const response = await fetch('content.json');
    const content = await response.json();
    
    // Populate navigation
    populateNavigation(content);
    
    // Populate hero section
    populateHero(content.hero);
    
    // Populate content sections
    populateContentSections(content.contentSections);
    
    // Populate survey methods
    populateSurveyMethods(content.surveyMethods);
    
    // Populate about section
    populateAbout(content.about);
    
    // Populate why choose us
    populateWhyChooseUs(content.whyChooseUs);
    
    // Populate clients
    populateClients(content.clients);
    
    // Populate footer
    populateFooter(content.footer);
    
    // Initialize AOS animations after content is loaded
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
    
  } catch (error) {
    console.error('Error loading content:', error);
    document.body.innerHTML = '<div class="loading">Error loading content. Please refresh the page.</div>';
  }
}

// Populate navigation
function populateNavigation(content) {
  // Logo and company name
  document.getElementById('nav-logo').textContent = content.site.logo;
  document.getElementById('nav-company-name').textContent = content.site.name;
  
  // Desktop navigation
  const navLinks = document.getElementById('nav-links');
  navLinks.innerHTML = '';
  content.navigation.forEach(item => {
    const li = document.createElement('li');
    
    if (item.hasDropdown && item.subpages) {
      // Create dropdown structure
      li.className = 'nav-item-dropdown';
      
      const mainLink = document.createElement('a');
      mainLink.href = item.url;
      mainLink.textContent = item.name;
      mainLink.className = 'nav-link-with-dropdown';
      
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown-menu';
      
      item.subpages.forEach(subpage => {
        const subLink = document.createElement('a');
        subLink.href = subpage.url;
        subLink.textContent = subpage.name;
        subLink.className = 'dropdown-item';
        dropdown.appendChild(subLink);
      });
      
      li.appendChild(mainLink);
      li.appendChild(dropdown);
    } else {
      // Regular link
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.name;
      li.appendChild(a);
    }
    
    navLinks.appendChild(li);
  });
  
  // Mobile navigation
  const mobileNavLinks = document.getElementById('mobile-nav-links');
  mobileNavLinks.innerHTML = '';
  content.navigation.forEach(item => {
    const li = document.createElement('li');
    
    if (item.hasDropdown && item.subpages) {
      // Create expandable section for mobile
      li.className = 'mobile-nav-item-dropdown';
      
      const mainLink = document.createElement('div');
      mainLink.className = 'mobile-nav-parent';
      mainLink.textContent = item.name;
      
      const subList = document.createElement('ul');
      subList.className = 'mobile-submenu';
      
      // Add main page link first
      const mainPageLi = document.createElement('li');
      const mainPageLink = document.createElement('a');
      mainPageLink.href = item.url;
      mainPageLink.textContent = `View ${item.name}`;
      mainPageLi.appendChild(mainPageLink);
      subList.appendChild(mainPageLi);
      
      // Add subpages
      item.subpages.forEach(subpage => {
        const subLi = document.createElement('li');
        const subLink = document.createElement('a');
        subLink.href = subpage.url;
        subLink.textContent = subpage.name;
        subLi.appendChild(subLink);
        subList.appendChild(subLi);
      });
      
      li.appendChild(mainLink);
      li.appendChild(subList);
      
      // Toggle submenu on click
      mainLink.addEventListener('click', function() {
        this.classList.toggle('active');
        subList.classList.toggle('active');
      });
    } else {
      // Regular link
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.name;
      li.appendChild(a);
    }
    
    mobileNavLinks.appendChild(li);
  });
}

// Populate hero section
function populateHero(hero) {
  document.getElementById('hero-title').textContent = hero.title;
  document.getElementById('hero-description').textContent = hero.description;
  
  const primaryCTA = document.getElementById('hero-primary-cta');
  primaryCTA.textContent = hero.primaryCTA.text;
  primaryCTA.href = hero.primaryCTA.url;
  
  const secondaryCTA = document.getElementById('hero-secondary-cta');
  secondaryCTA.textContent = hero.secondaryCTA.text;
  secondaryCTA.href = hero.secondaryCTA.url;
}

// Populate content sections
function populateContentSections(sections) {
  const container = document.getElementById('content-sections-container');
  container.innerHTML = '';
  
  sections.forEach((section, index) => {
    const sectionElement = document.createElement('section');
    sectionElement.className = `content-section ${index % 2 === 1 ? 'gray-bg' : ''}`;
    
    const containerDiv = document.createElement('div');
    containerDiv.className = `section-container ${section.imagePosition === 'right' ? 'reverse' : ''}`;
    
    // Image wrapper
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'section-image-wrapper';
    imageWrapper.setAttribute('data-aos', section.imagePosition === 'left' ? 'fade-right' : 'fade-left');
    
    const img = document.createElement('img');
    img.src = section.image;
    img.alt = section.imageAlt;
    img.className = 'section-image';
    imageWrapper.appendChild(img);
    
    // Content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'section-content';
    contentDiv.setAttribute('data-aos', section.imagePosition === 'left' ? 'fade-left' : 'fade-right');
    
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    contentDiv.appendChild(h2);
    
    section.content.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      contentDiv.appendChild(p);
    });
    
    containerDiv.appendChild(imageWrapper);
    containerDiv.appendChild(contentDiv);
    sectionElement.appendChild(containerDiv);
    container.appendChild(sectionElement);
  });
}

// Populate survey methods
function populateSurveyMethods(surveyData) {
  document.getElementById('survey-title').textContent = surveyData.title;
  document.getElementById('survey-subtitle').textContent = surveyData.subtitle;
  
  const grid = document.getElementById('survey-grid');
  grid.innerHTML = '';
  
  surveyData.methods.forEach((method, index) => {
    const card = document.createElement('a');
    card.href = method.url;
    card.className = 'survey-card';
    card.setAttribute('data-aos', 'zoom-in');
    card.setAttribute('data-aos-delay', (index + 1) * 50);
    
    const icon = document.createElement('div');
    icon.className = 'survey-icon';
    icon.textContent = method.icon;
    
    const h3 = document.createElement('h3');
    h3.textContent = method.name;
    
    card.appendChild(icon);
    card.appendChild(h3);
    grid.appendChild(card);
  });
}

// Populate about section
function populateAbout(about) {
  document.getElementById('about-title').textContent = about.title;
  
  const paragraphsContainer = document.getElementById('about-paragraphs');
  paragraphsContainer.innerHTML = '';
  
  about.content.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    paragraphsContainer.appendChild(p);
  });
  
  const cta = document.getElementById('about-cta');
  cta.textContent = about.ctaText;
  cta.href = about.ctaUrl;
}

// Populate why choose us
function populateWhyChooseUs(whyData) {
  document.getElementById('why-choose-title').textContent = whyData.title;
  
  const grid = document.getElementById('why-choose-grid');
  grid.innerHTML = '';
  
  whyData.reasons.forEach((reason, index) => {
    const item = document.createElement('div');
    item.className = 'why-choose-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', (index + 1) * 50);
    
    const icon = document.createElement('div');
    icon.className = 'why-icon';
    icon.textContent = reason.icon;
    
    const h3 = document.createElement('h3');
    h3.textContent = reason.title;
    
    const p = document.createElement('p');
    p.textContent = reason.description;
    
    item.appendChild(icon);
    item.appendChild(h3);
    item.appendChild(p);
    grid.appendChild(item);
  });
}

// Populate clients
function populateClients(clientsData) {
  document.getElementById('clients-title').textContent = clientsData.title;
  
  const grid = document.getElementById('clients-grid');
  grid.innerHTML = '';
  
  clientsData.logos.forEach((client, index) => {
    const img = document.createElement('img');
    img.src = client.image;
    img.alt = client.name;
    img.className = 'client-logo';
    img.setAttribute('data-aos', 'fade-up');
    img.setAttribute('data-aos-delay', (index + 1) * 50);
    grid.appendChild(img);
  });
}

// Populate footer
function populateFooter(footerData) {
  const container = document.getElementById('footer-container');
  container.innerHTML = '';
  
  // Company section
  const companySection = document.createElement('div');
  companySection.className = 'footer-section';
  
  const companyH3 = document.createElement('h3');
  companyH3.textContent = footerData.company.name;
  
  const companyP = document.createElement('p');
  companyP.textContent = footerData.company.description;
  
  const logoWrapper = document.createElement('div');
  logoWrapper.className = 'footer-logo-wrapper';
  
  const logo = document.createElement('img');
  logo.src = footerData.company.logo;
  logo.alt = 'Subsoil Logo';
  logo.className = 'footer-logo';
  
  logoWrapper.appendChild(logo);
  companySection.appendChild(companyH3);
  companySection.appendChild(companyP);
  companySection.appendChild(logoWrapper);
  container.appendChild(companySection);
  
  // Services section
  const servicesSection = document.createElement('div');
  servicesSection.className = 'footer-section';
  
  const servicesH3 = document.createElement('h3');
  servicesH3.textContent = footerData.services.title;
  
  const servicesUl = document.createElement('ul');
  footerData.services.links.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    li.appendChild(a);
    servicesUl.appendChild(li);
  });
  
  servicesSection.appendChild(servicesH3);
  servicesSection.appendChild(servicesUl);
  container.appendChild(servicesSection);
  
  // Company links section
  const companyLinksSection = document.createElement('div');
  companyLinksSection.className = 'footer-section';
  
  const companyLinksH3 = document.createElement('h3');
  companyLinksH3.textContent = footerData.company_links.title;
  
  const companyLinksUl = document.createElement('ul');
  footerData.company_links.links.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.url;
    a.textContent = link.name;
    li.appendChild(a);
    companyLinksUl.appendChild(li);
  });
  
  companyLinksSection.appendChild(companyLinksH3);
  companyLinksSection.appendChild(companyLinksUl);
  container.appendChild(companyLinksSection);
  
  // Contact section
  const contactSection = document.createElement('div');
  contactSection.className = 'footer-section';
  
  const contactH3 = document.createElement('h3');
  contactH3.textContent = footerData.contact.title;
  
  const emailP = document.createElement('p');
  const emailLink = document.createElement('a');
  emailLink.href = `mailto:${footerData.contact.email}`;
  emailLink.textContent = footerData.contact.email;
  emailLink.style.color = 'rgba(255,255,255,0.8)';
  emailLink.style.textDecoration = 'none';
  emailLink.style.transition = 'color 0.3s ease';
  emailLink.addEventListener('mouseenter', function() {
    this.style.color = '#e74c3c';
  });
  emailLink.addEventListener('mouseleave', function() {
    this.style.color = 'rgba(255,255,255,0.8)';
  });
  emailP.textContent = 'Email: ';
  emailP.appendChild(emailLink);
  
  const taglineP = document.createElement('p');
  taglineP.textContent = footerData.contact.tagline;
  
  // Instagram link with icon
  const socialP = document.createElement('p');
  socialP.style.marginTop = '1.5rem';
  
  const instagramLink = document.createElement('a');
  instagramLink.href = footerData.contact.instagram;
  instagramLink.target = '_blank';
  instagramLink.rel = 'noopener noreferrer';
  instagramLink.style.display = 'inline-flex';
  instagramLink.style.alignItems = 'center';
  instagramLink.style.gap = '0.5rem';
  instagramLink.style.color = 'rgba(255,255,255,0.8)';
  instagramLink.style.textDecoration = 'none';
  instagramLink.style.fontSize = '1.1rem';
  instagramLink.style.transition = 'all 0.3s ease';
  
  instagramLink.addEventListener('mouseenter', function() {
    this.style.color = '#e74c3c';
    this.style.transform = 'translateY(-2px)';
  });
  instagramLink.addEventListener('mouseleave', function() {
    this.style.color = 'rgba(255,255,255,0.8)';
    this.style.transform = 'translateY(0)';
  });
  
  instagramLink.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
    <span>Follow us on Instagram</span>
  `;
  
  socialP.appendChild(instagramLink);
  
  contactSection.appendChild(contactH3);
  contactSection.appendChild(emailP);
  contactSection.appendChild(taglineP);
  contactSection.appendChild(socialP);
  container.appendChild(contactSection);
  
  // Copyright
  document.getElementById('footer-copyright').textContent = footerData.copyright;
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);
