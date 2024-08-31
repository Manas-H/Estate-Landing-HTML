document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const elements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        } else {
          entry.target.classList.remove("fade-in"); // Remove the animation class when the element goes out of view
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  // Function to show the contact popup
  const showContactPopup = () => {
    const contactPopup = document.getElementById("contact-form");
    contactPopup.style.display = "flex";
    // Set a flag in localStorage to prevent showing the popup again
    localStorage.setItem("contactPopupShown", "true");
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show the popup on scroll if it hasn't been shown yet
    if (!localStorage.getItem("contactPopupShown")) {
      showContactPopup();
    }
  });

  // Show the popup after 10 seconds if it hasn't been shown yet
  if (!localStorage.getItem("contactPopupShown")) {
    setTimeout(() => {
      showContactPopup();
    }, 10000);
  }

  // Popup Form Script
  const contactPopup = document.getElementById("contact-form");
  const contactBtns = document.querySelectorAll(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");

  contactBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      contactPopup.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", function () {
    contactPopup.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === contactPopup) {
      contactPopup.style.display = "none";
    }
  });

  // Mobile Navigation Toggle
  const menuToggle = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking on a link
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });

  // Add close button functionality
  const closeButton = document.createElement("div");
  closeButton.textContent = "✕";
  closeButton.classList.add("close-btn-n");
  navLinks.appendChild(closeButton);

  closeButton.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });

  // Form validation and submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Form validation (additional custom validation can be added here)
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const message = formData.get("message").trim();

    if (name === "" || email === "" || phone === "" || message === "") {
      formMessage.textContent = "Please fill out all fields.";
      formMessage.classList.add("error");
      return;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      if (response.ok) {
        formMessage.textContent = "Your message has been sent successfully!";
        formMessage.classList.add("success");
        formMessage.classList.remove("error");
        contactForm.reset(); // Clear form fields
      } else {
        formMessage.textContent =
          "There was an issue sending your message. Please try again later.";
        formMessage.classList.add("error");
        formMessage.classList.remove("success");
      }
    } catch (error) {
      formMessage.textContent = "There was an error. Please try again.";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
    }
  });
});
