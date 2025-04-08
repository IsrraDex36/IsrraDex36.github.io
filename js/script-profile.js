// Variables
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".icon svg"); // Seleccionar el ícono dentro del botón

// Definir los íconos de luna y sol
const moonIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
`;

const sunIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
`;

// **Alternar entre modo claro/oscuro**
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
  themeIcon.innerHTML = sunIcon; // Establecer ícono de sol si el tema es claro
} else {
  themeIcon.innerHTML = moonIcon; // Establecer ícono de luna si el tema es oscuro
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeIcon.innerHTML = sunIcon; // Cambiar a ícono de sol
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.innerHTML = moonIcon; // Cambiar a ícono de luna
  }
});

// ** Selector **
const dockItems = document.querySelectorAll(".dock-item");

function smoothScrollToSection(targetId) {
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: "smooth",
    });
  }
}

dockItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = item.getAttribute("data-content");
    if (targetId) {
      smoothScrollToSection(targetId);
    }
  });
});

// ** Sobre Mí **
document.addEventListener("DOMContentLoaded", () => {
  const aboutMeToggle = document.getElementById("aboutMeToggle");
  const aboutWindow = document.getElementById("aboutWindow");
  const windowOverlay = document.getElementById("windowOverlay");
  const closeWindow = document.getElementById("closeWindow");

  if (aboutMeToggle && aboutWindow && windowOverlay && closeWindow) {
      aboutMeToggle.addEventListener("click", () => {
          aboutWindow.classList.add("active");
          windowOverlay.classList.add("active");
      });

      closeWindow.addEventListener("click", () => {
          aboutWindow.classList.remove("active");
          windowOverlay.classList.remove("active");
      });

      windowOverlay.addEventListener("click", () => {
          aboutWindow.classList.remove("active");
          windowOverlay.classList.remove("active");
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const dockItems = document.querySelectorAll('.dock-item');
  
  dockItems.forEach(item => {
      item.addEventListener('click', function() {
          // Remueve la clase de cualquier elemento que la tenga
          dockItems.forEach(i => i.classList.remove('clicked'));
          
          // Agrega la clase al elemento clickeado
          this.classList.add('clicked');
          
          // Remueve la clase después de que termine la animación
          setTimeout(() => {
              this.classList.remove('clicked');
          }, 400);
      });
  });
});

// ** Mantenimiento **
document.addEventListener("DOMContentLoaded", () => {
  const btnVerMas = document.getElementById("btnVerMas");
  const maintenanceModal = document.getElementById("maintenanceModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeMaintenanceModal = document.getElementById("closeMaintenanceModal");

  if (btnVerMas && maintenanceModal && modalOverlay && closeMaintenanceModal) {
      btnVerMas.addEventListener("click", () => {
          maintenanceModal.classList.add("active");
          modalOverlay.classList.add("active");
      });

      closeMaintenanceModal.addEventListener("click", () => {
          maintenanceModal.classList.remove("active");
          modalOverlay.classList.remove("active");
      });

      modalOverlay.addEventListener("click", () => {
          maintenanceModal.classList.remove("active");
          modalOverlay.classList.remove("active");
      });
  }
});