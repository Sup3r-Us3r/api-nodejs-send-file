import { Router } from 'express';
import FileController from './app/controllers/FileController';
import multerMiddleware from './middlewares/multerMiddlware';

const routes = Router();

routes.get('/list-files', FileController.index);
routes.post(
  '/send-file',
  multerMiddleware.single('file'),
  FileController.send,
);

export default routes;
