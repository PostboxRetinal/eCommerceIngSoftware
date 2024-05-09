const mongoose = require('mongoose');
const sinon = require('sinon');
const chai = require("chai")
const expect = chai.expect;
const { dbConnection } = require('../database/config'); // Asegúrate de reemplazar con la ruta correcta
const Compra = require('../models/compra'); // Asegúrate de reemplazar con la ruta correcta del modelo

describe('Simulación de inserción de orden en MongoDB', () => {
  let saveStub;
  before(async () => {
    await dbConnection(); // Utiliza la función de conexión de tu archivo config.js
    saveStub = sinon.stub(Compra.prototype, 'save').resolves(); // Simula la función save
  });

  it('debería simular la inserción de una orden de compra', async () => {
    const compraTest = new Compra({
      usuario: "661c83912de8d8a9fd202516",
      compraItems: [{
        consecutivo: 7,
        fecha: "2024-04-15T19:22:34.281422",
        cantidad: 1,
        precio: 100,
        articulo: "5fb8b89e2958b913f6e324a7",
      }],
      cantidadProductos: 1,
      estado: 'En proceso',
      direccionDomicilio: {
        direccion: 'Calle Falsa 123',
        ciudad: 'Ciudad Falsa',
        barrio: 'Barrio Falso',
        codigoPostal: 12345,
        observaciones: 'Ninguna'
      },
      metodoPago: 'Tarjeta de crédito',
      resultadoPago: {
        id: 'abc123',
        estado: 'Aprobado',
        update_time: '2020-01-01T00:00:00Z',
        correo: 'cliente@example.com'
      },
      precioArticulos: 500,
      precioTotal: 600,
      isPago: true,
      paidAt: "2024-04-15T19:22:34.281422",
      isDelivered: false
    });

    await compraTest.save();
    expect(saveStub.calledOnce).to.be.true; // Verifica que la función simulada fue llamada
  });

  after(() => {
    saveStub.restore(); // Restaura la función original
  });
});