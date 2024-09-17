// Middlewares/checkCredentials.js
module.exports = (req, res, next) => {
    const { email, password } = req.body;

    // Vérifie que l'email et le mot de passe sont fournis
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis' });
    }

    // Utilise une méthode simple pour vérifier que l'email contient un "@" et un "."
    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Email invalide. Il doit contenir un "@" et un "."' });
    }

    // Si tout est correct, on passe au middleware suivant
    next();
};
