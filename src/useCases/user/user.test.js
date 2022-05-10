const request = require("supertest");
const app = require('../../../app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(
            () => console.log("Database connected successfully."),
        ).catch(
            err => console.log("Error while connecting with database: " + err)
        )
})
describe("User Use Case", () => {
    const createUser =  {
        "name":"Hugo",
        "email":"hugo2@example.com",
        "password":"123456",
    }

    const loginUser =  {
        "email":"hugo2@example.com",
        "password":"123456",
    }
    const loginUserWrong =  {
        "email":"hugo@example.com",
        "password":"123456",
    }

    const createUserSameEmail = {
        "name":"Hugo",
        "email":"hugo2@example.com",
        "password":"123456"
    }

    test('Should register a new user', async()=> {
        const response = await request(app)
        .post('/user')
        .send(createUser)

        expect(response.statusCode).toBe(200)

    });
    test('Should login a valid user', async()=> {
        const response = await request(app)
        .post('/user/login')
        .send(loginUser)

        expect(response.statusCode).toBe(200)
    });
    test('Should block user with invalid credentials', async()=> {
        const response = await request(app)
        .post('/user/login')
        .send(loginUserWrong)

        expect(response.statusCode).toBe(400)
    });
    test('Sould not allow a new user with an already registered email', async()=> {
        const response = await request(app)
        .post('/user')
        .send(createUserSameEmail)

        expect(response.statusCode).toBe(400)

    });
})