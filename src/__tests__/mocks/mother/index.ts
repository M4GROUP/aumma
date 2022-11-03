import { blob } from "stream/consumers";
import { IMotherLogin, IMotherRequest } from "../../../interfaces/mothers";

export const mockedMother: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 27988440837,
    email: "laura@mail.com",
    password: "Laura123",
    cpf: "86101289521",
    rg: "2175690889",
    isActive: true
}

export const mockedMotherLogin: IMotherLogin = {
    email: "laura@mail.com",
    password: "Laura123"
}

export const mockedMotherNewValues = {
    name: "Joana Brito",
    email: "joanabrito@mail.com",
    address: "Rua das Andorinhas, 10 - Capão redondo - São Paulo/SP",
    cpf: "78901496390",
    rg: "9857870987",
    phone: 73988019679,
    isActive: true
}

export const mockedMotherWithoutName: IMotherRequest = {
    name: "",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 27988440837,
    email: "laura@mail.com",
    password: "Laura123",
    cpf: "86101289521",
    rg: "2175690889",
    isActive: true
}

export const mockedMotherWithoutAddress: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "",
    phone: 27988440837,
    email: "laura@mail.com",
    password: "Laura123",
    cpf: "86101289521",
    rg: "2175690889",
}

export const mockedMotherWithoutTelephone: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 0,
    email: "laura@mail.com",
    password: "Laura123",
    cpf: "86101289521",
    rg: "2175690889",
    isActive: true
}

export const mockedMotherWithoutEmail: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 27988440837,
    email: "",
    password: "Laura123",
    cpf: "86101289521",
    rg: "2175690889",
    isActive: true
}

export const mockedMotherWithoutPassword: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 27988440837,
    email: "laura@mail.com",
    password: "",
    cpf: "86101289521",
    rg: "2175690889",
    isActive: true
}

export const mockedMotherWithoutCPF: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 27988440837,
    email: "laura@mail.com",
    password: "Laura123",
    cpf: "",
    rg: "2175690889",
    isActive: true

}

export const mockedMotherWithoutRg: IMotherRequest = {
    name: "Laura Mendes Freitas",
    address: "Rua do Antônio Marcos Andrade, 70 - Morumbi - São Paulo/SP",
    phone: 27988440837,
    email: "laura@mail.com",
    password: "Laura123",
    cpf: "86101289521",
    rg: "",
    isActive: true
}