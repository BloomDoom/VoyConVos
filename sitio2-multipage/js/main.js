/* ============================================================
   VoyConVos · Sitio 2 (Multi Page) — JS PROPIO compartido
   Cada bloque se activa solo si los elementos existen en la página.
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURACIÓN DE EMAILJS
   Reemplazá estos valores por los de tu cuenta gratuita.
   Si los dejás como "TU_...", el formulario funciona en modo DEMO.
   ------------------------------------------------------------ */
const EMAILJS_CONFIG = {
  PUBLIC_KEY:  "TU_PUBLIC_KEY",
  SERVICE_ID:  "TU_SERVICE_ID",
  TEMPLATE_ID: "TU_TEMPLATE_ID"
};

document.addEventListener('DOMContentLoaded', () => {

  /* ========== AOS — animaciones ========== */
  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 80 });

  /* ========== Marcar enlace activo del navbar ========== */
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.barra-navegacion .nav-link').forEach(link => {
    if (link.getAttribute('href') === pagina) link.classList.add('active');
  });

  /* ========== Botón volver arriba ========== */
  const btnArriba = document.getElementById('btnArriba');
  if (btnArriba) {
    window.addEventListener('scroll', () => {
      btnArriba.classList.toggle('visible', window.scrollY > 400);
    });
    btnArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ========== Swiper (si existe en la página) ========== */
  if (document.querySelector('.galeria-swiper') && window.Swiper) {
    new Swiper('.galeria-swiper', {
      slidesPerView: 1, spaceBetween: 20, loop: true, grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }
    });
  }

  /* ========== GLightbox (galería) ========== */
  if (document.querySelector('.glightbox') && window.GLightbox) {
    GLightbox({ selector: '.glightbox', loop: true });
  }

  /* ========== Filtro de viajes por destino ========== */
  const botonesFiltro = document.querySelectorAll('.filtro-btn');
  if (botonesFiltro.length) {
    const tarjetas = document.querySelectorAll('.col-viaje');
    const sinResultados = document.querySelector('.sin-resultados');
    botonesFiltro.forEach(btn => {
      btn.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        const filtro = btn.dataset.filtro;
        let visibles = 0;
        tarjetas.forEach(card => {
          const mostrar = filtro === 'todos' || card.dataset.destino === filtro;
          card.style.display = mostrar ? '' : 'none';
          if (mostrar) visibles++;
        });
        if (sinResultados) sinResultados.hidden = visibles !== 0;
      });
    });
  }

  /* ========== Formulario de contacto (EmailJS + validación) ========== */
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
      btnEnviar.querySelector('.btn-texto').textContent = cargando ? 'Enviando…' : 'Enviar solicitud';
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
  }

});
