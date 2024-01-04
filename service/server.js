const express = require("express");
const app = express();
const db = require("./database/database.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;


//recupération routes:
const technologieRoute = require('./routes/technologieRoute')
const utilisateurRoute = require('./routes/utilisateurRoute')
const commentaireRoute = require('./routes/commentaireRoute')

app.use(express.json());
app.use(express.static('./'));
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 

// appelle des routes: http://localhost:8000/Technologies/
app.get('/', (req, res) => {
  res.render('../index');
});

app.use('/technologie', technologieRoute);
app.use('/utilisateur', utilisateurRoute);
app.use('/commentaire', commentaireRoute);


app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});


// app.get("/utilisateur", async (req, res) => {
//   let conn;
//   try {
//     conn = await db.getConnection();
//     const utilisateur = await conn.query("SELECT * FROM utilisateur");
//     res.json(utilisateur);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     if (conn) await conn.end();
//   }
// });

// app.post("/utilisateur/add", async (req, res) => {
//   let conn;
//   try {
//     conn = await db.getConnection();
//     const { nom, prenom, email, mdp } = req.body;
//     const hashedPassword = await bcrypt.hash(mdp, saltRounds);

//     const result = await conn.query("INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)", [nom, prenom, email, hashedPassword]);
//     res.status(201).json({ message: "Utilisateur ajouté", id: result.insertId.toString() });
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (conn) await conn.release(); 
//   }
// });

// app.post('/updateUtilisateur', async (req, res) => {
//   let conn;
//   try {
//       conn = await db.getConnection();
//       const { id, nom, prenom, email } = req.body;
//       const result = await conn.query("UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?", [nom, prenom, email, id]);
//       res.redirect(`/utilisateur/${id}`);
//   } catch (err) {
//       console.error(err);
//   } finally {
//       if (conn) await conn.release();
//   }
// });

// app.post('/login', async (req, res) => {
// let conn; 
// try {
//   conn = await db.getConnection();
//   const { email, mdp } = req.body;
//   const result = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
//   if (result.length > 0) {
//       const utilisateur = result[0];
//       console.log(mdp);
//       console.log(utilisateur.mdp);
//       const match = await bcrypt.compare(mdp, utilisateur.mdp);
//       if (match) {
//           res.redirect(`/utilisateur/${utilisateur.id}`);
//       } else {
//           res.status(401).send('Mot de passe incorrect');
//       }
//   } else {
//       res.status(404).send('Utilisateur non trouvé');
//   }
// } catch (err) {
//   console.error(err);
// } finally {
//   if (conn) await conn.release();
// }
// });



// app.get('/utilisateur/:id', async (req, res) => {
//   let conn;
//   try {
//     conn = await db.getConnection();
//     const id = req.params.id;
//     const result = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [id]);
//     const result2 = await conn.query("SELECT * FROM commentaire WHERE utilisateur_id = ?", [id]);

//     if (result.length > 0) {
//       res.render('utilisateur', { 
//           utilisateur: result[0], 
//           commentaires: result2 
//       });
//   } else {
//       res.status(404).send('Utilisateur non trouvé');
//   }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (conn) await conn.release();
//   }
// });

// app.delete('/utilisateur/:id', async (req, res) => {
//   let conn;
//   try {
//     conn = await db.getConnection();
//     const id = req.params.id;
//     await conn.query("DELETE FROM utilisateur WHERE id = ?", [id]);
//     res.status(200).send(`Utilisateur avec l'ID ${id} a été supprimé.`);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (conn) await conn.release();
//   }
// });


// app.get('/commentaire/:technologie_id', async (req, res) => {
//   let conn;
//   try {
//     conn = await db.getConnection();
//     const technologie_id = req.params.technologie_id;
//     const result = await conn.query("SELECT * FROM commentaire WHERE technologie_id = ?", [technologie_id]);
//     if (result.length > 0) {
//       res.render('commentaires', { 
//           commentaires: result
//       });
//     } else {
//       res.status(404).send('Commentaire non trouvé');
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (conn) await conn.release();
//   }
// });

app.listen(8000, function () {
  console.log("serveur sur le port 8000");
});
