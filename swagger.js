// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Min Social App API",
      version: "1.0.0",
      description: "API documentation for the Min Social App project",
    },
    servers: [
      {
        url: "http://localhost:5002", // غيّرها بعدين للرابط الحقيقي بعد النشر
      },
    ],
  },
  apis: ["./modules/**/*.js"], // هيقرأ كل ملفات الراوترز عشان يولّد منها ال Docs
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("📘 Swagger Docs available at http://localhost:5002/api-docs");
};
