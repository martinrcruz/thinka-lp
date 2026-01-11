/**
 * Thinka - Animations JavaScript File
 * Handles smooth animations, scroll effects, and interactive elements
 */

class ThinkaAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupTypingEffect();
        this.setupCounterAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.classList.add('aos-animate', `aos-${animationType}`);
            
            // Add specific animation classes
            switch (animationType) {
                case 'fade-up':
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                    break;
                case 'fade-down':
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = '1';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = '1';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                    break;
                case 'slide-up':
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                    break;
            }
        }, delay);
    }

    setupParallaxEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                const floatingCards = heroSection.querySelectorAll('.floating-card');
                floatingCards.forEach((card, index) => {
                    const speed = 0.3 + (index * 0.1);
                    card.style.transform = `translateY(${rate * speed}px)`;
                });
            });
        }
    }

    setupTypingEffect() {
        // Typing effect for hero title
        const heroTitle = document.querySelector('.hero-title-main');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid var(--primary-color)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing effect after a delay
            setTimeout(typeWriter, 500);
        }
    }

    setupCounterAnimations() {
        // Animate statistics counters
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format the number
                if (element.textContent.includes('+')) {
                    element.textContent = Math.floor(current) + '+';
                } else if (element.textContent.includes('%')) {
                    element.textContent = Math.floor(current) + '%';
                } else if (element.textContent.includes('/')) {
                    element.textContent = Math.floor(current) + '/7';
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        };

        // Observe stat elements for animation
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statObserver.observe(stat));
    }

    setupHoverEffects() {
        // Enhanced hover effects for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });

        // Portfolio item hover effects
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addPortfolioHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removePortfolioHoverEffect(item);
            });
        });
    }

    addHoverEffect(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = 'var(--shadow-2xl)';
        
        // Add subtle glow effect
        card.style.boxShadow = `
            var(--shadow-2xl),
            0 0 0 1px var(--primary-color),
            0 0 20px rgba(99, 102, 241, 0.3)
        `;
        
        // Animate icon
        const icon = card.querySelector('.service-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    }

    removeHoverEffect(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'var(--shadow-md)';
        
        // Remove glow effect
        card.style.boxShadow = 'var(--shadow-md)';
        
        // Reset icon
        const icon = card.querySelector('.service-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    addPortfolioHoverEffect(item) {
        item.style.transform = 'translateY(-8px)';
        item.style.boxShadow = 'var(--shadow-2xl)';
        
        // Enhance image zoom effect
        const image = item.querySelector('.portfolio-image img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
        
        // Add content slide-up effect
        const content = item.querySelector('.portfolio-content');
        if (content) {
            content.style.transform = 'translateY(-5px)';
            content.style.transition = 'transform 0.3s ease';
        }
    }

    removePortfolioHoverEffect(item) {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'var(--shadow-md)';
        
        // Reset image
        const image = item.querySelector('.portfolio-image img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
        
        // Reset content
        const content = item.querySelector('.portfolio-content');
        if (content) {
            content.style.transform = 'translateY(0)';
        }
    }

    setupLoadingAnimations() {
        // Page load animations
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });
    }

    animatePageLoad() {
        // Animate header elements
        const header = document.querySelector('.header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                header.style.transition = 'all 0.6s ease';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        // Animate hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
            }, 300);
        }

        // Animate floating cards with staggered delay
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 600 + (index * 200));
        });
    }

    // Smooth reveal animations for sections
    setupSectionReveals() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Add CSS animations dynamically
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* AOS Animation Base Styles */
            [data-aos] {
                opacity: 0;
                transition: all 0.6s ease;
            }
            
            [data-aos].aos-animate {
                opacity: 1;
            }
            
            /* Fade Up Animation */
            [data-aos="fade-up"] {
                transform: translateY(30px);
            }
            
            [data-aos="fade-up"].aos-animate {
                transform: translateY(0);
            }
            
            /* Fade Down Animation */
            [data-aos="fade-down"] {
                transform: translateY(-30px);
            }
            
            [data-aos="fade-down"].aos-animate {
                transform: translateY(0);
            }
            
            /* Fade Left Animation */
            [data-aos="fade-left"] {
                transform: translateX(30px);
            }
            
            [data-aos="fade-left"].aos-animate {
                transform: translateX(0);
            }
            
            /* Fade Right Animation */
            [data-aos="fade-right"] {
                transform: translateX(-30px);
            }
            
            [data-aos="fade-right"].aos-animate {
                transform: translateX(0);
            }
            
            /* Zoom In Animation */
            [data-aos="zoom-in"] {
                transform: scale(0.8);
            }
            
            [data-aos="zoom-in"].aos-animate {
                transform: scale(1);
            }
            
            /* Slide Up Animation */
            [data-aos="slide-up"] {
                transform: translateY(50px);
            }
            
            [data-aos="slide-up"].aos-animate {
                transform: translateY(0);
            }
            
            /* Section Reveal Animation */
            section {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.8s ease;
            }
            
            section.section-revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Smooth transitions for all animated elements */
            .service-card,
            .portfolio-item,
            .floating-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Enhanced button hover effects */
            .btn {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .btn:hover {
                transform: translateY(-2px);
            }
            
            /* Smooth image transitions */
            .portfolio-image img {
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Floating animation for hero cards */
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                }
                50% { 
                    transform: translateY(-20px) rotate(2deg); 
                }
            }
            
            .floating-card {
                animation: float 6s ease-in-out infinite;
            }
            
            /* Staggered animation delays */
            .floating-card:nth-child(1) { animation-delay: 0s; }
            .floating-card:nth-child(2) { animation-delay: 2s; }
            .floating-card:nth-child(3) { animation-delay: 4s; }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.thinkaAnimations = new ThinkaAnimations();
    window.thinkaAnimations.addAnimationStyles();
    window.thinkaAnimations.setupSectionReveals();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThinkaAnimations;
}
