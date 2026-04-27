
  AOS.init({ once: true, duration: 800, easing: "ease-out" });


    function openOfferPopup(e) {
      if (e) e.preventDefault();
      const popup = document.getElementById('offer-popup');
      if (popup) {
        popup.style.display = 'flex';
        void popup.offsetWidth; // Force reflow
        popup.classList.add('active');
      }
    }

    function closeOfferPopup() {
      const popup = document.getElementById('offer-popup');
      if (popup) {
        popup.classList.remove('active');
        setTimeout(() => { popup.style.display = 'none'; }, 400);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const popup = document.getElementById('offer-popup');
        if (popup) {
          popup.style.display = 'flex';
          // Force reflow
          void popup.offsetWidth;
          popup.classList.add('active');
        }
      }, 600); // Small delay for smooth entry
    });
  

    const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
      "accentColor": "#C25A2F",
      "headline": "0",
      "cta": "Start Your App →"
    }/*EDITMODE-END*/;

    // SCROLL REVEAL
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // FAQ TOGGLE
    function toggleFaq(item) {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    }

    // MOBILE MENU TOGGLE
    document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('mobile-open');
      });
    });

    // TWEAKS
    window.addEventListener('message', e => {
      if (e.data?.type === '__activate_edit_mode') {
        document.getElementById('tweaks-panel').style.display = 'block';
      }
      if (e.data?.type === '__deactivate_edit_mode') {
        document.getElementById('tweaks-panel').style.display = 'none';
      }
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');

    const headlines = [
      "Build Your Vision.<br> <span class=\"accent-text\">We'll design the interface for free.</span>",
      "Your App, <span class=\"accent-text\">Designed & Built</span> in 10 Weeks.",
      "Stop Paying Twice.<br><span class=\"accent-text\">Design + Dev,</span> One Team, One Bill."
    ];

    function applyHeadline(idx) {
      document.querySelector('#hero h1').innerHTML = headlines[parseInt(idx)];
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { headline: idx } }, '*');
    }

    function applyCTA(val) {
      document.querySelectorAll('.btn-primary').forEach(b => {
        if (b.textContent.trim().startsWith('Book') || b.textContent.trim().startsWith('Get') || b.textContent.trim().startsWith('Start')) {
          b.textContent = val;
        }
      });
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { cta: val } }, '*');
    }

    function applyAccent(hex) {
      // Convert hex to approximate oklch — use CSS variable override
      document.documentElement.style.setProperty('--accent', hex);
      document.documentElement.style.setProperty('--accent-glow', hex + '26');
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { accentColor: hex } }, '*');
    }

    // Apply saved tweaks
    applyHeadline(TWEAK_DEFAULTS.headline);
    applyCTA(TWEAK_DEFAULTS.cta);
    applyAccent(TWEAK_DEFAULTS.accentColor);

    // NAV scroll effect
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.style.borderBottomColor = 'var(--border)';
      }
    });
  

    // Smooth counting animation for revenue number
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 1600;
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);

        element.textContent = current.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = target.toLocaleString('en-US');
        }
      }

      requestAnimationFrame(step);
    }

    document.addEventListener('DOMContentLoaded', () => {
      const counter = document.querySelector('.revenue-count');
      if (!counter) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(counter);
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  

    // Chip selection (iOS / Android etc.)
    document.querySelectorAll('.sb-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.sb-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    // Submit function connected to Formspree
    function submitForm() {
      console.log("✅ submitForm started");

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const brief = document.getElementById('brief').value.trim();

      if (!name || !email || !brief) {
        alert("Please fill in Name, Email, and App Brief");
        if (!name) document.getElementById('name').style.borderColor = '#E8601A';
        if (!email) document.getElementById('email').style.borderColor = '#E8601A';
        if (!brief) document.getElementById('brief').style.borderColor = '#E8601A';
        return;
      }

      const activeChip = document.querySelector('.sb-chip.active');
      const platform = activeChip ? activeChip.getAttribute('data-val') : 'Not selected';

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', document.getElementById('phone').value.trim() || '—');
      formData.append('company', document.getElementById('company').value.trim() || '—');
      formData.append('platform', platform);
      formData.append('budget', document.getElementById('budget').value || 'Not selected');
      formData.append('timeline', document.getElementById('timeline').value || 'Not selected');
      formData.append('brief', brief);
      formData.append('designs', document.getElementById('designs').value || 'Not selected');
      formData.append('source', document.getElementById('source').value || 'Not selected');
      formData.append('_subject', 'New App Brief from SolutionBowl Landing Page');

      const FORMSPREE_URL = "https://formspree.io/f/xgordvap";

      fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData
      })
        .then(response => {
          console.log("Response status:", response.status);
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Formspree error: " + response.status);
          }
        })
        .then(() => {
          console.log("✅ Success! Form sent to Formspree");
          document.getElementById('sb-form').style.display = 'none';
          document.getElementById('sb-success').style.display = 'block';
        })
        .catch(err => {
          console.error("❌ Error:", err);
          alert("Could not submit. Open F12 → Console and tell me what error you see.");
        });
    }

    // Connect the new button
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('sb-submit-btn');
      if (btn) btn.addEventListener('click', submitForm);
    });
  
