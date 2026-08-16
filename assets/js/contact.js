/* ============================================================
   contact.js - the only place the email address lives.

   It is stored XOR-masked and base64'd, so no readable address appears
   anywhere in the served source: not in the HTML, not in a JSON-LD block,
   not as adjacent string literals a scraper can glue back together.
   Nothing is decoded until something actually asks for it, and the callers
   only ask in response to a real user action.

   This is not encryption. Anyone running the page's JavaScript can call
   this function. It is meant to stop the cheap, high-volume harvesting
   (regex over fetched HTML/JS), which is what actually feeds spam lists.
   ============================================================ */
(function () {
  'use strict';

  var K = 0x5b;

  function unmask(b64) {
    var raw = atob(b64);
    var out = '';
    for (var i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ (K + (i % 7)));
    }
    return out;
  }

  window.SJDContact = {
    mail: function () { return unmask('KDUxKDoSEzoxKSwqAwobOzA/NgxPODMw'); }
  };
})();
