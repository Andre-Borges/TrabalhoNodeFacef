var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000/";

// Teste do GET categorias
describe("# GET categorias", function() {
    it("Deve retornar a lista de categorias", function (done) {
        request.get(
            {
                url: urlBase + "categorias"
            },
            (error, response, body) => {
                let _body = {};

                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(200);

                

                done();
            }
        )
    })
});