import * as Controller from './pedidos.controller';
import * as Schemas from './pedidos.schemas';

export default [
  {
    method: 'GET',
    path: '/pedidos',
    handler: Controller.list,
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/pedidos/{id}',
    handler: Controller.detail,
    config: {
      auth: false,
      validate: {
        params: Schemas.params,
      },
    },
  },
  {
    method: 'POST',
    path: '/pedidos',
    handler: Controller.create,
    config: {
      validate: {
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'PUT',
    path: '/pedidos/{id}',
    handler: Controller.update,
    config: {
      validate: Schemas.update,
    },
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
