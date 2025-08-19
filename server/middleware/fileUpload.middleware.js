import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

// Create temp directory if it doesn't exist
const tempDir = path.resolve('./temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

export const fileUploadMiddleware = fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  useTempFiles: true,
  tempFileDir: tempDir,
  abortOnLimit: true,
  safeFileNames: true,
  preserveExtension: true,
  cleanUpTimeout: 3600000 // Clean up temp files after 1 hour
});

export const validateFileUpload = (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.file;
  const allowedTypes = ['application/pdf', 'text/plain', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (!allowedTypes.includes(file.mimetype)) {
    return res.status(400).json({ error: "Invalid file type. Only PDF, TXT, and DOCX are allowed" });
  }

  next();
};