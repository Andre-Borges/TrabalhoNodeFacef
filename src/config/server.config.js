console.log('src/config/config.server.js');

import Hapi from '@hapi/hapi';
import Env from './environment.config';
import Plugins from './plugins.config';
import Auth from './auth.config';

const server = Hapi.server({
    port: Env.PORT,
    host: 'localhost'
});

const init = async () => {
    await server.register(Plugins());    
    Auth(server);

    await server.initialize();
    return server;
};

export const start = async () => {
    await init();
    await server.start();

    console.log('Server running on %s', server.info.uri);    
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
