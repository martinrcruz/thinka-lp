/**
 * Thinka - Form Validation JavaScript File
 * Handles form validation, user feedback, and form submission
 */

class ThinkaFormValidation {
    constructor() {
        this.forms = [];
        this.init();
    }

    init() {
        this.setupForms();
        this.setupRealTimeValidation();
        this.setupFormSubmission();
    }

    setupForms() {
        // Find all forms on the page
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.forms.push(form);
            this.setupForm(form);
        });
    }

    setupForm(form) {
        // Add form validation attributes
        form.setAttribute('novalidate', '');
        
        // Add submit event listener
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Setup individual form fields
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.setupInput(input);
        });
    }

    setupInput(input) {
        // Add validation event listeners
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
        input.addEventListener('focus', () => this.handleFieldFocus(input));
        
        // Add aria-describedby for accessibility
        if (input.hasAttribute('required') || input.type === 'email') {
            const errorId = `${input.id}-error`;
            if (!document.getElementById(errorId)) {
                this.createErrorElement(input, errorId);
            }
            input.setAttribute('aria-describedby', errorId);
        }
    }

    createErrorElement(input, errorId) {
        const errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'form-error';
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        
        // Insert after the input
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    setupRealTimeValidation() {
        // Real-time validation for specific field types
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                this.handleRealTimeValidation(e.target);
            }
        });
    }

    handleRealTimeValidation(field) {
        // Only validate on blur or after user stops typing
        clearTimeout(field.validationTimer);
        field.validationTimer = setTimeout(() => {
            if (field.value.length > 0) {
                this.validateField(field);
            }
        }, 500);
    }

    setupFormSubmission() {
        // Global form submission handler
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                this.handleFormSubmit(e);
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate all fields
        const isValid = this.validateForm(form);
        
        if (isValid) {
            this.submitForm(form, formData);
        } else {
            // Focus on first error field
            const firstError = form.querySelector('.form-error.show');
            if (firstError) {
                const fieldId = firstError.id.replace('-error', '');
                const field = document.getElementById(fieldId);
                if (field) {
                    field.focus();
                }
            }
        }
    }

    validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);
        
        if (!errorElement) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.getErrorMessage('required', field);
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            if (!this.isValidEmail(value)) {
                isValid = false;
                errorMessage = this.getErrorMessage('email', field);
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            if (!this.isValidPhone(value)) {
                isValid = false;
                errorMessage = this.getErrorMessage('phone', field);
            }
        }
        
        // URL validation
        if (field.type === 'url' && value) {
            if (!this.isValidUrl(value)) {
                isValid = false;
                errorMessage = this.getErrorMessage('url', field);
            }
        }
        
        // Min length validation
        if (field.hasAttribute('minlength') && value) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                isValid = false;
                errorMessage = this.getErrorMessage('minlength', field, { minLength });
            }
        }
        
        // Max length validation
        if (field.hasAttribute('maxlength') && value) {
            const maxLength = parseInt(field.getAttribute('maxlength'));
            if (value.length > maxLength) {
                isValid = false;
                errorMessage = this.getErrorMessage('maxlength', field, { maxLength });
            }
        }
        
        // Pattern validation
        if (field.hasAttribute('pattern') && value) {
            const pattern = new RegExp(field.getAttribute('pattern'));
            if (!pattern.test(value)) {
                isValid = false;
                errorMessage = this.getErrorMessage('pattern', field);
            }
        }
        
        // Custom validation
        if (field.hasAttribute('data-validate') && value) {
            const customValidation = field.getAttribute('data-validate');
            if (!this.runCustomValidation(customValidation, value, field)) {
                isValid = false;
                errorMessage = this.getErrorMessage('custom', field);
            }
        }
        
        // Show/hide error message
        this.showFieldError(field, errorElement, errorMessage, isValid);
        
        return isValid;
    }

    showFieldError(field, errorElement, errorMessage, isValid) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
            
            // Announce error to screen reader
            this.announceError(errorMessage);
        } else {
            errorElement.classList.remove('show');
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        }
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    }

    handleFieldFocus(field) {
        // Clear error when field gains focus
        this.clearFieldError(field);
        
        // Add focus styles
        field.classList.add('focused');
    }

    getErrorMessage(type, field, params = {}) {
        const language = document.documentElement.lang || 'es';
        const fieldName = field.getAttribute('data-label') || field.name || 'campo';
        
        const messages = {
            es: {
                required: `El campo ${fieldName} es requerido`,
                email: 'Por favor ingresa un email válido',
                phone: 'Por favor ingresa un número de teléfono válido',
                url: 'Por favor ingresa una URL válida',
                minlength: `El campo debe tener al menos ${params.minLength} caracteres`,
                maxlength: `El campo debe tener máximo ${params.maxLength} caracteres`,
                pattern: 'El formato ingresado no es válido',
                custom: 'El valor ingresado no es válido'
            },
            en: {
                required: `The ${fieldName} field is required`,
                email: 'Please enter a valid email address',
                phone: 'Please enter a valid phone number',
                url: 'Please enter a valid URL',
                minlength: `The field must be at least ${params.minLength} characters long`,
                maxlength: `The field must be no more than ${params.maxLength} characters long`,
                pattern: 'The entered format is not valid',
                custom: 'The entered value is not valid'
            }
        };
        
        return messages[language]?.[type] || messages.es[type] || 'Validation error';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        // Basic phone validation - can be customized for specific regions
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    runCustomValidation(validationType, value, field) {
        switch (validationType) {
            case 'chilean-rut':
                return this.isValidChileanRut(value);
            case 'chilean-phone':
                return this.isValidChileanPhone(value);
            case 'company-name':
                return this.isValidCompanyName(value);
            default:
                return true;
        }
    }

    isValidChileanRut(rut) {
        // Chilean RUT validation
        const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
        const rutNumber = cleanRut.slice(0, -1);
        const dv = cleanRut.slice(-1).toUpperCase();
        
        let sum = 0;
        let multiplier = 2;
        
        for (let i = rutNumber.length - 1; i >= 0; i--) {
            sum += parseInt(rutNumber[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
        
        const expectedDv = 11 - (sum % 11);
        const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();
        
        return dv === calculatedDv;
    }

    isValidChileanPhone(phone) {
        // Chilean phone validation (mobile: +56 9 XXXX XXXX, landline: +56 2 XXXX XXXX)
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^(\+56|56)?[29]\d{8}$/;
        return phoneRegex.test(cleanPhone);
    }

    isValidCompanyName(name) {
        // Company name validation (at least 2 words, 3 characters each)
        const words = name.trim().split(/\s+/);
        return words.length >= 2 && words.every(word => word.length >= 3);
    }

    async submitForm(form, formData) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Verificar honeypot (protección contra spam)
            const honeypot = formData.get('website');
            if (honeypot && honeypot.trim() !== '') {
                console.log('Spam detected - honeypot filled');
                this.showErrorMessage('Error de validación. Por favor, inténtalo de nuevo.');
                return;
            }
            
            // Verificar rate limiting (máximo 3 envíos por minuto)
            const now = Date.now();
            const lastSubmission = localStorage.getItem('lastFormSubmission');
            if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) {
                this.showErrorMessage('Por favor, espera un momento antes de enviar otro mensaje.');
                return;
            }
            
            // Show loading state
            this.showLoadingState(submitButton);
            
            // Enviar formulario
            const response = await this.sendFormData(formData);
            
            if (response.success) {
                // Guardar timestamp del último envío
                localStorage.setItem('lastFormSubmission', now.toString());
                this.showSuccessMessage(form);
                this.resetForm(form);
            } else {
                this.showErrorMessage(response.message || 'Error al enviar el mensaje');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('Error de conexión. Por favor, inténtalo de nuevo.');
        } finally {
            // Reset button state
            this.hideLoadingState(submitButton, originalText);
        }
    }

    showLoadingState(button) {
        button.disabled = true;
        button.textContent = document.documentElement.lang === 'es' ? 'Enviando...' : 'Sending...';
        button.classList.add('loading');
    }

    hideLoadingState(button, originalText) {
        button.disabled = false;
        button.textContent = originalText;
        button.classList.remove('loading');
    }

    async sendFormData(formData) {
        try {
            // Usar Netlify Forms para envío de emails (más confiable para producción)
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'form-name': 'contact',
                    name: formData.get('name'),
                    email: formData.get('email'),
                    company: formData.get('company') || '',
                    service: formData.get('service') || '',
                    message: formData.get('message'),
                    website: formData.get('website') || '' // honeypot
                })
            });

            if (response.ok) {
                return { success: true, message: 'Mensaje enviado correctamente' };
            } else {
                return { success: false, message: 'Error al enviar el mensaje' };
            }
        } catch (error) {
            console.error('Error sending form data:', error);
            // Fallback: usar Formspree si Netlify no está disponible
            try {
                const fallbackResponse = await fetch('https://formspree.io/f/xpwgqkqv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        company: formData.get('company'),
                        service: formData.get('service'),
                        message: formData.get('message'),
                        _subject: 'Nuevo mensaje desde Thinka.cl',
                        _replyto: formData.get('email'),
                        _cc: 'contacto@thinka.cl'
                    })
                });

                if (fallbackResponse.ok) {
                    return { success: true, message: 'Mensaje enviado correctamente' };
                } else {
                    return { success: false, message: 'Error al enviar el mensaje' };
                }
            } catch (fallbackError) {
                console.error('Fallback error:', fallbackError);
                return { success: false, message: 'Error de conexión. Por favor, inténtalo de nuevo.' };
            }
        }
    }

    showSuccessMessage(form) {
        const message = document.documentElement.lang === 'es' 
            ? '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
            : 'Message sent successfully! We will contact you soon.';
        
        this.showNotification(message, 'success');
        
        // Add success class to form
        form.classList.add('submitted-success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Use the notification system from main.js if available
        if (window.thinkaApp && window.thinkaApp.showNotification) {
            window.thinkaApp.showNotification(message, type);
        } else {
            // Fallback notification
            this.createFallbackNotification(message, type);
        }
    }

    createFallbackNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fallback-notification fallback-notification-${type}`;
        notification.setAttribute('role', 'alert');
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.hideFallbackNotification(notification);
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideFallbackNotification(notification);
        }, 5000);
    }

    hideFallbackNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    resetForm(form) {
        form.reset();
        
        // Clear all error states
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.clearFieldError(input);
            input.classList.remove('focused');
        });
        
        // Remove success class
        form.classList.remove('submitted-success');
    }

    announceError(message) {
        // Create a live region for screen reader announcements
        let liveRegion = document.getElementById('form-validation-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'form-validation-announcements';
            liveRegion.setAttribute('aria-live', 'assertive');
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

    // Public methods for external use
    validateSpecificField(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            return this.validateField(field);
        }
        return false;
    }

    resetSpecificForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            this.resetForm(form);
        }
    }

    addCustomValidation(fieldId, validationFunction, errorMessage) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.setAttribute('data-validate', 'custom');
            field.setAttribute('data-custom-validation', validationFunction.toString());
            field.setAttribute('data-custom-error', errorMessage);
        }
    }

    // Funciones anti-spam
    containsSpam(text) {
        const spamKeywords = [
            'viagra', 'casino', 'lottery', 'winner', 'congratulations',
            'click here', 'free money', 'make money', 'work from home',
            'bitcoin', 'crypto', 'investment', 'loan', 'credit',
            'seo', 'marketing', 'advertising', 'promotion'
        ];
        
        const lowerText = text.toLowerCase();
        return spamKeywords.some(keyword => lowerText.includes(keyword));
    }

    isSuspiciousEmail(email) {
        const suspiciousDomains = [
            'tempmail', '10minutemail', 'guerrillamail', 'mailinator',
            'throwaway', 'temp-mail', 'yopmail', 'maildrop'
        ];
        
        const domain = email.split('@')[1]?.toLowerCase();
        return suspiciousDomains.some(suspicious => domain?.includes(suspicious));
    }

    // Validación adicional para campos específicos
    validateNameField(field) {
        const value = field.value.trim();
        if (value.length < 2) {
            return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' };
        }
        if (/[<>\"'%;()&+]/.test(value)) {
            return { isValid: false, message: 'El nombre contiene caracteres no válidos' };
        }
        return { isValid: true };
    }

    validateMessageField(field) {
        const value = field.value.trim();
        if (value.length < 10) {
            return { isValid: false, message: 'El mensaje debe tener al menos 10 caracteres' };
        }
        if (value.length > 1000) {
            return { isValid: false, message: 'El mensaje no puede exceder 1000 caracteres' };
        }
        if (this.containsSpam(value)) {
            return { isValid: false, message: 'El mensaje contiene contenido no permitido' };
        }
        return { isValid: true };
    }

    validateEmailField(field) {
        const value = field.value.trim();
        if (!this.isValidEmail(value)) {
            return { isValid: false, message: 'Por favor, ingresa un email válido' };
        }
        if (this.isSuspiciousEmail(value)) {
            return { isValid: false, message: 'Por favor, usa una dirección de email válida' };
        }
        return { isValid: true };
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.thinkaFormValidation = new ThinkaFormValidation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThinkaFormValidation;
}
