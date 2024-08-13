import request from 'supertest'
import createServer from '../src/lib/createServer'
const app = createServer()

describe('Server', () => {
  it('should return a 200 status code for the root route', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
