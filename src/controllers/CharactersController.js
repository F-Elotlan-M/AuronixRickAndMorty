import { getAliveCharactersFormatted } from '../services/CharacterService.js';

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
