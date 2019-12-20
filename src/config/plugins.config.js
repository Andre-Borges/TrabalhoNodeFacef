import HapiAuthJTW from 'hapi-auth-jwt2';
import Database from './database.config';
import HapiSequelizeJS from 'hapi-sequelizejs';
import HapiRouter from 'hapi-router';

export default () => [
    {
        plugin: HapiSequelizeJS,
        options: [
            {
                name: 'trabalhoNodeFacef',
                models: [
                    'src/api/**/**.models.js'
                ],
                sequelize: Database.default,
                sync: true
            }
        ]
    },
    {
        plugin: HapiRouter,
        options: {
            routes: 'src/api/**/**.routes.js'
        }        
    },
    HapiAuthJTW
];
