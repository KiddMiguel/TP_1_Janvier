-- Active: 1684419091484@@127.0.0.1@3306@tp_1
CREATE DATABASE tp_1;
use tp_1;

CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) ,
    prenom VARCHAR(50) ,
    email VARCHAR(50)  UNIQUE,
    mdp VARCHAR(50),
    role ENUM('admin', 'utilisateur'),
    password VARCHAR(50)
);
CREATE TABLE commentaire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenu VARCHAR(255) ,
    message VARCHAR(255) ,
    date DATE,
    utilisateur_id INT ,
    technologie_id INT ,
    FOREIGN KEY (technologie_id) REFERENCES technologie(id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);


CREATE TABLE technologie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    date_creation DATE,
        icone VARCHAR(50),
    utilisateur_id INT ,
    Foreign Key (utilisateur_id) REFERENCES utilisateur(id)
);
