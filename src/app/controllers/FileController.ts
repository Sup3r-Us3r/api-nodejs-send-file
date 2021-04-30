import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';

class FileController {
  async index(req: Request, res: Response) {
    const pathUploads = resolve(__dirname, '..', '..', '..', 'uploads');

    const contentDir = fs.readdirSync(pathUploads);

    const dataResponse = `
      <h1>Files uploaded</h1>
      <h3>Path: ${pathUploads}</h3>
      <br />
      <h2>Files:</h2>
      <ul>
      ${
        contentDir
          .slice(1, contentDir.length)
          .join('<br />')
      }
      <br />
      <br />
      <br />
      <strong>Total: ${contentDir.length - 1}</strong>
      </ul>
    `;

    return res.send(dataResponse);
  }

  async send(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400)
          .json({ error: 'There was an error sending the file' });
      }

      return res.json({
        name: req.file.filename,
        type: req.file.mimetype,
        destination: req.file.destination,
        path: req.file.path,
      });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}

export default new FileController;
