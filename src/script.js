const buttons = document.querySelectorAll('.mode-btn');
const body = document.body;
const title = document.getElementById('main-title');
const text = document.getElementById('main-text');
const image = document.getElementById('main-image');
const root = document.documentElement;

const themes = {
  black: {
    title: "🐉 ¿Qué es Dungeons & Dragons?",
    text: "Dungeons & Dragons (D&D) es un juego de rol narrativo en el que la imaginación es tu principal herramienta. Explora mundos de fantasía, crea tu propio héroe y sumérgete en aventuras épicas donde todo es posible. A diferencia de los juegos de la infancia, D&D ofrece reglas claras y dados para resolver los desafíos que enfrentas. Cada tirada puede cambiar tu destino.",
    image: "assets/images/dragon.jpg",
    colors: ['#1b1b2f', '#16213e', '#0f3460', '#53354a']
  },
  white: {
    title: "⚔️ ¿Cómo se juega?",
    text: "👤 Los jugadores: Cada jugador interpreta a un personaje —un guerrero valiente, un mago sabio, un pícaro sigiloso— creado desde cero eligiendo su raza, clase y personalidad. 🎲 El Dungeon Master: El DM es el narrador del juego. Describe escenarios, interpreta enemigos y guía la aventura. ¡Ninguna partida es igual a otra!",
    image: "assets/images/orco.jpg",
    colors: ['#f0f0f0', '#dddddd', '#cccccc', '#bbbbbb']
  },
  blue: {
    title: "🌌 Una aventura sin fin",
    text: "D&D no tiene final: sus historias evolucionan constantemente en campañas. Puedes jugar por semanas o años, creando historias increíbles con tus amigos. Aquí no se trata de ganar, sino de crear juntos un viaje inolvidable.",
    image: "assets/images/elfo.jpg",
    colors: ['#1e3c72', '#2a5298', '#004e92', '#000428']
  }
};

// Cambia los colores del fondo dinámico
function setThemeColors(colors) {
  root.style.setProperty('--color1', colors[0]);
  root.style.setProperty('--color2', colors[1]);
  root.style.setProperty('--color3', colors[2]);
  root.style.setProperty('--color4', colors[3]);
}

// Reinicia la animación "escribiendo"
function typingEffect(element, text, speed = 15) {
  element.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Evento para cada botón
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-theme');
    const { title: newTitle, text: newText, image: imgSrc, colors } = themes[theme];

    // Botón activo
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Cambiar fondo animado
    setThemeColors(colors);

    // Transición suave
    title.style.opacity = 0;
    text.style.opacity = 0;
    image.style.opacity = 0;

    setTimeout(() => {
      // Cambiar imagen
      image.src = imgSrc;

      // Efecto escribiendo
      typingEffect(title, newTitle);
      typingEffect(text, newText);

      title.style.opacity = 1;
      text.style.opacity = 1;
      image.style.opacity = 1;

      // Mostrar o esconder botones extra según el tema
      if (theme === 'blue') {
        extraButtons.classList.remove('hidden');
        extraButtons.classList.add('show');
      } else {
        extraButtons.classList.remove('show');
        extraButtons.classList.add('hidden');
      }

    }, 300);
  });
});
const extraButtons = document.getElementById('extra-buttons');

// Mostrar los botones solo si el tema es 'blue'
if (themes === 'blue') {
  extraButtons.classList.remove('hidden');
  extraButtons.classList.add('show');
} else {
  extraButtons.classList.remove('show');
  extraButtons.classList.add('hidden');
}
