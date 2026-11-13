# Calendrier de l'avent pour Nine

Site statique (HTML, CSS, JS) qu'Alexis offre à sa copine Nine. En ligne via GitHub Pages depuis `main` : https://alexisrondeaux.github.io/avent/ (mise à jour 1 à 2 minutes après un push). Alexis n'est pas développeur : expliquer en français simple. Il a demandé que chaque ajout de contenu soit publié directement sur `main`.

## Structure
- `content.js` : TOUT le contenu (config + les 24 cases). C'est le seul fichier à modifier pour le contenu.
- `main.js` : affichage et verrouillage par date. `styles.css` : design. `index.html` : page.
- `photos/` : images des cases (référencées par nom de fichier dans `content.js`).
- Après tout changement de `content.js`, `styles.css` ou `main.js` : augmenter le `?v=N` dans `index.html` (même valeur pour les 3 fichiers).
- Aperçu pour Alexis : `?apercu=TEST` (tout ouvert) ou `?apercu=TEST&jour=5`. Le code `TEST` est facile à deviner : proposer de le changer avant l'envoi du lien à Nine.

## Décisions prises par Alexis
- 24 cases (1 au 24 décembre 2026), ouverture à minuit heure de Paris, verrouillage par date seulement (pas de mot de passe, contenu non chiffré, dépôt public).
- Style doux et romantique : crème, rose poudré, doré.
- En-tête « Pour nineybaby », titre « Notre calendrier de l'avent », signature « Fait avec amour par alexischeri ».
- Les sorties sont annoncées dans la case du jour même, sauf indication contraire.
- Une photo par case.
- Ne rien inventer sur le couple : utiliser uniquement ce qu'Alexis fournit. Corrections légères (accents, orthographe) autorisées. Demander si quelque chose manque.
- Photos publiques (dépôt public) : le rappeler si une photo semble sensible.

## État des cases (au 13 novembre 2026)
- 7 : fait (« I'm BACKKKK », dîner de son choix). Photo manquante.
- 9 : fait (Bon pour un Hirono, Pop Mart La Défense, vers midi, avec photo). À confirmer : heure précise, et si la figurine Ron Weasley de la photo est bien celle offerte.
- 18 : BROUILLON visible dans la case. Cinéma, film provisoire « Avengers: Doomsday ». Manquent : confirmation du film, cinéma, heure. Retirer la mention de brouillon avant le 18 décembre.
- 23 : fait (spectacle « Coucou ! » de Moguiz, 20h, Théâtre des Bouffes Parisiens, avec affiche).
- 1, 2, 3 : exemples marqués « EXEMPLE », à remplacer.
- 4, 5, 6, 8, 10 à 17, 19 à 22, 24 : vides.

## Questions encore ouvertes
- Autres sorties prévues en décembre, contenu spécial pour la case 24, autres idées (bons, souvenirs, chansons) : Alexis y réfléchit.
- Répartition proposée (non validée) : 3-4 annonces de dates, 6-8 photos souvenirs, 5-6 petits mots, 3-4 bons, 1-2 chansons ou liens, case 24 spéciale.

## Avant de publier
Vérifier que `content.js` se charge sans erreur (24 cases), pas de défilement horizontal à 390 px, et qu'aucun texte « EXEMPLE » ou « BROUILLON » ne reste avant le 1er décembre.
