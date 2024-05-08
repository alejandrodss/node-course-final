# node-course-final
NODE mentoring program project - part 2

Basic scripts

npm start -> this execute index.js file using nodemon
npm test -> No implemeted yet
npm run start -> it will start the server using pm2
npm run stop  -> will stop the server
npm run build -> it will compile .ts files into .js for node server usage
npm run populate-mongo-db -> run the script to populate mongo db with initial values. Before run this task make sure you build the project first.
npm run sql-init-db -> it will applied migrations and seed the database with initial values (user and product)

How to run the project
Setting the .env file.
The project uses dotenv for setting some configuration. The values you need to place in .env file are:

MONGODB_INITDB_ROOT_USERNAME -> need for running mongo, if you are using sql, skip it
MONGODB_INITDB_ROOT_PASSWORD -> need for running mongo, if you are using sql, skip it
POSTGRES_PASSWORD
POSTGRES_USER
POSTGRES_DB
MIKRO_ORM_DB_NAME
MIKRO_ORM_USER
MIKRO_ORM_PASSWORD
MIKRO_ORM_HOST=localhost

Set up the project by running `npm install`
Once dependencies are installed run `npm run build` to compile the project, this script will create a build directory that it will be used by npm run start command.

The project include a docker-compose file for running the database. Before running the server, make sure the database is running.
You can use podman or docker, ex. `podman compose up -d`.

Running migrations and seed the database
You can run `npm run sql-init-db`, for running migrations and seed the database with initial values.
It will create an admin user and two products.

Running the server
Once you have compilled the ./src files and you have a database running, you can run `npm run start` to start the server.
Server will be running on port 3000

To stop the server, run `npm run stop`
