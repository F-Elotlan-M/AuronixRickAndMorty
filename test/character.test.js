import request from 'supertest';
import app from '../src/app.js'; 

describe('GET /characters', () => {
  it('should return a list of characters', async () => {
    const response = await request(app).get('/characters/alive');
  
    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(response.body.results.length).toBeGreaterThan(0);
  }, 10000);

  it('should return a 404 if the route does not exist', async () => {
    const response = await request(app).get('/non-existent-route');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  //Todos los personajes tienen status "Alive"
  it('should only return characters with status "Alive"', async () => {
    const response = await request(app).get('/characters/alive');
    expect(response.status).toBe(200);

    const { results } = response.body;
    const allAreAlive = results.every(char => char.status === 'Alive');
    expect(allAreAlive).toBe(true);
  });

  //Los nombres no tienen espacios solo guiones bajos
  it('should return character names with underscores instead of spaces', async () => {
    const response = await request(app).get('/characters/alive');
    expect(response.status).toBe(200);

    const { results } = response.body;
    const allNamesHaveUnderscores = results.every(char => !char.name.includes(' '));
    expect(allNamesHaveUnderscores).toBe(true);
  });

  //Cada personaje tiene propiedades clave
  it('should return characters with id, name, and status properties', async () => {
    const response = await request(app).get('/characters/alive');
    expect(response.status).toBe(200);

    const { results } = response.body;
    results.forEach(char => {
      expect(char).toHaveProperty('id');
      expect(char).toHaveProperty('name');
      expect(char).toHaveProperty('status');
    });
  });
});

