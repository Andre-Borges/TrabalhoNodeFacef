var Sequelize = require("sequelize");
var sequelize = new Sequelize('trabalhonodefacef', 'trabalhonodefacef', 'trabalhonodefacef', { dialect: 'sqlite', storage: './ecommerce.sqlite' });

var cpfGenerator = require("@brazilian-utils/generate-cpf");
var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000/";
var lastId;

// Teste do GET clientes
describe("# GET clientes", () => {

    beforeEach((done) => {
        sequelize.query("SELECT id FROM clientes ORDER BY id DESC LIMIT 1", { 
            raw: true,
            plain: true,
            type: sequelize.QueryTypes.SELECT 
        }).then(cliente => {
            lastId = cliente.id;
        });

        done();
    });

    it("Deve retornar a lista de clientes", (done) => {
        request.get(
            {
                url: urlBase + "clientes",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(200);
                expect(_body).to.be.a('array');

                done();
            }
        )
    });

    it("Deve retornar apenas 1 cliente", (done) => {
        request.get(
            {
                url: urlBase + "clientes/1",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(200);
                expect(_body).to.be.a('object');

                done();
            }
        )
    });

    it("Deve retornar 404", (done) => {
        request.get(
            {
                url: urlBase + "clientes/99999",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(404);                
                done();
            }
        )
    });
});

// POST clientes
describe("# POST clientes", () => {
    it("Deve inserir um cliente", (done) => {
        request.post(
            {
                url: urlBase + "clientes",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
                json: { 
                    "nome": "Cliente de Teste",
                    "numeroCpfCnpj": cpfGenerator(),
                    "email": "oi" + Math.random + "@oi.com",
                    "senha": "123456"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(201);
                expect(_body).to.be.a('object');

                done();
            }
        )
    });

    it("Deve retornar 400 (corpo vazio)", (done) => {
        request.post(
            {
                url: urlBase + "clientes",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: {}
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(400);
                done();
            }
        )
    });

    it("Deve retornar 400 (nome vazio)", (done) => {
        request.post(
            {
                url: urlBase + "clientes",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { 
                    "nome": "",
                    "numeroCpfCnpj": cpfGenerator(),
                    "email": "oi" + Math.random + "@oi.com",
                    "senha": "123456"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(400);
                done();
            }
        )
    });
});

// PUT clientes
describe("# PUT clientes", () => {
    it("Deve atualizar um cliente", (done) => {
        request.put(
            {
                url: urlBase + "clientes/" + lastId,
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
                json: { 
                    "nome": "Cliente de Teste",
                    "numeroCpfCnpj": cpfGenerator(),
                    "email": "oi" + Math.random + "@oi.com",
                    "senha": "123456"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(200);
                expect(_body).to.be.a('object');

                done();
            }
        )
    });

    it("Deve retornar 400 (corpo vazio)", (done) => {
        request.put(
            {
                url: urlBase + "clientes/" + lastId,
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: {}
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(400);
                done();
            }
        )
    });

    it("Deve retornar 400 (CPF vazio)", (done) => {
        request.put(
            {
                url: urlBase + "clientes/" + lastId,
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { 
                    "nome": "Categoria de Teste",
                    "numeroCpfCnpj": "",
                    "email": "teste" + Math.random + "@teste.com",
                    "senha": "123456"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(400);
                done();
            }
        )
    });

    it("Deve retornar 404", (done) => {
        request.put(
            {
                url: urlBase + "clientes/9999",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { 
                    "nome": "Cliente totalmente novo",
                    "numeroCpfCnpj": cpfGenerator(),
                    "email": "teste" + Math.random + "@teste.com",
                    "senha": "123456"
                }
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(404);
                done();
            }
        )
    });
});

// DELETE clientes
describe("# DELETE clientes", () => {
    it("Deve deletar um cliente", (done) => {
        request.delete(
            {
                url: urlBase + "clientes/" + lastId,
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(204);
                expect(_body).to.be.a('object');

                done();
            }
        )
    });

    it("Deve retornar 404", (done) => {
        request.delete(
            {
                url: urlBase + "clientes/9999",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(404);
                done();
            }
        )
    });
});