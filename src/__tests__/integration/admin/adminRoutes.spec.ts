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

    test("POST /admin/login -  should be not able to login with wrong password or login", async () => {
        const response = await request(app)
            .post("/admin/login")
            .send(mockedWrongAdminLogin);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });

    test("GET /admin/institutions -  Must be able to list all institutions", async () => {
        const adminLoginResponse = await request(app)
            .post("/admin/login")
            .send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const response = await request(app)
            .get(`/admin/institutions`)
            .set("Authorization", token);
        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    test("GET /admin/institution -  should not be able to list all institutions without authentication", async () => {
        const response = await request(app).get(`/admin/institutions`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("DELETE /admin/institution/:id -  should be able to soft delete the admin`s institution by id", async () => {
        await request(app).post("/admin/login").send(mockedAdminLogin);
        const adminLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const id = adminLoginResponse.body.id_Institution;

        const response = await request(app)
            .patch(`/admin/institution/${id}`)
            .set("Authorization", token);
        const findUser = await request(app)
            .get(`/admin/${id}`)
            .set("Authorization", token);
        expect(response.status).toBe(204);
        expect(findUser.body[0].isActive).toBe(false);
    });

    test("DELETE /admin/institution/:id -  should not be able to soft delete the admin`s institution by id without authentication", async () => {
        const response = await request(app).delete(
            `/admin/institution/0ac51579-f72b-49e6-b7fc-10a2127af1c4`
        );
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /admin/:id -  should be able to update admin", async () => {
        await request(app).post("/admin/login").send(mockedAdminLogin);
        const adminLoginResponse = await request(app)
            .post("/admin/login")
            .send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const id = adminLoginResponse.body.id;
        const newValues = { name: "Gegeferson" };

        const response = await request(app)
            .patch(`/admin/${id}`)
            .set("Authorization", token)
            .send(newValues);

        const userUpdated = await request(app)
            .get(`/admin/${id}`)
            .set("Authorization", token);
        expect(response.status).toBe(200);
        expect(userUpdated.body[0].name).toEqual("Gegeferson");
    });

    test("PATCH /admin/:id - should not be able to update email field value", async () => {
        await request(app).post("/admin/login").send(mockedAdminLogin);
        const adminLoginResponse = await request(app)
            .post("/admin/login")
            .send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const id = adminLoginResponse.body.id;
        const newValues = { email: "gegefersonReiDosDevs@gmail.com" };
        const response = await request(app)
            .patch(`/admin/${id}`)
            .set("Authorization", token)
            .send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
});
