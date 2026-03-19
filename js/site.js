(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var pageFile = window.location.pathname.split("/").pop() || "";
  if (!pageFile || pageFile === "") pageFile = "index.html";
  document.querySelectorAll(".site-nav a[href], .site-nav-m a[href]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    var target = href.split("/").pop().split("?")[0];
    a.classList.remove("is-active");
    a.removeAttribute("aria-current");
    if (target === pageFile) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });

  var sentinel = document.getElementById("hero-sentinel");
  var sticky = document.getElementById("sticky-book");
  if (sentinel && sticky && !reduceMotion) {
    var stickyObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.target !== sentinel) return;
          sticky.classList.toggle("is-visible", !e.isIntersecting);
        });
      },
      { root: null, threshold: 0, rootMargin: "0px" }
    );
    stickyObs.observe(sentinel);
  }

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
