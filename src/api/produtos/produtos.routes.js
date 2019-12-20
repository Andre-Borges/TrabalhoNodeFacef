import * as Controller from './produtos.controllers';
import * as Schemas from './produtos.schemas';

export default [
    {
        method: 'GET',
        path: '/produtos',
        handler: Controller.list,
        config: {
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/produtos/{id}',
        handler: Controller.detail,
        config: {
            auth: false,
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/produtos',
        handler: Controller.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/produtos/{id}',
        handler: Controller.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/produtos/{id}',
        handler: Controller.destroy,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
]