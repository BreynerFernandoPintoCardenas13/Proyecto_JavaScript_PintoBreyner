const API_URL = 'https://67d2f80a8bca322cc268a797.mockapi.io/characters';
const container = document.getElementById('charactersContainer');

// Inputs
const nameInput = document.getElementById('nameInput');
const raceSelect = document.getElementById('raceSelect');
const classSelect = document.getElementById('classSelect');
const genderSelect = document.getElementById('genderSelect');
const armorInput = document.getElementById('armorInput');
const skillInput = document.getElementById('skillInput');
const accessoryInput = document.getElementById('accessoryInput');
const strengthInput = document.getElementById('strengthInput');
const dexterityInput = document.getElementById('dexterityInput');
const intelligenceInput = document.getElementById('intelligenceInput');

let allCharacters = [];

async function fetchCharacters() {
  try {
    const res = await fetch(API_URL);
    allCharacters = await res.json();
    populateSelects();
    filterCharacters();
  } catch (err) {
    console.error("Error al obtener personajes", err);
  }
}

function populateSelects() {
  const races = [...new Set(allCharacters.map(c => c.race))];
  const classes = [...new Set(allCharacters.map(c => c.classes))];

  races.forEach(r => raceSelect.innerHTML += `<option value="${r}">${r}</option>`);
  classes.forEach(c => classSelect.innerHTML += `<option value="${c}">${c}</option>`);
}

function filterCharacters() {
  const filtered = allCharacters.filter(char => {
    return (
      (nameInput.value === '' || char.name.toLowerCase().includes(nameInput.value.toLowerCase())) &&
      (raceSelect.value === '' || char.race === raceSelect.value) &&
      (classSelect.value === '' || char.classes === classSelect.value) &&
      (genderSelect.value === '' || char.gender === genderSelect.value) &&
      (armorInput.value === '' || char.object.toLowerCase().includes(armorInput.value.toLowerCase())) &&
      (skillInput.value === '' || char.skills.some(skill => skill.toLowerCase().includes(skillInput.value.toLowerCase()))) &&
      (accessoryInput.value === '' || char.accessories.some(acc => acc.toLowerCase().includes(accessoryInput.value.toLowerCase()))) &&
      (!strengthInput.value || char.stats.fuerza >= parseInt(strengthInput.value)) &&
      (!dexterityInput.value || char.stats.destreza >= parseInt(dexterityInput.value)) &&
      (!intelligenceInput.value || char.stats.inteligencia >= parseInt(intelligenceInput.value))
    );
  });

  renderCharacters(filtered);
}

function renderCharacters(characters) {
  container.innerHTML = characters.map(char => `
    <div class="character-card">
      <h3>${char.name}</h3>
      <p><strong>Raza:</strong> ${char.race}</p>
      <p><strong>Clase:</strong> ${char.classes}</p>
      <p><strong>Armadura:</strong> ${char.object}</p>
      <p><strong>Stats:</strong> Fuerza ${char.stats.fuerza}, Destreza ${char.stats.destreza}, Inteligencia ${char.stats.inteligencia}</p>
      <div class="card-buttons">
        <button onclick='guardarEnFavoritos(${JSON.stringify(char).replace(/'/g, "\\'")})'>💾 Guardar</button>
        <button onclick="alert('Ver detalles de ${char.name}')">Ver detalles</button>
      </div>
    </div>
  `).join('');
}

function guardarEnFavoritos(personaje) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  const yaGuardado = favoritos.some(fav => fav.id === personaje.id);
  if (yaGuardado) {
    alert('Este personaje ya está en tus favoritos.');
    return;
  }

  favoritos.push(personaje);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  alert(`¡${personaje.name} guardado en favoritos!`);
}

// Escuchar cambios
[
  nameInput, raceSelect, classSelect, genderSelect,
  armorInput, skillInput, accessoryInput,
  strengthInput, dexterityInput, intelligenceInput
].forEach(input => input.addEventListener('input', filterCharacters));

fetchCharacters();
const favoritesPanel = document.getElementById('favoritesPanel');
const favoritesContainer = document.getElementById('favoritesContainer');
const toggleFavoritesBtn = document.getElementById('toggleFavoritesBtn');

toggleFavoritesBtn.addEventListener('click', () => {
  favoritesPanel.classList.toggle('hidden');
  renderFavorites();
});

function guardarEnFavoritos(personaje) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  const yaGuardado = favoritos.some(fav => fav.id === personaje.id);
  if (yaGuardado) {
    alert('Este personaje ya está en tus favoritos.');
    return;
  }

  favoritos.push(personaje);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  alert(`¡${personaje.name} guardado en favoritos!`);
}

function eliminarDeFavoritos(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(fav => fav.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderFavorites();
}

function renderFavorites() {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
  if (favoritos.length === 0) {
    favoritesContainer.innerHTML = `<p>No hay personajes favoritos aún.</p>`;
    return;
  }

  favoritesContainer.innerHTML = favoritos.map(fav => `
    <div class="character-card">
      <h3>${fav.name}</h3>
      <p><strong>Raza:</strong> ${fav.race}</p>
      <p><strong>Clase:</strong> ${fav.classes}</p>
      <p><strong>Stats:</strong> Fuerza ${fav.stats.fuerza}, Destreza ${fav.stats.destreza}, Inteligencia ${fav.stats.inteligencia}</p>
      <div class="card-buttons">
        <button onclick="alert('Ver detalles de ${fav.name}')">Ver detalles</button>
        <button onclick="eliminarDeFavoritos('${fav.id}')">🗑 Eliminar</button>
      </div>
    </div>
  `).join('');
}
