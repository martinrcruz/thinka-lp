/**
 * Thinka - Main JavaScript File
 * Handles theme switching, language switching, and core functionality
 */

class ThinkaApp {
    constructor() {
        this.currentTheme = 'light';
        this.currentLanguage = 'es';
        this.isScrolled = false;
        this.translations = this.initTranslations();
        this.init();
    }

    initTranslations() {
        return {
            es: {
                // Navigation
                'nav-inicio': 'Inicio',
                'nav-servicios': 'Servicios',
                'nav-nosotros': 'Nosotros',
                'nav-portafolio': 'Portafolio',
                'nav-testimonios': 'Testimonios',
                'nav-contacto': 'Contacto',

                // Hero Section
                'hero-badge': 'Tecnología de Vanguardia',
                'hero-title-main': 'Desarrollo de Software',
                'hero-title-highlight': 'a Medida',
                'hero-title-sub': 'con Inteligencia Artificial',
                'hero-description': 'Transformamos ideas en soluciones digitales inteligentes. Especializados en chatbots avanzados, aplicaciones web personalizadas y sistemas de automatización que revolucionan tu negocio.',
                'hero-stat-proyectos': 'Proyectos',
                'hero-stat-satisfaccion': 'Satisfacción',
                'hero-stat-anos': 'Años',
                'hero-btn-comenzar': 'Comenzar Proyecto',
                'hero-btn-demo': 'Ver Demo',
                'hero-trust': 'Empresas que confían en nosotros:',

                // Services Section
                'services-badge': 'Servicios Especializados',
                'services-title': 'Soluciones Tecnológicas de Vanguardia',
                'services-description': 'Desarrollamos software a medida integrando inteligencia artificial para transformar digitalmente tu empresa con soluciones escalables y de alto rendimiento.',

                // About Section
                'about-title': '¿Por qué Thinka?',
                'tech-title': 'Nuestro Stack Tecnológico',

                // Portfolio Section
                'portfolio-badge': 'Casos de Éxito',
                'portfolio-title': 'Proyectos que Transforman Negocios',
                'portfolio-description': 'Descubre cómo nuestras soluciones de IA y desarrollo a medida han revolucionado la operación de empresas líderes en diversos sectores industriales.',
                'portfolio-filter-all': 'Todos los Proyectos',
                'portfolio-filter-chatbot': 'Chatbots IA',
                'portfolio-filter-dashboard': 'Dashboards',
                'portfolio-filter-mobile': 'Apps Móviles',
                'portfolio-filter-automation': 'Automatización',

                // Testimonials Section
                'testimonials-title': 'Lo que Dicen Nuestros Clientes',
                'testimonials-description': 'Descubre por qué las empresas confían en Thinka para transformar sus procesos con tecnología',

                // Contact Section
                'contact-title': '¿Listo para Transformar tu Negocio?',
                'contact-description': 'Contáctanos para discutir cómo podemos ayudarte a implementar soluciones tecnológicas innovadoras',
                'contact-email': 'Email',
                'contact-phone': 'Teléfono',
                'contact-location': 'Ubicación',
                'contact-form-name': 'Nombre',
                'contact-form-email': 'Email',
                'contact-form-company': 'Empresa',
                'contact-form-service': 'Servicio de Interés',
                'contact-form-message': 'Mensaje',
                'contact-form-submit': 'Enviar Mensaje',
                'contact-form-select': 'Seleccionar servicio',

                // Footer
                'footer-description': 'Soluciones de software inteligentes que transforman tu negocio a través de la innovación tecnológica.',
                'footer-services': 'Servicios',
                'footer-company': 'Empresa',
                'footer-follow': 'Síguenos',
                'footer-rights': 'Todos los derechos reservados.',

                // Accessibility
                'skip-link': 'Saltar al contenido principal',
                'theme-toggle-label': 'Cambiar tema',
                'language-toggle-label': 'Cambiar idioma',
                'mobile-menu-toggle-label': 'Abrir menú móvil',

                // Form validation
                'field-required': 'El campo {0} es requerido',
                'email-invalid': 'Email inválido',
                'form-sending': 'Enviando...',
                'form-success': 'Mensaje enviado exitosamente',
                'form-error': 'Error al enviar mensaje',

                // Theme announcements
                'theme-dark-activated': 'Modo oscuro activado',
                'theme-light-activated': 'Modo claro activado',
                'language-activated': 'Español activado'
            },
            en: {
                // Navigation
                'nav-inicio': 'Home',
                'nav-servicios': 'Services',
                'nav-nosotros': 'About',
                'nav-portafolio': 'Portfolio',
                'nav-testimonios': 'Testimonials',
                'nav-contacto': 'Contact',

                // Hero Section
                'hero-badge': 'Cutting-Edge Technology',
                'hero-title-main': 'Custom Software',
                'hero-title-highlight': 'Development',
                'hero-title-sub': 'with Artificial Intelligence',
                'hero-description': 'We transform ideas into intelligent digital solutions. Specialized in advanced chatbots, custom web applications, and automation systems that revolutionize your business.',
                'hero-stat-proyectos': 'Projects',
                'hero-stat-satisfaccion': 'Satisfaction',
                'hero-stat-anos': 'Years',
                'hero-btn-comenzar': 'Start Project',
                'hero-btn-demo': 'View Demo',
                'hero-trust': 'Companies that trust us:',

                // Services Section
                'services-badge': 'Specialized Services',
                'services-title': 'Cutting-Edge Technology Solutions',
                'services-description': 'We develop custom software integrating artificial intelligence to digitally transform your company with scalable, high-performance solutions.',

                // About Section
                'about-title': 'Why Thinka?',
                'tech-title': 'Our Technology Stack',

                // Portfolio Section
                'portfolio-badge': 'Success Stories',
                'portfolio-title': 'Projects that Transform Businesses',
                'portfolio-description': 'Discover how our AI and custom development solutions have revolutionized the operations of leading companies across various industrial sectors.',
                'portfolio-filter-all': 'All Projects',
                'portfolio-filter-chatbot': 'AI Chatbots',
                'portfolio-filter-dashboard': 'Dashboards',
                'portfolio-filter-mobile': 'Mobile Apps',
                'portfolio-filter-automation': 'Automation',

                // Testimonials Section
                'testimonials-title': 'What Our Clients Say',
                'testimonials-description': 'Discover why companies trust Thinka to transform their processes with technology',

                // Contact Section
                'contact-title': 'Ready to Transform Your Business?',
                'contact-description': 'Contact us to discuss how we can help you implement innovative technology solutions',
                'contact-email': 'Email',
                'contact-phone': 'Phone',
                'contact-location': 'Location',
                'contact-form-name': 'Name',
                'contact-form-email': 'Email',
                'contact-form-company': 'Company',
                'contact-form-service': 'Service of Interest',
                'contact-form-message': 'Message',
                'contact-form-submit': 'Send Message',
                'contact-form-select': 'Select service',

                // Footer
                'footer-description': 'Intelligent software solutions that transform your business through technological innovation.',
                'footer-services': 'Services',
                'footer-company': 'Company',
                'footer-follow': 'Follow Us',
                'footer-rights': 'All rights reserved.',

                // Accessibility
                'skip-link': 'Skip to main content',
                'theme-toggle-label': 'Toggle theme',
                'language-toggle-label': 'Change language',
                'mobile-menu-toggle-label': 'Open mobile menu',

                // Form validation
                'field-required': 'The {0} field is required',
                'email-invalid': 'Invalid email',
                'form-sending': 'Sending...',
                'form-success': 'Message sent successfully',
                'form-error': 'Error sending message',

                // Theme announcements
                'theme-dark-activated': 'Dark mode activated',
                'theme-light-activated': 'Light mode activated',
                'language-activated': 'English activated'
            }
        };
    }

    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupFormHandling();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language toggle
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupIntersectionObserver() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        // Real-time form validation
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveUserPreferences();

        // Announce theme change for screen readers
        this.announceToScreenReader(
            this.currentTheme === 'dark' ?
                this.translations[this.currentLanguage]['theme-dark-activated'] :
                this.translations[this.currentLanguage]['theme-light-activated']
        );
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.applyLanguage();
        this.saveUserPreferences();

        // Announce language change for screen readers
        this.announceToScreenReader(
            this.translations[this.currentLanguage]['language-activated']
        );
    }

    toggleMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const backdrop = document.getElementById('mobile-backdrop');
        const body = document.body;

        if (!mobileMenuToggle || !navMenu || !backdrop) {
            console.warn('Mobile menu elements not found');
            return;
        }

        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;

        console.log('Toggling mobile menu:', { currentState: isExpanded, newState });

        // Update ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', newState.toString());

        // Toggle classes
        if (newState) {
            navMenu.classList.add('nav-menu-open');
            mobileMenuToggle.classList.add('active');
            backdrop.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            navMenu.classList.remove('nav-menu-open');
            mobileMenuToggle.classList.remove('active');
            backdrop.classList.remove('active');
            body.style.overflow = '';
        }

        // Update button text for screen readers
        const buttonText = newState ? 'Cerrar menú móvil' : 'Abrir menú móvil';
        mobileMenuToggle.setAttribute('aria-label', buttonText);

        // Handle backdrop click to close
        if (newState) {
            backdrop.addEventListener('click', this.closeMobileMenu.bind(this));
        } else {
            backdrop.removeEventListener('click', this.closeMobileMenu.bind(this));
        }
    }

    closeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const backdrop = document.getElementById('mobile-backdrop');
        const body = document.body;

        if (navMenu && navMenu.classList.contains('nav-menu-open')) {
            navMenu.classList.remove('nav-menu-open');
            mobileMenuToggle.classList.remove('active');
            backdrop.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Abrir menú móvil');
            body.style.overflow = '';
            backdrop.removeEventListener('click', this.closeMobileMenu.bind(this));
        }
    }

    handleClickOutside(e) {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

        if (navMenu && mobileMenuToggle &&
            !navMenu.contains(e.target) &&
            !mobileMenuToggle.contains(e.target) &&
            navMenu.classList.contains('nav-menu-open')) {
            this.toggleMobileMenu();
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.isScrolled = scrollTop > 50;

            if (this.isScrolled) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    handleNavigation(e) {
        // Close mobile menu if open
        this.closeMobileMenu();
    }

    handleFormSubmission(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        let isValid = true;

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm(formData);
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);

        if (!errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            // Get localized field name
            const fieldKey = `contact-form-${field.id}`;
            let fieldName = this.translations[this.currentLanguage][fieldKey] || field.name || field.id;
            // Remove asterisk if present (though strictly the key shouldn't have it, safety check)
            fieldName = fieldName.replace(' *', '');

            // Format error message
            const msgTemplate = this.translations[this.currentLanguage]['field-required'];
            errorMessage = msgTemplate.replace('{0}', fieldName);
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = this.translations[this.currentLanguage]['email-invalid'];
            }
        }

        // Show/hide error message
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
        } else {
            errorElement.classList.remove('show');
            field.classList.remove('error');
        }

        return isValid;
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
    }

    async submitForm(formData) {
        const submitButton = document.querySelector('.contact-form .btn-primary');
        const originalText = submitButton.textContent;

        try {
            // Show loading state
            submitButton.textContent = this.translations[this.currentLanguage]['form-sending'];
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            this.showNotification(
                this.translations[this.currentLanguage]['form-success'],
                'success'
            );

            // Reset form
            document.querySelector('.contact-form').reset();

        } catch (error) {
            // Show error message
            this.showNotification(
                this.translations[this.currentLanguage]['form-error'],
                'error'
            );
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K to toggle theme
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.toggleTheme();
        }

        // Ctrl/Cmd + L to toggle language
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            this.toggleLanguage();
        }

        // Escape to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('nav-menu-open')) {
                this.closeMobileMenu();
            }
        }
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);

        // Update theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');

            if (this.currentTheme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }
    }

    applyLanguage() {
        // Update language toggle button text
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            const languageText = languageToggle.querySelector('.language-text');
            languageText.textContent = this.currentLanguage === 'es' ? 'EN' : 'ES';
        }

        // Update page language attribute
        document.documentElement.lang = this.currentLanguage;

        // Update all translatable elements
        this.updateTranslatableElements();

        // Update form placeholders and labels
        this.updateFormElements();

        // Update ARIA labels and accessibility text
        this.updateAccessibilityElements();
    }

    updateTranslatableElements() {
        const translations = this.translations[this.currentLanguage];

        // Update elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // Update elements with data-translate-html attribute (for HTML content)
        document.querySelectorAll('[data-translate-html]').forEach(element => {
            const key = element.getAttribute('data-translate-html');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
    }

    updateFormElements() {
        const translations = this.translations[this.currentLanguage];

        // Update form labels
        const nameLabel = document.querySelector('label[for="name"]');
        if (nameLabel) nameLabel.textContent = translations['contact-form-name'] + ' *';

        const emailLabel = document.querySelector('label[for="email"]');
        if (emailLabel) emailLabel.textContent = translations['contact-form-email'] + ' *';

        const companyLabel = document.querySelector('label[for="company"]');
        if (companyLabel) companyLabel.textContent = translations['contact-form-company'];

        const serviceLabel = document.querySelector('label[for="service"]');
        if (serviceLabel) serviceLabel.textContent = translations['contact-form-service'];

        const messageLabel = document.querySelector('label[for="message"]');
        if (messageLabel) messageLabel.textContent = translations['contact-form-message'] + ' *';

        // Update form button
        const submitBtn = document.querySelector('.contact-form .btn-primary');
        if (submitBtn) submitBtn.textContent = translations['contact-form-submit'];

        // Update service select options
        const serviceSelect = document.getElementById('service');
        if (serviceSelect && serviceSelect.options.length > 0) {
            serviceSelect.options[0].textContent = translations['contact-form-select'];
        }
    }

    updateAccessibilityElements() {
        const translations = this.translations[this.currentLanguage];

        // Update skip link
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.textContent = translations['skip-link'];
        }

        // Update ARIA labels
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', translations['theme-toggle-label']);
        }

        const languageToggleEl = document.getElementById('language-toggle');
        if (languageToggleEl) {
            languageToggleEl.setAttribute('aria-label', translations['language-toggle-label']);
        }

        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileToggle) {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            const labelKey = isExpanded ? 'Cerrar menú móvil' : translations['mobile-menu-toggle-label'];
            mobileToggle.setAttribute('aria-label', labelKey);
        }
    }

    loadUserPreferences() {
        try {
            const preferences = JSON.parse(localStorage.getItem('thinka-preferences')) || {};

            if (preferences.theme) {
                this.currentTheme = preferences.theme;
                this.applyTheme();
            }

            if (preferences.language) {
                this.currentLanguage = preferences.language;
                this.applyLanguage();
            }
        } catch (error) {
            console.warn('Could not load user preferences:', error);
        }
    }

    saveUserPreferences() {
        try {
            const preferences = {
                theme: this.currentTheme,
                language: this.currentLanguage
            };
            localStorage.setItem('thinka-preferences', JSON.stringify(preferences));
        } catch (error) {
            console.warn('Could not save user preferences:', error);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Cerrar notificación">×</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--info)'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    announceToScreenReader(message) {
        // Create a live region for screen reader announcements
        let liveRegion = document.getElementById('screen-reader-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'screen-reader-announcements';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }

        liveRegion.textContent = message;

        // Clear the message after a short delay
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            // Could send to error tracking service here
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            // Could send to error tracking service here
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.thinkaApp = new ThinkaApp();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
