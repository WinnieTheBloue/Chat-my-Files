import multer from "multer";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import util from "util";
import { fileURLToPath } from "url";

// Utilize util.promisify to convert fs.readdir into a promise-based function
const readdirAsync = util.promisify(fs.readdir);

// Define the maximum file size for uploads
const maxSize = 2 * 1024 * 1024;
// Specify the allowed file types for uploads
const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

// Determine the filename and directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set the directory path for storing uploaded files
const uploadDir = path.join(__dirname, "../uploaded_files");

/**
 * Asynchronously ensures the existence of the upload directory, creating it if it does not exist.
 */
async function ensureUploadDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
}

ensureUploadDir();

// Configure multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a random filename to avoid potential security issues
    const randomFileName = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}_${file.originalname}`;

    cb(null, randomFileName);
  },
});

/**
 * File filter for multer, allowing only specific file types.
 */
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Set up multer for file uploads with specified storage, fileFilter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single("file");

const fileController = {
  /**
   * List all the files in the upload directory.
   *
   * @async
   * @function
   * @memberof fileController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<string[]>} - A promise that resolves to an array of file names.
   */
  async listFiles(req, res) {
    try {
      const currentModulePath = fileURLToPath(import.meta.url);
      const folderPath = path.join(
        path.dirname(currentModulePath),
        "../uploaded_files"
      );

      const files = await readdirAsync(folderPath);

      return files;
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(
          "Une erreur est survenue lors de la récupération de la liste des fichiers."
        );
    }
  },

  /**
   * Upload a file to the server and save it in the upload directory.
   *
   * @async
   * @function
   * @memberof fileController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - A promise that resolves when the file is uploaded.
   */
  async uploadFile(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).send(err.message);
        } else {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }
      }

      if (!req.file) {
        return res.status(400).send("No file provided");
      }

      return res.redirect("/files");
    });
  },

  /**
   * Download a file from the server.
   *
   * @async
   * @function
   * @memberof fileController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async downloadFile(req, res) {
    try {
      const filename = decodeURIComponent(req.params.filename);

      // Validate the filename to prevent directory traversal
      if (!/^[a-zA-Z0-9_.-]+$/.test(filename)) {
        return res.status(400).send("Invalid filename");
      }

      const filePath = path.join(__dirname, "../uploaded_files", filename);

      console.log(`Attempting to download file at path: ${filePath}`);

      try {
        await fsPromises.access(filePath);

        // Set appropriate headers to force download
        res.setHeader(
          "Content-disposition",
          `attachment; filename=${encodeURIComponent(filename)}`
        );
        res.setHeader("Content-type", "application/octet-stream");

        // Stream the file to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } catch (error) {
        console.error(`Error accessing file: ${error}`);
        if (error.code === "ENOENT") {
          res.status(404).send("File not found.");
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error(`Error in downloadFile: ${error}`);
      res.status(500).send("Internal Server Error");
    }
  },

  /**
   * Delete a file from the server.
   *
   * @async
   * @function
   * @memberof fileController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  async deleteFile(req, res) {
    try {
      const filename = req.params.filename;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, "../uploaded_files", filename);

      try {
        await fsPromises.access(filePath);
        await fsPromises.unlink(filePath);
        return res.redirect("/files");
      } catch (fileError) {
        if (fileError.code === "ENOENT") {
          res.status(404).send("File not found.");
        } else {
          throw fileError;
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default fileController;