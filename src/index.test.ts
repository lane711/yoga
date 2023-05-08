import app from './index'

const baseUrl = 'http://127.0.0.1:3077';


describe('Admin Tests', () => {
  // test('GET forms', async () => {
  //   const res = await app.request(`${baseUrl}/css/admin.css`);
  //   expect(res.status).toBe(200)
  //   expect(await res.text()).toBe('Many posts')
  // })

})

describe('API Tests', () => {
    test('GET forms', async () => {
      const res = await app.request(`${baseUrl}/api/test`);
      expect(res.status).toBe(200)
      expect(await res.text()).toBe('Many posts')
    })

    test('GET form components', async () => {
        const res = await app.request(`${baseUrl}/api/form-components`);
        expect(res.status).toBe(200)
        const formComponents = await res.json();
        expect(Array.isArray(formComponents)).toBe(true)
      })

      test('POST /posts', async () => {
        const req = new Request(`${baseUrl}/api/form-components`, {
          method: 'POST',
        })
        const res = await app.request(req)
        expect(res.status).toBe(201)
        // expect(res.headers.get('X-Custom')).toBe('Thank you')
        // expect(await res.json()).toEqual({
        //   message: 'Created',
        // })
      })
  })