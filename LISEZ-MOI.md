# Calendrier de l'avent

Site simple (HTML, CSS, JS), sans installation.

- **Changer le contenu** : tout est dans `content.js` (textes, photos, dates).
- **Ajouter une photo** : mettre le fichier dans `photos/`, puis écrire son nom dans `content.js` (`photo: "nom.jpg"`).
- **Ouverture des cases** : la case N s'ouvre le N décembre à minuit, heure de Paris.
- **Voir tout à l'avance (pour toi seulement)** : ajouter `?apercu=TON-CODE` à la fin de l'adresse. Le code se règle dans `content.js` (`codeApercu`). Pour simuler un jour précis : `?apercu=TON-CODE&jour=5`.
- Après chaque changement de `content.js`, `styles.css` ou `main.js`, augmenter le `?v=1` dans `index.html` (v=2, v=3...) pour qu'elle voie la nouvelle version.

Limite connue : le contenu n'est pas chiffré. Quelqu'un qui sait lire le code d'une page peut voir les cases à l'avance.
