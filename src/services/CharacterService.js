import { fetchAllCharacters } from '../api/RickAndMortyAPI.js';
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
