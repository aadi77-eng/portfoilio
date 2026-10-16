/**
 * ====================================================================
 * DEEPAK AHER — MAIN PORTFOLIO CONTROLLER & SCRIPTS
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure SITE_CONFIG & TRANSLATIONS are loaded
  const config = window.SITE_CONFIG || {};
  const translations = window.TRANSLATIONS || {};

  /* --- 0. Bilingual Translation Controller (English & मराठी) --- */
  let currentLang = "en";

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    // 1. Update document html lang attribute
    document.documentElement.lang = lang;

    // 2. Update text content for elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    // 3. Update input / textarea placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.placeholder = translations[lang][key];
      }
    });

    // 4. Update inner HTML if present
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    // 4b. Update accessible aria-label attributes
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute("aria-label", translations[lang][key]);
      }
    });

    // 5. Update language switcher button states (Desktop & Mobile)
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isCurrent = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isCurrent);
      btn.setAttribute("aria-pressed", isCurrent ? "true" : "false");
    });

    // 6. Update Hero Attire Switcher active badge text
    updateHeroBadgeForLang(lang);

    // 6b. Update floating buttons (WhatsApp greeting & Call link)
    updateFloatingButtons(lang);

    // 7. Update Lightbox current content if open
    if (lightboxModal && lightboxModal.classList.contains("is-active")) {
      updateLightboxContent();
    }

    // 8. Update any currently visible form error messages
    updateVisibleFormErrors(lang);

    // 9. Persist language choice in localStorage
    try {
      localStorage.setItem("deepak_lang", lang);
    } catch (err) {
      console.warn("Could not save language to localStorage:", err);
    }
  }

  // Hook all language switcher buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetLang = btn.getAttribute("data-lang");
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });
  });

  /* --- 1. Sticky Header & Mobile Navigation --- */
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle-btn");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky header class on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking any link inside navigation menu (nav links & mobile CTA)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile menu on outside click
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("is-open") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active link indicator on scroll
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  /* --- 2. Hero Section: Attire & Portrait Switcher --- */
  const attireBtns = document.querySelectorAll(".attire-btn");
  const heroImg = document.getElementById("heroPortraitImg");
  const heroBadgeTitle = document.getElementById("heroBadgeTitle");
  const heroBadgeSub = document.getElementById("heroBadgeSub");

  const attireData = {
    plum: {
      src: "assets/images/j1.jpg",
      altEn: "Deepak Aher in regal attire with microphone",
      altMr: "राजेशाही पोशाख आणि मायक्रोफोनसह दीपक आहेर",
      titleKey: "hero.badgePlumTitle",
      subKey: "hero.badgePlumSub",
    },
    navy: {
      src: "assets/images/j2.png",
      altEn: "Deepak Aher in royal navy tailored suit with microphone",
      altMr: "रॉयल नेव्ही ब्लू सुट आणि मायक्रोफोनसह दीपक आहेर",
      titleKey: "hero.badgeNavyTitle",
      subKey: "hero.badgeNavySub",
    },
  };

  function updateHeroBadgeForLang(lang) {
    const isPlumActive = document.querySelector('.attire-btn[data-attire="plum"]')?.classList.contains("active");
    const activeAttireKey = isPlumActive ? "plum" : "navy";
    const data = attireData[activeAttireKey];
    if (!data) return;

    if (heroBadgeTitle && translations[lang] && translations[lang][data.titleKey]) {
      heroBadgeTitle.textContent = translations[lang][data.titleKey];
    }
    if (heroBadgeSub && translations[lang] && translations[lang][data.subKey]) {
      heroBadgeSub.textContent = translations[lang][data.subKey];
    }
    if (heroImg) {
      heroImg.alt = lang === "mr" ? data.altMr : data.altEn;
    }
  }

  attireBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const attire = btn.getAttribute("data-attire");
      if (!attireData[attire] || !heroImg) return;

      attireBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Smooth fade transition
      heroImg.style.opacity = "0.2";
      setTimeout(() => {
        heroImg.src = attireData[attire].src;
        updateHeroBadgeForLang(currentLang);
        heroImg.style.opacity = "1";
      }, 180);
    });
  });

  /* --- 3. Event Selection & Scroll to Contact Form --- */
  const discussButtons = document.querySelectorAll(".btn-discuss-event");
  const eventSelect = document.getElementById("eventType");

  discussButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const eventId = btn.getAttribute("data-event-id");
      
      // Auto-select dropdown in form
      if (eventSelect && eventId) {
        eventSelect.value = eventId;
        eventSelect.classList.add("is-highlighted");
        setTimeout(() => eventSelect.classList.remove("is-highlighted"), 2000);
      }

      // Smooth scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        const nameInput = document.getElementById("clientName");
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  });

  /* --- 4. Gallery Category Filtering --- */
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      galleryItems.forEach((item) => {
        const itemCat = item.getAttribute("data-category");
        if (filter === "all" || itemCat === filter) {
          item.style.display = "flex";
          setTimeout(() => (item.style.opacity = "1"), 50);
        } else {
          item.style.opacity = "0";
          setTimeout(() => (item.style.display = "none"), 250);
        }
      });
    });
  });

  /* --- 5. Interactive Lightbox Modal --- */
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");

  // Collect all zoomable items
  let zoomItems = [];
  const galleryElements = document.querySelectorAll("[data-zoom-src]");
  galleryElements.forEach((el, index) => {
    zoomItems.push({
      src: el.getAttribute("data-zoom-src"),
      titleEn: el.getAttribute("data-zoom-title-en") || el.getAttribute("data-zoom-title") || "Deepak Aher Portfolio",
      titleMr: el.getAttribute("data-zoom-title-mr") || el.getAttribute("data-zoom-title") || "दीपक आहेर पोर्टफोलिओ",
      captionEn: el.getAttribute("data-zoom-caption-en") || el.getAttribute("data-zoom-caption") || "",
      captionMr: el.getAttribute("data-zoom-caption-mr") || el.getAttribute("data-zoom-caption") || "",
      element: el,
    });

    el.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  let currentZoomIndex = 0;

  function openLightbox(index) {
    if (!lightboxModal || !zoomItems[index]) return;
    currentZoomIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const item = zoomItems[currentZoomIndex];
    if (!item || !lightboxImg) return;
    lightboxImg.src = item.src;

    const title = currentLang === "mr" ? item.titleMr : item.titleEn;
    const caption = currentLang === "mr" ? item.captionMr : item.captionEn;

    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = caption;
  }

  function nextLightbox() {
    currentZoomIndex = (currentZoomIndex + 1) % zoomItems.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    currentZoomIndex = (currentZoomIndex - 1 + zoomItems.length) % zoomItems.length;
    updateLightboxContent();
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener("click", nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener("click", prevLightbox);

  // Close on modal backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener("keydown", (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains("is-active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightbox();
    if (e.key === "ArrowLeft") prevLightbox();
  });

  /* --- 6. Floating Action Buttons & Smart Booking Form --- */
  const bookingForm = document.getElementById("bookingForm");
  const formFeedbackCard = document.getElementById("formFeedbackCard");
  const directWhatsAppLink = document.getElementById("directWhatsAppLink");
  const btnCopyDetails = document.getElementById("btnCopyDetails");
  const btnResetForm = document.getElementById("btnResetForm");
  const feedbackPreviewBox = document.getElementById("feedbackPreviewBox");

  const submissionModal = document.getElementById("submissionModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const copyEnquiryBtn = document.getElementById("copyEnquiryBtn");
  const whatsappEnquiryBtn = document.getElementById("whatsappEnquiryBtn");
  const submittedSummary = document.getElementById("submittedSummary");

  let currentFormattedMessage = "";

  // Floating Action Buttons Controller
  function updateFloatingButtons(lang) {
    const floatingWa = document.getElementById("floatingWhatsAppBtn");
    const floatingCall = document.getElementById("floatingCallBtn");
    const waNumber = config.contact?.whatsappNumber || "918888842142";
    const telNumber = config.contact?.telNumber || "+918888842142";

    if (floatingCall) {
      floatingCall.href = `tel:${telNumber}`;
      const callLabel = (translations[lang] && translations[lang]["floating.callLabel"]) || "Call Now";
      floatingCall.setAttribute("aria-label", callLabel);
    }

    if (floatingWa) {
      const waGreeting = lang === "mr"
        ? "नमस्कार दीपक सर, मी तुमची वेबसाईट पाहिली असून मला तुमच्या सूत्रसंचालनाविषयी चौकशी करायची आहे."
        : "Hello Deepak, I visited your portfolio website and would like to enquire about your anchoring services.";
      floatingWa.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waGreeting)}`;
      const waLabel = (translations[lang] && translations[lang]["floating.whatsappLabel"]) || "Chat on WhatsApp";
      floatingWa.setAttribute("aria-label", waLabel);
    }
  }

  // Prevent past dates in date input
  const eventDateInput = document.getElementById("eventDate");
  if (eventDateInput) {
    const today = new Date().toISOString().split("T")[0];
    eventDateInput.setAttribute("min", today);
  }

  // Indian Mobile Validation (10 digits starting with 6, 7, 8, or 9; accepts optional country code)
  function isValidIndianMobile(phoneStr) {
    if (!phoneStr) return false;
    let digits = String(phoneStr).replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    return /^[6-9]\d{9}$/.test(digits);
  }

  function getErrorMessage(errorKey) {
    if (translations[currentLang] && translations[currentLang][errorKey]) {
      return translations[currentLang][errorKey];
    }
    return translations.en[errorKey] || "Field required";
  }

  function showFieldError(input, errorKey) {
    const group = input.closest(".form-group");
    if (!group) return;
    group.classList.add("has-error");
    group.setAttribute("data-error-key", errorKey);
    input.classList.add("is-invalid");
    let errorElem = group.querySelector(".form-error-msg") || group.querySelector(".input-error-msg");
    if (!errorElem) {
      errorElem = document.createElement("span");
      errorElem.className = "form-error-msg";
      group.appendChild(errorElem);
    }
    errorElem.textContent = getErrorMessage(errorKey);
  }

  function clearFieldError(input) {
    const group = input.closest(".form-group");
    if (!group) return;
    group.classList.remove("has-error");
    group.removeAttribute("data-error-key");
    input.classList.remove("is-invalid");
    const errorElem = group.querySelector(".form-error-msg") || group.querySelector(".input-error-msg");
    if (errorElem) {
      errorElem.textContent = "";
    }
  }

  function updateVisibleFormErrors(lang) {
    document.querySelectorAll(".form-group.has-error").forEach((group) => {
      const errorMsgEl = group.querySelector(".form-error-msg") || group.querySelector(".input-error-msg");
      const errorKey = group.getAttribute("data-error-key");
      if (errorMsgEl && errorKey && translations[lang] && translations[lang][errorKey]) {
        errorMsgEl.textContent = translations[lang][errorKey];
      }
    });
  }

  function buildWhatsAppMessage(data, lang) {
    if (lang === "mr") {
      return `नमस्कार दीपक आहेर,

मला आपल्या सूत्रसंचालनाविषयी विचारणा करायची आहे.

नाव: ${data.name}
मोबाईल: ${data.phone}
व्हॉट्सॲप: ${data.whatsApp || data.phone}
कार्यक्रमाचा प्रकार: ${data.eventType}
कार्यक्रमाची तारीख: ${data.eventDate}
ठिकाण: ${data.location}
अपेक्षित वेळ: ${data.eventTime || "लवचिक / ठरवायची आहे"}
अतिरिक्त माहिती: ${data.notes || "काही नाही"}

कृपया आपली उपलब्धता व बुकिंग तपशील कळवावा.

धन्यवाद.`;
    }

    return `Hello Deepak Aher,

I would like to enquire about booking your anchoring services.

Name: ${data.name}
Mobile: ${data.phone}
WhatsApp: ${data.whatsApp || data.phone}
Event Type: ${data.eventType}
Event Date: ${data.eventDate}
Location: ${data.location}
Event Time: ${data.eventTime || "Not specified / Flexible"}
Additional Requirements: ${data.notes || "None"}

Please let me know your availability and booking details.

Thank you.`;
  }

  // Setup Form Controls & "Same as Mobile" Synchronization
  const nameInput = document.getElementById("clientName");
  const phoneInput = document.getElementById("clientPhone");
  const whatsAppInput = document.getElementById("clientWhatsApp");
  const sameAsMobileCheckbox = document.getElementById("sameAsMobile");
  const eventTypeInput = document.getElementById("eventType");
  const eventLocationInput = document.getElementById("eventLocation");
  const eventTimeInput = document.getElementById("eventTime");
  const emailInput = document.getElementById("clientEmail");
  const eventNotesInput = document.getElementById("eventNotes");

  if (sameAsMobileCheckbox && phoneInput && whatsAppInput) {
    sameAsMobileCheckbox.addEventListener("change", () => {
      if (sameAsMobileCheckbox.checked) {
        whatsAppInput.value = phoneInput.value;
        whatsAppInput.setAttribute("readonly", "true");
        clearFieldError(whatsAppInput);
      } else {
        whatsAppInput.removeAttribute("readonly");
      }
    });

    phoneInput.addEventListener("input", () => {
      if (sameAsMobileCheckbox.checked) {
        whatsAppInput.value = phoneInput.value;
      }
      clearFieldError(phoneInput);
    });
  }

  // Clear errors dynamically on input or change
  [nameInput, phoneInput, whatsAppInput, eventTypeInput, eventDateInput, eventLocationInput, emailInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => clearFieldError(input));
    input.addEventListener("change", () => clearFieldError(input));
  });

  // Handle Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalidInput = null;

      // 1. Full Name (Required, min 2 characters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, "val.nameError");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      } else {
        clearFieldError(nameInput);
      }

      // 2. Mobile Number (Required, Valid Indian phone)
      if (!phoneInput.value.trim()) {
        showFieldError(phoneInput, "val.reqField");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = phoneInput;
      } else if (!isValidIndianMobile(phoneInput.value)) {
        showFieldError(phoneInput, "val.phoneError");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = phoneInput;
      } else {
        clearFieldError(phoneInput);
      }

      // 3. WhatsApp Number (Optional; if entered or not same-as-mobile, validate)
      const isSameChecked = sameAsMobileCheckbox && sameAsMobileCheckbox.checked;
      if (!isSameChecked && whatsAppInput && whatsAppInput.value.trim()) {
        if (!isValidIndianMobile(whatsAppInput.value)) {
          showFieldError(whatsAppInput, "val.whatsappError");
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = whatsAppInput;
        } else {
          clearFieldError(whatsAppInput);
        }
      } else if (whatsAppInput) {
        clearFieldError(whatsAppInput);
      }

      // 4. Event Type (Required Dropdown)
      if (!eventTypeInput.value) {
        showFieldError(eventTypeInput, "val.eventError");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = eventTypeInput;
      } else {
        clearFieldError(eventTypeInput);
      }

      // 5. Event Date (Required)
      if (!eventDateInput.value) {
        showFieldError(eventDateInput, "val.dateError");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = eventDateInput;
      } else {
        clearFieldError(eventDateInput);
      }

      // 6. Event Location (Required)
      if (!eventLocationInput.value.trim()) {
        showFieldError(eventLocationInput, "val.locError");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = eventLocationInput;
      } else {
        clearFieldError(eventLocationInput);
      }

      // 7. Optional Email validation
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          showFieldError(emailInput, "val.emailError");
          isValid = false;
          if (!firstInvalidInput) firstInvalidInput = emailInput;
        } else {
          clearFieldError(emailInput);
        }
      }

      // If invalid, focus first failing control and stop
      if (!isValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
          firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      // Collect Data & Build WhatsApp Enquiry Message
      const selectedOptionText = eventTypeInput.options[eventTypeInput.selectedIndex].text;
      const finalWhatsAppNum = isSameChecked
        ? phoneInput.value.trim()
        : (whatsAppInput.value.trim() || phoneInput.value.trim());

      const enquiryData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        whatsApp: finalWhatsAppNum,
        eventType: selectedOptionText,
        eventDate: eventDateInput.value,
        location: eventLocationInput.value.trim(),
        eventTime: eventTimeInput ? eventTimeInput.value.trim() : "",
        notes: eventNotesInput ? eventNotesInput.value.trim() : "",
      };

      currentFormattedMessage = buildWhatsAppMessage(enquiryData, currentLang);

      // WhatsApp URL Construction (Using verified number: 918888842142)
      const targetPhone = config.contact?.whatsappNumber || "918888842142";
      const encodedMsg = encodeURIComponent(currentFormattedMessage);
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMsg}`;

      // Open WhatsApp in new tab / application
      window.open(whatsappUrl, "_blank");

      // Show on-page feedback and direct fallback action
      if (formFeedbackCard) {
        formFeedbackCard.style.display = "block";
        if (directWhatsAppLink) {
          directWhatsAppLink.href = whatsappUrl;
        }
        if (feedbackPreviewBox) {
          feedbackPreviewBox.textContent = currentFormattedMessage;
        }
        formFeedbackCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Update feedback modal as fallback
      if (submittedSummary) {
        submittedSummary.textContent = currentFormattedMessage;
      }
      if (whatsappEnquiryBtn) {
        whatsappEnquiryBtn.href = whatsappUrl;
      }
    });
  }

  // Copy Feedback Details Button
  if (btnCopyDetails) {
    btnCopyDetails.addEventListener("click", () => {
      if (!currentFormattedMessage) return;
      navigator.clipboard.writeText(currentFormattedMessage).then(() => {
        const copiedLabel = (translations[currentLang] && translations[currentLang]["form.copiedDetails"]) || "Details Copied to Clipboard!";
        const originalText = btnCopyDetails.textContent;
        btnCopyDetails.textContent = `✓ ${copiedLabel}`;
        setTimeout(() => {
          btnCopyDetails.textContent = originalText;
        }, 3000);
      });
    });
  }

  // Reset Form & Clear Feedback
  if (btnResetForm) {
    btnResetForm.addEventListener("click", () => {
      bookingForm.reset();
      if (whatsAppInput) whatsAppInput.removeAttribute("readonly");
      if (formFeedbackCard) formFeedbackCard.style.display = "none";
      currentFormattedMessage = "";
      document.querySelectorAll(".form-group.has-error").forEach((g) => {
        g.classList.remove("has-error");
        g.removeAttribute("data-error-key");
      });
      document.querySelectorAll(".is-invalid").forEach((i) => i.classList.remove("is-invalid"));
    });
  }

  // Modal Copy Button
  if (copyEnquiryBtn) {
    copyEnquiryBtn.addEventListener("click", () => {
      if (!currentFormattedMessage) return;
      navigator.clipboard.writeText(currentFormattedMessage).then(() => {
        const copiedLabel = (translations[currentLang] && translations[currentLang]["modal.copiedText"]) || "Copied to Clipboard!";
        copyEnquiryBtn.textContent = `✓ ${copiedLabel}`;
        setTimeout(() => {
          copyEnquiryBtn.textContent = translations[currentLang]["modal.copyBtn"] || "Copy Enquiry Details";
        }, 3000);
      });
    });
  }

  // Modal Close Button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      if (submissionModal) {
        submissionModal.classList.remove("is-active");
        document.body.style.overflow = "";
      }
    });
  }

  /* --- 7. Scroll Reveal Observer --- */
  const revealElements = document.querySelectorAll(".reveal-fade-up");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -40px 0px", threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion is requested, immediately show all elements
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* --- 8. Initialize Saved Language or Default to English --- */
  const savedLang = localStorage.getItem("deepak_lang") || "en";
  setLanguage(savedLang);
});
