const express = require('express');
const televisionRoutes = require('./routes/televisionRoutes');

const app = express();
app.use(express.urlencoded({ extended: true })); // Pour parser les données de formulaire

// Configurer EJS comme moteur de vue
app.set('view engine', 'ejs');

// Middleware pour parser le contenu des requêtes de type POST
app.use(express.urlencoded({ extended: true }));

// Utiliser les routes définies dans `televisionRoutes.js` à la racine
app.use('/', televisionRoutes);

// Rediriger toutes les requêtes à la racine vers '/television'
app.get('/', (req, res) => {
    res.redirect('/television');
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur en cours d\'exécution sur le port 3000');
});
