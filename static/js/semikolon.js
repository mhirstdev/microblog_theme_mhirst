/* Semikolon – kleine Verbesserungen für Codeblöcke. Ohne JavaScript funktioniert alles, nur ohne Kopieren-Button. */
(function () {
  "use strict";

  var LANGS = {
    csharp: "C#", cs: "C#", fsharp: "F#", razor: "Razor", cshtml: "Razor",
    ts: "TypeScript", typescript: "TypeScript", js: "JavaScript", javascript: "JavaScript",
    sh: "Shell", bash: "Shell", zsh: "Shell", ps1: "PowerShell", powershell: "PowerShell",
    json: "JSON", xml: "XML", yaml: "YAML", yml: "YAML", sql: "SQL", html: "HTML", css: "CSS",
    dockerfile: "Dockerfile", bicep: "Bicep"
  };

  function enhance(pre) {
    if (pre.getAttribute("data-semikolon") || pre.closest(".code-card")) return;
    pre.setAttribute("data-semikolon", "1");

    var code = pre.querySelector("code");
    var lang = code && code.getAttribute("data-lang");

    var wrap = document.createElement("div");
    wrap.className = "code-block";
    pre.parentNode.insertBefore(wrap, pre);

    var bar = document.createElement("div");
    bar.className = "code-bar";

    var label = document.createElement("span");
    label.className = "code-lang";
    label.textContent = lang ? (LANGS[lang.toLowerCase()] || lang) : "code";
    bar.appendChild(label);

    if (navigator.clipboard && window.isSecureContext) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.textContent = "Kopieren";
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText((code || pre).innerText).then(
          function () { btn.textContent = "Kopiert ✓"; },
          function () { btn.textContent = "Fehler"; }
        ).then(function () {
          setTimeout(function () { btn.textContent = "Kopieren"; }, 1800);
        });
      });
      bar.appendChild(btn);
    }

    wrap.appendChild(bar);
    wrap.appendChild(pre);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".e-content pre, .prose pre"), enhance);
})();
