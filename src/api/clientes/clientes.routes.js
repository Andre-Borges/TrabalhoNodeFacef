import * as Controller from './clientes.controllers';
import * as Schemas from './clientes.schemas';

export default [
    {
        method: 'GET',
        path: '/clientes',
        handler: Controller.list,
    },
    {
        method: 'GET',
        path: '/clientes/{id}',
        handler: Controller.detail,
        config: {
            validate: Schemas.params
        }
    },
    {
        method: 'POST',
        path: '/clientes',
        handler: Controller.create,
        config: {
            auth: false,
            validate: Schemas.create
        }
    },
    {
        method: 'PUT',
        path: '/clientes/{id}',
        handler: Controller.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/clientes/{id}',
        handler: Controller.destroy,
        config: {
            validate: Schemas.params
        }
    },
    {
        method: 'POST',
        path: '/clientes/login',
        handler: Controller.login,
        config: {
            auth: false,
            validate: Schemas.login
        }
    }
]