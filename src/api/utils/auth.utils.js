import Bcrypt from 'bcryptjs';
import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import { getObjectOr404 } from '../../api/utils/database.utils';
import { instances } from 'hapi-sequelizejs';
import Env from '../../config/environment.config';

export function getToken(payload, options = {}) {
    return JWT.sign(payload, Env.JWT_SECRET, { expiresIn: Env.JWT_EXPIRES_IN, ...options });
}

export async function authenticate({ email, senha }) {
    const model = instances.getModel('cliente');
    const cliente = await getObjectOr404(model, { where:  { email }})
    const isValid = await Bcrypt.compare(senha, cliente.senha);

    if (!isValid)
        throw Boom.notFound();

    return cliente;
}