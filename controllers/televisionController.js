const Television = require('../models/television');

exports.getIndex = async (req, res, next) => {
    try {
        const [allTelevisions] = await Television.fetchAll();
        
        const televisionsSouhaitees = allTelevisions.filter(tv => tv.statut === 'souhaitée');
        const televisionsAchetees = allTelevisions.filter(tv => tv.statut === 'achetée');
        const televisionsCassees = allTelevisions.filter(tv => tv.statut === 'cassée');

        // Calculer les prix totaux
        const [totalSouhaitees] = await Television.getTotalPriceByStatus('souhaitée');
        const [totalAchetees] = await Television.getTotalPriceByStatus('achetée');
        const [totalCassees] = await Television.getTotalPriceByStatus('cassée');

        res.render('index', { 
            televisionsSouhaitees: televisionsSouhaitees,
            televisionsAchetees: televisionsAchetees,
            televisionsCassees: televisionsCassees,
            totalSouhaitees: totalSouhaitees[0].totalPrice,
            totalAchetees: totalAchetees[0].totalPrice,
            totalCassees: totalCassees[0].totalPrice
        });
    } catch (err) {
        console.error(err);
        res.send("Erreur lors de la récupération des télévisions.");
    }
};



exports.postAddTv = async (req, res, next) => {
    const { marque, modele, prix, statut } = req.body;

    try {
        const television = new Television(marque, modele, prix, statut);
        await television.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Erreur lors de l'ajout de la télévision.");
    }
};



exports.postUpdateStatus = async (req, res, next) => {
    const tvId = req.params.tvId;
    const newStatus = req.body.newStatus;
    const cause = req.body.cause || null;

    try {
        await Television.updateStatus(tvId, newStatus, cause);
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};



exports.deleteTv = async (req, res, next) => {
    const tvId = req.params.tvId;

    try {
        await Television.deleteById(tvId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Erreur lors de la suppression de la télévision.");
    }
};


