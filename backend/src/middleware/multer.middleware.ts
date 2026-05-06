import path from 'path';
import multer from 'multer';
import fs from 'fs';

const publicDir = path.join(process.cwd(), "public");
const imageDir = path.join(publicDir, "images");

[publicDir, imageDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const imageStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, imageDir);
  },
  filename: (req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    const uniSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${uniSuffix}-${cleanName}`);
  }
});


const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});


export {
  uploadImage,
};
