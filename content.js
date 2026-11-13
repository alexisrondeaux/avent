/* ============================================================
   TOUT LE CONTENU DU CALENDRIER EST ICI.
   C'est le seul fichier à modifier pour changer les textes,
   les photos et les surprises.

   Pour chaque jour, on peut mettre (tout est facultatif) :
     titre   : le titre affiché en haut de la case ouverte
     message : le texte (une ligne vide = nouveau paragraphe)
     photo   : le nom d'un fichier placé dans le dossier "photos"
     legende : une petite phrase sous la photo
     rdv     : une annonce de date -> { quand: "...", ou: "...", details: "..." }
     lien    : un bouton -> { texte: "...", url: "https://..." }
   ============================================================ */
const CALENDRIER = {
  config: {
    annee: 2026,
    prenom: "",                        // son prénom (ou surnom), affiché en haut
    titre: "Notre calendrier de l'avent",
    sousTitre: "Une petite surprise chaque jour jusqu'à Noël.",
    signature: "Fait avec amour",      // en bas de page
    fuseau: "Europe/Paris",            // les cases s'ouvrent à minuit dans ce fuseau
    codeApercu: "TEST"           // code secret pour tout voir à l'avance (voir LISEZ-MOI)
  },

  jours: {
    1:  { titre: "EXEMPLE : un message", message: "Ici, un petit mot rien que pour elle.\n\nOn peut écrire plusieurs paragraphes." },
    2:  { titre: "EXEMPLE : une photo", photo: "exemple.svg", legende: "Une légende sous la photo.", message: "Un souvenir à raconter." },
    3:  { titre: "EXEMPLE : une date", message: "Prépare-toi...", rdv: { quand: "Samedi 5 décembre, 20h", ou: "Lieu surprise", details: "Tenue chaude conseillée." } },
    4:  {}, 5:  {}, 6:  {}, 7:  {}, 8:  {}, 9:  {}, 10: {},
    11: {}, 12: {}, 13: {}, 14: {}, 15: {}, 16: {}, 17: {},
    18: {}, 19: {}, 20: {}, 21: {}, 22: {},
    23: { titre: "C'est aujourd'hui !", photo: "moguiz-coucou.png", legende: "Affiche du spectacle Coucou ! de Moguiz", message: "Moguiz et son golden !!!", rdv: { quand: "Mercredi 23 décembre, 20h", ou: "Théâtre des Bouffes Parisiens", details: "Spectacle « Coucou » de Moguiz" } },
    24: {}
  }
};
