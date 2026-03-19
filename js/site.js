(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    var nodes = document.querySelectorAll(".reveal");
    if (nodes.length) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              obs.unobserve(e.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      nodes.forEach(function (n) {
        obs.observe(n);
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (n) {
      n.classList.add("is-visible");
    });
  }

  var dlg = document.getElementById("reserve");
  if (dlg) {
    document.querySelectorAll("[data-open-reserve]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        dlg.showModal();
      });
    });
    var closeBtn = document.getElementById("closeReserve");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        dlg.close();
      });
    }
  }

  var y = document.getElementById("y");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
})();
