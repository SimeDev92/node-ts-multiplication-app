import { SaveFile } from './save-file.use-case'
import fs from 'fs';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    };
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;


    // beforeEach(() => {
    //     jest.clearAllMocks();
    // })

    afterEach(() => {
        // clean up
        const outputFolderExists = fs.existsSync('outputs');

        if (outputFolderExists) {

            fs.rmSync('outputs', { recursive: true, force: true });
        }

    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';

        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);

        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(saveFile).toBeInstanceOf(SaveFile);
        expect(result).toBeTruthy();
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('should save file with custom values', () => {

        const { fileContent, fileDestination } = customOptions;

        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(fileDestination);
        const contentText = fs.readFileSync(customFilePath, { encoding: 'utf-8' })

        expect(result).toBeTruthy();
        expect(fileExist).toBe(true);
        expect(contentText).toBe(fileContent);

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        })

        const result = saveFile.execute(customOptions);

        expect( result ).toBeFalsy();

        mkdirSpy.mockRestore();

    });

        test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();

        const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('*******This is a custom writing error message*******');
        })

        const result = saveFile.execute({ fileContent: 'Hola'});

        expect( result ).toBeFalsy();

        writeFileSync.mockRestore();

    });
});


