import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
    mockedAdm,
    mockedAdminLogin,
    mockedAdmWithoutEmail,
    mockedAdmWithoutPassword,
    mockedNotAdminLogin,
    mockedWrongAdminLogin,
} from "../../mocks/admin";
import { mockedInstitution, mockedInstitutionLogin } from "../../mocks/institutions";
import { mockedMother, mockedMotherLogin } from "../../mocks/mother";

describe("/institutions", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /admin -  Must be able to create a admin", async () => {
        const response = await request(app).post("/admin").send(mockedAdm);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.name).toEqual("Joao");
        expect(response.body.email).toEqual("joao@mail.com");
        expect(response.body.isAdm).toEqual(true);
        expect(response.status).toBe(201);
    });

    test("POST /admin -  should not be able to create a admin without email", async () => {
        const response = await request(app)
            .post("/admin")
            .send(mockedAdmWithoutEmail);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("POST /admin -  should not be able to create a admin without password", async () => {
        const response = await request(app)
            .post("/admin")
            .send(mockedAdmWithoutPassword);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("POST /admin -  should not be able to create a admin that already exists", async () => {
        const response = await request(app).post("/admin").send(mockedAdm);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("POST /admin/login -  should be able to login", async () => {

        const response = await request(app)
            .post("/admin/login")
            .send(mockedAdminLogin);

        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    });

    test("POST /admin/login -  should be not able to login with wrong password or email", async () => {
        const response = await request(app).post("/admin/login").send(mockedWrongAdminLogin);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("GET /admin/institutions -  Must be able to list all institutions", async () => {
        await request(app).post("/institutions").send(mockedInstitution);

        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).get("/admin/institutions").set("Authorization", token);
       console.log(response.body)
        expect(response.body).toHaveProperty("map");
        expect(response.status).toBe(200)

    });

    test("GET /admin/institutions/ -  should not be able to list all institutions without authentication", async () => {
        await request(app).post("/institutions").send(mockedInstitution);

        const response = await request(app).get('/admin/institutions/');

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });


    test("GET /admin/institutions/:id-  Must be able to list institution by id", async () => {
        await request(app).post("/institutions").send(mockedInstitution);
       
        const institutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
      
        const id = institutionLoginResponse.body.id_Institution;

        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).get(`/admin/institutions/${id}`).set("Authorization", token);
        
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("ageGroup")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("PCDAccept")
        expect(response.body).toHaveProperty("schedules")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Favo de mel")
        expect(response.body.address).toEqual("Rua do peixoto, 35 - Jardim Limoeiro - Serra/ES")
        expect(response.body.phone).toEqual(33218600)
        expect(response.body.email).toEqual("favodemel@mail.com")
        expect(response.body.cnpj).toEqual("12345789000102")
        expect(response.body.ageGroup).toEqual(3)
        expect(response.body.isActive).toEqual(true)
        expect(response.body.PCDAccept).toEqual(true)
        expect(response.status).toBe(200)

    });

    test("GET /admin/institutions/:id -  should not be able to list institution by id without authentication", async () => {
        await request(app).post("/institutions").send(mockedInstitution);
       
        const institutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
      
        const id = institutionLoginResponse.body.id_Institution;

        const response = await request(app).get(`/admin/institutions/${id}`);
      
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /admin/institutions/:id -  should not be able to list institution without institution id", async () => {
        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).get(`/admin/institutions/0ac51579-fsd5a-49e6-b7fc-10a2127af1c4`).set("Authorization", token);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("DELETE /admin/institutions/:id -  should be able to soft delete the admin`s institution by id", async () => {
        await request(app).post("/institutions").send(mockedInstitution);
       
        const institutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
      
        const id = institutionLoginResponse.body.id_Institution;

        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;
        
        const response = await request(app).delete(`/admin/institutions/${id}`).set("Authorization", token);
        
        const findUser = await request(app).get(`/admin/institutions/${id}`).set("Authorization", token);

        expect(findUser.body.isActive).toBe(false);
        expect(response.status).toBe(204);
    });

    test("DELETE /admin/institutions/:id -  should not be able to soft delete the admin`s institution by id without id", async () => {
        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).delete(`/admin/institutions/0ac51579-f72b-49e6-b7fc-10a2127af1c4`).set("Authorization", token);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("DELETE /admin/institutions/:id -  should not be able to soft delete the admin`s institution by id without authentication", async () => {
        await request(app).post("/institutions").send(mockedInstitution);
       
        const institutionLoginResponse = await request(app).post("/institutions/login").send(mockedInstitutionLogin);
      
        const id = institutionLoginResponse.body.id_Institution;
       
        const response = await request(app).delete(`/admin/institutions/${id}`)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /admin/:id -  should be able to update admin", async () => {
        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const id = adminLoginResponse.body.adminId;

        const newValues = { name: "Gegeferson" };

        const response = await request(app).patch(`/admin/${id}`).set("Authorization", token).send(newValues);

        const userUpdated = await request(app).get(`/admin/${id}`).set("Authorization", token);
        expect(userUpdated.body.name).toEqual("Gegeferson");
        expect(response.status).toBe(200);
    });

    test("PATCH /admin/:id - should not be able to update email field value", async () => {
        await request(app).post("/admin/login").send(mockedAdminLogin);
       
        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);
       
        const token = `Bearer ${adminLoginResponse.body.token}`;
       
        const id = adminLoginResponse.body.adminId;
       
        const newValues = { email: "gegefersonReiDosDevs@gmail.com" };
        
        const response = await request(app).patch(`/admin/${id}`).set("Authorization", token).send(newValues);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /admin/:id - should not be able to update without id", async () => {
        await request(app).post("/admin/login").send(mockedAdminLogin);
       
        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);
       
        const token = `Bearer ${adminLoginResponse.body.token}`;
              
        const newValues = { name: "Gegeferson" };
        
        const response = await request(app).patch(`/admin/0ac51579-f72b-49e6-b7fc-10a2127af1c4`).set("Authorization", token).send(newValues);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("PATCH /admin/:id - should not be able to update without authentication", async () => {
        await request(app).post("/admin/login").send(mockedAdminLogin);
       
        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);
       
        const id = adminLoginResponse.body.adminId;
  
        const newValues = { name: "Gegeferson" };
        
        const response = await request(app).patch(`/admin/${id}`).send(newValues);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /admin/mothers -  should be able to update admin", async () => {
        await request(app).post('/mothers').send(mockedMother);

        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).get("/admin/mothers").set("Authorization", token);

        expect(response.body).toHaveProperty("map");
        expect(response.status).toBe(200);
    });

    test("GET /admin/mothers/:id -  should be able to update admin", async () => {
        await request(app).post('/mothers').send(mockedMother);
     
        const motherLoginResponse = await request(app).post("/mothers/login").send(mockedMotherLogin)
     
        const motherId = motherLoginResponse.body.motherId

        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).get(`/admin/mothers/${motherId}`).set("Authorization", token);

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

    });

    test("GET /admin/mothers/:id -  should be able to update admin", async () => {
        await request(app).post('/mothers').send(mockedMother);

        const adminLoginResponse = await request(app).post("/admin/login").send(mockedAdminLogin);

        const token = `Bearer ${adminLoginResponse.body.token}`;

        const response = await request(app).get("/admin/mothers/0ac51579-f72b-49e6-b7fc-10a2127af1c4").set("Authorization", token);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });
});
