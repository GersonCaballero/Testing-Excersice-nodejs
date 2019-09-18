var index = require("../index");
var chai = require('chai');
var should = require('chai').should();
var chaiHttp = require('chai-http');
const server = 'http://localhost:8081';
const expect = require('chai').expect;

chai.use(chaiHttp);
var assert = require("assert");

describe('interes', function(){
    describe('InteresAnual(capital, interes, tiempo)', function(){
        it("Retornar el interes anual segun el porcentaje de interes", function(){
            assert.equal(index.InteresAnual(10000,5,5), 2500);
        });
    }),
    describe('InteresTotal(capital, interesanual)', function(){
        it("Retornar el interes total", function(){
            assert.equal(index.InteresTotal(10000, 2500), 12500);
        });
    }),
    describe('Calculo de interes simple y total', function(){
        it('CalcularInteresSimple_CrearNuevoInteres_TRUE', function(done) {
            this.timeout(5000);
            chai.request(server)
                .post('/api/interes/anual')
                .send({
                capital: 10000,
	            interes: 5,
	            tiempo: 5
                })
                .then(function (res) {
                    res.should.have.status(200);
                    res.body.should.have.property('success');
                    res.body.should.have.property('success').be.equal(true);
                    res.body.should.have.property('interesAnual').be.equal(2500);
                    res.body.should.have.property('interesTotal').be.equal(12500);
                    done();
                })
                .catch(function (err) {
                 done(err);
            });
        });
    });
});