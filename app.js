document.addEventListener('DOMContentLoaded', function() {

    // Efecto de cambio de color en el borde de la foto de perfil
    const foto = document.getElementById('fotoPerfil');
    const listaColores = [
        'rgb(0, 255, 200)',
        'rgb(0, 150, 255)',
        'rgb(0, 230, 100)',
        'rgb(255, 180, 0)'
    ];
    let indiceColor = 0;
    
    setInterval(() => {
        indiceColor = (indiceColor + 1) % listaColores.length;
        foto.style.borderColor = listaColores[indiceColor];
        foto.style.boxShadow = `0 0 15px ${listaColores[indiceColor]}`;
    }, 1500);
    
    // Efecto de resplandor al hacer scroll y ver la tarjeta
    const tarjeta = document.getElementById('miCard');
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 200, 0.8), 0 0 20px rgba(0, 150, 255, 0.6)';
                setTimeout(() => {
                    tarjeta.style.boxShadow = '0 0 20px rgba(0, 255, 200, 0.3)';
                }, 800);
                observador.unobserve(tarjeta);
            }
        });
    }, { threshold: 0.5 });
    
    observador.observe(tarjeta);
    
    // Fondo de partículas animadas
    const lienzo = document.createElement('canvas');
    lienzo.id = 'lienzoParticulas';
    lienzo.style.position = 'fixed';
    lienzo.style.top = '0';
    lienzo.style.left = '0';
    lienzo.style.width = '100%';
    lienzo.style.height = '100%';
    lienzo.style.pointerEvents = 'none';
    lienzo.style.zIndex = '0';
    document.body.appendChild(lienzo);
    
    const contexto = lienzo.getContext('2d');
    let ancho = window.innerWidth;
    let alto = window.innerHeight;
    let particulas = [];
    
    function redimensionarLienzo() {
        ancho = window.innerWidth;
        alto = window.innerHeight;
        lienzo.width = ancho;
        lienzo.height = alto;
    }
    
    function inicializarParticulas() {
        const cantidadParticulas = 80;
        for (let i = 0; i < cantidadParticulas; i++) {
            particulas.push({
                x: Math.random() * ancho,
                y: Math.random() * alto,
                radio: Math.random() * 2 + 1,
                velocidadX: (Math.random() - 0.5) * 0.5,
                velocidadY: (Math.random() - 0.5) * 0.5,
                color: `rgba(0, 255, 200, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }
    
    function dibujarParticulas() {
        contexto.clearRect(0, 0, ancho, alto);
        for (let p of particulas) {
            contexto.beginPath();
            contexto.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
            contexto.fillStyle = p.color;
            contexto.fill();
            p.x += p.velocidadX;
            p.y += p.velocidadY;
            
            if (p.x < 0 || p.x > ancho) p.velocidadX *= -1;
            if (p.y < 0 || p.y > alto) p.velocidadY *= -1;
        }
        requestAnimationFrame(dibujarParticulas);
    }
    
    window.addEventListener('resize', () => {
        redimensionarLienzo();
        particulas = [];
        inicializarParticulas();
    });
    
    redimensionarLienzo();
    inicializarParticulas();
    dibujarParticulas();
    
    lienzo.style.pointerEvents = 'none';
});