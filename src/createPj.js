import { createCharacterForm } from './createCharacterForm.js';

import { createCharacter } from './ui.js';
 
document.addEventListener('DOMContentLoaded', () => {
  const formSection = document.getElementById('form-section');
  formSection.appendChild(createCharacterForm());

  const form = document.getElementById('character-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const character = {
    name: document.getElementById('character-name').value,
    gender: document.getElementById('character-gender').value,
    race: document.getElementById('character-race').value, // esto se reemplazará por un select luego
    classes: document.getElementById('character-class').value,
    object: document.getElementById('items-select').value,
    stats: {
        fuerza: parseInt(document.getElementById('stat-fuerza').value),
        destreza: parseInt(document.getElementById('stat-destreza').value),
        inteligencia: parseInt(document.getElementById('stat-inteligencia').value)

    },
    skills: document.getElementById('skills-select').value,
    accessories: ["anillo mágico"]
    };

    const savedCharacter = await createCharacter(character);
    alert(`Personaje ${savedCharacter.name} creado exitosamente`);
  });
});

/* ANIAMCION PANTALLA PREGUNTA */
window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const introScreen = document.getElementById('intro-screen');
  const wave = document.getElementById('wave-transition');
  const formSection = document.getElementById('form-section');

  if (!startButton || !introScreen || !formSection || !wave) {
    console.error('Elementos no encontrados.');
    return;
  }

  startButton.addEventListener('click', () => {
    // Inicia la animación de ola
    wave.classList.add('active');

    // Espera a que la ola cubra la pantalla
    setTimeout(() => {
      introScreen.classList.add('hidden');

      const form = createCharacterForm();
/*       formSection.appendChild(form);
 */      formSection.classList.remove('hidden');
      formSection.classList.add('visible');
    }, 2000); // coincide con duración de la ola
  });
});
