import request from 'supertest'
import { allowedOrigins } from '../../src/config/config'
import createServer from '../../src/lib/createServer'
const app = createServer()
describe('catch all middleware', () => {
  it('should return 404 when no route is found', async () => {
    const response = await request(app).get('/not-found')
    expect(response.status).toBe(404)
  })
})
describe('Credentials Middleware', () => {
  it('should set Access-Control-Allow-Credentials header for allowed origins', async () => {
    const origin = allowedOrigins[0] // Use a valid origin from your allowedOrigins
    const response = await request(app).get('/').set('Origin', origin)

    expect(response.headers['access-control-allow-credentials']).toBe('true')
  })

  it('should not set Access-Control-Allow-Credentials header for disallowed origins', async () => {
    const response = await request(app).get('/').set('Origin', 'http://disallowed-origin.com') // Use an origin not in allowedOrigins

    expect(response.headers['access-control-allow-credentials']).toBeUndefined()
  })

  it('should handle requests with no Origin header', async () => {
    const response = await request(app).get('/')

    expect(response.headers['access-control-allow-credentials']).toBeUndefined()
  })
})
