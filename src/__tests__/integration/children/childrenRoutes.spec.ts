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
let token: string = "";

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

    test("POST /children => Deve ser capaz de criar crianças", async () => {
        const motherLoginResponse = await request(app)
            .post("/login/mothers")
            .send(mockedMotherLogin);
        token = `Bearer ${motherLoginResponse.body.token}`;

        const resultChildren = await request(app)
            .post("/children")
            .set("Authorization", `Bearer ${token}`)
            .send(childrenData);
            
        const resultDisabilityChildren = await request(app)
            .post("/children")
            .set("Authorization", `Bearer ${token}`)
            .send(childrenDisabilityData);

        expect(resultChildren.status).toBe(201);
        expect(resultDisabilityChildren.status).toBe(201);

        expect(resultChildren.body).toHaveProperty("id");
        expect(resultChildren.body).toHaveProperty("name");
        expect(resultChildren.body).toHaveProperty("age");
        expect(resultChildren.body).toHaveProperty("with_disability");
        expect(resultChildren.body).toHaveProperty("gender");
        expect(resultChildren.body.name).toEqual("Maya");
        expect(resultChildren.body.age).toEqual(6);
        expect(resultChildren.body.with_disability).toEqual(false);
        expect(resultChildren.body.name).toEqual("Feminino");

        expect(resultDisabilityChildren.body).toHaveProperty("id");
        expect(resultDisabilityChildren.body).toHaveProperty("name");
        expect(resultDisabilityChildren.body).toHaveProperty("age");
        expect(resultDisabilityChildren.body).toHaveProperty("with_disability");
        expect(resultDisabilityChildren.body).toHaveProperty("gender");
        expect(resultChildren.body.name).toEqual("Gael");
        expect(resultChildren.body.age).toEqual(5);
        expect(resultChildren.body.with_disability).toEqual(true);
        expect(resultChildren.body.name).toEqual("Masculino");

        listUser.push(resultChildren.body);
        listUser.push(resultDisabilityChildren.body);
    });

    test("POST /children => Não deve criar uma criança sem autenticação", async () => {
        const getChildren = await request(app)
            .post("/children")
            .send(childrenData);

        expect(getChildren.status).toBe(404);
        expect(getChildren.body).toEqual("message");
    });

    test("GET /children => Deve retornar a lista de Crianças existentes", async () => {
        const resultToken = await request(app)
            .get("/children")
            .set(`Authorization`, `Bearer ${token}`);

        expect(resultToken.body).toMatchObject(listUser);
        expect(resultToken.status).toBe(200);
        expect(resultToken.body[0]).toHaveProperty("id");
    });

    test("GET /children => Não Listar as crianças sem autenticação", async () => {
        const getChildren = await request(app).get("/children");

        expect(getChildren.status).toBe(404);
        expect(getChildren.body).toEqual("message");
    });

    test("GET /children/mother/:id => Deve listar os filhos de uma determinada mãe", async () => {
        const mother = await request(app).post("/mothers").send(mockedMother);
        const getIdMother = await request(app).get(
            `/mothers/${mother.body.id}`
        );

        const resultToken = await request(app)
            .get(`/children/mother/${getIdMother}`)
            .set("Authorization", `Bearer ${token}`);

        expect(resultToken.body).toMatchObject(listUser);
        expect(resultToken.status).toBe(200);
        expect(resultToken.body[0]).toHaveProperty("id");
        expect(resultToken.body[0].motherId).toEqual(getIdMother);
    });

    test("POST /children/mother/:id => Não deve ser capaz de listar os filhos de uma mãe sem autenticação", async () => {
        const mother = await request(app).post("/mothers").send(mockedMother);
        const getIdMother = await request(app).get(
            `/mothers/${mother.body.id}`
        );
        const getChildren = await request(app)
            .get(`/children/mother/${getIdMother}`)
            .send(childrenData);

        expect(getChildren.status).toBe(404);
        expect(getChildren.body).toEqual("message");
    });

    test("GET /children/mother/:id => Não deve ser capaz de listar os filhos de uma mãe que não existe", async () => {
        const resultToken = await request(app)
            .get(`/children/mother/xxxxxxxxx`)
            .set("Authorization", `Bearer ${token}`);

        expect(resultToken.status).toBe(404);
        expect(resultToken.body).toHaveProperty("message");
    });

    test("PATCH /children:id => Dever ser capaz de atualizar a criança", async () => {
        const childrenUpdated = { age: 10, with_disability: true };
        const updated = await request(app)
            .patch(`/children/${listUser[0].id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(childrenUpdated);

        expect(updated.status).toBe(200);
        expect(updated.body.age).toEqual(10);
        expect(updated.body.with_disability).toEqual(true);
        expect(updated.body.name).toEqual(listUser[0].name);
    });

    test("DELETE /children:id => Dever ser capaz de deletar a criança", async () => {
        const childrenUpdated = { isActive: false };
        const updated = await request(app)
            .patch(`/children/${listUser[0].id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(childrenUpdated);

        expect(updated.status).toBe(200);
        expect(updated.body.isActive).toEqual(false);
    });
});
