document.addEventListener('DOMContentLoaded', function() {

    // Efecto de cambio de color en el borde de la foto
    const foto = document.getElementById('fotoPerfil');
    const colores = [
        'rgb(0, 255, 200)',
        'rgb(0, 150, 255)',
        'rgb(0, 230, 100)',
        'rgb(255, 180, 0)'
    ];
    let colorIndex = 0;
    
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colores.length;
        foto.style.borderColor = colores[colorIndex];
        foto.style.boxShadow = `0 0 15px ${colores[colorIndex]}`;
    }, 1500);
    
    // Efecto de glow al hacer scroll y ver la card
    const card = document.getElementById('miCard');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                card.style.boxShadow = '0 0 40px rgba(0, 255, 200, 0.8), 0 0 20px rgba(0, 150, 255, 0.6)';
                setTimeout(() => {
                    card.style.boxShadow = '0 0 20px rgba(0, 255, 200, 0.3)';
                }, 800);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(card);
    
    // Fondo de partículas animadas
    const canvas = document.createElement('canvas');
    canvas.id = 'particlesCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function initParticles() {
        const particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(0, 255, 200, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        }
        requestAnimationFrame(drawParticles);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        particles = [];
        initParticles();
    });
    
    resizeCanvas();
    initParticles();
    drawParticles();
    
    canvas.style.pointerEvents = 'none';
});