//import { filter } from "lodash";
import File from "../models/file.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const user = req.session.user;

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
    async listFiles(req, res, user) {
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
                res.render('files', { files, user });
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

                // Vérifier la taille du fichier
                const fileSize = req.file.size; // Taille du fichier en octets
                const maxSize = 2 * 1024 * 1024; // Taille maximale autorisée en octets (ici, 2 Mo)
    
                if (fileSize > maxSize) {
                    // Supprimer le fichier téléchargé s'il dépasse la taille maximale
                    fs.unlinkSync(req.file.path);
                    return res.status(400).send('La taille du fichier dépasse la limite autorisée (2 Mo).');
                }

                //Vérifier le type du fichier
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!allowedTypes.includes(req.file.mimetype)) {
                    // Supprimer le fichier téléchargé s'il n'est pas au bon format
                    fs.unlinkSync(req.file.path);
                    return res.status(400).send('Le fichier doit être au format jpeg, png ou pdf.');
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