import { getInstance } from '../mocks';

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    const app = await getInstance();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
    });
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });
});
