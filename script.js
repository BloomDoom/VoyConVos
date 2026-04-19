/* ============================================================
   NAVBAR — MENÚ MÓVIL
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ============================================================
   NAVBAR — RESALTAR PÁGINA ACTIVA
   ============================================================ */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.navbar__links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

/* ============================================================
   VIAJES — FILTRO POR DESTINO
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const tripCards  = document.querySelectorAll('.trip-card');
const noResults  = document.querySelector('.no-results');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      tripCards.forEach(card => {
        const match = filter === 'all' || card.dataset.destination === filter;
        card.style.display = match ? 'flex' : 'none';
        if (match) visible++;
      });

      if (noResults) {
        noResults.style.display = visible === 0 ? 'block' : 'none';
      }
    });
  });
}

/* ============================================================
   FORMULARIO — SELECTOR DE ROL (TARJETAS)
   ============================================================ */
const roleCards       = document.querySelectorAll('.role-card');
const rolHidden       = document.getElementById('rolHidden');
const pasajeroSection = document.getElementById('pasajeroSection');
const conductorSection= document.getElementById('conductorSection');
const viajeSection    = document.getElementById('viajeSection');
const submitBtn       = document.getElementById('submitBtn');

if (roleCards.length > 0) {
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const rol = card.dataset.rol;
      rolHidden.value = rol;

      if (rol === 'pasajero') {
        pasajeroSection.classList.add('visible');
        conductorSection.classList.remove('visible');
      } else {
        conductorSection.classList.add('visible');
        pasajeroSection.classList.remove('visible');
      }

      viajeSection.classList.add('visible');
      submitBtn.classList.add('visible');

      const rolError = document.getElementById('rolError');
      if (rolError) rolError.textContent = '';
    });
  });
}

/* ============================================================
   FORMULARIO — VALIDACIÓN
   ============================================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const fields = [
    {
      el: document.getElementById('nombre'),
      error: document.getElementById('nombreError'),
      validate: val => val.trim().length >= 2 ? '' : 'Ingresá tu nombre completo.'
    },
    {
      el: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Ingresá un email válido.'
    },
    {
      el: document.getElementById('telefono'),
      error: document.getElementById('telefonoError'),
      validate: val => /^\d{7,15}$/.test(val.replace(/\s/g, '')) ? '' : 'Ingresá un teléfono válido (solo números).'
    },
    {
      el: document.getElementById('origen'),
      error: document.getElementById('origenError'),
      validate: val => val.trim().length >= 2 ? '' : 'Ingresá tu punto de partida.'
    },
    {
      el: document.getElementById('destino'),
      error: document.getElementById('destinoError'),
      validate: val => val !== '' ? '' : 'Seleccioná un destino.'
    },
    {
      el: document.getElementById('fecha'),
      error: document.getElementById('fechaError'),
      validate: val => val !== '' ? '' : 'Seleccioná una fecha.'
    },
    {
      el: document.getElementById('mensaje'),
      error: document.getElementById('mensajeError'),
      validate: val => val.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
    }
  ];

  /* Validación en tiempo real */
  fields.forEach(({ el, error, validate }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      const msg = validate(el.value);
      error.textContent = msg;
      el.classList.toggle('invalid', msg !== '');
    });
  });

  /* Validación completa al enviar */
  contactForm.addEventListener('submit', evt => {
    evt.preventDefault();

    let isValid = true;

    /* Validar rol */
    const rolError = document.getElementById('rolError');
    if (!rolHidden || rolHidden.value === '') {
      rolError.textContent = 'Seleccioná si sos pasajero/a o conductor/a.';
      isValid = false;
    } else {
      rolError.textContent = '';
    }

    /* Validar campos comunes y del viaje (solo si ya se mostró la sección) */
    fields.forEach(({ el, error, validate }) => {
      if (!el) return;
      const section = el.closest('.role-section');
      if (section && !section.classList.contains('visible')) return;
      const msg = validate(el.value);
      error.textContent = msg;
      el.classList.toggle('invalid', msg !== '');
      if (msg !== '') isValid = false;
    });

    if (isValid) {
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          contactForm.style.display = 'none';
          const success = document.getElementById('formSuccess');
          if (success) success.style.display = 'block';
        } else {
          alert('Hubo un error al enviar el formulario. Intentá de nuevo.');
        }
      })
      .catch(() => {
        alert('No se pudo conectar. Revisá tu conexión e intentá de nuevo.');
      });
    }
  });
}
