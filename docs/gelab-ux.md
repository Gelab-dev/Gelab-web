# Gelab UX & Accesibilidad — Reglas del proyecto

## Contraste y legibilidad
- Texto principal: mínimo #E0E0E0 sobre fondos oscuros
- Texto secundario (muted): mínimo #9A9AAA — nunca por debajo de ratio 4.5:1 (WCAG AA)
- Texto sobre fondo void (#0A0A0F): usar #9A9AAA como mínimo para muted
- Tamaño de fuente base: 17px — nunca por debajo de 14px en texto de contenido
- Interlineado mínimo: 1.6 para bloques de texto

## Accesibilidad
- Todo elemento interactivo debe tener estado :focus-visible visible
- Botones y links siempre con área de click mínima de 44x44px
- Imágenes decorativas con alt="" — imágenes de contenido con alt descriptivo
- Usar etiquetas semánticas: nav, main, section, article, header, footer
- Nunca usar solo color para transmitir información
- Formularios siempre con label asociado al input

## Navegación
- El logo siempre lleva a / (home)
- Links de la Navbar en páginas internas usan rutas absolutas (ej: /#servicios)
- El usuario siempre debe saber dónde está — breadcrumb o indicador activo en nav
- Toda página secundaria tiene forma de volver al home

## Feedback visual
- Estados de hover en todos los elementos interactivos
- Estados de loading explícitos — nunca dejar al usuario sin feedback
- Estados de error en formularios con mensaje descriptivo
- Confirmaciones visuales tras acciones exitosas

## Responsive
- Mobile-first — diseñar primero para 375px
- Breakpoint principal: 768px
- Menú hamburguesa en mobile con área de tap generosa
- Nunca texto que requiera scroll horizontal

## Performance
- Imágenes con lazy loading
- Fuentes con font-display: swap
- Animaciones respetan prefers-reduced-motion

## Copy y comunicación
- Hablar siempre en segunda persona: "vos", "tu negocio"
- Hablar siempre de "nosotros" como equipo.
- Sin tecnicismos — si hay uno necesario, explicarlo en la misma oración
- CTAs con verbo de acción claro: "Agendá", "Escribinos", "Probá"
- Mensajes de error en humano: "Algo salió mal, intentá de nuevo" — nunca códigos