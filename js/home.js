(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* —— Timeline slider —— */
  var range = document.getElementById("timelineRange");
  var stage = document.getElementById("timelineStage");
  var hint = document.getElementById("timelineHint");
  var fut = document.getElementById("timelineFuturist");
  if (range && stage) {
    var hints = ["此刻", "+2 年", "+5 年", "+8 年", "+10 年 视界上限"];
    var msgs = [
      "你的下一程，尚未对焦。",
      "噪点沉降，轮廓开始显影。",
      "主路径概率抬升，备选分支衰减。",
      "决策窗口收窄——行动与观望的代价可被读见。",
      "十年视界内，「可规划的你」趋于稳定（模型隐喻，非命运断言）。",
    ];
    function syncTimeline() {
      var v = Number(range.value) / 100;
      stage.style.setProperty("--timeline-t", String(v));
      var idx = Math.min(hints.length - 1, Math.floor(v * hints.length));
      if (hint) hint.textContent = hints[idx];
      var mi = Math.min(msgs.length - 1, Math.floor(v * msgs.length));
      if (fut) fut.textContent = msgs[mi];
    }
    range.addEventListener("input", syncTimeline);
    syncTimeline();
  }

  /* —— Spec section decrypt —— */
  var spec = document.getElementById("spec");
  if (spec && !reduceMotion) {
    var glyphs = "█▓░╱伦理合规01边界观测";
    var articles = spec.querySelectorAll("article");
    articles.forEach(function (art) {
      var h2 = art.querySelector("h2");
      var p = art.querySelector("p");
      if (h2) {
        h2.dataset.final = h2.textContent;
        h2.classList.add("spec-line");
        h2.textContent = repeatGlyph(h2.textContent.length);
      }
      if (p) {
        p.dataset.finalHtml = p.innerHTML;
        var plain = p.textContent;
        p.dataset.final = plain;
        p.classList.add("spec-line");
        p.textContent = repeatGlyph(Math.min(48, plain.length));
      }
    });

    var specStarted = false;
    var specObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || specStarted) return;
          specStarted = true;
          specObs.disconnect();
          var delay = 0;
          articles.forEach(function (art) {
            var h2 = art.querySelector("h2.spec-line");
            var p = art.querySelector("p.spec-line");
            if (h2) {
              setTimeout(function () {
                decryptTo(h2, h2.dataset.final, 22);
              }, delay);
              delay += h2.dataset.final.length * 22 + 120;
            }
            if (p) {
              setTimeout(function () {
                decryptTo(p, p.dataset.final, 14, function () {
                  p.innerHTML = p.dataset.finalHtml;
                });
              }, delay);
              delay += Math.min(900, p.dataset.final.length * 11);
            }
            delay += 200;
          });
        });
      },
      { threshold: 0.12 }
    );
    specObs.observe(spec);
  }

  function repeatGlyph(n) {
    var s = "";
    for (var i = 0; i < n; i++) s += glyphs[i % glyphs.length];
    return s;
  }

  function decryptTo(el, finalText, msPerTick, onDone) {
    var len = finalText.length;
    var shown = 0;
    var id = setInterval(function () {
      if (shown >= len) {
        clearInterval(id);
        if (onDone) onDone();
        else el.textContent = finalText;
        return;
      }
      shown++;
      var out = "";
      for (var k = 0; k < len; k++) {
        if (k < shown) out += finalText[k];
        else out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
    }, msPerTick);
  }

  /* —— Case SVG path lengths —— */
  document.querySelectorAll(".case-viz-paths path").forEach(function (path) {
    try {
      var L = path.getTotalLength();
      path.style.strokeDasharray = String(L);
      path.style.strokeDashoffset = String(L);
    } catch (err) {}
  });

  var caseObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var root = e.target;
        if (root.classList.contains("case-viz-bars")) {
          root.classList.add("is-drawn");
        } else {
          if (reduceMotion) {
            root.querySelectorAll("path").forEach(function (p) {
              p.style.strokeDashoffset = "0";
            });
          } else {
            root.classList.add("is-drawn");
          }
        }
        caseObs.unobserve(root);
      });
    },
    { threshold: 0.25 }
  );
  document.querySelectorAll(".case-viz, .case-viz-bars").forEach(function (el) {
    caseObs.observe(el);
  });

  /* —— Carousels —— */
  document.querySelectorAll("[data-carousel]").forEach(initCarousel);

  function initCarousel(root) {
    var vp = root.querySelector(".carousel__viewport");
    var fill = root.querySelector(".carousel__progress-fill");
    var currEl = root.querySelector(".carousel__curr");
    if (!vp || !fill || !currEl) return;

    var slides = vp.querySelectorAll(".carousel__slide");
    var n = slides.length;
    var totalEl = root.querySelector(".carousel__total");
    if (totalEl) totalEl.textContent = String(n).padStart(2, "0");

    function update() {
      var max = Math.max(1, vp.scrollWidth - vp.clientWidth);
      var r = max > 0 ? vp.scrollLeft / max : 0;
      fill.style.width = Math.round(r * 100) + "%";

      var center = vp.scrollLeft + vp.clientWidth * 0.5;
      var idx = 0;
      var best = 1e9;
      for (var i = 0; i < slides.length; i++) {
        var s = slides[i];
        var mid = s.offsetLeft + s.offsetWidth * 0.5;
        var d = Math.abs(mid - center);
        if (d < best) {
          best = d;
          idx = i;
        }
      }
      currEl.textContent = String(idx + 1).padStart(2, "0");
    }

    vp.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();

