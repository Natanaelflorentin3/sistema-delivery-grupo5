import swaggerAutogen from "swagger-autogen";
import fs from "node:fs";

const doc = {
  info: {
    title: "API de gestion para restaurante 🍽️",
    description: "Documentacion generada automaticamente por swagger-autogen",
    version: "1.0.0",
  },
};

const outputFile = "./src/swagger-output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  const generado = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
  delete generado.host;
  delete generado.basePath;
  delete generado.schemes;
  fs.writeFileSync(outputFile, JSON.stringify(generado, null, 2));
  console.log("Host, basePath y schemes eliminados del swagger-output.json generado");
});