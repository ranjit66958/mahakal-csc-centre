
/* =====================================
   MAHAKAL CSC CENTRE
   JavaScript Features
   ===================================== */

document.addEventListener("DOMContentLoaded", function () {

  // 1. આપમેળે વર્તમાન વર્ષ દર્શાવો
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. મેનુ લિંક ક્લિક કર્યા પછી સ્મૂથ સ્ક્રોલ
  document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 3. WhatsApp સંપર્ક બટન
  const whatsappNumber = "919909614382";

  document.querySelectorAll(".whatsapp, .float-wa").forEach(function (button) {
    button.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      // HTML માં આપેલી WhatsApp લિંક હોય તો તેને જ વાપરો.
      if (!href || href === "#whatsapp") {
        event.preventDefault();

        const message = encodeURIComponent(
          "નમસ્તે, મહાકાલ CSC સેન્ટરની ઓનલાઇન સેવાઓ વિશે માહિતી જોઈએ છે."
        );

        window.open(
          "https://wa.me/" + whatsappNumber + "?text=" + message,
          "_blank",
          "noopener,noreferrer"
        );
      }
    });
  });

  // 4. ફોન નંબર પર ક્લિક કરવા માટે
  document.querySelectorAll("[data-phone]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = "tel:+919909614382";
    });
  });

  // 5. સેવાઓના કાર્ડમાં સરળ એનિમેશન
  const serviceCards = document.querySelectorAll(".service");

  serviceCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.2s ease";
    });
  });

  // 6. બટન ક્લિક થયા પછી દેખાવમાં પ્રતિસાદ
  document.querySelectorAll(".button").forEach(function (button) {
    button.addEventListener("click", function () {
      this.blur();
    });
  });

  // 7. સંપર્ક ફોર્મ માટે મૂળભૂત વેલિડેશન
  // HTML માં id="contactForm" ધરાવતું ફોર્મ ઉમેરશો તો જ ચાલશે.
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      const nameField = contactForm.querySelector('[name="name"]');
      const mobileField = contactForm.querySelector('[name="mobile"]');

      if (nameField && nameField.value.trim() === "") {
        event.preventDefault();
        alert("કૃપા કરીને તમારું નામ લખો.");
        nameField.focus();
        return;
      }

      if (mobileField) {
        const mobile = mobileField.value.replace(/\D/g, "");

        if (!/^[6-9]\d{9}$/.test(mobile)) {
          event.preventDefault();
          alert("કૃપા કરીને યોગ્ય 10 અંકનો મોબાઇલ નંબર લખો.");
          mobileField.focus();
        }
      }
    });
  }

  // 8. વેબસાઇટ તૈયાર થયા પછી Console માં સંદેશ
  console.log("મહાકાલ CSC સેન્ટર વેબસાઇટ સફળતાપૂર્વક લોડ થઈ.");

});
