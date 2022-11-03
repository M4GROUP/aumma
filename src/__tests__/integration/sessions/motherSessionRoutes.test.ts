import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedMother, mockedMotherLogin } from "../../mocks/mother";

describe("/login/mothers", () => {

    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/mothers').send(mockedMother)
    })
    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /mothers/login -  should be able to login with the mother", async () => {
        const response = await request(app).post("/mothers/login").send(mockedMotherLogin)

        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
    })

    test("POST /mothers/login  -  should not be able to login with the mother with incorrect password or email",async () => {
        const response = await request(app).post("/mothers/login").send({
            email: "maria@mail.com",
            password: "1234567"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

})