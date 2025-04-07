export class CharacterDTO {
    constructor({ id, name, status, gender }) {
      this.id = id;
      this.name = name.replace(/\s+/g, '_'); // Asegurar que se formatee
      this.status = status;
      this.gender = gender;
    }
  }
  