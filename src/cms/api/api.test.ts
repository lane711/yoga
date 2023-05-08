import { app } from './api'


describe('API Tests', () => {
    test('GET forms', async () => {
      const res = await app.request('http://127.0.0.1:3077/api/test');
      expect(res.status).toBe(200)
      expect(await res.text()).toBe('Many posts')
    })
  })