import * as Controller from './pedidos.controller';
import * as Schemas from './pedidos.schemas';

export default [
  {
    method: 'GET',
    path: '/pedidos',
    handler: Controller.list,
  },
  {
    method: 'GET',
    path: '/pedidos/{id}',
    handler: Controller.detail,
    config: {
      validate: {
        params: Schemas.params,
      },
    },
  },
  {
    method: 'POST',
    path: '/pedidos',
    handler: Controller.create,
  },
  {
    method: 'PUT',
    path: '/pedidos/{id}',
    handler: Controller.update,
  },
  {
    method: 'DELETE',
    path: '/pedidos/{id}',
    handler: Controller.destroy,
    config: {
      validate: {
        params: Schemas.params,
      },
    },
  },
];
