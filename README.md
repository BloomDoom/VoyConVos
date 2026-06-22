# Trabajo Final — Diseño y Desarrollo Web
## Proyecto: VoyConVos · Viajes compartidos a la costa argentina

**Problemática (única para los 3 sitios):** cada temporada miles de autos viajan a la
costa argentina casi vacíos, mientras muchas personas no consiguen cómo llegar o pagan
pasajes muy caros. Esto genera más gasto, más tránsito y más emisiones de CO₂.

**Solución:** *VoyConVos*, una plataforma **sin fines de lucro** de *carpooling* que conecta
conductores con lugar disponible y pasajeros que necesitan viajar, para compartir el camino
y los gastos.

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
filtro de destinos, contadores, alertas) · +5 plugins · secciones **Inicio, Institucional,
Galería, Destinos/Categorías, Contacto** · formulario + **mapa embebido**.

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

## ✉️ Configurar EmailJS (formulario real)

Los formularios funcionan en **modo DEMO** sin configuración (muestran el mensaje de éxito).
Para enviar correos reales:

1. Creá una cuenta gratis en <https://www.emailjs.com/>.
2. **Email Services** → conectá tu correo → copiá el **Service ID**.
3. **Email Templates** → creá una plantilla con variables `{{nombre}}`, `{{email}}`,
   `{{telefono}}`, `{{destino}}`, `{{mensaje}}` → copiá el **Template ID**.
4. **Account** → copiá tu **Public Key**.
5. En cada `js/main.js`, reemplazá:
   ```js
   const EMAILJS_CONFIG = {
     PUBLIC_KEY:  "tu_public_key",
     SERVICE_ID:  "tu_service_id",
     TEMPLATE_ID: "tu_template_id"
   };
   ```
   Los `name` de los inputs ya coinciden con las variables sugeridas.

---

## 🚀 Despliegue en Netlify (gratis)

**Opción rápida (drag & drop):**
1. Entrá a <https://app.netlify.com/drop>.
2. Arrastrá **cada carpeta de sitio por separado** (`sitio1-onepage`, etc.).
3. Netlify te da una URL pública por sitio. Listo.

**Opción Git:** subí cada sitio a un repo y conectalo en Netlify
(*Build command:* vacío · *Publish directory:* raíz del sitio).

> El proyecto base *VoyConVos* ya está publicado en GitHub Pages:
> <https://github.com/BloomDoom/VoyConVos>

---

## ▶️ Probar localmente

Abrí cada `index.html` en el navegador, o levantá un servidor simple:
```bash
# desde la carpeta de un sitio
python -m http.server 5500
# luego abrí http://localhost:5500
```

## 🎨 Créditos
- Imágenes: Unsplash (libres de uso).
- Librerías vía CDN: Bootstrap, Bootstrap Icons, AOS, Swiper, GLightbox, Typed.js, EmailJS.
- Tipografías: Google Fonts (Poppins, Inter, Sora).
