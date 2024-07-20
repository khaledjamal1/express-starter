import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { ApiErrorResponse } from '../middleware/error';
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter function for validation
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Only allow PDF files
  const allowedTypes = /pdf/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(
      new ApiErrorResponse({
        status: 400,
        message: 'Only PDF files are allowed.',
      })
    );
  }
};
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter: fileFilter,
});
