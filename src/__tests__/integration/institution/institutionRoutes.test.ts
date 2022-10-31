import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAdm, mockedAdminLogin, mockedNotAdminLogin } from "../../mocks/admin";
import { mockedInstitution } from "../../mocks/institutions";


describe ("/institutions", () =>{
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

    test("POST /institutions -  Must be able to create a institution",async () => {
        const response = await request(app).post('/institutions').send(mockedInstitution)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("age_group")
        expect(response.body).toHaveProperty("telephone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("acc_children_disability")
        expect(response.body.name).toEqual("Favo de mel")
        expect(response.body.address).toEqual("Rua do peixoto, 35 - Jardim Limoeiro - Serra/ES")
        expect(response.body.cnpj).toEqual("123457890001-02")
        expect(response.body.age_group).toEqual(3)
        expect(response.body.telephone).toEqual(33218600)
        expect(response.body.email).toEqual("favodemel@mail.com")
        expect(response.body.acc_children_disability).toEqual(true)
        expect(response.status).toBe(201)        
    })

    test("POST /institutions -  should not be able to create a institutions that already exists",async () => {
        const response = await request(app).post('/institutions').send(mockedInstitution)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("GET /institutions -  Must be able to list institutions",async () => {
        await request(app).post('/login').send(mockedAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).get('/login').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(1)
     
    })

    test("GET /institutions -  should not be able to list institutions without authentication",async () => {
        const response = await request(app).get('/institutions')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("GET /institutions -  should not be able to list institutions not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedNotAdminLogin);
        const response = await request(app).get('/institutions').set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })


})