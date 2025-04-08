import { getAliveCharactersFormatted, getAliveCharactersByPageFormatted } from '../services/CharacterService.js';

export const getAliveCharacters = async (req, res) => {
  try {
    const aliveCharacters = await getAliveCharactersFormatted();

    console.log('Personajes vivos:', aliveCharacters.map(c => c.name));
    res.json({ results: aliveCharacters });
  } catch (error) {
    console.error('Error al obtener personajes:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
};


export const getAliveCharactersByPage = async (req, res) => {
  try {
    const { page } = req.query;
    const pageNumber = Number(page);
    const limit = 20;

    // Validación de la página
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: 'Page must be a valid number' });
    }

    const offset = (pageNumber - 1) * limit;

    // Obtener los personajes vivos con el límite y el offset
    const aliveCharacters = await getAliveCharactersByPageFormatted(pageNumber, limit);

    // Si no hay personajes vivos en la página solicitada, devolver array vacío
    if (aliveCharacters.length === 0) {
      return res.status(200).json({ results: [] });
    }

    console.log('Personajes vivos:', aliveCharacters.map(c => c.name));
    res.json({ results: aliveCharacters });
  } catch (error) {
    console.error('Error al obtener personajes vivos por página:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
};
