/**
 * Main Custom JavaScript - Vibhat Srivastava Portfolio
 * Implements interactive elements, dark mode, skill bars, and UX enhancements.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Dark Mode System
  // -------------------------------------------------------------------------
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeToggleUI(initialTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleUI(newTheme);
    showToast(`Switched to ${newTheme} mode`);
  };

  const updateThemeToggleUI = (theme) => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.innerHTML =
        theme === 'dark'
          ? '<i class="fas fa-sun" style="color: #facc15;" aria-hidden="true"></i>'
          : '<i class="fas fa-moon" style="color: #6366f1;" aria-hidden="true"></i>';
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  };

  // -------------------------------------------------------------------------
  // 2. Active Navigation Item Highlighter
  // -------------------------------------------------------------------------
  const highlightActiveNav = () => {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.replace(/\/$/, '') || '/';

      if (cleanHref === currentPath || (cleanHref !== '/' && currentPath.startsWith(cleanHref))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // -------------------------------------------------------------------------
  // 3. Back to Top Button
  // -------------------------------------------------------------------------
  const setupBackToTop = () => {
    let btn = document.querySelector('.back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Back to top');
      btn.setAttribute('title', 'Back to top');
      btn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // -------------------------------------------------------------------------
  // 4. Skills Animated Progress Bars
  // -------------------------------------------------------------------------
  const setupSkillBars = () => {
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const targetWidth = fill.getAttribute('data-progress') || '0%';
            fill.style.width = targetWidth;
            observer.unobserve(fill);
          }
        });
      }, { threshold: 0.2 });

      fills.forEach((fill) => observer.observe(fill));
    } else {
      fills.forEach((fill) => {
        fill.style.width = fill.getAttribute('data-progress') || '0%';
      });
    }
  };

  // -------------------------------------------------------------------------
  // 5. Lightbox Modal Gallery
  // -------------------------------------------------------------------------
  const setupLightbox = () => {
    let lightbox = document.querySelector('.pro-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'pro-lightbox';
      lightbox.innerHTML = `
        <button class="pro-lightbox-close" aria-label="Close image">&times;</button>
        <img class="pro-lightbox-img" src="" alt="Enlarged project preview" />
      `;
      document.body.appendChild(lightbox);
    }

    const imgElement = lightbox.querySelector('.pro-lightbox-img');
    const closeBtn = lightbox.querySelector('.pro-lightbox-close');

    const openLightbox = (src, alt) => {
      imgElement.src = src;
      imgElement.alt = alt || 'Preview';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    // Attach to project images
    document.querySelectorAll('.project-card-image-wrap, .lightbox-trigger').forEach((el) => {
      el.addEventListener('click', () => {
        const img = el.querySelector('img') || el;
        if (img && img.src) {
          openLightbox(img.src, img.alt);
        }
      });
    });
  };

  // -------------------------------------------------------------------------
  // 6. Blog Tag Filtering
  // -------------------------------------------------------------------------
  const setupBlogFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const posts = document.querySelectorAll('.blog-post-card, article.post-preview');

    if (!filterButtons.length || !posts.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        posts.forEach((post) => {
          const tags = post.getAttribute('data-tags') || '';
          if (filter === 'all' || tags.toLowerCase().includes(filter.toLowerCase())) {
            post.style.display = '';
            post.style.opacity = '1';
          } else {
            post.style.display = 'none';
            post.style.opacity = '0';
          }
        });
      });
    });
  };

  // -------------------------------------------------------------------------
  // 7. Toast Notification Utility
  // -------------------------------------------------------------------------
  const showToast = (message) => {
    let toast = document.querySelector('.pro-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'pro-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // -------------------------------------------------------------------------
  // 8. Social Share & Copy Link
  // -------------------------------------------------------------------------
  const setupSocialShare = () => {
    const copyBtns = document.querySelectorAll('.copy-link-btn');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Link copied to clipboard!');
        }).catch(() => {
          showToast('Failed to copy link');
        });
      });
    });
  };

  // -------------------------------------------------------------------------
  // 9. Contact Form Validation
  // -------------------------------------------------------------------------
  const setupContactForm = () => {
    const form = document.querySelector('.contact-form-pro');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Open mailto fallback
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name.value}`);
      const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`);
      window.location.href = `mailto:vibhat.sri13@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client...');
    });
  };

  // -------------------------------------------------------------------------
  // Initialize on DOM Ready
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    highlightActiveNav();
    setupBackToTop();
    setupSkillBars();
    setupLightbox();
    setupBlogFilter();
    setupSocialShare();
    setupContactForm();

    // Attach theme toggle button clicks
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Expose global helpers
  window.VibhatPortfolio = {
    toggleTheme,
    showToast,
  };
})();
