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
    
    setInterval(() => { // Cambia el color cada 1.5 segundos
        indiceColor = (indiceColor + 1) % listaColores.length;// Cambia el color del borde y el resplandor
        foto.style.borderColor = listaColores[indiceColor];
        foto.style.boxShadow = `0 0 15px ${listaColores[indiceColor]}`;
    }, 1500);// Cambia el color cada 1.5 segundos
    
    // Efecto de resplandor al hacer scroll y ver la tarjeta
    const tarjeta = document.getElementById('miCard');// Observador de intersección para detectar cuando la tarjeta entra en el viewport
    const observador = new IntersectionObserver((entradas) => {// Recorre las entradas para verificar si la tarjeta es visible
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 200, 0.8), 0 0 20px rgba(0, 150, 255, 0.6)';
                setTimeout(() => {
                    tarjeta.style.boxShadow = '0 0 20px rgba(0, 255, 200, 0.3)';
                }, 800);// Deja el resplandor por 0.8 segundos y luego lo suaviza
                observador.unobserve(tarjeta);
            }
        });
    }, { threshold: 0.5 });// El umbral del 50% significa que el efecto se activará cuando al menos la mitad de la tarjeta sea visible
    
    observador.observe(tarjeta);
    
    // Fondo de partículas animadas
    const lienzo = document.createElement('canvas');// Crea un lienzo para las partículas
    lienzo.id = 'lienzoParticulas';
    lienzo.style.position = 'fixed';
    lienzo.style.top = '0';
    lienzo.style.left = '0';
    lienzo.style.width = '100%';
    lienzo.style.height = '100%';
    lienzo.style.pointerEvents = 'none';
    lienzo.style.zIndex = '0';
    document.body.appendChild(lienzo);// Agrega el lienzo al cuerpo del documento
    
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
    
    function inicializarParticulas() {// Crea un número determinado de partículas con propiedades aleatorias
        const cantidadParticulas = 111;
        for (let i = 0; i < cantidadParticulas; i++) {// Agrega cada partícula al array de partículas
            particulas.push({
                x: Math.random() * ancho,// Posición aleatoria en el eje X
                y: Math.random() * alto,// Posición aleatoria en el eje Y
                radio: Math.random() * 2 + 1,// Radio aleatorio entre 1 y 3
                velocidadX: (Math.random() - 0.5) * 0.5,// Velocidad aleatoria en el eje X
                velocidadY: (Math.random() - 0.5) * 0.5,// Velocidad aleatoria en el eje Y
                color: `rgba(0, 255, 200, ${Math.random() * 0.5 + 0.2})`//app.js Color con opacidad aleatoria para cada partícula
            });
        }
    }
    
    function dibujarParticulas() {// Limpia el lienzo y dibuja cada partícula, actualizando su posición
        contexto.clearRect(0, 0, ancho, alto);
        for (let p of particulas) {// Dibuja cada partícula como un círculo
            contexto.beginPath();// Inicia un nuevo camino para cada partícula
            contexto.arc(p.x, p.y, p.radio, 0, Math.PI * 2);// Dibuja un círculo en la posición (p.x, p.y) con el radio p.radio
            contexto.fillStyle = p.color;// Establece el color de relleno para la partícula
            contexto.fill();// Rellena el círculo con el color especificado
            p.x += p.velocidadX;
            p.y += p.velocidadY;
            
            if (p.x < 0 || p.x > ancho) p.velocidadX *= -1;// Si la partícula sale del lienzo en el eje X, invierte su velocidad para que rebote
            if (p.y < 0 || p.y > alto) p.velocidadY *= -1;// Si la partícula sale del lienzo en el eje Y, invierte su velocidad para que rebote
        }
        requestAnimationFrame(dibujarParticulas);
    }
    
    window.addEventListener('resize', () => {// Redimensiona el lienzo y reinicia las partículas cuando la ventana cambia de tamaño
        redimensionarLienzo();
        particulas = [];
        inicializarParticulas();
    });
    
    redimensionarLienzo();
    inicializarParticulas();
    dibujarParticulas();
    
    lienzo.style.pointerEvents = 'none';
});