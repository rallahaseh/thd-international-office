# Course
Modern Internet Technologies
# Project
[TH-Deg International Office](https://mygit.th-deg.de/ra10573/th-deg-international-office)
# Team members
Rashed Al-Lahaseh - 00821573

## Resources
**Requirements**
- TypeScript [v. 4.*](https://www.typescriptlang.org/download)
- Angular CLI [v. 13.0.0](https://github.com/angular/angular-cli/releases/tag/13.0.0)
- MongoDB Atlas [Free version](https://www.mongodb.com/atlas/database)
- MonoDB Community Edition [v. 5.0.3](https://docs.mongodb.com/)
- LoopBack CLI  [v. 4.*](https://loopback.io/getting-started.html)
- Socket.io [v. 4.4.0](https://www.npmjs.com/package/socket.io)

**Dependencies**
- @angular/material [v. 12.2.12](https://www.npmjs.com/package/@angular/material)
- MongoDB connector [v. 6.1.0](https://www.npmjs.com/package/loopback-connector-mongodb)
- bcrypt.js [v. 2.4.3](https://www.npmjs.com/package/bcryptjs)
- JWT [v. 8.5.1](https://www.npmjs.com/package/jsonwebtoken)
- @compodoc/compodoc [Used for @angular documentation](https://compodoc.app/)


## Documentation
**Project**
- Navigate to the [WiKi Page](https://mygit.th-deg.de/ra10573/th-deg-international-office/-/wikis) which has long-form content and description about the project.

**Angular(Front-end) Documentation**
- Run `compodoc -p tsconfig.doc.json -s` which will use the comments and description used in the app to create a web content documentation.

**Loopback(Backend) Documentation**
- After running the server, navigate to `http://localhost:3000/explorer` which will open Swagger file used to describe and document RESTful APIs.

# Instalition
 1. Install **[Node.js](https://nodejs.org/en/)** 

 2. Install **[Angular CLI](https://angular.io/cli)** `npm install -g @angular/cli`

 3. Install **[LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html)** `npm install -g @loopback/cli`

 4. Install **[MongoDB](https://docs.mongodb.com/manual/installation/)**

 5. Clone the **[project](https://mygit.th-deg.de/ra10573/th-deg-international-office)**

# Building
1. Building backend project `cd ./thd-server` then `npm install && build`

2. Building front-end side `cd ./thd-app` then `ng install && build`

# Run Application
1. Run MongoDB `mongod`

2. Import database records *(Optional)*
- There is folder attached to the repo under name `database` which is a dump folder listing collections of our database that could be used to restore.
- Use the following [cmd](https://docs.mongodb.com/database-tools/mongorestore/) `mongorestore -d thd-international-office <dumb-file-location>` to restore database.

3. Run backend project `cd ./thd-server` then `npm start`

4. Run front-end project `cd ./thd-app` then `ng serve`

# Note
For database there is two configurations has been added to the datasource, the default one is connected to localhost but there is also configuration connected to Atlas MongoDB incase cloud connection is needed
