import { fetchAllCharacters, fetchAllCharactersByPage } from '../api/RickAndMortyAPI.js';
import { replaceSpacesWithUnderscores } from '../utils/Formatter.js';
import { CharacterDTO } from '../dtos/CharacterDTO.js';

export async function getAliveCharactersFormatted() {
  const characters = await fetchAllCharacters();

  return characters
    .filter(character => character.status === 'Alive')
    .map(character => new CharacterDTO({
      id: character.id,
      name: replaceSpacesWithUnderscores(character.name),
      status: character.status,
      gender: character.gender
    }));
}

export async function getAliveCharactersByPageFormatted(pageNumber) {
  // Trae los personajes vivos de la página solicitada, ya filtrados por página
  const { results } = await fetchAllCharactersByPage(pageNumber);

  // Filtra solo los personajes vivos
  const aliveCharacters = results.filter(character => character.status === 'Alive');

  // Devuelve los personajes vivos formateados
  return aliveCharacters.map(character => new CharacterDTO({
    id: character.id,
    name: replaceSpacesWithUnderscores(character.name),
    status: character.status,
    gender: character.gender
  }));
}