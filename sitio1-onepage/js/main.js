/* ============================================================
   VoyConVos · Sitio 1 (One Page) — JS PROPIO
   Inicializa los plugins y maneja todas las interacciones.
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURACIÓN DE EMAILJS
   Reemplazá estos 3 valores por los de tu cuenta gratuita
   (https://dashboard.emailjs.com → Account / Email Services / Templates).
   Si los dejás como "TU_...", el formulario funciona igual en modo
   DEMO (muestra el mensaje de éxito sin enviar el correo real).
   ------------------------------------------------------------ */
const EMAILJS_CONFIG = {
  PUBLIC_KEY:  "zgNsECSJFeH7QkXrd",
  SERVICE_ID:  "service_9rbtvwh",
  TEMPLATE_ID: "template_2bsqksf"
};

document.addEventListener('DOMContentLoaded', () => {

  /* ========== 1. AOS — animaciones al hacer scroll ========== */
  AOS.init({ duration: 700, once: true, offset: 80 });

  /* ========== 2. Swiper — slider de la galería ========== */
  new Swiper('.galeria-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }
  });

  /* ========== 3. GLightbox — ampliar imágenes de la galería ========== */
  GLightbox({ selector: '.glightbox', loop: true });

  /* ========== 4. Typed.js — texto animado en el hero ========== */
  if (document.getElementById('typed')) {
    new Typed('#typed', {
      strings: ['Mar del Plata', 'Pinamar', 'Villa Gesell', 'Necochea', 'toda la costa ☀️'],
      typeSpeed: 70, backSpeed: 40, backDelay: 1500, loop: true
    });
  }

  /* ========== 5. Navbar: efecto al hacer scroll ========== */
  const navbar = document.querySelector('.barra-navegacion');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('btnArriba').classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ========== 6. Botón volver arriba ========== */
  document.getElementById('btnArriba').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========== 7. Contadores animados del hero ========== */
  const contadores = document.querySelectorAll('.contador');
  const animarContador = el => {
    const objetivo = +el.dataset.objetivo;
    const paso = Math.max(1, Math.ceil(objetivo / 60));
    let actual = 0;
    const timer = setInterval(() => {
      actual += paso;
      if (actual >= objetivo) { actual = objetivo; clearInterval(timer); }
      el.textContent = actual.toLocaleString('es-AR');
    }, 25);
  };
  const obsContador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(e => {
      if (e.isIntersecting) { animarContador(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  contadores.forEach(c => obsContador.observe(c));

  /* ========== 9. Formulario de contacto (EmailJS + validación) ========== */
  const form = document.getElementById('formularioContacto');
  const alertaExito = document.getElementById('alertaExito');
  const alertaError = document.getElementById('alertaError');
  const btnEnviar = document.getElementById('btnEnviar');
  const spinner = document.getElementById('spinnerEnviar');

  // Inicializa EmailJS solo si hay clave configurada
  const emailjsActivo = EMAILJS_CONFIG.PUBLIC_KEY !== 'TU_PUBLIC_KEY' && typeof emailjs !== 'undefined';
  if (emailjsActivo) emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });

  const setCargando = (cargando) => {
    btnEnviar.disabled = cargando;
    spinner.classList.toggle('d-none', !cargando);
    btnEnviar.querySelector('.btn-texto').textContent = cargando ? 'Enviando…' : 'Enviar solicitud';
  };

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    alertaExito.classList.add('d-none');
    alertaError.classList.add('d-none');

    // Validación nativa de Bootstrap + chequeo de longitud del mensaje
    const mensaje = document.getElementById('mensaje');
    mensaje.setCustomValidity(mensaje.value.trim().length < 10 ? 'corto' : '');

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    form.classList.remove('was-validated');

    setCargando(true);
    try {
      if (emailjsActivo) {
        await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form);
      } else {
        // Modo DEMO: simula la espera de red para la defensa del TF
        await new Promise(r => setTimeout(r, 900));
        console.info('[VoyConVos] EmailJS en modo DEMO — configurá EMAILJS_CONFIG para enviar correos reales.');
      }
      form.reset();
      alertaExito.classList.remove('d-none');
      alertaExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      console.error('Error al enviar con EmailJS:', error);
      alertaError.classList.remove('d-none');
    } finally {
      setCargando(false);
    }
  });

});
