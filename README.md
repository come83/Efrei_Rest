# XML Projet setup

Pour télécharger le projet :

```sh 
git clone https://github.com/come83/Efrei_Rest.git
```


# Installation des dépendences
Pour installer toutes les dépendences du backend et du frontend en même temps, il faut se rendre à la racine du projet et exécuter la commande suivante :

```sh
npm run packages
```


# Créer base de données et importer les données de test
1. Copier-le script sql du fichier movies_db.sql du dossier database_code.
2. Exécuter-le sur votre serveur MySQL



# Configuration de la connexion à la base de données
Afin de ne pas transmettre ses informations de connexion sur le github public, et d'eviter de générer des conflits lors de chaque pull et push des membres de l'équipe, nous allons utiliser le module dotenv.

Dans le fichier backend/index.js, les variables de connexion user, password et database utilisent le module dotenv.

1. **Créer un fichier `.env`** :  créer un fichier '.env' (pas de nom juste l'extension) dans le dossier backend.

2. **Définisser les variables d'environnement** : copier/coller le code suivant dans le fichier .env en remplaçant les informations correspondantes : 

```dotenv
PASSWORD=mon_mdp
DB=project_xml
```


# Lancer Frontend et Backend
Pour lancer le backend NodeJS et le frontend VueJS en même temps, à la racine du projet il faut exécuter la commande suivante :

```sh
npm run start
```

Le front-end sera disponible à l'url suivante : http://localhost:5173.  
Le back-end sera disponible à l'url suivante : http://localhost:8081.  


# End point de test
Dans le fichier userService.js et movieService.js, c'est ici que se trouve les requêtes sous contraintes REST tels que :

1. **POST** : Pour créer une ressource sur le serveur, vous devez utiliser la méthode POST.
2. **GET** : Pour accéder à une ressource, utilisez GET.
3. **PUT** : Pour modifier l'état d'une ressource ou pour la mettre à jour, utilisez PUT.
4. **DELETE** : Pour annuler ou supprimer une ressource, utilisez DELETE.
