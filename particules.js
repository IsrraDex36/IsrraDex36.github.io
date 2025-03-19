// Nav

// Elementos principales
const content = document.getElementById("content");
const effect = document.getElementById("radial-effect");
const sections = document.querySelectorAll(".content-card");
const dockItems = document.querySelectorAll(".dock-item");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// **Evita el scroll automático a una sección al cargar**
document.addEventListener("DOMContentLoaded", () => {
  // Inicia la página en la parte superior
  window.scrollTo(0, 0);
  // Elimina cualquier hash en la URL
  history.replaceState({}, document.title, window.location.pathname);
  // Verifica la sección visible al cargar
  updateActiveSection();
});

// **Efecto de seguimiento del mouse**
document.addEventListener("mousemove", (e) => {
  const radius = 150;
  const x = Math.max(radius, Math.min(e.clientX, window.innerWidth - radius));
  const y = Math.max(radius, Math.min(e.clientY, window.innerHeight - radius));

  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
});

// **Detecta la sección visible al hacer scroll y actualiza el Dock**
function updateActiveSection() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // Ajuste para visibilidad
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  // **Sincroniza el Dock con la sección activa**
  dockItems.forEach((item) => {
    if (item.getAttribute("data-content") === currentSection) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// **Evento de scroll para detectar la sección activa**
window.addEventListener("scroll", updateActiveSection);

// **Navegación suave al hacer clic en los íconos**
dockItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = item.getAttribute("data-content");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80, // Ajuste para compensar la barra de navegación
        behavior: "smooth",
      });

      // Remover 'active' de todos los ítems y marcar el seleccionado
      dockItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});

// **Alternar entre modo claro/oscuro**
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  document.documentElement.style.overflow = "auto";
  document.body.style.overflow = "auto";
});
