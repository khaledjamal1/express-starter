/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken'

// Define your secret key (use a strong key for production)
const secretKey = process.env.ACCESS_TOKEN_SECRET!

// Define payload (this can include any data you need)
const payload = {
  userId: '12345', // Example user ID
  role: 'developer' // Example role
}

// Define options with a very long expiration time (e.g., 10 years)
const options = {
  expiresIn: '10y' // Token expiration set to 10 years
}

// Generate the token
export const token = jwt.sign(payload, secretKey, options)

// log the token
console.log(token)
