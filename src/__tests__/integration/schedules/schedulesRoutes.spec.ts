import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedSchedules } from "../../mocks/schedule";
import { mockedMotherLogin } from "../../mocks/mother";

describe("/schedules TESTES", ()=> {

    let connection: DataSource

    beforeAll(async()=> {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /schedules - Must be able to create a schedules", async () => {
        const response = await request(app).post("/schedules").send(mockedSchedules)

        expect(response.body).toHaveProperty("mother")
        expect(response.body).toHaveProperty("date")
        expect(response.body).toHaveProperty("gender")
        expect(response.body).toHaveProperty("period")
        expect(response.body).toHaveProperty("intitution")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(201)
    })

    test("GET /schedules/:id - Must be able to list mom's schedule", async () => {
       
        await request(app).post("/schedules").send(mockedSchedules)
        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)
        const motherID = motherLoginResponse.body.motherId

        const response = await request(app).get("/schedules/${motherID}")

        expect(response.body).toHaveProperty("mother")
        expect(response.body).toHaveProperty("date")
        expect(response.body).toHaveProperty("gender")
        expect(response.body).toHaveProperty("period")
        expect(response.body).toHaveProperty("intitution")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(200)
    })

    test("GET /schedules/:id - should not be able to list schedules with invalid id",async () => {

        const response = await request(app).get("/mothers/123456-123456-123456-123456-123456")

        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toEqual("Mother's Id is wrong")
        expect(response.status).toBe(404)
    })
})