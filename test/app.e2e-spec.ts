import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserDTO } from '../src/user/dto/user.dto';
import { response } from 'express';

describe('UserController (Integration Tests)', () => {
    let app: INestApplication;
    let INVALID_ID = 'invalid';

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (GET) - Return empty List - StatusCode 200', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect([]);
    });

    it('/users (POST) - StatusCode 200', async () => {
        return request(app.getHttpServer())
            .post(`/users`)
            .send(new UserDTO('Tales Satiro', 31))
            .expect(201);
    });

    it('/users (GET) - Return List with one user - StatusCode 200', async () => {
        await request(app.getHttpServer())
            .post(`/users`)
            .send(new UserDTO('Tales Satiro', 31))
            .expect(201);

        const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200);

        expect(response.body).toHaveLength(1);
    });

    it('/users/:id (GET) - Using Invalid ID - StatusCode 404', () => {
        return request(app.getHttpServer())
            .get(`/users/${INVALID_ID}`)
            .expect(404);
    });

    it('/users/:id (GET) - Using valid ID - StatusCode 200', async () => {
        let userID = null;
        await request(app.getHttpServer())
            .post(`/users`)
            .send(new UserDTO('Tales Satiro', 31))
            .expect((response) => {
                userID = response.body.id;
            });

        return request(app.getHttpServer())
            .get(`/users/${userID}`)
            .expect(200);
    });

    it('/users/:id (PUT) - Using Invalid ID - StatusCode 404', () => {
        return request(app.getHttpServer())
            .put(`/users/${INVALID_ID}`)
            .send(
                {
                    name: 'Tales Satiro',
                    age: 31
                }
            ).expect(404);
    });

    it('/users/:id (PUT) - Using valid ID - StatusCode 200', async () => {
        let userID = null;
        await request(app.getHttpServer())
            .post(`/users`)
            .send(new UserDTO('Tales Satiro', 31))
            .expect((response) => {
                userID = response.body.id;
            });

        const newName = 'Italo Satiro';
        const newAge = 32;
        await request(app.getHttpServer())
            .put(`/users/${userID}`)
            .send(
                {
                    name: newName,
                    age: newAge
                }
            ).expect(200);

        const response = await request(app.getHttpServer())
            .get(`/users/${userID}`)
            .expect(200);

        expect(response.body).toEqual({ id: userID, name: newName, age: newAge });
    });

    it('/users/:id (DELETE) - Using invalid ID - StatusCode 409', async () => {
        let userID = null;
        await request(app.getHttpServer())
            .delete(`/users/${INVALID_ID}`)
            .expect(409);
    });

    it('/users/:id (DELETE) - Using valid ID - StatusCode 200', async () => {
        let userID = null;
        const name = 'Tales Satiro';
        const age = 31;
        await request(app.getHttpServer())
            .post(`/users`)
            .send(new UserDTO(name, age))
            .expect((response) => {
                userID = response.body.id;
            });

        await request(app.getHttpServer())
            .get(`/users`)
            .expect(200)
            .expect([
                {
                    id: userID,
                    name,
                    age
                }
            ]);

        await request(app.getHttpServer())
            .delete(`/users/${userID}`)
            .expect(200);

        return request(app.getHttpServer())
            .get(`/users`)
            .expect(200)
            .expect([]);
    });

});
