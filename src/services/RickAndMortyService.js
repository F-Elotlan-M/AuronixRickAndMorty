//usada solo para una página, considerar la paginación de la API
import fetch from 'node-fetch';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error al llamar la API: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(`Error en fetchCharacters: ${error.message}`);
  }
};
