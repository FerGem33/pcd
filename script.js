const eventDate = new Date(2026, 5, 13, 10, 0, 0);
const whatsappNumber = "528444276965";
const childName = "Diego López Ruiz";

const childNameElement = document.getElementById("childName");
const countdownElement = document.getElementById("countdown");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// Nombre en portada
childNameElement.textContent = childName;

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function twoDigits(value) {
  return value < 10 ? "0" + value : String(value);
}

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdownElement.innerHTML = "<p>Hoy es el gran día</p>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = twoDigits(days);
  document.getElementById("hours").textContent = twoDigits(hours);
  document.getElementById("minutes").textContent = twoDigits(minutes);
  document.getElementById("seconds").textContent = twoDigits(seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();

function confirmWhatsApp() {
  const guestCountInput = document.getElementById("guestCount");
  const guestCountValue = guestCountInput ? guestCountInput.value : 1;
  const guestCount = Math.max(1, parseInt(guestCountValue, 10) || 1);
  const guestText = guestCount === 1 ? "1 persona" : `${guestCount} personas`;

  if (guestCountInput) {
    guestCountInput.value = guestCount;
  }

  const message = encodeURIComponent(
    `Hola, confirmo mi asistencia a la Primera Comunión de ${childName} por ${guestText}.`
  );
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
}

// Animación al hacer scroll. Si no existe IntersectionObserver, el contenido queda visible.
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js-enabled");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// Música opcional. En celular debe iniciar desde un toque del usuario.
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      music.load();
      await music.play();
      musicBtn.textContent = "II";
    } catch (e) {
      alert("No se pudo reproducir la música. Revisa que music.mp3 esté en la carpeta y vuelve a intentarlo.");
    }
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});
