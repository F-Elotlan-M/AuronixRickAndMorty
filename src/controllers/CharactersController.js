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
    const { pageNumber } = req.params; // Obtener el número de página desde los parámetros de la ruta
    const aliveCharacters = await getAliveCharactersByPageFormatted(pageNumber); // Obtener personajes vivos de esa página

    res.json({ results: aliveCharacters }); // Enviar la respuesta con los personajes
  } catch (error) {
    console.error('Error al obtener personajes vivos por página:', error.message);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
};