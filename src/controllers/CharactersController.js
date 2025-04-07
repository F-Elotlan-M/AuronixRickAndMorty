import { fetchCharacters } from '../services/RickAndMortyService.js';

export const getAliveCharacters = async (req, res) => {
  try {
    const characters = await fetchCharacters();

    const aliveCharacters = characters
      .filter(char => char.status === 'Alive')
      .map(char => ({
        id: char.id,
        name: char.name.replace(/ /g, '_'),
        status: char.status,
        gender: char.gender
      }));

    console.log('Personajes vivos:', aliveCharacters.map(c => c.name));

    res.json({ results: aliveCharacters });
  } catch (error) {
    console.error('Error al obtener personajes:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
};
