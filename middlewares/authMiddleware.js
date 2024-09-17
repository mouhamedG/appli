const jwt = require('jsonwebtoken');
const Pretender = require('../models/Pretender');

module.exports = async (req, res, next) => {
    // Récupère le token depuis les en-têtes de la requête
    const token = req.headers['authorization'];
    
    // Vérifie si le token est présent
    if (!token) {
        return res.status(401).json({ message: 'Authentification requise' });
    }

    try {
        // Vérifie et décode le token
        const decoded = jwt.verify(token, 'secret_key'); // Utilise la clé secrète de génération de token
        
        // Récupère l'utilisateur via l'email présent dans le token
        const pretender = await Pretender.findOne({ where: { email: decoded.email } });
        if (!pretender) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifie que l'ID de la requête correspond bien à l'ID de l'utilisateur authentifié
        if (pretender.id !== parseInt(req.params.id, 10)) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        // Si tout est bon, passe au middleware suivant
        next();

    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};
