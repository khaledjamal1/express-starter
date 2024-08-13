import request from 'supertest'

import createServer from '../../src/lib/createServer'
const app = createServer()

describe('loginLimiter Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Clear previous calls to mock functions
  })

  it('should allow requests below the rate limit', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'admin@arnetwork.me',
      password: '123456'
    })
    expect(response.status).toBe(200)
  })

  it('should rate limit requests and log information when exceeded', async () => {
    // Send requests to exceed the rate limit
    for (let i = 0; i < 5; i++) {
      await request(app).post('/api/auth/login').send({
        email: 'admin@arnetwork.me',
        password: '123456'
      })
    }

    // Send one more request to trigger the rate limit
    const response = await request(app).post('/api/auth/login').send({
      email: 'admin@arnetwork.me',
      password: '123456'
    })
    expect(response.status).toBe(429) // Expect 429 Too Many Requests
  })
})
