const { SqlReader } = require("node-sql-reader");
const path = require("path");
const { Client } = require("pg");

async function executeFile(client, pathname) {
    const queries = SqlReader.readSqlFile(pathname);
    for (const query of queries) {
        console.log('Query: ' + query);
        const result = await client.query(query);
        if (result.command == 'SELECT') {
            console.log(result.rows);
        } else if (['CREATE', 'DROP', 'ALTER'].includes(result.command)) {
            // Do nothing
        } else {
            console.log(result);
        }
        console.log('-----');
    }
}

async function main() {
    if (process.argv.length < 3) {
        console.error("Usage: node " + path.basename(__filename) + " <path/to/file.sql> [<path/to/file2.sql> ...]");
    }
    for (let i = 2; i < process.argv.length; i++) {
        let sqlFilename = process.argv[i];
        if (sqlFilename[0] != '/') {
            sqlFilename = path.join(process.cwd(), sqlFilename);
        }
        const clientConfig = {
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            // Not a good practice, but needed to distinguish between environments
            ssl: process.env.POSTGRES_DATABASE == 'neondb' ? {mode: 'required'} : null,
        };
        console.log("Connecting to database with config: ", clientConfig);
        const client = new Client(clientConfig);
        try {
            await client.connect();
            await executeFile(client, sqlFilename);
        } catch (error) {
            console.log("Error while executing SQL: ", error);
        } finally {
            await client.end();
        }
    }
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to execute the SQL file:',
        err,
    );
});
