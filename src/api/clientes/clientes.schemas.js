import * as Joi from '@hapi/joi';

export const params = Joi.object({
    id: Joi.number().required()
});

export const loginPayload = Joi.object({
    email: Joi.string().email().required(), // todo: validar unico no service
    senha: Joi.string().min(6).required()
});

export const payload = Joi.object({
    nome: Joi.string().min(3).required(),
    numeroCpfCnpj: Joi.string().required(), // todo: validar unico no service
    email: Joi.string().email().required(), // todo: validar unico no service
    senha: Joi.string().min(6).required()
});

export const update = {
    params,
    payload
};

export const create = {
    payload
};

export const login = {
    payload: loginPayload
};
