/* ═══════════════ Varun weds Prarita ═══════════════ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Loader ── */
  var loader = document.getElementById("loader");
  function dismissLoader() {
    if (loader) loader.classList.add("is-done");
  }
  window.addEventListener("load", function () { setTimeout(dismissLoader, 700); });
  setTimeout(dismissLoader, 3200); /* safety if load stalls */

  /* ── Optional hero film: hide the <video> if assets/hero.mp4 is absent ── */
  var video = document.querySelector(".hero__video");
  if (video) {
    var hideVideo = function () { video.classList.add("is-hidden"); };
    video.addEventListener("error", hideVideo, true);
    var src = video.querySelector("source");
    if (src) src.addEventListener("error", hideVideo);
    video.play && video.play().catch(function () {});
  }

  /* ── Parallax ── */
  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var hero = document.getElementById("hero");
  var ticking = false;

  function applyParallax() {
    ticking = false;
    if (!hero) return;
    var y = window.scrollY || window.pageYOffset;
    var h = hero.offsetHeight || 1;
    if (y > h) return;
    layers.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
      var offset = y * (1 - speed);
      el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      if (el.classList.contains("hero__content")) {
        el.style.opacity = Math.max(0, 1 - (y / (h * 0.55))).toFixed(3);
      }
    });
  }

  if (!prefersReduced && layers.length) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); }
    }, { passive: true });
    applyParallax();
  }

  /* ── Scroll reveals (staggered per section) ── */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !prefersReduced) {
    var seenSections = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var section = el.closest("section, footer") || document.body;
        var now = performance.now();
        var last = seenSections.get(section) || 0;
        var delay = now - last < 900 ? (seenSections.get(section + "_n") || 0) : 0;
        el.style.setProperty("--rd", (delay * 0.12).toFixed(2) + "s");
        seenSections.set(section, now);
        seenSections.set(section + "_n", delay + 1);
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ── Countdown to 26 Nov 2026, 00:00 IST ── */
  var target = new Date("2026-11-26T00:00:00+05:30").getTime();
  var elD = document.getElementById("cdD"),
      elH = document.getElementById("cdH"),
      elM = document.getElementById("cdM"),
      elS = document.getElementById("cdS");

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      elD.textContent = "00"; elH.textContent = "00";
      elM.textContent = "00"; elS.textContent = "00";
      var clock = document.getElementById("countdownClock");
      if (clock && !clock.dataset.done) {
        clock.dataset.done = "1";
        var msg = document.createElement("p");
        msg.className = "count-copy";
        msg.textContent = "The auspicious day is here!";
        clock.parentNode.insertBefore(msg, clock.nextSibling);
      }
      return;
    }
    var s = Math.floor(diff / 1000);
    elD.textContent = pad(Math.floor(s / 86400));
    elH.textContent = pad(Math.floor((s % 86400) / 3600));
    elM.textContent = pad(Math.floor((s % 3600) / 60));
    elS.textContent = pad(s % 60);
  }

  if (elD) { tick(); setInterval(tick, 1000); }
})();
