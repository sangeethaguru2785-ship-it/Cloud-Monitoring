/* ==========================================================================
   STACKLY — Cloud Monitoring & SaaS Theme (Multi-page)
   Shared: GSAP animations · UI interactions
   ========================================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------
     0. Universal email validation (all forms)
  --------------------------------------------------------------- */
  const EMAIL_REGEX = /^[a-zA-Z0-9@.]*$/;
  const EMAIL_FORMAT = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  document.querySelectorAll('input[type="email"]').forEach((input) => {
    let msg = input.parentNode.querySelector(".email-invalid-msg");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "email-invalid-msg";
      msg.style.cssText = "color:#f87171;font-size:0.82rem;margin-top:6px;display:none;";
      input.parentNode.appendChild(msg);
    }

    input.addEventListener("input", () => {
      const raw = input.value;
      if (!EMAIL_REGEX.test(raw)) {
        input.value = raw.replace(/[^a-zA-Z0-9@.]/g, "");
        msg.textContent = "Only letters, numbers, @ and . are allowed.";
        msg.style.display = "block";
        input.classList.add("is-invalid");
      } else {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      }
    });

    input.addEventListener("blur", () => {
      const val = input.value.trim();
      if (val && !EMAIL_FORMAT.test(val)) {
        msg.textContent = "Please enter a valid email (e.g. you@company.com).";
        msg.style.display = "block";
        input.classList.add("is-invalid");
      } else if (!val) {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      } else {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      }
    });
  });

  /* ---------------------------------------------------------------
     0b. Universal password strength validation
  --------------------------------------------------------------- */
  const PW_UPPER = /[A-Z]/;
  const PW_LOWER = /[a-z]/;
  const PW_DIGIT = /[0-9]/;
  const PW_SPECIAL = /[^A-Za-z0-9]/;

  function validatePassword(pw) {
    if (pw.length < 8) return "Password must be at least 8 characters long.";
    if (!PW_UPPER.test(pw)) return "Password must contain at least 1 uppercase letter.";
    if (!PW_LOWER.test(pw)) return "Password must contain at least 1 lowercase letter.";
    if (!PW_DIGIT.test(pw)) return "Password must contain at least 1 number.";
    if (!PW_SPECIAL.test(pw)) return "Password must contain at least 1 special character.";
    return "";
  }

  function showPwFeedback(input, message) {
    const wrap = input.closest(".password-wrap") || input.parentNode;
    let msg = wrap.parentNode.querySelector(".pw-strength-msg");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "pw-strength-msg";
      msg.style.cssText = "color:#f87171;font-size:0.82rem;margin-top:6px;display:none;";
      wrap.parentNode.appendChild(msg);
    }
    if (message) {
      msg.textContent = message;
      msg.style.display = "block";
      input.classList.add("is-invalid");
    } else {
      msg.style.display = "none";
      input.classList.remove("is-invalid");
    }
  }

  /* ---------------------------------------------------------------
     0c. Universal name validation (name fields — letters, spaces, hyphens, apostrophes only)
  --------------------------------------------------------------- */
  const NAME_REGEX = /^[a-zA-Z\s'-]*$/;
  document.querySelectorAll('input[data-validate="name"]').forEach((input) => {
    let msg = input.parentNode.querySelector(".name-invalid-msg");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "name-invalid-msg";
      msg.style.cssText = "color:#f87171;font-size:0.82rem;margin-top:6px;display:none;";
      input.parentNode.appendChild(msg);
    }
    input.addEventListener("input", () => {
      const raw = input.value;
      if (!NAME_REGEX.test(raw)) {
        input.value = raw.replace(/[^a-zA-Z\s'-]/g, "");
        msg.textContent = "Only letters, spaces, hyphens and apostrophes are allowed.";
        msg.style.display = "block";
        input.classList.add("is-invalid");
      } else {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      }
    });
    input.addEventListener("blur", () => {
      const val = input.value.trim();
      if (val && !NAME_REGEX.test(val)) {
        msg.textContent = "Please enter a valid name (letters only).";
        msg.style.display = "block";
        input.classList.add("is-invalid");
      } else {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      }
    });
  });

  /* ---------------------------------------------------------------
     0c. Universal number validation (number/tel fields — digits only)
  --------------------------------------------------------------- */
  const NUM_REGEX = /^[0-9]*$/;
  document.querySelectorAll('input[data-validate="number"]').forEach((input) => {
    let msg = input.parentNode.querySelector(".num-invalid-msg");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "num-invalid-msg";
      msg.style.cssText = "color:#f87171;font-size:0.82rem;margin-top:6px;display:none;";
      input.parentNode.appendChild(msg);
    }
    input.addEventListener("input", () => {
      const raw = input.value;
      if (!NUM_REGEX.test(raw)) {
        input.value = raw.replace(/[^0-9]/g, "");
        msg.textContent = "Only numbers are allowed.";
        msg.style.display = "block";
        input.classList.add("is-invalid");
      } else {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      }
    });
    input.addEventListener("blur", () => {
      const val = input.value.trim();
      if (val && !NUM_REGEX.test(val)) {
        msg.textContent = "Please enter a valid number (digits only).";
        msg.style.display = "block";
        input.classList.add("is-invalid");
      } else {
        msg.style.display = "none";
        input.classList.remove("is-invalid");
      }
    });
  });

  /* ---------------------------------------------------------------
     1. Page-load reveal (applies to all pages)
  --------------------------------------------------------------- */
  gsap.timeline({ delay: 0.2 })
    .from(".page-load", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

  /* ---------------------------------------------------------------
     3. Navbar scroll state + back to top
  --------------------------------------------------------------- */
  const nav = document.getElementById("mainNav");
  const backTop = document.getElementById("backTop");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (backTop) backTop.classList.toggle("show", y > 600);
  });

  if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Close mobile menu on link click
  document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      const collapse = bootstrap.Collapse.getInstance(menu);
      if (collapse && menu.classList.contains("show")) collapse.hide();
    });
  });

  /* ---------------------------------------------------------------
     4. Scroll reveal animations (.reveal + shared blocks)
  --------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = [
    ".reveal",
    ".feature-card",
    ".use-case-card",
    ".integration-card",
    ".doc-card",
    ".blog-card",
    ".team-card",
    ".value-card",
    ".timeline-item",
    ".testimonial-card",
    ".stat-tile",
    ".chart-card",
    ".cta-panel",
    ".contact-panel",
    ".overview-visual",
  ];

  if (!prefersReducedMotion) {
    document.querySelectorAll(revealTargets.join(",")).forEach((el) => {
      gsap.from(el, {
        y: 46,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  /* ---------------------------------------------------------------
     4a. Section heads — staggered children reveal
  --------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll(".section-head").forEach((head) => {
      const children = head.querySelectorAll(".section-tag, h2, h3, .section-sub");
      gsap.from(children, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: head, start: "top 88%", once: true },
      });
    });
  }

  // Staggered lists
  if (!prefersReducedMotion) {
    document.querySelectorAll(".check-list li").forEach((li, i) => {
      gsap.from(li, {
      x: -26,
      opacity: 0,
      duration: 0.55,
      delay: i * 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: li.closest(".check-list"), start: "top 92%", once: true },
    });
  });
  }

  /* ---------------------------------------------------------------
     4b. Overview images — subtle scale-in
  --------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll(".overview-img").forEach((img) => {
      gsap.from(img, {
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: img, start: "top 88%", once: true },
      });
    });

    /* ---------------------------------------------------------------
       4c. Float cards — staggered fade-in
    --------------------------------------------------------------- */
    document.querySelectorAll(".float-card").forEach((card, i) => {
      gsap.from(card, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.15 + i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: card.closest(".video-wrapper") || card, start: "top 85%", once: true },
      });
    });

    /* ---------------------------------------------------------------
       4d. Video wrapper — smooth reveal
    --------------------------------------------------------------- */
    document.querySelectorAll(".video-wrapper").forEach((wrap) => {
      gsap.from(wrap, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
      });
    });
  }

  /* ---------------------------------------------------------------
     5. Parallax ambient orbs
  --------------------------------------------------------------- */
  gsap.utils.toArray(".orb").forEach((orb, i) => {
    gsap.to(orb, {
      y: i % 2 === 0 ? 90 : -70,
      ease: "none",
      scrollTrigger: { start: "top top", end: "bottom top", scrub: 1 },
    });
  });

  /* ---------------------------------------------------------------
     6. Animated counters
  --------------------------------------------------------------- */
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = parseFloat(counter.dataset.target);
    const decimals = parseInt(counter.dataset.decimals, 10) || 0;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: counter, start: "top 92%", once: true },
      onUpdate() {
        counter.textContent = obj.val.toFixed(decimals);
      },
    });
  });

  /* ---------------------------------------------------------------
     7. Pricing billing toggle (pricing.html)
  --------------------------------------------------------------- */
  const billingSwitch = document.getElementById("billingSwitch");
  if (billingSwitch) {
    const lblMonthly = document.getElementById("lblMonthly");
    const lblYearly = document.getElementById("lblYearly");

    billingSwitch.addEventListener("change", () => {
      const yearly = billingSwitch.checked;
      if (lblMonthly) lblMonthly.classList.toggle("active-billing", !yearly);
      if (lblYearly) lblYearly.classList.toggle("active-billing", yearly);

      document.querySelectorAll(".price .amount").forEach((amt) => {
        const value = yearly ? amt.dataset.yearly : amt.dataset.monthly;
        amt.textContent = value;
        amt.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.12)" },
            { transform: "scale(1)" },
          ],
          { duration: 350, easing: "ease-out" }
        );
      });
      document.querySelectorAll(".price .period").forEach((p) => {
        p.textContent = yearly ? "/mo · billed yearly" : "/mo";
      });

      // Comparison table amounts (pricing.html)
      document.querySelectorAll(".cmp-amount").forEach((el) => {
        el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
      });
    });
  }

  /* ---------------------------------------------------------------
     8. Tilt effect (desktop only)
  --------------------------------------------------------------- */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 6,
          rotateX: -y * 6,
          transformPerspective: 800,
          duration: 0.35,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
      });
    });
  }

  /* ---------------------------------------------------------------
     9. In-page smooth anchors (same-page #links only)
  --------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target && !target.classList.contains("dash-section")) {
          e.preventDefault();
          const offset = nav ? nav.offsetHeight + 12 : 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });

  /* ---------------------------------------------------------------
     10. Contact form (contact.html) — simulated submit
  --------------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim() && !EMAIL_FORMAT.test(emailField.value.trim())) {
        emailField.classList.add("is-invalid");
        const msg = emailField.parentNode.querySelector(".email-invalid-msg");
        if (msg) { msg.textContent = "Please enter a valid email (e.g. you@company.com)."; msg.style.display = "block"; }
        return;
      }
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Sending…";
      setTimeout(() => {
        btn.textContent = "Message sent ✓";
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2500);
      }, 1200);
    });
  }

  /* ---------------------------------------------------------------
     11. Counter filter chips (resources.html)
  --------------------------------------------------------------- */
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      document.querySelectorAll("[data-cat]").forEach((card) => {
        const show = filter === "all" || card.dataset.cat === filter;
        gsap.to(card, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.94,
          duration: 0.3,
          onStart() {
            card.style.display = show ? "" : "none";
          },
        });
      });
    });
  });

  /* ---------------------------------------------------------------
     12. Resources search filter (resources.html)
  --------------------------------------------------------------- */
  const resourceSearch = document.getElementById("resourceSearch");
  if (resourceSearch) {
    resourceSearch.addEventListener("input", () => {
      const q = resourceSearch.value.trim().toLowerCase();
      document.querySelectorAll("[data-searchable]").forEach((card) => {
        const show = !q || card.textContent.toLowerCase().includes(q);
        gsap.to(card, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.94,
          duration: 0.2,
          onStart() {
            card.style.display = show ? "" : "none";
          },
        });
      });
    });
  }

  /* ---------------------------------------------------------------
     13. Auth pages (login.html / signup.html)
  --------------------------------------------------------------- */
  document.querySelectorAll(".pass-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (!target) return;
      const show = target.type === "password";
      target.type = show ? "text" : "password";
      btn.textContent = show ? "Hide" : "Show";
    });
  });

  document.querySelectorAll(".type-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const group = opt.closest(".type-options");
      group.querySelectorAll(".type-option").forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      const feedback = group.parentNode.querySelector(".invalid-feedback");
      if (feedback) feedback.style.display = "none";
    });
  });

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const loginEmail = loginForm.querySelector("#loginEmail");
    const loginName = loginForm.querySelector("#loginName");
    const rememberMe = loginForm.querySelector("#rememberMe");
    if (loginEmail && rememberMe && localStorage.getItem("stackly_email")) {
      loginEmail.value = localStorage.getItem("stackly_email");
      rememberMe.checked = true;
    }
    if (loginName && localStorage.getItem("stackly_name")) {
      loginName.value = localStorage.getItem("stackly_name");
    }
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      loginForm.classList.add("was-validated");
      if (!loginForm.checkValidity()) return;
      if (loginEmail.value.trim() && !EMAIL_FORMAT.test(loginEmail.value.trim())) {
        loginEmail.classList.add("is-invalid");
        const msg = loginEmail.parentNode.querySelector(".email-invalid-msg");
        if (msg) { msg.textContent = "Please enter a valid email (e.g. you@company.com)."; msg.style.display = "block"; }
        return;
      }
      const loginPw = loginForm.querySelector("#loginPassword");
      if (loginPw) {
        const pwErr = validatePassword(loginPw.value);
        if (pwErr) { showPwFeedback(loginPw, pwErr); return; }
      }
      const selectedType = loginForm.querySelector('input[name="accountType"]:checked');
      if (!selectedType) {
        const feedback = document.getElementById("accountTypeFeedback");
        if (feedback) feedback.style.display = "block";
        return;
      }
      localStorage.setItem("stackly_email", loginEmail.value);
      localStorage.setItem("stackly_name", loginName ? loginName.value.trim() : "");
      const type = loginForm.querySelector('input[name="accountType"]:checked').value;
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Signing in…";
      setTimeout(() => {
        window.location.href = type === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
      }, 1100);
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      signupForm.classList.add("was-validated");
      if (!signupForm.checkValidity()) return;
      const suEmail = signupForm.querySelector("#suEmail");
      if (suEmail && suEmail.value.trim() && !EMAIL_FORMAT.test(suEmail.value.trim())) {
        suEmail.classList.add("is-invalid");
        const msg = suEmail.parentNode.querySelector(".email-invalid-msg");
        if (msg) { msg.textContent = "Please enter a valid email (e.g. you@company.com)."; msg.style.display = "block"; }
        return;
      }
      const suPw = signupForm.querySelector("#suPassword");
      if (suPw) {
        const pwErr = validatePassword(suPw.value);
        if (pwErr) { showPwFeedback(suPw, pwErr); return; }
      }
      const suConfirm = signupForm.querySelector("#suConfirm");
      if (suConfirm && suConfirm.value !== suPw.value) {
        const wrap = suConfirm.closest(".password-wrap") || suConfirm.parentNode;
        let msg = wrap.parentNode.querySelector(".pw-match-msg");
        if (!msg) { msg = document.createElement("div"); msg.className = "pw-match-msg"; msg.style.cssText = "color:#f87171;font-size:0.82rem;margin-top:6px;display:none;"; wrap.parentNode.appendChild(msg); }
        msg.textContent = "Passwords do not match."; msg.style.display = "block";
        suConfirm.classList.add("is-invalid");
        return;
      }
      localStorage.setItem("stackly_email", suEmail.value);
      const suName = signupForm.querySelector("#suName");
      localStorage.setItem("stackly_name", suName ? suName.value.trim() : "");
      const btn = signupForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Creating account…";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1100);
    });
  }

  /* ---------------------------------------------------------------
     14. Sidebar dashboards (admin-dashboard.html / user-dashboard.html)
  --------------------------------------------------------------- */
  const dashSidebar = document.querySelector(".dash-sidebar");
  const dashBackdrop = document.querySelector(".dash-backdrop");
  const dashMenuBtn = document.getElementById("dashMenuBtn");

  const storedEmail = localStorage.getItem("stackly_email");
  const storedName = localStorage.getItem("stackly_name") || "User";
  const avatarColors = ["#6366f1","#8b5cf6","#a78bfa","#c084fc","#e879f9","#22d3ee","#34d399","#f97316","#f43f5e"];
  function avatarColor(name) { let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h); return avatarColors[Math.abs(h) % avatarColors.length]; }
  function updateDashProfile(name, email) {
    const initial = (name || "U").charAt(0).toUpperCase();
    const color = avatarColor(name);
    ["sidebarUserName", "topbarUserName"].forEach((id) => { const el = document.getElementById(id); if (el) el.textContent = name; });
    ["sidebarUserEmail", "topbarUserEmail"].forEach((id) => { const el = document.getElementById(id); if (el) el.textContent = email; });
    ["sidebarAvatar", "topbarAvatar"].forEach((id) => { const el = document.getElementById(id); if (el) { el.textContent = initial; el.style.background = color; } });
  }
  if (storedEmail || storedName) {
    updateDashProfile(storedName, storedEmail);
  }

  const closeSidebar = () => {
    if (dashSidebar) dashSidebar.classList.remove("open");
    if (dashBackdrop) dashBackdrop.classList.remove("show");
  };
  if (dashMenuBtn) {
    dashMenuBtn.addEventListener("click", () => {
      if (dashSidebar) dashSidebar.classList.toggle("open");
      if (dashBackdrop) dashBackdrop.classList.toggle("show");
    });
  }
  if (dashBackdrop) dashBackdrop.addEventListener("click", closeSidebar);

  document.querySelectorAll(".sidebar-link[data-section]").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".sidebar-link[data-section]").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      document.querySelectorAll(".dash-section").forEach((sec) => sec.classList.remove("active"));
      const target = document.getElementById(link.dataset.section);
      if (target) {
        target.classList.add("active");
        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            target.querySelectorAll("h2, .section-sub, .kpi-card, .chart-card, .monitor-card, .table-card, .report-item, .incident-row, .trace-row, .stats-panel, .card"),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, overwrite: true }
          );
        }
        window.dispatchEvent(new Event("resize"));
      }
      closeSidebar();
    });
  });

  document.querySelectorAll(".monitor-bar > i").forEach((bar) => {
    const pct = Math.min(100, Math.max(0, parseInt(bar.dataset.value || "0", 10)));
    bar.style.width = pct + "%";
  });

  /* ---------------------------------------------------------------
     15. Dashboard content → 404.html (buttons, links, cards)
  --------------------------------------------------------------- */
  if (document.querySelector(".dash-sidebar")) {
    document.querySelectorAll(".dash-section").forEach((sec) => {
      sec.querySelectorAll('a[href]').forEach((a) => { a.href = "404.html"; });
      sec.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => { window.location.href = "404.html"; });
      });
    });
    [".kpi-card", ".incident-row", ".trace-row", ".report-item", ".monitor-card"].forEach((sel) => {
      document.querySelectorAll(".dash-section " + sel).forEach((el) => {
        el.style.cursor = "pointer";
        el.addEventListener("click", (e) => {
          if (e.target.closest("a") || e.target.closest("button")) return;
          window.location.href = "404.html";
        });
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const hash = anchor.getAttribute("href");
    if (hash.length > 1) {
      const target = document.getElementById(hash.slice(1));
      if (target && target.classList.contains("dash-section")) {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const link = document.querySelector('.sidebar-link[data-section="' + hash.slice(1) + '"]');
          if (link) link.click();
        });
      }
    }
  });
});
