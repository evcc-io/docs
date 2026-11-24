(function () {
  // Head.astro injects the JSON array of locale codes here
  var locales = __LOCALES__;
  var current = location.pathname.split("/")[1];
  if (locales.indexOf(current) < 0) return;
  var stored = localStorage.getItem("preferredLang");
  var desired;
  if (locales.indexOf(stored) >= 0) {
    desired = stored;
  } else if (sessionStorage.getItem("langAutoRedirected")) {
    return;
  } else {
    var langs = navigator.languages || [navigator.language || ""];
    var match = langs.find(function (l) {
      return locales.indexOf(l.slice(0, 2).toLowerCase()) >= 0;
    });
    desired = match ? match.slice(0, 2).toLowerCase() : "en";
    sessionStorage.setItem("langAutoRedirected", "1");
  }
  if (current === desired) return;
  // slice(3) drops "/xx": all locale codes are two letters
  location.replace(
    "/" +
      desired +
      location.pathname.slice(3) +
      location.search +
      location.hash,
  );
})();
