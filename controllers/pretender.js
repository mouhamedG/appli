const Pretender = require("./models/Pretender");
const bcrypt = require("bcrypt");

class PretenderController {

    // Créer un nouveau "pretender"
    static async createOne(req, res, next) {
        // Vérifie que les champs email et password sont présents
        const { email, password } = req.body;
        if (!(email && password)) {
            return next(); // Si l'un des champs est manquant, passer au middleware suivant
        }

        // Vérifie si un utilisateur avec cet email existe déjà
        const pretenderExists = await Pretender.findOne({ where: { email } });
        if (pretenderExists) {
            return next(); // Si l'utilisateur existe déjà, passer au middleware suivant
        }

        // Hache le mot de passe
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Crée un nouveau "pretender" avec l'email et le mot de passe haché
        const newPretender = await Pretender.create({
            email,
            password: hashedPassword
        });

        // Renvoie une réponse avec le nouvel utilisateur créé
        return res.status(201).json(newPretender);
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
