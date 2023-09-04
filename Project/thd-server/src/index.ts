import {ApplicationConfig, ThdServerApplication} from './application';
import { createServer } from "http";
import { Server } from "socket.io";

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new ThdServerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log('************ Loopback Framework ***************');
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/explorer`);
  
  console.log('**************** Socket.io ********************');
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {origin : '*'}
   });
  const port = 3001;
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    console.log('token', token);
    next();
  });

  io.on('connection', (socket) => {
    console.log('Client %s user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('Client %s disconnected', socket.id);
    });
    console.log("Number of connected clients:", io.engine.clientsCount);
    socket.on('message', (msg) => {
      console.log('message: ' + msg);
      io.emit('message', `${msg}`);
    });
  });
  
  httpServer.listen(port, () => console.log(`listening on port ${port}`));
  
  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
