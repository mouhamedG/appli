const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pretender = require('./models/Pretender');
const authMiddleware = require('./middlewares/authMiddleware'); // Import du middleware d'authentification

class PretenderController {

    // Créer un nouveau "pretender"
    static async createOne(req, res, next) {
        const { email, password } = req.body;
        if (!(email && password)) {
            return next();
        }

        const pretenderExists = await Pretender.findOne({ where: { email } });
        if (pretenderExists) {
            return next();
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newPretender = await Pretender.create({ email, password: hashedPassword });

        // Générer un token JWT contenant l'email
        const token = jwt.sign({ email: newPretender.email }, 'secret_key', { expiresIn: '1h' });

        return res.status(201).json({ pretender: newPretender, token });
    }

    // Obtenir un "pretender" par ID (protégé par le middleware d'authentification)
    static async getOneById(req, res) {
        const pretender = await Pretender.findByPk(req.params.id);
        if (!pretender) return res.status(404).json({ message: 'Pretender non trouvé' });
        return res.json(pretender);
    }
    // Obtenir tous les "pretenders" (CRUD)
    static async getAll(req, res) {
        const pretenders = await Pretender.findAll(); // Récupère tous les enregistrements
        return res.json(pretenders); // Retourne les données au client
    }

    // Obtenir un "pretender" par ID
    static async getOneById(req, res) {
        const pretender = await Pretender.findByPk(req.params.id); // Trouve par ID
        if (!pretender) return res.status(404).json({ message: 'Pretender not found' });
        return res.json(pretender);
    }

    // Mettre à jour un "pretender" par ID
    static async updateOneById(req, res) {
        const { email, password } = req.body;
        const pretender = await Pretender.findByPk(req.params.id);
        if (!pretender) return res.status(404).json({ message: 'Pretender not found' });

        // Mise à jour des champs (si présents dans la requête)
        pretender.email = email || pretender.email;
        if (password) pretender.password = bcrypt.hashSync(password, 10); // Hacher le mot de passe si mis à jour
        await pretender.save();
        return res.json(pretender);
    }

    // Supprimer un "pretender" par ID
    static async deleteOneById(req, res) {
        const pretender = await Pretender.findByPk(req.params.id);
        if (!pretender) return res.status(404).json({ message: 'Pretender not found' });
        await pretender.destroy(); // Supprimer l'enregistrement
        return res.status(204).send(); // Renvoie une réponse vide avec un statut 204
    }
}

module.exports = PretenderController;
