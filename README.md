# Trabajo Final — Diseño y Desarrollo Web
## Proyecto: VoyConVos · Viajes compartidos a la costa argentina

**Problemática (única para los 3 sitios):** cada temporada miles de autos viajan a la
costa argentina casi vacíos, mientras muchas personas no consiguen cómo llegar o pagan
pasajes muy caros. Esto genera más gasto, más tránsito y más emisiones de CO₂.

**Solución:** *VoyConVos*, una plataforma **sin fines de lucro** de *carpooling* que conecta
conductores con lugar disponible y pasajeros que necesitan viajar, para compartir el camino
y los gastos.

---

## 🔗 Enlaces del proyecto

| Recurso | URL |
|---|---|
| 🌐 **Sitio 1 — One Page** | <https://voyconvos-onepage.netlify.app/> |
| 🌐 **Sitio 2 — Multi Page** | <https://voyconvos-multipage.netlify.app/> |
| 🌐 **Sitio 3 — Portfolio** | <https://espina-portfolio.netlify.app/> |
| 💻 **Repositorio (GitHub)** | <https://github.com/BloomDoom/VoyConVos> |
| 📊 **Panel de Netlify** | <https://app.netlify.com/> |
| ✉️ **Panel de EmailJS** | <https://dashboard.emailjs.com/> |

> Cada `git push` a la rama `main` redespliega automáticamente los 3 sitios en Netlify.

---

## 📂 Estructura

```
TrabajoFinal/
├── sitio1-onepage/      → Sitio 1 · One Page
│   ├── index.html
│   ├── css/estilos.css
│   ├── js/main.js
│   └── img/
├── sitio2-multipage/    → Sitio 2 · Multi Page
│   ├── index.html  institucional.html  galeria.html  viajes.html  contacto.html
│   ├── css/estilos.css
│   ├── js/main.js
│   └── img/
└── sitio3-portfolio/    → Sitio 3 · Portfolio profesional
    ├── index.html
    ├── css/estilos.css
    ├── js/main.js
    └── img/
```

---

## ✅ Cumplimiento de consignas

### Condiciones generales (los 3 sitios)
| Requisito | Cómo se cumple |
|---|---|
| Misma problemática | VoyConVos en los 3 sitios |
| Hosting gratuito | Netlify (ver *Despliegue*) |
| UX | Navegación clara, menú fijo accesible, contenido ordenado, textos legibles |
| UI | Colores consistentes (variables CSS), tipografías Google Fonts, botones/formularios uniformes |
| SEO | `<title>` único, `<meta name="description">`, jerarquía h1→h3, `alt` en imágenes, nombres de archivo descriptivos, HTML semántico |
| Formulario con **EmailJS** | `js/main.js` → `EMAILJS_CONFIG` (los 3 sitios) |
| **5 components JS (plugins)** | Bootstrap, AOS, Swiper, GLightbox, Typed.js, EmailJS |
| **5 clases CSS nativas** | `.btn--cta`, `.tarjeta-paso`, `.tarjeta-beneficio`, `.tarjeta-galeria`, `.etiqueta-seccion`, etc. |

### Sitio 1 — One Page
Una sola página `index.html` · HTML semántico (`header/nav/section/article/footer`) ·
+5 clases CSS propias · Bootstrap (CDN) · interacciones JS (menú responsive, slider Swiper,
animaciones al scroll, alertas del formulario) · +5 plugins · secciones **Inicio, Institucional,
Galería, Destinos, Contacto** · formulario + **mapa embebido**.

### Sitio 2 — Multi Page
Organización en carpetas `/css /js /img` con rutas relativas · 5 páginas enlazadas ·
todo por **CDN** (Bootstrap, íconos, AOS, Swiper, GLightbox, EmailJS) · formulario **EmailJS** ·
galería con **GLightbox** · mapa embebido · la problemática y su solución se explican en
`institucional.html`.

### Sitio 3 — Portfolio profesional
Plantilla one-page personalizada con identidad propia (colores, secciones, proyectos) ·
contenido mínimo: **presentación, habilidades, proyectos, contacto, redes** · formulario
**EmailJS** · +5 plugins · desplegable en hosting gratuito.

> La template solo se usa en el Portfolio. Los sitios One Page y Multi Page fueron
> desarrollados íntegramente (HTML semántico, CSS nativo, Bootstrap, JavaScript y plugins).

---

## ✉️ EmailJS (formulario real)

✅ **Ya configurado** — los formularios de los 3 sitios envían correos reales mediante
EmailJS (servicio Gmail). La configuración vive en cada `js/main.js`:

```js
const EMAILJS_CONFIG = {
  PUBLIC_KEY:  "...",
  SERVICE_ID:  "...",
  TEMPLATE_ID: "..."
};
```

Si en el futuro cambian las credenciales, se editan esos 3 valores (Public Key en
**Account**, Service ID en **Email Services**, Template ID en **Email Templates** del
panel de EmailJS). Los `name` de los inputs coinciden con las variables del template
(`{{nombre}}`, `{{email}}`, `{{telefono}}`, `{{rol}}`, `{{destino}}`, `{{asunto}}`, `{{mensaje}}`).

---

## 🚀 Despliegue en Netlify (gratis)

✅ **Ya desplegado.** Los 3 sitios viven en este mismo repo y están conectados a Netlify
(GitHub → Netlify). Cada uno es un sitio de Netlify que apunta a su subcarpeta:

| Sitio | Publish directory | Build command | URL |
|---|---|---|---|
| Sitio 1 | `sitio1-onepage` | *(vacío)* | <https://voyconvos-onepage.netlify.app/> |
| Sitio 2 | `sitio2-multipage` | *(vacío)* | <https://voyconvos-multipage.netlify.app/> |
| Sitio 3 | `sitio3-portfolio` | *(vacío)* | <https://espina-portfolio.netlify.app/> |

Cada `git push` a `main` dispara un redeploy automático de los 3 sitios.

---

## ▶️ Probar localmente

Abrí cada `index.html` en el navegador, o levantá un servidor simple:
```bash
# desde la carpeta de un sitio
python -m http.server 5500
# luego abrí http://localhost:5500
```

## 🎨 Créditos
- **Fotos de los destinos** (Mar del Plata, Pinamar, Villa Gesell, Miramar, Necochea,
  Mar de las Pampas): Wikimedia Commons, licencias libres (CC / dominio público).
  Detalle en [`CREDITOS-IMAGENES.md`](CREDITOS-IMAGENES.md).
- Foto del hero: Ruta 11 (tramo Villa Gesell–Cariló).
- Imágenes genéricas de autos/rutas/viajeros: stock de uso libre.
- Librerías vía CDN: Bootstrap, Bootstrap Icons, AOS, Swiper, GLightbox, Typed.js, EmailJS.
- Tipografías: Google Fonts (Poppins, Inter, Sora).
