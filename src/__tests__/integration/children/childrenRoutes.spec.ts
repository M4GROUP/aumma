import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import {
    IChildrenRequest,
    IChildrenResponse,
} from "../../../interfaces/childrens";
import { childrenData, childrenDisabilityData } from "../../mocks/children";
import { mockedMother, mockedMotherLogin } from "../../mocks/mother";

const listUser: Array<IChildrenResponse> = [];


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

    test("POST /children => Must be able to create childrens", async () => {
        await request(app).post('/mothers').send(mockedMother)

        const motherLoginResponse = await request(app)
            .post("/login/mothers")
            .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;

        const resultChildren = await request(app)
            .post("/children")
            .set("Authorization", `Bearer ${token}`)
            .send(childrenData);

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
            .post("/children")
            .send(childrenData);

        expect(getChildren.status).toBe(404);
        expect(getChildren.body).toEqual("message");
    });

    test("GET /childrens/:id => Should be able to list all children related to a mother", async () => {
        const motherLoginResponse = await request(app)
            .post("/login/mothers")
            .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const id = motherLoginResponse.body.motherId;
        const response = await request(app)
            .get(`/childrens/${id}`)
            .set("Authorization", token);
        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    test("GET /childrens/mother/:id => Should be able to list one children related to a mother", async () => {
        const motherLoginResponse = await request(app)
            .post("/login/mothers")
            .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const id = motherLoginResponse.body.motherId;
        const response = await request(app)
        .get(`/childrens/${id}`)
        .set("Authorization", token);  
        const idChild = response.body[0].id
        const getOneChild = await request(app)
        .patch(`/childrens/mother/${idChild}`)
        .set("Authorization", `Bearer ${token}`)
        expect(getOneChild.body).toHaveLength(1);
        expect(getOneChild.status).toBe(200);
    });


    test("GET /children/:id => Should not be able to list childrens without authentication", async () => {
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
        const token = `Bearer ${motherLoginResponse.body.token}`
        const response = await request(app)
            .get(`/childrens/$4f9580f9-d900-4834-8d3e-58f22514cb28`)
            .set("Authorization", token);
            expect(response.body).toHaveProperty("message");
            expect(response.status).toBe(401);
    });

    test("PATCH /childrens/mother/:id => Should be able to update a children", async () => {
        const motherLoginResponse = await request(app)
        .post("/login/mothers")
        .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const id = motherLoginResponse.body.motherId;
        const response = await request(app)
        .get(`/childrens/${id}`)
        .set("Authorization", token);  
        const idChild = response.body[0].id
        const childrenUpdated = { age: 10, isPCD: true };
        const updated = await request(app)
            .patch(`/childrens/mother/${idChild}`)
            .set("Authorization", `Bearer ${token}`)
            .send(childrenUpdated);

            expect(updated.body.age).toEqual(10);
            expect(updated.body.isPCD).toEqual(true);
            expect(updated.status).toBe(200);

    });

    test("DELETE /childrens/mother/:id => Should be able to delete a children", async () => {
        const motherLoginResponse = await request(app)
        .post("/login/mothers")
        .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const id = motherLoginResponse.body.motherId;
        const response = await request(app)
        .get(`/childrens/${id}`)
        .set("Authorization", token);  
        const idChild = response.body[0].id
        const childrenUpdated = { isActive: false };
        const updated = await request(app)
            .delete(`/childrens/mother/${idChild}`)
            .set("Authorization", `Bearer ${token}`)
            .send(childrenUpdated);
            const findUser = await request(app)
            .get(`/childrens/mother/${idChild}`)
            .set("Authorization", token);
        expect(updated.status).toBe(204);
        expect(findUser.body[0].isActive).toBe(false);
    });
});
