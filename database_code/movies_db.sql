CREATE DATABASE project_xml;

use project_xml;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

-- Table pour les réalisateurs des films (3NF)
CREATE TABLE directors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    director_name VARCHAR(255) UNIQUE
);

-- Table pour les langues des films (3NF)
CREATE TABLE languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    language_name VARCHAR(50) UNIQUE
);

-- Table principale des films
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    duration INT,
    director_id INT,
    language_id INT,
    min_age INT,
    id_owner INT,
    FOREIGN KEY (director_id) REFERENCES directors(id),
    FOREIGN KEY (language_id) REFERENCES languages(id),
    FOREIGN KEY (id_owner) REFERENCES user(id)
);
-- Table pour les acteurs des films (1NF)
CREATE TABLE movie_actors (
    movie_id INT,
    actor VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Table pour le calendrier des films (2NF)
CREATE TABLE movie_schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    startDate DATE,
    endDate DATE,
    daysMWF BOOLEAN,
    daysTTS BOOLEAN,
    daysTFS BOOLEAN,
    startTime TIME,
    adresse_cinema VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Populate the DB

-- Remplir la table `user` avec 5 utilisateurs
insert into user (username, password) values("alex", "alexalex");
insert into user (username, password) values("clara", "claraclara");
insert into user (username, password) values("max", "maxmax");
insert into user (username, password) values("antoine", "antoineantoine");
insert into user (username, password) values("come", "comecome");

-- Remplir la table `directors` avec 3 réalisateurs
INSERT INTO directors (director_name) VALUES
('Christopher Nolan'),
('Quentin Tarantino'),
('Greta Gerwig');

-- Remplir la table `languages` avec 3 langues
INSERT INTO languages (language_name) VALUES
('English'),
('French'),
('Spanish');

-- Remplir la table `movies` avec 4 films
INSERT INTO movies (title, duration, director_id, language_id, min_age, id_owner) VALUES
('Inception', 148, 1, 1, 13, 1),
('Pulp Fiction', 154, 2, 2, 18, 1),
('Lady Bird', 94, 3, 2, 16, 2),
('La La Land', 128, 3, 1, 10, 2);

-- Remplir la table `movie_actors` avec 6 acteurs pour les 4 films
INSERT INTO movie_actors (movie_id, actor) VALUES
(1, 'Leonardo DiCaprio'),
(1, 'Joseph Gordon-Levitt'),
(2, 'John Travolta'),
(2, 'Samuel L. Jackson'),
(3, 'Saoirse Ronan'),
(4, 'Ryan Gosling');

-- Remplir la table `movie_schedule` avec des horaires pour les 4 films
INSERT INTO movie_schedule (movie_id, startDate, endDate, daysMWF, daysTTS, daysTFS, startTime, adresse_cinema) VALUES
(1, '2023-10-01', '2023-10-15', 1, 0, 0, '18:30:00', 'Cinema Paris 1'),
(2, '2023-10-05', '2023-10-20', 0, 1, 0, '19:00:00', 'Cinema Paris 2'),
(3, '2023-10-10', '2023-10-24', 1, 0, 0, '20:00:00', 'Cinema Paris 3'),
(4, '2023-10-15', '2023-10-29', 0, 1, 0, '16:45:00', 'Cinema Paris 4');

-- Remplir la table `directors` avec 3 réalisateurs
INSERT INTO directors (director_name) VALUES
('Martin Scorsese'),
('Steven Spielberg'),
('David Fincher');

-- Remplir la table `languages` avec 3 langues
INSERT INTO languages (language_name) VALUES
('German'),
('Italian'),
('Japanese');

-- Remplir la table `movies` avec 5 films supplémentaires
INSERT INTO movies (title, duration, director_id, language_id, min_age, id_owner) VALUES
('The Godfather', 175, 1, 1, 16, 3),
('Schindler''s List', 195, 2, 4, 18, 3),
('Fight Club', 139, 3, 1, 17, 4),
('Casablanca', 102, 1, 5, 13, 5),
('Spirited Away', 125, 3, 6, 9, 5);

-- Remplir la table `movie_actors` avec des acteurs pour les 5 films supplémentaires
INSERT INTO movie_actors (movie_id, actor) VALUES
(5, 'Marlon Brando'),
(5, 'Al Pacino'),
(6, 'Liam Neeson'),
(6, 'Ralph Fiennes'),
(7, 'Edward Norton'),
(7, 'Brad Pitt'),
(8, 'Humphrey Bogart');

-- Remplir la table `movie_schedule` avec des horaires pour les 5 films supplémentaires
INSERT INTO movie_schedule (movie_id, startDate, endDate, daysMWF, daysTTS, daysTFS, startTime, adresse_cinema) VALUES
(5, '2023-10-02', '2023-10-16', 1, 0, 0, '20:30:00', 'Cinema Paris 1'),
(6, '2023-10-06', '2023-10-21', 0, 1, 0, '18:45:00', 'Cinema Paris 2'),
(7, '2023-10-11', '2023-10-25', 1, 0, 0, '21:15:00', 'Cinema Paris 3'),
(8, '2023-10-16', '2023-10-30', 0, 1, 0, '17:30:00', 'Cinema Paris 4'),
(8, '2023-10-04', '2023-10-18', 0, 0, 1, '16:00:00', 'Cinema Paris 1'),
(7, '2023-10-08', '2023-10-22', 1, 0, 0, '19:30:00', 'Cinema Paris 2'),
(6, '2023-10-12', '2023-10-26', 0, 1, 0, '20:45:00', 'Cinema Paris 3'),
(5, '2023-10-14', '2023-10-28', 1, 0, 0, '16:15:00', 'Cinema Paris 4');
