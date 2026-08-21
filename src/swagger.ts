import swaggerAutogen from 'swagger-autogen';

const doc = {
    info:{
        title:"API de gestion de Pedidos",
        descripton: "Documentacion generada automaticamente por swagger-autogen",
        version: "1.0.0",
    },
    host: "localhost:3000",
};

//EL ARCHIVO QUE SE VA A VISUALIZAR EN JSON
const outputFile = "./swagger-output-json";

//ARCHIVOS QUE SERAN LEIDOS POR SWAGGER-AUTOGEN
const routes = ["sistema-delivery-grupo5/src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);