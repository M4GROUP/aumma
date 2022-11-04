import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { childrenData, childrenDisabilityData } from "../../mocks/children";
import { mockedMother, mockedMotherLogin } from "../../mocks/mother";

describe("Testing children's route", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((error) => console.log(error));
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /childrens => Must be able to create childrens", async () => {
        await request(app).post('/mothers').send(mockedMother)
        const motherLoginResponse2 = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        
        const token2 = `Bearer ${motherLoginResponse2.body.token}`;
        const motherId = motherLoginResponse2.body.motherId;
        const resultChildren = await request(app)
            .post("/childrens")
            .set("Authorization", token2)
            .send({
                age: 6,
                genre: "Feminino",
                name: "Maya",
                isPCD: false,
                motherId: motherId,
            });

        expect(resultChildren.body).toHaveProperty("id");
        expect(resultChildren.body).toHaveProperty("name");
        expect(resultChildren.body).toHaveProperty("age");
        expect(resultChildren.body).toHaveProperty("isPCD");
        expect(resultChildren.body).toHaveProperty("genre");
        expect(resultChildren.body.name).toEqual("Maya");
        expect(resultChildren.body.age).toEqual(6);
        expect(resultChildren.body.isPCD).toEqual(false);
        expect(resultChildren.body.genre).toEqual("Feminino");
        expect(resultChildren.status).toBe(201);
    });

    test("POST /children => Should not be able to create a children without authentication ", async () => {
        const getChildren = await request(app)
            .post("/childrens")
            .send(childrenData);

        expect(getChildren.status).toBe(401);
        expect(getChildren.body).toHaveProperty("message");
    });

    test("GET /childrens/:id => Should be able to list all children related to a mother", async () => {
        await request(app).post('/mothers').send(mockedMother)
        const motherLoginResponse2 = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        
        const token2 = `Bearer ${motherLoginResponse2.body.token}`;
        const id = motherLoginResponse2.body.motherId;
        const response = await request(app)
             .get(`/childrens/${id}`)
             .set("Authorization", token2);
         expect(response.body).toHaveProperty("childrens");
         expect(response.status).toBe(200);
    });

    test("GET /childrens/mother/:id => Should be able to list one children related to a mother", async () => {
        await request(app).post('/mothers').send(mockedMother)
        const motherLoginResponse2 = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        
        const token2 = `Bearer ${motherLoginResponse2.body.token}`;
        const id = motherLoginResponse2.body.motherId;
        const response = await request(app)
            .get(`/childrens/${id}`)
            .set("Authorization", token2);
        const idChild = response.body.childrens[0].id
        
         const getOneChild = await request(app)
             .patch(`/childrens/mother/${idChild}`)
             .set("Authorization", `${token2}`);
         expect(getOneChild.status).toBe(200);
    });

    test("GET /childrens/:id => Should not be able to list childrens without authentication", async () => {
        const response = await request(app).get(
            `/childrens/4f9580f9-d900-4834-8d3e-58f22514cb28`
        );

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /childrens/:id => Should not able to list all children related to another mother", async () => {
        const motherLoginResponse = await request(app)
            .post("/login/mothers")
            .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const response = await request(app)
            .get(`/childrens/$4f9580f9-d900-4834-8d3e-58f22514cb28`)
            .set("Authorization", token);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /childrens/mother/:id => Should be able to update a children", async () => {
        await request(app).post('/mothers').send(mockedMother)
        const motherLoginResponse2 = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token2 = `Bearer ${motherLoginResponse2.body.token}`;
        const id = motherLoginResponse2.body.motherId;

        const response = await request(app)
            .get(`/childrens/${id}`)
            .set("Authorization", token2);
        const idChild = response.body.childrens[0].id
        const childrenUpdated = { age: 10, isPCD: true };
        const updated = await request(app)
            .patch(`/childrens/mother/${idChild}`)
            .set("Authorization", `${token2}`)
            .send(childrenUpdated);

        expect(updated.body).toHaveProperty("message");
        expect(updated.status).toBe(200);
    });

    test("DELETE /childrens/mother/:id => Should be able to delete a children", async () => {
        await request(app).post('/mothers').send(mockedMother)
        const motherLoginResponse2 = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token2 = `Bearer ${motherLoginResponse2.body.token}`;
        const id = motherLoginResponse2.body.motherId;

        const response = await request(app)
            .get(`/childrens/${id}`)
            .set("Authorization", token2);
            const idChild = response.body.childrens[0].id
        const childrenUpdated = { isActive: false };
        const updated = await request(app)
            .delete(`/childrens/mother/${idChild}`)
            .set("Authorization", `${token2}`)
            .send(childrenUpdated);
        const findUser = await request(app)
            .get(`/childrens/mother/${idChild}`)
            .set("Authorization", token2);
        expect(updated.status).toBe(204);
        expect(findUser.body.isActive).toBe(false);
    });
});
