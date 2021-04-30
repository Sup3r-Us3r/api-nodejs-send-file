import multer, { Options } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

export default {
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 8 * 1024 * 1024 // 8mb limit
  },
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const filename = `${randomBytes(8).toString('hex')}-${file.originalname}`;
  
      return cb(null, filename);
    },
  }),
} as Options;
