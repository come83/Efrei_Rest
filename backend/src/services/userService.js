const dataAccessLayer = require('../../database.js');

const displayLogin = () => {
    const sql = 'SELECT * FROM user';

    return new Promise((resolve, reject) => {
        dataAccessLayer.executeSelectQuery(sql, [], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des utilisateurs :', err);
                reject(new Error('Une erreur est survenue lors de la récupération des utilisateurs'));
            } else {
                resolve(results);
            }
        });
    });
};


const login = async (username, password) => {
    const sql = 'SELECT id, username FROM user WHERE username = ? AND password = ?';

    return new Promise((resolve, reject) => {
        dataAccessLayer.executeSelectQuery(sql, [username, password], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des utilisateurs :', err);
                reject(new Error('Une erreur est survenue lors de la récupération des utilisateurs'));
            } else {
                if (results.length === 0) {
                    reject(new Error('Aucun utilisateur trouvé'));
                } else if (results.length === 1) {
                    resolve(results[0]); // Renvoie le premier résultat
                } else {
                    reject(new Error('Plusieurs utilisateurs trouvés'));
                }
            }
        });
    });
};

module.exports = {
    login,
    displayLogin
};
