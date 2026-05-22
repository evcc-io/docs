(function () {
  var m = location.pathname.match(/^\/(en|de)(\/|$)/);
  if (!m) return;
  var current = m[1];
  var stored = localStorage.getItem("preferredLang");
  var desired;
  if (stored === "en" || stored === "de") {
    desired = stored;
  } else if (sessionStorage.getItem("langAutoRedirected")) {
    return;
  } else {
    var langs = navigator.languages || [navigator.language || ""];
    var match = langs.find(function (l) {
      return /^(de|en)/i.test(l);
    });
    desired = /^de/i.test(match || "") ? "de" : "en";
    sessionStorage.setItem("langAutoRedirected", "1");
  }
  if (current === desired) return;
  location.replace(
    "/" +
      desired +
      location.pathname.slice(3) +
      location.search +
      location.hash,
  );
})();
