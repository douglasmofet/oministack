const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    //Executa depois do teste
    //afterEach

    //Executa depois do teste
    afterAll(async () => {
        await connection.destroy();
    });

    it('shold be able to create a new ONG', async () => {
        const response = await request(app)
                            .post('/ongs')
                            /*.set('Authorization', 'sss') - header test*/
                            .send({
                                "name": "TESTE AVANÇADO",
                                "email": "contato@gmail.com",
                                "whatsapp": "12345678941",
                                "city": "Rio do Sul",
                                "uf": "SC"
                            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});