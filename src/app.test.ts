import { ServerApp } from "./presentation/server-app";

describe('Test App.ts', () => {

    test('should call Server.run with values', async() => {

        const serverRunMock = jest.fn();

        ServerApp.run = serverRunMock;

        process.argv = [
            'node',
            'app.ts',
            '-b',
            '10',
            '-l',

        ];

        // await import ('./app.js');

        // expect(serverRunMock).toHaveBeenCalledWith()


    })

    });