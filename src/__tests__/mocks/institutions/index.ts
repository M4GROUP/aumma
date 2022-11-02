import { IInstitutionLogin, IInstitutionRequest } from "../../../interfaces/institutions";


export const mockedInstitution : IInstitutionRequest = {
    name: "Favo de mel",
    address: "Rua do peixoto, 35 - Jardim Limoeiro - Serra/ES",
    cnpj: "12345789000102",
    ageGroup: 3,
    phone: 33218600,
    email: "favodemel@mail.com",
    password: "senhaMuitoForte",
    PCDAccept: true,
}


export const mockedInstitutionWithoutCNPJ : IInstitutionRequest = {
    name: "Escola Montessoriana",
    address: "Rua do Alvarenga, 660 - Praia do Canto - Vitoria/ES",
    cnpj: "",
    ageGroup: 5,
    phone: 52419876,
    PCDAccept: true,
    email: "escolamontessoriana@mail.com",
    password: "senhaMuitoForte4",
}

export const mockedInstitutionWithoutName : IInstitutionRequest = {
    name: "",
    address: "Rua do Alfredo, 12 - Praia do Suá - Vitoria/ES",
    cnpj: "25631478",
    ageGroup: 5,
    phone: 52419876,
    PCDAccept: true,
    email: "escolamontessoriana@mail.com",
    password: "senhaMuitoForte3",
}

export const mockedInstitutionLogin : IInstitutionLogin = {
    email: "favodemel@mail.com",
    password: "senhaMuitoForte",
}


export const mockedInstitutionWrongLogin : IInstitutionLogin = {
    email: "favodemelerrado@mail.com",
    password: "senhaMuitoFraca",
}
