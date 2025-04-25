export function createCharacterForm() {
  const form = document.createElement('form');
  form.id = 'character-form';

  form.innerHTML = `
  <div class="div_labels">
      <label id="label-style">Nombre del personaje:
        <input type="text" id="character-name" required />
      </label>

      <label id="label-style">Género:
        <select id="character-gender">
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </label>

      <label id="label-style">Raza:
        <select id="character-race">
          <option value="wizard">wizard</option>
          <option value="warlock">warlock</option>
          <option value="sorcerer">sorcerer</option>
          <option value="humanos">Humanos</option>
          <option value="medianos">Medianos</option>
          <option value="semielfos">Semielfos</option>
          <option value="semiorcos">Semiorcos</option>
        </select>
      </label>

      <label id="label-style">Clase:
        <select id="character-class">
          <option value="barbarian">barbarian</option>
          <option value="bard">bard</option>
          <option value="cleric">cleric</option>
          <option value="druid">druid</option>
          <option value="fighter">fighter</option>
          <option value="monk">monk</option>
          <option value="paladin">paladin</option>
          <option value="ranger">ranger</option>
          <option value="rogue">rogue</option>
          <option value="warlock">warlock</option>
          <option value="sorcerer">sorcerer</option>
          <option value="wizard">wizard</option>
        </select>
      </label>

      <label for="items" id="label-style">Objetos:</label>
      <select id="items-select">
        <option value="">Selecciona una clase primero</option>
      </select>

      <fieldset id="fieldset-style">
          <legend>Estadísticas</legend>

          <label id="labelStats">Fuerza:
            <input type="number" id="stat-fuerza" min="1" max="20" value="10" required />
          </label>

          <label id="labelStats">Destreza:
            <input type="number" id="stat-destreza" min="1" max="20" value="10" required />
          </label>

          <label id="labelStats">Inteligencia:
            <input type="number" id="stat-inteligencia" min="1" max="20" value="10" required />
          </label>
      </fieldset>
    <label for="skills" id="label-style">Habilidades:</label>
      <select id="skills-select">
        <option value="">Habilidades...</option>
      </select>
      <div class="div_button">
        <button type="submit" id="submit-button">Crear Personaje</button>
      </div>
          

    </div>

  `
  /* JS PARA ESCOGER ITEMS SEGUN CLASE PAPIIIII */

  // ✅ Aquí sí ya existen los elementos del formulario, los puedes seleccionar:
  const classSelect = form.querySelector('#character-class');
  const itemsSelect = form.querySelector('#items-select');

  // ✅ Evento para actualizar los objetos (proficiencies) al cambiar de clase
  classSelect.addEventListener('change', async () => {
    const className = classSelect.value;

    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/classes/${className}/proficiencies`);
      const data = await response.json();

      itemsSelect.innerHTML = '';

      if (!data.results || data.results.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'Esta clase no tiene objetos disponibles';
        itemsSelect.appendChild(option);
      } else {
          data.results.forEach(item => {
          const option = document.createElement('option');
          option.value = item.name;
          option.textContent = item.name;
          itemsSelect.appendChild(option);
        });
      }

    } catch (error) {
      console.error('Error al cargar objetos:', error);
    }
  });


  /* JS PARA TRAER TODOS LAS HABILIDADESSSSSSSSSSSSS */
  const skillSelect = form.querySelector('#skills-select');

skillSelect.addEventListener('click', async () => {
  if (skillSelect.children.length > 1) return;

  try {
    const response = await fetch('https://www.dnd5eapi.co/api/skills'); // <-- Corrige el endpoint aquí
    const data = await response.json();

    skillSelect.innerHTML = '<option value="">Selecciona una habilidad</option>'; // Agregar opción inicial

    data.results.forEach(skill => {
      const option = document.createElement('option');
      option.value = skill.name;
      option.textContent = skill.name;
      skillSelect.appendChild(option);
    });

  } catch (error) {
    console.error('Error al cargar habilidades:', error);
    skillSelect.innerHTML = '<option>Error al cargar habilidades</option>';
  }
});

  return form;
}
