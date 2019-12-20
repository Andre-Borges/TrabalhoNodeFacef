import * as Controller from './categorias.controllers';
import * as Schemas from './categorias.schemas';

export default [
    {
        method: 'GET',
        path: '/categorias',
        handler: Controller.list
    },
    {
        method: 'GET',
        path: '/categorias/{id}',
        handler: Controller.detail,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/categorias',
        handler: Controller.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/categorias/{id}',
        handler: Controller.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/categorias/{id}',
        handler: Controller.destroy,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
]