import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ID store Backend API',
      version: '1.0.0',
      description: 'ID store Backend API',
      contact: {
        name: 'ID store Backend API',
        url: 'https://github.com/khaledjamal1',
        email: 'khaled@khaledjamal.com'
      }
    },
    externalDocs: {
      // <<< this will add the link to your swagger page
      description: 'swagger.json', // <<< link title
      url: '/swagger.json' // <<< and the file added below in app.get(...)
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'ID store Development Server'
      },
      {
        url: 'https://groc.khaledjamal.com',
        description: 'ID store Production Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/services/**/*.ts']
}

export const specs = swaggerJSDoc(options)
