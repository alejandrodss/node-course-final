# node-course-final
NODE mentoring program project - part 2

Basic scripts

npm start -> this execute index.js file using nodemon
npm test -> No implemeted yet
npm run start -> it will start the server using pm2
npm run stop  -> will stop the server
npm run build -> it will compile .ts files into .js for node server usage
npm run populate-db -> run the script to populate db with initial values. Before run this task make sure you build the project first.

How to run the project
Set up the project by running npm install
Once dependencies are installed run `npm run build` to compile the project, this script will create a build directory that it will be used by npm run start command.

Running the server
Once you have compilled the ./src files you can run `npm run start` to start the server.
Server will be running on port 3000
