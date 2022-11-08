import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedMother, mockedMotherLogin } from "../../mocks/mother";
import {
    mockedSchedules,
    mockedSchedules2,
    mockedSchedules3,
} from "../../mocks/schedule";
import {
    mockedInstitution,
    mockedInstitutionLogin,
} from "../../mocks/institutions";
import { response } from "express";

describe("/schedules", () => {
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

    test("POST /schedules -  Must be able to create a schedule", async () => {
        const intitutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = intitutionLoginResponse.body.id_Institution;
        const response = await request(app).post("/mothers").send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const response2 = await request(app)
            .post(`/schedules/${id}`)
            .set("Authorization", token)
            .send(mockedSchedules);
        expect(response2.body).toHaveProperty("name");
        expect(response2.body).toHaveProperty("date");
        expect(response2.body).toHaveProperty("period");
        expect(response2.body.name).toEqual("Maya");
        expect(response2.body.date).toEqual("07/11/2022");
        expect(response2.body.period).toEqual("Manha");
        expect(response2.status).toBe(201);
    });

    test("POST /schedules -  Should not be able to create a schedule without authentication", async () => {
        const intitutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = intitutionLoginResponse.body.id_Institution;
        const response = await request(app).post("/mothers").send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const response2 = await request(app)
            .post(`/schedules/${id}`)
            .send(mockedSchedules);
        expect(response2.status).toBe(401);
        expect(response2.body).toHaveProperty("message");
    });

    test("POST /schedules -  Should not be able to create a schedule with wrong institution Id", async () => {
        const intitutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = "2a45faab-f82d-4bd3-8417-ba73261b4c55";
        const response = await request(app).post("/mothers").send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token = `Bearer ${motherLoginResponse.body.token}`;
        const response2 = await request(app)
            .post(`/schedules/${id}`)
            .set("Authorization", token)
            .send(mockedSchedules);
        expect(response2.status).toBe(400);
        expect(response2.body).toHaveProperty("message");
    });

    test("GET /:id/institution -  Must be able to list all schedules by institution_Id", async () => {
        const response = await request(app)
            .post("/institutions")
            .send(mockedInstitution);
        const institutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = institutionLoginResponse.body.id_Institution;
        const token = `Bearer ${institutionLoginResponse.body.token}`;

        const response2 = await request(app)
            .post("/mothers")
            .send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token2 = `Bearer ${motherLoginResponse.body.token}`;
        const response3 = await request(app)
            .post(`/schedules/${id}`)
            .set("Authorization", token2)
            .send(mockedSchedules2);
        const response4 = await request(app)
            .get(`/schedules/${id}/institution`)
            .set("Authorization", token);
        expect(response4.status).toBe(200);
    });

    test("GET /:id/institution - Should not be able to list all schedules without authentication", async () => {
        const response = await request(app)
            .post("/institutions")
            .send(mockedInstitution);
        const institutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = "2a45faab-f82d-4bd3-8417-ba85261b4c55";
        const response2 = await request(app)
            .post("/mothers")
            .send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token2 = `Bearer ${motherLoginResponse.body.token}`;
        const response3 = await request(app)
            .post(`/schedules/${id}`)
            .set("Authorization", token2)
            .send(mockedSchedules2);
        const response4 = await request(app).get(
            `/schedules/${id}/institution`
        );
        expect(response4.status).toBe(401);
        expect(response4.body).toHaveProperty("message");
    });

    test("GET /:id/institution - Should not be able to list all schedules with wrong institution Id", async () => {
        const response = await request(app)
            .post("/institutions")
            .send(mockedInstitution);
        const institutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const token = `Bearer ${institutionLoginResponse.body.token}`;
        const wrongId = "2a45faab-f82d-4bd3-8417-ba85261b4c55";
        const response2 = await request(app)
            .post("/mothers")
            .send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);
        const token2 = `Bearer ${motherLoginResponse.body.token}`;
        const response3 = await request(app)
            .post(`/schedules/${wrongId}`)
            .set("Authorization", token2)
            .send(mockedSchedules2);
        const response4 = await request(app).get(
            `/schedules/${wrongId}/institution`
        );
        expect(response4.status).toBe(401);
        expect(response4.body).toHaveProperty("message");
    });

    test("GET /:id/children -  Should be able to list all schedules by children_Id", async () => {
        const response = await request(app)
            .post("/institutions")
            .send(mockedInstitution);
        const institutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = institutionLoginResponse.body.id_Institution;
        const token = `Bearer ${institutionLoginResponse.body.token}`;

        const response2 = await request(app)
            .post("/mothers")
            .send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);

        const token2 = `Bearer ${motherLoginResponse.body.token}`;

        const resultChildren = await request(app)
            .post("/childrens")
            .set("Authorization", token2)
            .send({
                age: 6,
                genre: "Feminino",
                name: "Maya",
                isPCD: false,
            });

        const testeId = resultChildren.body.id;

        const response3 = await request(app)
            .post(`/schedules/${id}`)
            .set("Authorization", token2)
            .send({
                name: "Maya6",
                date: "05/01/2023",
                childrensId: testeId,
                period: "Noite",
                institutionsId: id,
            });
        const response4 = await request(app)
            .get(`/schedules/${testeId}/children`)
            .set("Authorization", token2);
        expect(response4.status).toBe(200);
    });

    test("GET /:id/children -  Should not be able to list all schedules by children_Id with wrong Id", async () => {
        const response = await request(app)
            .post("/institutions")
            .send(mockedInstitution);
        const institutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = institutionLoginResponse.body.id_Institution;
        const token = `Bearer ${institutionLoginResponse.body.token}`;

        const response2 = await request(app)
            .post("/mothers")
            .send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);

        const token2 = `Bearer ${motherLoginResponse.body.token}`;

        const response3 = await request(app)
            .post(`/schedules/${id}`)
            .set("Authorization", token2)
            .send(mockedSchedules2);

        const response4 = await request(app)
            .get(`/schedules/${id}/children`)
            .set("Authorization", token2);
        expect(response4.status).toBe(400);
        expect(response4.body).toHaveProperty("message");
    });

    test("DELETE /:id/delete -  should be able to soft delete the schedules by id", async () => {
        const response = await request(app)
            .post("/institutions")
            .send(mockedInstitution);
        const institutionLoginResponse = await request(app)
            .post("/institutions/login")
            .send(mockedInstitutionLogin);
        const id = institutionLoginResponse.body.id_Institution;
        const token = `Bearer ${institutionLoginResponse.body.token}`;

        const response2 = await request(app)
            .post("/mothers")
            .send(mockedMother);
        const motherLoginResponse = await request(app)
            .post("/mothers/login")
            .send(mockedMotherLogin);

        const token2 = `Bearer ${motherLoginResponse.body.token}`;

        const resultChildren = await request(app)
            .post("/childrens")
            .set("Authorization", token2)
            .send({
                age: 2,
                genre: "Feminino",
                name: "Maya8",
                isPCD: false,
            });

        const testeId = resultChildren.body.id;
        const response3 = await request(app)
        .post(`/schedules/${id}`)
        .set("Authorization", token2)
        .send({
            name: "Maya7",
            date: "05/05/2024",
            childrensId: testeId,
            period: "Noite",
            institutionsId: id,
        });
        const testeId2 = response3.body.childrens.id
        const response4 = await request(app)
        .get(`/schedules/${testeId2}/children`)
        .set("Authorization", token2);
        const testeId3 = response4.body.id 
        
        const response5 = await request(app).delete(`/schedules/${testeId3}/delete`).set("Authorization", token);
        expect(response5.status).toBe(204)
        
    });
});
