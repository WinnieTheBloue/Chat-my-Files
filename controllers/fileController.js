//import { filter } from "lodash";
import File from "../models/file.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuration de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploaded_files/'); // Le dossier où les fichiers seront enregistrés
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nom du fichier
    }
  });

const upload = multer({ storage: storage });

const fileController = {
    async listFiles(req, res) {
        try {
            const currentModuleUrl = new URL(import.meta.url);
            const folderPath = path.join(path.dirname(currentModuleUrl.pathname), '../uploaded_files');
            // Lire les fichiers dans le dossier
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Une erreur est survenue lors de la lecture des fichiers.');
                }

                // Afficher la liste des fichiers dans la console (facultatif)
                console.log('Liste des fichiers dans le dossier uploaded_files :', files);

                // Rendre la vue 'files' en passant la liste des fichiers
                res.render('files', { files });
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Une erreur est survenue lors de la récupération de la liste des fichiers.');
        }
    },

    async uploadFile(req, res) {
        try {
            upload.single('file')(req, res, function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Une erreur est survenue lors du téléchargement du fichier.');
                }

                res.send('Fichier téléchargé avec succès !');
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Une erreur est survenue lors du téléchargement du fichier.');
        }
    },

    async downloadFile(req, res) {
        try {
            const filename = req.params.filename;
            const currentModuleUrl = new URL(import.meta.url);
            const filePath = path.join(path.dirname(currentModuleUrl.pathname), '../uploaded_files', filename);
        
            // Check if the file exists
            if (fs.existsSync(filePath)) {
              // Send the file as a download attachment
              res.download(filePath, filename);
            } else {
              res.status(404).send('File not found.');
            }
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    },

    async deleteFile(req, res) {
        console.log("delete appelé")
        try {
            const filename = req.params.filename;
            const currentModuleUrl = new URL(import.meta.url);
            const filePath = path.join(path.dirname(currentModuleUrl.pathname), '../uploaded_files', filename);        
            // Check if the file exists
            if (fs.existsSync(filePath)) {
              // Delete the file
              fs.unlinkSync(filePath);
              res.send(`File ${filename} has been deleted.`);
            } else {
              res.status(404).send('File not found.');
            }
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    }
}

export default fileController;