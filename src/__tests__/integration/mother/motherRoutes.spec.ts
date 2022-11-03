import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { 
    mockedMother, mockedMotherLogin, mockedMotherNewValues, mockedMotherWithoutCPF,
    mockedMotherWithoutEmail, mockedMotherWithoutName, mockedMotherWithoutPassword
} from "../../mocks/mother";

describe("/mothers", () => {
    
    let connection: DataSource

    beforeAll( async ()=> {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        
    })

    afterAll( async () => {
        await connection.destroy()
    })

    test("POST /mothers -  Must be able to create a mother", async () => {

        const response = await request(app).post('/mothers').send(mockedMother)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("rg")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Laura Mendes Freitas")
        expect(response.body.address).toEqual("Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP")
        expect(response.body.phone).toEqual(27988440837)
        expect(response.body.email).toEqual("laura@mail.com")
        expect(response.body.cpf).toEqual("86101289521")
        expect(response.body.rg).toEqual("2175690889")
        expect(response.status).toBe(201)

    })

    test("POST /mothers -  should not be able to create a mother that already exists", async () => {

        const response = await request(app).post('/mothers').send(mockedMother)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)     
    
    })

    test("POST /mothers -  should not be able to create a mother whitout CPF", async () => {

        const response = await request(app).post('/mothers').send(mockedMotherWithoutCPF)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
       
    })

    test("POST /mothers -  should not be able to create a mother whitout name", async () => {

        const response = await request(app).post('/mothers').send(mockedMotherWithoutName)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
       
    })

    test("POST /mothers -  should not be able to create a mother whitout email", async () => {

        const response = await request(app).post('/mothers').send(mockedMotherWithoutEmail)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
       
    })

    test("POST /mothers -  should not be able to create a mother whitout password", async () => {

        const response = await request(app).post('/mothers').send(mockedMotherWithoutPassword)
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
       
    })

    test("GET /mothers/:id -  Must be able to list one mother", async () => {
        
        await request(app).post('/mothers').send(mockedMother)

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).get(`/mothers/${motherId}`).set("Authorization", token)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("rg")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Laura Mendes Freitas")
        expect(response.body.address).toEqual("Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP")
        expect(response.body.phone).toEqual(27988440837)
        expect(response.body.email).toEqual("laura@mail.com")
        expect(response.body.cpf).toEqual("86101289521")
        expect(response.body.rg).toEqual("2175690889")
        expect(response.status).toBe(200)

    })

    test("GET /mothers/:id - should not be able to list one mother with invalid id", async () => {

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const response = await request(app).get(`/mothers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization",token).send(mockedMotherNewValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)

    })

    test("GET /mothers/:id - should not be able to list one mother without authentication", async () => {

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherRequest = await request(app).get("/mothers").set("Authorization", token)

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).get(`/mothers/${motherId}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    })

    test("PATCH /mothers/:id -  should be able to update mother", async () => {

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherRequest = await request(app).get("/mothers").set("Authorization", token)

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).patch(`/mothers/${motherId}`).set("Authorization", token).send(mockedMotherNewValues)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("rg")
        expect(response.body).toHaveProperty("cpf")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual(mockedMotherNewValues.name)
        expect(response.body.email).toEqual(mockedMotherNewValues.email)
        expect(response.body.address).toEqual(mockedMotherNewValues.address)
        expect(response.body.phone).toEqual(mockedMotherNewValues.phone)
        expect(response.body.cpf).toEqual(mockedMotherNewValues.cpf)
        expect(response.body.rg).toEqual(mockedMotherNewValues.rg)        
        expect(response.status).toBe(200)
        
    })

    test("PATCH /mothers/:id -  should not be able to update mother without authentication", async () => {

        await request(app).post('/mothers').send(mockedMother)

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherRequest = await request(app).get("/mothers").set("Authorization", token)

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).patch(`/mothers/${motherId}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("PATCH /mothers/:id - should not be able to update mother with invalid id", async () => {

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const response = await request(app).patch(`/mothers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization",token).send(mockedMotherNewValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)

    })

    test("PATCH /mothers/:id - should not be able to update isActive field value", async () => {
        await request(app).post('/mothers').send(mockedMother)

        const newValues = {isActive: false}

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`
        const motherId = motherLoginResponse.body.motherId
        
        const response = await request(app).patch(`/mothers/${motherId}`).set("Authorization",token).send(newValues)
    
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    })

    test("PATCH /mothers/:id - should not be able to update id field value", async () => {
        
        const newValues = {id: false}

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).patch(`/mothers/${motherId}`).set("Authorization",token).send(newValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)

    })

    test("DELETE /mothers/:id -  Must be able to soft delete mother", async () => {
      
        await request(app).post('/mothers').send(mockedMother)

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherRequest = await request(app).get("/mothers").set("Authorization", token)

        const motherId = motherLoginResponse.body.motherId
        const response = await request(app).delete(`/mothers/${motherId}`).set("Authorization", token)
        
        const findMother = await request(app).get(`/mothers/${motherId}`).set("Authorization", token)
        
        expect(response.status).toBe(204)
        expect(findMother.body.isActive).toBe(false)
     
    })

    test("DELETE /mothers/:id -  should not be able to delete mother without authentication", async () => {
      
        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherRequest = await request(app).get("/mothers").set("Authorization", token)

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).delete(`/mothers/${motherId}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /mothers/:id -  should not be able to delete mother with invalid id", async () => {

        await request(app).post('/mothers').send(mockedMother)

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)
        
        const token = `Bearer ${motherLoginResponse.body.token}`

        const response = await request(app).delete(`/mothers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", token)
       
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE /mothers/:id -  shouldn't be able to delete mother with isActive = false", async () => {

        await request(app).post('/mothers').send(mockedMother)

        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)

        const token = `Bearer ${motherLoginResponse.body.token}`

        const motherId = motherLoginResponse.body.motherId

        const response = await request(app).delete(`/mothers/${motherId}`).set("Authorization", token)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
     
    })

})