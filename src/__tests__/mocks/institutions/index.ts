import { IInstitutionRequest } from "../../../interfaces/institutions";


export const mockedInstitution : IInstitutionRequest = {
    name: "Favo de mel",
    address: "Rua do peixoto, 35 - Jardim Limoeiro - Serra/ES",
    cnpj: "123457890001-02",
    age_group: 3,
    telephone: 33218600,
    email: "favodemel@mail.com",
    password: "senhaMuitoForte",
    acc_children_disability: true,
}


export const mockedInstitutionWithoutCNPJ : IInstitutionRequest = {
    name: "Escola Montessoriana",
    address: "Rua do Alvarenga, 660 - Praia do Canto - Vitoria/ES",
    cnpj: "",
    age_group: 5,
    telephone: 52419876,
    acc_children_disability: true,
    email: "escolamontessoriana@mail.com",
    password: "senhaMuitoForte4",
}

export const mockedInstitutionWithoutName : IInstitutionRequest = {
    name: "",
    address: "Rua do Alfredo, 12 - Praia do Suá - Vitoria/ES",
    cnpj: "25631478",
    age_group: 5,
    telephone: 52419876,
    acc_children_disability: true,
    email: "escolamontessoriana@mail.com",
    password: "senhaMuitoForte3",
}

