import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blogging Platform API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./controllers/postsControllers.js"],
};

export default swaggerJsdoc(options);
