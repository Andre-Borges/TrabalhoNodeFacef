var Sequelize = require("sequelize");
var sequelize = new Sequelize('trabalhonodefacef', 'trabalhonodefacef', 'trabalhonodefacef', { dialect: 'sqlite', storage: './ecommerce.sqlite' });

var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000/";
var lastId;

// Teste do GET produtos
describe("# GET produtos", () => {

    beforeEach((done) => {
        sequelize.query("SELECT id FROM produtos ORDER BY id DESC LIMIT 1", { 
            raw: true,
            plain: true,
            type: sequelize.QueryTypes.SELECT 
        }).then(produto => {
            lastId = produto.id;
        });

        done();
    });

    it("Deve retornar a lista de produtos", (done) => {
        request.get(
            {
                url: urlBase + "produtos",
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

    it("Deve retornar apenas 1 produto", (done) => {
        request.get(
            {
                url: urlBase + "produtos/1",
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
                url: urlBase + "produtos/99999",
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

// POST produtos
describe("# POST produtos", () => {
    it("Deve inserir um produto", (done) => {
        request.post(
            {
                url: urlBase + "produtos",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
                json: { 
                    "descricao": "Produto de Teste",
                    "quantidade": 1,
                    "valor": 10,
                    "categoriaId": 1
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
                url: urlBase + "produtos",
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
                url: urlBase + "produtos",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { 
                    "descricao": "",
                    "quantidade": 1,
                    "valor": 10,
                    "categoriaId": 1
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

// PUT produtos
describe("# PUT produtos", () => {
    it("Deve atualizar um cliente", (done) => {
        request.put(
            {
                url: urlBase + "produtos/" + lastId,
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
                json: { 
                    json: { 
                        "descricao": "Produto de Teste att",
                        "quantidade": 1,
                        "valor": 10,
                        "categoriaId": 1
                    }
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
                url: urlBase + "produtos/" + lastId,
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
                url: urlBase + "produtos/" + lastId,
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { 
                    json: { 
                        "descricao": "Produto de Teste",
                        "quantidade": "",
                        "valor": 10,
                        "categoriaId": 1
                    }
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
                url: urlBase + "produtos/9999",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { 
                    "descricao": "Produto de Teste new",
                    "quantidade": 1,
                    "valor": 10,
                    "categoriaId": 1
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

// DELETE produtos
describe("# DELETE produtos", () => {
    it("Deve deletar um cliente", (done) => {
        request.delete(
            {
                url: urlBase + "produtos/" + lastId,
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
                url: urlBase + "produtos/9999",
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