const API_URL = 'https://67d2f80a8bca322cc268a797.mockapi.io/characters';

// Crear personaje
export async function createCharacter(character) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character)
  });
  return await res.json();
}

// Obtener personajes
export async function getCharacters() {
  const res = await fetch(API_URL);
  return await res.json();
}


