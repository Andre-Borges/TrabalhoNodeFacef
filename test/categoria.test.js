var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000/";

// Teste do GET categorias
describe("# GET categorias", () => {
    it("Deve retornar a lista de categorias", (done) => {
        request.get(
            {
                url: urlBase + "categorias",
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

    it("Deve retornar apenas 1 categoria", (done) => {
        request.get(
            {
                url: urlBase + "categorias/1",
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
                url: urlBase + "categorias/99999",
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

// POST Categorias
describe("# POST categorias", () => {
    it("Deve inserir uma categoria", (done) => {
        request.post(
            {
                url: urlBase + "categorias",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
                json: { "descricao": "Categoria de Teste" }
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
                url: urlBase + "categorias",
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

    it("Deve retornar 400 (descicao vazia)", (done) => {
        request.post(
            {
                url: urlBase + "categorias",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { "descricao": "" }
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

// PUT Categorias
describe("# PUT categorias", () => {
    it("Deve atualizar uma categoria", (done) => {
        request.put(
            {
                url: urlBase + "categorias/2",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"                },
                json: { "descricao": "Categoria de Teste 1" }
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
                url: urlBase + "categorias/1",
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

    it("Deve retornar 400 (descicao vazia)", (done) => {
        request.put(
            {
                url: urlBase + "categorias/1",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { "descricao": "" }
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
                url: urlBase + "categorias/9999",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJldUBpYWdvLmNvbSIsImlhdCI6MTU3ODAwODgzNSwiZXhwIjoxNTc4MDk1MjM1fQ.tGY-s9CT5jFf-rOy0dH2V7mhSyyJzmILUtCZCYCIS6g"
                },
                json: { "descricao": "Novo Nome da Categoria" }
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

// DELETE Categorias
describe("# DELETE categorias", () => {
    it("Deve deletar uma categoria", (done) => {
        request.delete(
            {
                url: urlBase + "categorias/7",
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
                url: urlBase + "categorias/9999",
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