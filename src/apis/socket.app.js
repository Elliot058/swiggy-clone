import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import { CookieStorage } from 'cookie-storage';
import io from 'socket.io-client';
import services from './services.json';
import socketio from '@feathersjs/socketio-client';

export const authCookieName = 'AthrClient-token';

/**
 * CookieStorage
 * @type {CookieStorage}
 */
export const cookieStorage = new CookieStorage();

const socketClient = io(process.env.baseUrl, {transports: ['websocket']});

/**
 * Feathers application
 * @type {createApplication.Application<any>}
 */
const socketApp = feathers();

socketApp.configure(
    socketio(socketClient),
);

socketApp.configure(
    auth({
        path: services.authentication,
        // cookie: process.env.NEXT_COOKIE_NAME,
        cookie: authCookieName,
        // storageKey: process.env.NEXT_COOKIE_NAME,
        storageKey: authCookieName,
        storage: cookieStorage,
    }),
);

socketClient.on('connect', () => {
    socketClient.emit(
        'create',
        'authentication',
        {
            strategy: 'jwt',
            accessToken: cookieStorage.getItem(authCookieName),
        },
        function (e) {
            if (e) {

            } else {
                console.log('Connected to Socket ----> ', socketClient);
            }
        },
    );
});

export default socketApp;
