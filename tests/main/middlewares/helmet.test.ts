import { getInstance } from '../mocks';

describe('Helmet Middleware', () => {
  test('Should enable Helmet', async () => {
    const app = await getInstance();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
    });
    expect(response.headers['X-Powered-By']).toBeUndefined();
  });
});
