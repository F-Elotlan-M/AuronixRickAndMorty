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

describe('GET /characters/alive/paged?page={n}', () => {

  test('should return status 200 and valid results for page 1', async () => {
    const response = await request(app).get('/characters/alive/paged?page=1');
  
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
    const limit = 20; // Si en algún momento se cambia a 30, solo actualizas esta línea
    expect(response.body.results.length).toBeLessThanOrEqual(limit); // Validamos que no exceda el límite
  
    // Verifica que los personajes sean "vivos"
    response.body.results.forEach(character => {
      expect(character.status).toBe('Alive');
    });
  });
  
  test('should return status 200 and valid results for page 2', async () => {
    const response = await request(app).get('/characters/alive/paged?page=2');
  
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.results)).toBe(true);
    const limit = 20; // Aquí también puedes actualizar el límite si cambia en el futuro
    expect(response.body.results.length).toBeLessThanOrEqual(limit);
  
    response.body.results.forEach(character => {
      expect(character.status).toBe('Alive');
    });
  });

  test('should return 400 if page is not a number', async () => {
    const response = await request(app).get('/characters/alive/paged?page=abc');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch("The page must be a numeric value");
  });

  test('should return 400 if page is negative', async () => {
    const response = await request(app).get('/characters/alive/paged?page=-1');

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch("The page must be a positive number");
  });

  test('should return 400 if page is missing', async () => {
    const response = await request(app).get('/characters/alive/paged');

    // En tu implementación actual, si no se pasa ?page=, puede ir al otro endpoint sin paginación
    // Así que este test puede variar dependiendo de cómo quieras manejar eso
    expect(response.status).toBe(400); // O 400 si cambias la lógica
  });

  test('should return 500 with error message if page is too high', async () => {
    const response = await request(app).get('/characters/alive/paged?page=9999');
  
    expect(response.status).toBe(500);
  
    expect(response.body.error).toBe('Ocurrió un error al procesar la solicitud');
  });

});
