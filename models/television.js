const db = require('../config/database');

class Television {
    constructor(marque, modele, prix, statut, cause = null) {
        this.marque = marque;
        this.modele = modele;
        this.prix = prix;
        this.statut = statut;
        this.cause = cause;
    }

    save() {
        return db.execute(
            'INSERT INTO televisions (marque, modele, prix, statut, cause) VALUES (?, ?, ?, ?, ?)',
            [this.marque, this.modele, this.prix, this.statut, this.cause || null]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM televisions');
    }

    static updateStatus(id, newStatus, cause) {
        if (newStatus === 'cassée') {
            return db.execute(
                'UPDATE televisions SET statut = ?, cause = ? WHERE id = ?',
                [newStatus, cause, id]
            );
        } else {
            return db.execute(
                'UPDATE televisions SET statut = ? WHERE id = ?',
                [newStatus, id]
            );
        }
    }

    static deleteById(id) {
        return db.execute(
            'DELETE FROM televisions WHERE id = ?',
            [id]
        );
    }


    static getTotalPriceByStatus(status) {
        return db.execute(
            'SELECT SUM(prix) AS totalPrice FROM televisions WHERE statut = ?',
            [status]
        );
    }
    
}

module.exports = Television;
