// Contador regressivo
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;
    
    // Define um tempo fixo para demonstração (23:45:12)
    let hours = 23;
    let minutes = 45;
    let seconds = 12;
    
    function tick() {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
                
                if (hours < 0) {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }
        
        const formattedTime = 
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        
        countdownElement.textContent = formattedTime;
    }
    
    // Atualiza imediatamente e depois a cada segundo
    tick();
    setInterval(tick, 1000);
}

// Smooth scroll para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animação de entrada para elementos quando entram na viewport
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ter animação
    document.querySelectorAll('.problem-card, .include-item, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Efeito de hover nos botões CTA
function initButtonEffects() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Copia o código do cupom quando clicado
function initCouponCopy() {
    const couponCode = document.querySelector('.coupon-code');
    if (couponCode) {
        couponCode.style.cursor = 'pointer';
        couponCode.title = 'Clique para copiar';
        
        couponCode.addEventListener('click', function() {
            navigator.clipboard.writeText('MIDNIGHT10').then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                this.style.background = '#28a745';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '#ffffff';
                    this.style.color = '#000';
                }, 2000);
            }).catch(() => {
                // Fallback para navegadores que não suportam clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = 'MIDNIGHT10';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
}

// Tracking de cliques nos CTAs (para analytics futuras)
function initCTATracking() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Aqui você pode adicionar código de tracking
            console.log('CTA clicado:', this.textContent.trim());
            
            // Exemplo de como enviar para Google Analytics (se configurado)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
}

// Inicializa todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    initSmoothScroll();
    initScrollAnimations();
    initButtonEffects();
    initCouponCopy();
    initCTATracking();
});

// Adiciona classe para indicar que JavaScript está ativo
document.documentElement.classList.add('js-enabled');

