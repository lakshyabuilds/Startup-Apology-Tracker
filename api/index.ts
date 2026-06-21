import express from 'express';
import appPromise from '../server';

const app = express();

appPromise.then(serverApp => {
  app.use(serverApp);
});

export default app;
