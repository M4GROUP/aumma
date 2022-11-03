import * as yup from "yup";
/*
    name: string
    address: string
    phone: number
    email: string
    password: string
    cpf: string
    rg: string
    isActive: boolean

*/

const createMotherSerializer = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    cpf: yup.string().required(),
    rg: yup.string().required(),
});


const motherSerializer = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    phone: yup.number().required(),
    password: yup.string().notRequired(),
    id: yup.string().notRequired(),
    isActive: yup.boolean().isTrue().required()
});

const updateMotherSerializer = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().notRequired(),
    address: yup.string().notRequired(),
    phone: yup.number().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    cpf: yup.string().notRequired(),
    rg: yup.string().notRequired(),
    isActive: yup.boolean().isTrue().required()
});

export { createMotherSerializer, motherSerializer, updateMotherSerializer };