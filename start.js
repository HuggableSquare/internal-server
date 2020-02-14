
/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstraps Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass a relative path from the project root.
*/
process.env.FERDI_VERSION = '5.4.0-beta.5';

const path = require('path');
const fs = require('fs-extra');

process.env.ENV_PATH = path.join(__dirname, 'env.ini');

const { Ignitor } = require('@adonisjs/ignitor');
const fold = require('@adonisjs/fold');

module.exports = (userPath, port) => {
  const dbPath = path.join(userPath, 'server.sqlite');

  if (!fs.existsSync(dbPath)) {
    // Manually copy file
    // We can't use copyFile here as it will cause the file to be readonly on Windows
    fs.writeFileSync(dbPath, fs.readFileSync(path.join(__dirname, 'database', 'template.sqlite')));
  }

  process.env.DB_PATH = dbPath;
  process.env.USER_PATH = userPath;
  process.env.PORT = port;

  new Ignitor(fold)
    .appRoot(__dirname)
    .fireHttpServer()
    .catch(console.error); // eslint-disable-line no-console
};
