(function () {
  var root = document.getElementById("contactWizard");
  if (!root) return;

  var panels = root.querySelectorAll(".wizard-panel");
  var dots = root.querySelectorAll(".wizard__step-dot");
  var btnPrev = root.querySelector('[data-wizard="prev"]');
  var btnNext = root.querySelector('[data-wizard="next"]');
  var btnSubmit = root.querySelector('[data-wizard="submit"]');
  var loading = root.querySelector(".wizard__loading");
  var success = root.querySelector(".wizard-success");
  var step = 0;

  function showPanel(i) {
    step = i;
    panels.forEach(function (p, j) {
      p.classList.toggle("is-active", j === i);
    });
    dots.forEach(function (d, j) {
      d.classList.toggle("is-active", j === i);
      d.classList.toggle("is-done", j < i);
    });
    if (btnPrev) btnPrev.style.display = i === 0 ? "none" : "";
    if (btnNext) btnNext.style.display = i === panels.length - 1 ? "none" : "";
    if (btnSubmit) btnSubmit.style.display = i === panels.length - 1 ? "inline-flex" : "none";
  }

  function validatePanel(i) {
    var ok = true;
    var panel = panels[i];
    if (!panel) return true;
    panel.querySelectorAll("[required]").forEach(function (field) {
      clearFieldError(field);
      var val = (field.value || "").trim();
      if (!val) {
        showFieldError(field, "请填写此项");
        ok = false;
        return;
      }
      if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showFieldError(field, "请输入有效邮箱");
        ok = false;
      }
    });
    return ok;
  }

  function showFieldError(field, msg) {
    field.classList.add("invalid");
    var err = field.closest("div").querySelector(".field-error");
    if (err) {
      err.textContent = msg;
      err.classList.add("is-visible");
    }
  }

  function clearFieldError(field) {
    field.classList.remove("invalid");
    var wrap = field.closest("div");
    if (!wrap) return;
    var err = wrap.querySelector(".field-error");
    if (err) err.classList.remove("is-visible");
  }

  if (btnNext) {
    btnNext.addEventListener("click", function () {
      if (!validatePanel(step)) return;
      if (step < panels.length - 1) showPanel(step + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", function () {
      if (step > 0) showPanel(step - 1);
    });
  }

  root.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validatePanel(step)) return;
    for (var p = 0; p < panels.length; p++) {
      if (!validatePanel(p)) {
        showPanel(p);
        return;
      }
    }

    root.querySelector(".wizard__actions").style.display = "none";
    var stepsBar = root.querySelector(".wizard__steps");
    if (stepsBar) stepsBar.style.display = "none";
    panels.forEach(function (el) {
      el.classList.remove("is-active");
    });
    if (loading) {
      loading.classList.add("is-visible");
      loading.setAttribute("aria-busy", "true");
    }

    var msgs = ["正在校验合规字段…", "正在查询引导师档期…", "正在预留加密通道…"];
    var li = 0;
    var msgEl = loading ? loading.querySelector(".wizard__loading-msg") : null;
    var msgIv = setInterval(function () {
      li = (li + 1) % msgs.length;
      if (msgEl) msgEl.textContent = msgs[li];
    }, 650);

    setTimeout(function () {
      clearInterval(msgIv);
      if (loading) {
        loading.classList.remove("is-visible");
        loading.setAttribute("aria-busy", "false");
      }
      if (success) success.classList.add("is-visible");
    }, 2200);
  });

  showPanel(0);
})();
