import multer from 'multer';
import multerConfig from '../config/multer';

const multerMiddleware = multer(multerConfig);

export default multerMiddleware;
