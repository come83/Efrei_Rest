## XML Projet setup

Pour télécharger le projet :

```sh 
git pull https://github.com/come83/Efrei_Rest.git
```

## Installation des dépendences
Pour installer toutes les dépendences du backend et du frontend en même temps, il faut se rendre à la racine du projet et exécuter la commande suivante :

```sh
npm run install
```

## Lancer Frontend et Backend
Pour lancer le backend NodeJS et le frontend VueJS en même temps, à la racine du projet, exécuter la commande suivante :

```sh
npm run start
```

Le front-end sera disponible à l'url suivante : http://localhost:5173
Le back-end sera disponible à l'url suivante : http://localhost:8081


## Configuration de la connexion à la base de données
Afin de transmettre ses informations de connexions sur le github public, et d'eviter de générer des conflits lors de chaque pull et push des membres de l'équipe, nous allons utiliser le module dotenv.

Dans le fichier backend/index.js, les variables de connexion user, password et database utilisent le module dotenv.

1. **Créez un fichier `.env`** :  créer un fichier '.env' dans le dossier backend, 

2. **Définissez vos variables d'environnement** : copier/coller le code suivant dans le fichier .env en remplaçant les informations correspondantes : 

```dotenv
USERNAME=mon_username
PASSWORD=mon_mdp
DB=mon_nom_de_bdd
```

## End point de test
Dans le fichier index.js, c'est ici que se trouveront les requêtes sous contraintes REST tels que :

1. **POST** : Pour créer une ressource sur le serveur, vous devez utiliser la méthode POST.
2. **GET** : Pour accéder à une ressource, utilisez GET.
3. **PUT** : Pour modifier l'état d'une ressource ou pour la mettre à jour, utilisez PUT.
4. **DELETE** : Pour annuler ou supprimer une ressource, utilisez DELETE.

# Requete de test
Une requête de test avec pour end-point /display-login, recupère les informations de la table login de notre base de donnée et les renvoie en JSON.

Depuis le front-end, pour recuperer ses informations, il faudra effectuer un une requete GET (à l'aide d'axio spar exemple) sur l'url http://localhost:8081/display-login.
