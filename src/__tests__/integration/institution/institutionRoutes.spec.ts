import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAdm, mockedAdminLogin, mockedNotAdminLogin } from "../../mocks/admin";
import { mockedInstitution, mockedInstitutionLogin, mockedInstitutionWithoutCNPJ, mockedInstitutionWithoutName, mockedInstitutionWrongLogin } from "../../mocks/institutions";


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
        expect(response.body).toHaveProperty("ageGroup")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("PCDAccept")
        expect(response.body.name).toEqual("Favo de mel")
        expect(response.body.address).toEqual("Rua do peixoto, 35 - Jardim Limoeiro - Serra/ES")
        expect(response.body.cnpj).toEqual("12345789000102")
        expect(response.body.ageGroup).toEqual(3)
        expect(response.body.phone).toEqual(33218600)
        expect(response.body.email).toEqual("favodemel@mail.com")
        expect(response.body.PCDAccept).toEqual(true)
        expect(response.status).toBe(201)        
    })


    test("POST /institutions -  should not be able to create a institutions whitout CNPJ",async () => {
        const response = await request(app).post('/institutions').send(mockedInstitutionWithoutCNPJ)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("POST /institutions -  should not be able to create a institutions whitout name",async () => {
        const response = await request(app).post('/institutions').send(mockedInstitutionWithoutName)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
       
    })


    test("POST /institutions -  should not be able to create a institutions that already exists",async () => {
        const response = await request(app).post('/institutions').send(mockedInstitution)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
             
    })


    test("POST /institutions/login -  should be able to login",async () => {
        const response = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
     
    })

    test("POST /institutions/login -  should be not able to login with wrong password or login",async () => {
        const response = await request(app).post("/institutions/login").send(mockedInstitutionWrongLogin);
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
     
    })


    test("GET /institutions/:id -  Must be able to list institution by Id",async () => {
        const intitutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
        const token = `Bearer ${intitutionLoginResponse.body.token}`
        const id = intitutionLoginResponse.body.id_Institution
        const response = await request(app).get(`/institutions/${id}`).set("Authorization",token)
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)    

    })

    test("GET /institutions/:id -  should not be able to list institution by Id without authentication",async () => {
        const response = await request(app).get(`/institutions/0ac51579-f72b-49e6-b7fc-10a2127af1c4`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401) 
    })



    test("DELETE /institutions/:id -  Must be able to soft delete institution by id",async () => {
        await request(app).post('/institutions/login').send(mockedInstitutionLogin)
        const intitutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
        const token = `Bearer ${intitutionLoginResponse.body.token}`
        const id = intitutionLoginResponse.body.id_Institution
        
        const response = await request(app).delete(`/institutions/${id}`).set("Authorization",token)
        const findUser = await request(app).get(`/institutions/${id}`).set("Authorization",token)
        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
     
    })

    test("DELETE /institutions/:id -  should not be able to delete institution without authentication",async () => {
        const response = await request(app).get(`/institutions/0ac51579-f72b-49e6-b7fc-10a2127af1c4`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401) 
             
    })

    test("PATCH /institutions/:id -  should be able to update institutions",async () => {
        await request(app).post('/institutions/login').send(mockedInstitutionLogin)
        const intitutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
        const token = `Bearer ${intitutionLoginResponse.body.token}`
        const id = intitutionLoginResponse.body.id_Institution
        const newValues = {name: "Creche do Geovane"}

        const response = await request(app).patch(`/institutions/${id}`).set("Authorization",token).send(newValues)

        const userUpdated = await request(app).get(`/institutions/${id}`).set("Authorization",token)
        expect(response.status).toBe(200)
        expect(userUpdated.body[0].name).toEqual("Creche do Geovane")
    })
    
    test("PATCH /institutions/:id - should not be able to update email field value",async () => {
        await request(app).post('/institutions/login').send(mockedInstitutionLogin)
        const intitutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
        const token = `Bearer ${intitutionLoginResponse.body.token}`
        const id = intitutionLoginResponse.body.id_Institution
        const newValues = {email: "geovaneReiDosDevs@gmail.com"}
        const response = await request(app).patch(`/institutions/${id}`).set("Authorization",token).send(newValues)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

})


//teste de login - institui 200 OK
//teste de criacao instituicao 201 ok
//teste de update instituicao 203 OK
//teste de delecao instituicao 204 ok
//teste de erro de criacao instituicao 400 ok
//teste de erro de id update, get, delete de todos







//teste de login - mae 200
// teste de login - adm 200

//teste de criacao mae 201
//teste de criacao filho 201
//teste de criacao agendamento 201
//teste de criacao adm 201

//teste de update mae 203
//teste de update filho 203
//teste de update checkin 203
//teste de update checkout 203


//teste de delecao mae 203
//teste de delecao filho 203

//teste de erro de login mae
//teste de erro de login institui
//teste de erro de login adm

//teste de  erro de criacao mae 400
//teste de erro de criacao filho 400
//teste de erro de criacao agendamento 400
//teste de erro de criacao adm 400

//teste de erro de id update, get, delete de todos





