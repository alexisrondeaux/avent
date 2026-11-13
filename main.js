(function () {
  "use strict";
  var cfg = CALENDRIER.config, jours = CALENDRIER.jours;
  var $ = function (id) { return document.getElementById(id); };
  var params = new URLSearchParams(location.search);
  var apercu = cfg.codeApercu && params.get("apercu") === cfg.codeApercu;
  var KEY = "avent-" + cfg.annee + "-ouvertes";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* Date et heure actuelles dans le fuseau choisi (Paris) */
  function now() {
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: cfg.fuseau, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hourCycle: "h23" })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = parseInt(x.value, 10); });
    return p;
  }

  /* Numéro de la dernière case débloquée (0 = aucune, 24 = toutes) */
  function unlockedUpTo(n) {
    if (apercu) {
      var j = parseInt(params.get("jour"), 10);
      return j >= 0 && j <= 24 ? j : 24;
    }
    if (n.year > cfg.annee) return 24;
    if (n.year < cfg.annee || n.month < 12) return 0;
    return Math.min(n.day, 24);
  }

  function getOpened() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function setOpened(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }

  function statusText(n, max) {
    if (apercu) return "Mode aperçu : elle ne voit pas cette vue";
    if (max >= 24) return "Toutes les cases sont ouvertes. Joyeux Noël !";
    var left = 86400 - (n.hour * 3600 + n.minute * 60 + n.second);
    var h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60);
    if (max === 0) {
      var days = Math.round((Date.UTC(cfg.annee, 11, 1) - Date.UTC(n.year, n.month - 1, n.day)) / 864e5);
      return days > 1 ? "Première case dans " + days + " jours" : "Première case dans " + h + " h " + m + " min";
    }
    return "Prochaine case dans " + h + " h " + (m < 10 ? "0" : "") + m + " min";
  }

  function openDay(d, btn) {
    var c = jours[d] || {}, body = $("modal-body");
    $("modal-day").textContent = d + " décembre";
    $("modal-title").textContent = c.titre || "Surprise à venir";
    body.textContent = "";
    if (c.photo) {
      var fig = el("figure"), img = el("img");
      img.src = /^https?:/.test(c.photo) ? c.photo : "photos/" + c.photo;
      img.alt = c.legende || c.titre || "Photo du " + d + " décembre";
      fig.appendChild(img);
      if (c.legende) fig.appendChild(el("figcaption", "", c.legende));
      body.appendChild(fig);
    }
    (c.message || (c.titre || c.photo || c.rdv || c.lien ? "" : "Cette case n'a pas encore de contenu."))
      .split(/\n\s*\n/).forEach(function (t) { if (t.trim()) body.appendChild(el("p", "", t.trim())); });
    if (c.rdv) {
      var r = el("div", "rdv");
      r.appendChild(el("p", "rdv-label", "À noter dans ton agenda"));
      if (c.rdv.quand) r.appendChild(el("p", "rdv-when", c.rdv.quand));
      if (c.rdv.ou) r.appendChild(el("p", "rdv-where", c.rdv.ou));
      if (c.rdv.details) r.appendChild(el("p", "rdv-details", c.rdv.details));
      body.appendChild(r);
    }
    if (c.lien && c.lien.url) {
      var a = el("a", "btn", c.lien.texte || "Ouvrir");
      a.href = c.lien.url; a.target = "_blank"; a.rel = "noopener";
      body.appendChild(a);
    }
    $("modal").showModal();
    $("modal").scrollTop = 0;
    if (!apercu) {
      var o = getOpened();
      if (o.indexOf(d) < 0) { o.push(d); setOpened(o); }
      btn.classList.add("opened");
      btn.querySelector(".tag").textContent = "Ouverte";
    }
  }

  function render() {
    var n = now(), max = unlockedUpTo(n), opened = getOpened(), grid = $("grid");
    var isToday = !apercu && n.year === cfg.annee && n.month === 12;
    grid.textContent = "";
    for (var d = 1; d <= 24; d++) (function (d) {
      var li = el("li"), b = el("button", "door");
      b.type = "button";
      b.appendChild(el("span", "num", d));
      var tag = el("span", "tag");
      b.appendChild(tag);
      if (d > max) {
        b.classList.add("locked");
        b.setAttribute("aria-label", "Case " + d + ", verrouillée jusqu'au " + d + " décembre");
        tag.textContent = "🔒";
        b.addEventListener("click", function () {
          b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
          $("status").textContent = "Patience... la case " + d + " s'ouvre le " + d + " décembre";
        });
      } else {
        b.setAttribute("aria-label", "Ouvrir la case du " + d + " décembre");
        if (opened.indexOf(d) >= 0) { b.classList.add("opened"); tag.textContent = "Ouverte"; }
        else if (isToday && d === n.day) { b.classList.add("today"); tag.textContent = "Aujourd'hui"; }
        else tag.textContent = "Ouvrir";
        b.addEventListener("click", function () { openDay(d, b); });
      }
      li.appendChild(b); grid.appendChild(li);
    })(d);
    $("status").textContent = statusText(n, max);
    return max;
  }

  function flakes() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var box = $("flakes"), chars = ["❄", "♥", "•", "❄", "•"];
    for (var i = 0; i < 26; i++) {
      var f = el("span", "flake" + (i % 4 === 0 ? " gold" : ""), chars[i % chars.length]);
      f.style.left = Math.random() * 100 + "vw";
      f.style.fontSize = 8 + Math.random() * 12 + "px";
      f.style.animationDuration = 12 + Math.random() * 16 + "s";
      f.style.animationDelay = -Math.random() * 28 + "s";
      f.style.setProperty("--drift", (Math.random() * 12 - 6) + "vw");
      f.style.setProperty("--spin", (Math.random() * 360) + "deg");
      box.appendChild(f);
    }
  }

  document.title = cfg.titre;
  $("eyebrow").textContent = cfg.prenom ? "Pour " + cfg.prenom : "Décembre " + cfg.annee;
  $("title").textContent = cfg.titre;
  $("subtitle").textContent = cfg.sousTitre;
  $("footer").textContent = cfg.signature ? cfg.signature + " ♥" : "";

  var modal = $("modal");
  $("modal-close").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  flakes();
  var last = render();
  /* Si la page reste ouverte à minuit, la nouvelle case apparaît toute seule */
  setInterval(function () {
    var n = now(), max = unlockedUpTo(n);
    if (max !== last) last = render();
    else if (!modal.open) $("status").textContent = statusText(n, max);
  }, 30000);
})();
