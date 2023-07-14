import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  createFile(file): string {
    try {
      const fileExtension = file.originalname.match(/.(jpg|jpeg|png|gif)$/);

      if (!fileExtension) {
        throw new HttpException(
          'Only image files are allowed!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const fileName = uuid.v4() + fileExtension[1];
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  //   removeFile(fileName: string) {}
}
