import { CreateTable } from "../domain/user-cases/create-table.user-case";
import { SaveFile } from "../domain/user-cases/save-file.use-case";


interface RunOptions {

    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {

    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('Server Running...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile()
            .execute({
                fileContent: table,
                fileDestination,
                fileName
            })

        if (showTable) console.log(table);

        (wasCreated)
            ? console.log('File Created')
            : console.error('File not create');;

    }
} 