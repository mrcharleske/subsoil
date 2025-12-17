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
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.name;
    li.appendChild(a);
    navLinks.appendChild(li);
  });
  
  // Mobile navigation
  const mobileNavLinks = document.getElementById('mobile-nav-links');
  mobileNavLinks.innerHTML = '';
  content.navigation.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.name;
    li.appendChild(a);
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
  emailP.textContent = `Email: ${footerData.contact.email}`;
  
  const taglineP = document.createElement('p');
  taglineP.textContent = footerData.contact.tagline;
  
  contactSection.appendChild(contactH3);
  contactSection.appendChild(emailP);
  contactSection.appendChild(taglineP);
  container.appendChild(contactSection);
  
  // Copyright
  document.getElementById('footer-copyright').textContent = footerData.copyright;
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);
