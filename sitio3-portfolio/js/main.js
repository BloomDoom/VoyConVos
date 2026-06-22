/* ============================================================
   Portfolio · Agustín Espina — JS PROPIO
   ============================================================ */

/* CONFIGURACIÓN DE EMAILJS (igual que los otros sitios).
   Reemplazá por tus credenciales; si las dejás como "TU_...",
   el formulario funciona en modo DEMO. */
const EMAILJS_CONFIG = {
  PUBLIC_KEY:  "TU_PUBLIC_KEY",
  SERVICE_ID:  "TU_SERVICE_ID",
  TEMPLATE_ID: "TU_TEMPLATE_ID"
};

document.addEventListener('DOMContentLoaded', () => {

  /* ===== AOS ===== */
  AOS.init({ duration: 700, once: true, offset: 80 });

  /* ===== GLightbox (capturas de proyectos) ===== */
  GLightbox({ selector: '.glightbox', loop: true });

  /* ===== Typed.js (roles en el hero) ===== */
  if (document.getElementById('typed')) {
    new Typed('#typed', {
      strings: ['Desarrollador Front-End', 'Maquetador Web', 'Apasionado del UX/UI', 'Estudiante de Desarrollo Web'],
      typeSpeed: 65, backSpeed: 35, backDelay: 1600, loop: true
    });
  }

  /* ===== Navbar al hacer scroll + botón arriba ===== */
  const navbar = document.querySelector('.barra-portfolio');
  const btnArriba = document.getElementById('btnArriba');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    btnArriba.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
  btnArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ===== Contadores de la sección Sobre mí ===== */
  const datos = document.querySelectorAll('.dato-numero');
  const animar = el => {
    const objetivo = +el.dataset.objetivo;
    const paso = Math.max(1, Math.ceil(objetivo / 50));
    let actual = 0;
    const timer = setInterval(() => {
      actual += paso;
      if (actual >= objetivo) { actual = objetivo; clearInterval(timer); }
      el.textContent = actual;
    }, 30);
  };
  const obs = new IntersectionObserver((entradas, o) => {
    entradas.forEach(e => { if (e.isIntersecting) { animar(e.target); o.unobserve(e.target); } });
  }, { threshold: 0.5 });
  datos.forEach(d => obs.observe(d));

  /* ===== Formulario de contacto (EmailJS + validación) ===== */
  const form = document.getElementById('formularioContacto');
  if (form) {
    const alertaExito = document.getElementById('alertaExito');
    const alertaError = document.getElementById('alertaError');
    const btnEnviar = document.getElementById('btnEnviar');
    const spinner = document.getElementById('spinnerEnviar');

    const emailjsActivo = EMAILJS_CONFIG.PUBLIC_KEY !== 'TU_PUBLIC_KEY' && typeof emailjs !== 'undefined';
    if (emailjsActivo) emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });

    const setCargando = (cargando) => {
      btnEnviar.disabled = cargando;
      spinner.classList.toggle('d-none', !cargando);
      btnEnviar.querySelector('.btn-texto').textContent = cargando ? 'Enviando…' : 'Enviar mensaje';
    };

    form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      alertaExito.classList.add('d-none');
      alertaError.classList.add('d-none');

      const mensaje = document.getElementById('mensaje');
      mensaje.setCustomValidity(mensaje.value.trim().length < 10 ? 'corto' : '');

      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
      form.classList.remove('was-validated');

      setCargando(true);
      try {
        if (emailjsActivo) {
          await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form);
        } else {
          await new Promise(r => setTimeout(r, 900));
          console.info('[Portfolio] EmailJS en modo DEMO — configurá EMAILJS_CONFIG para enviar correos reales.');
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
  }

});
