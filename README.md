# Novuscampo — Marketplace ganadero

Marketplace ganadero para Latinoamérica. Web app + landing + prototipo navegable.

---

## Estructura del proyecto

```
novuscampo/
├── index.html          ← Landing page (entrada principal)
├── app.html            ← Prototipo navegable del marketplace
├── manifest.json       ← PWA — permite "instalar" la web como app
├── sw.js               ← Service worker para PWA
├── icon-192.png        ← Ícono PWA
├── icon-512.png        ← Ícono PWA
├── favicon.png         ← Favicon
└── README.md
```

Tamaño total: ~750 KB. Todo el contenido (imágenes, lógica) está embebido. Sin dependencias locales — React y Babel se cargan desde CDN en runtime.

---

## Cómo se experimenta el producto

Hay tres URLs distintas para tres audiencias distintas. Todas viven en el mismo repo.

### 1. Landing page — para todos
**URL:** `https://tu-usuario.github.io/tu-repo/`

Lo primero que ve cualquier persona que llega por Google, por WhatsApp, o por una recomendación. Explica qué es el producto en 5 segundos. CTA para entrar al marketplace.

### 2. App modo usuario — para productores y compradores
**URL:** `https://tu-usuario.github.io/tu-repo/app.html`

El prototipo del marketplace tal cual lo vería un productor o comprador. Sin sidebar, sin chrome de desarrollo, sin panel de admin. Solo el teléfono y los flujos reales.

Esto es lo que les compartís cuando querés mostrarles el producto y que lo prueben sin distracciones.

### 3. App modo presentación — para inversores y equipo
**URL:** `https://tu-usuario.github.io/tu-repo/app.html?demo=1`

Toda la app más una barra lateral negra con las 12 pantallas listadas, incluyendo el panel de admin (que solo te interesa a vos y a inversores que quieran ver el alcance del sistema). Sirve para presentaciones formales donde necesitás navegar a cualquier pantalla con un click.

---

## Cómo desplegarlo

### Opción A — GitHub Pages (recomendada)

```bash
git init
git add .
git commit -m "Novuscampo v0.3 — landing + app + PWA"
git remote add origin https://github.com/TU-USUARIO/novuscampo.git
git branch -M main
git push -u origin main
```

Luego en GitHub:
- Settings → Pages
- Source: `Deploy from a branch`
- Branch: `main` / `(root)`
- Save

URL queda: `https://TU-USUARIO.github.io/novuscampo/`

Tarda 1-3 minutos en activarse la primera vez.

### Opción B — Netlify Drop (sin git)

[app.netlify.com/drop](https://app.netlify.com/drop) → arrastrá la carpeta completa al navegador. URL pública en segundos. No requiere cuenta.

### Verlo en local

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`.

---

## PWA — "instalación" desde el navegador

Esta web es una Progressive Web App. Eso significa que un usuario en su teléfono puede tocar el botón de "Agregar a pantalla de inicio" del navegador (Chrome o Safari) y la web aparece como un ícono — se ve y se siente como una app, pero **no requiere descargar nada de la Play Store ni del App Store**.

Por qué es lo correcto para Novuscampo:
- El productor ganadero no va a descargar una app de marca desconocida.
- Pero sí va a tocar un link de WhatsApp y, si le gusta, lo va a guardar como ícono.
- Cero fricciones de adopción. Cero pasos de tienda.

Limitación honesta: la "instalación" PWA es menos visible que la de una app nativa. Los usuarios la descubren si vos se las explicás o si el navegador les sugiere instalar.

---

## Notas sobre el contenido

**Lo que es real en el prototipo:**
- 11 pantallas mobile + 1 admin desktop
- Flujos de navegación entre pantallas (los botones llevan al siguiente paso)
- Sistema de diseño completo (terracota, serif editorial, mono para meta)
- Logo de marca (cebú brahman + wordmark Novuscampo)

**Lo que es mock:**
- Los listings (3 ejemplos hardcodeados en `LISTINGS`)
- Los datos del productor / comprador
- Las métricas del admin (números de ejemplo, no son medibles)
- Los botones de "Abrir WhatsApp" muestran un `alert()` — en producción serían `wa.me` links

**Lo que no existe todavía:**
- Backend
- Base de datos
- Autenticación real
- Verificación de identidad
- Pagos (intencional — para MVP no se cobra)

---

## Para iterar

Si querés modificar algo del diseño o copy, lo más fácil es:
1. Abrí `app.html` o `index.html` en un editor.
2. Buscá el texto con Ctrl+F.
3. Cambialo.
4. `git commit && git push`.
5. GitHub Pages se actualiza solo en 1-2 minutos.

Si querés cambios estructurales (nuevas pantallas, nuevos flujos), conviene volver al pipeline original (mockup en Claude → diffs → regenerar prototipo) porque el HTML actual está bundleado y es difícil de editar a mano.

---

## Decisiones de producto reflejadas

Este prototipo encarna varias decisiones que vale la pena recordar:

1. **WhatsApp es el canal, no una fuga.** El cierre pasa fuera de la plataforma. Eso libera al producto de implementar pagos, escrow, chat interno.
2. **Confianza vía verificación, no vía gating.** Por default el contacto es directo. Cada productor puede activar opcionalmente el freno de aprobación si recibe spam.
3. **Fricciones reales del comercio ganadero declaradas.** Transporte, peso en finca vs embarque, visita previa, intermediarios — campos que reflejan cómo se negocia ganado en LATAM realmente.
4. **Sin compliance prematuro.** No INSAI, no RIF, no guía de movilización. Si alguien lo pide, va en la conversación de WhatsApp.
5. **Web app, no app nativa.** Cero fricciones de descarga. Distribución por URL compartible.
