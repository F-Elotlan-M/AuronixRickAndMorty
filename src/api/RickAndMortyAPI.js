import fetch from 'node-fetch';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function fetchAllCharacters() {
  let characters = [];
  let url = BASE_URL;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status}`);
    }

    const data = await response.json();
    characters = characters.concat(data.results);
    url = data.info.next;
  }

  return characters;
}
