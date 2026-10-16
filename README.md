# Landing con Astro y Sanity

Bootstrap de la landing definida en [PRD.md](PRD.md): una única ruta `/`, contenido publicado de Sanity y generación estática con Astro. La estructura contiene cabecera, bloque principal con CTA, bloque descriptivo opcional y pie de página. Studio funciona como aplicación separada.

La implementación sigue el alcance de la futura entrega técnica del PRD. El español es provisional hasta que producto confirme el idioma. Marca, oferta, mensajes, imágenes, destino comercial del CTA, proyecto y dataset de Sanity, visibilidad del dataset, dominio y alojamiento siguen pendientes. **Responsable de reconstrucción y despliegue: sin asignar.** No se ha creado infraestructura, importado contenido ni desplegado el sitio.

## Estado de la entrega

Se han preparado el código, los esquemas, las plantillas de configuración, una muestra local y las pruebas de validación. La instalación está bloqueada en este entorno: no se puede resolver el registro de npm por DNS, la caché no contiene Astro/Sanity y la política del entorno impide elevar permisos para resolverlo.

**Todavía no existen `package-lock.json`.** Por ello, `npm ci` no es utilizable en esta entrega. La instalación reproducible, la comprobación de tipos, las construcciones, la ejecución en navegador y la integración real con Sanity quedan pendientes. Las versiones de dependencias indicadas abajo están fijadas en los manifiestos; no constituyen una combinación instalada o verificada.

## Entorno y versiones

| Componente | Versión |
| --- | --- |
| Node.js observado y fijado en `.nvmrc` | 24.19.0 |
| npm observado | 11.17.0 |
| Astro | 7.3.6 |
| `@sanity/client` | 8.9.0 |
| `@astrojs/check` | 0.9.10 |
| TypeScript, web y Studio | 5.9.3 |
| Sanity Studio | 6.17.0 |
| React / React DOM de Studio | 19.3.0 |
| `styled-components` de Studio | 6.1.19 |

Los manifiestos completos están en [web/package.json](web/package.json) y [studio/package.json](studio/package.json). Las pruebas utilizan el ejecutor nativo de Node y su soporte de TypeScript; no requieren Vitest ni dependencias instaladas.

## Primera instalación

Desde la raíz del repositorio, con Node 24.19.0 y npm 11.17.0, cuando exista acceso al registro de npm:

```sh
npm --prefix web install
npm --prefix studio install
```

Estos comandos deben generar `web/package-lock.json` y `studio/package-lock.json`. Se deben revisar e incorporar ambos bloqueos a la entrega, completar las comprobaciones y registrar las versiones resueltas. A partir de ese momento, las instalaciones desde una copia limpia utilizarán los comandos `npm ci` exigidos por el PRD.

```sh
cp web/.env.example web/.env
cp studio/.env.example studio/.env.local
```

Completar los archivos de entorno con un proyecto y dataset autorizados. Los archivos locales de entorno están excluidos del control de versiones. No se presupone un dataset llamado `production` ni una cuenta ya configurada.

## Configuración

| Variable | Archivo / consumidor | Valor esperado |
| --- | --- | --- |
| `SANITY_PROJECT_ID` | `web/.env`, proceso de Astro | ID del proyecto autorizado. |
| `SANITY_DATASET` | `web/.env`, proceso de Astro | Nombre del dataset autorizado. |
| `SANITY_API_VERSION` | `web/.env`, proceso de Astro | Fecha fija; la plantilla establece `2025-02-19`. No usar la fecha actual dinámicamente. |
| `SANITY_READ_TOKEN` | Entorno del proceso de construcción | Solo si el dataset requiere lectura autenticada; token con permiso de lectura. |
| `SITE_URL` | `web/.env`, proceso de Astro | URL HTTPS pública real de la raíz, sin ruta adicional, query ni fragmento. |
| `SANITY_STUDIO_PROJECT_ID` | `studio/.env.local`, Studio | El mismo proyecto configurado para la web. |
| `SANITY_STUDIO_DATASET` | `studio/.env.local`, Studio | El mismo dataset configurado para la web. |

El proyecto y el dataset no son secretos. Las variables `SANITY_STUDIO_*` son visibles en el navegador. El token de lectura se proporciona exclusivamente al proceso servidor que obtiene el contenido durante la construcción; nunca debe usar un prefijo público, incluirse en Studio, registrarse en logs ni copiarse a los archivos desplegados. Para desarrollo con un dataset privado, el proceso de Astro también necesita ese permiso de lectura; el visitante no recibe el token.

La consulta selecciona explícitamente `_type == "landingPage"` y `_id == "landingPage"`, solicita los campos necesarios y utiliza `perspective: 'published'` y `useCdn: false`. El documento se valida antes de renderizar. Si la consulta falla o falta contenido obligatorio, se interrumpe la construcción con un error sin credenciales. No existe sustitución automática por contenido de muestra.

Studio facilita la edición del documento fijo y elimina la acción de duplicarlo. Este control editorial no impone unicidad en Content Lake; la consulta pública sigue dependiendo del ID exacto `landingPage`.

## Comandos

Todos se ejecutan desde la raíz:

| Acción | Comando |
| --- | --- |
| Instalar web con bloqueo existente — pendiente de generar | `npm --prefix web ci` |
| Instalar Studio con bloqueo existente — pendiente de generar | `npm --prefix studio ci` |
| Ejecutar web con Sanity | `npm --prefix web run dev` |
| Ejecutar Studio | `npm --prefix studio run dev` |
| Comprobar tipos y archivos Astro | `npm --prefix web run check` |
| Ejecutar pruebas de validación web | `npm --prefix web run test` |
| Construir web con Sanity | `npm --prefix web run build` |
| Revisar localmente la construcción web | `npm --prefix web run preview` |
| Construir Studio y comprobar sus tipos | `npm --prefix studio run build` |
| Comprobar tipos de Studio | `npm --prefix studio run check` |
| Ejecutar pruebas de validación de Studio | `npm --prefix studio run test` |
| Ejecutar la muestra local | `npm --prefix web run dev:sample` |
| Construir la muestra local | `npm --prefix web run build:sample` |
| Revisar la construcción de muestra | `npm --prefix web run preview:sample` |

La salida normal está en `web/dist/`. La muestra se construye por separado en `web/dist-sample/`. `preview` sirve para revisar una construcción local; el despliegue público debe servir los archivos estáticos con el alojamiento que se seleccione.

## Contenido de muestra y edición

[content/landingPage.sample.ndjson](content/landingPage.sample.ndjson) contiene un único documento importable con ID `landingPage`. **No se ha importado en Sanity.** No incluye imágenes y señala expresamente que sus textos y su enlace a Astro son de muestra. Ese enlace permite comprobar un destino HTTPS real, pero no representa la acción comercial del producto.

Los comandos `*:sample` permiten revisar la estructura sin configurar Sanity ni `SITE_URL`. Usan una canónica local y marcan la muestra para no indexarla. La muestra no debe utilizarse como despliegue comercial. Una importación futura requiere seleccionar el proyecto y dataset autorizados y revisar el documento existente antes de cargarlo.

En Studio se editan nombre y logotipo de marca, título y descripción principales, imagen principal, CTA, bloque descriptivo, texto y enlaces del pie y metadatos. El CTA y cada enlace necesitan etiqueta y destino completos; se admiten HTTPS, correo y teléfono validados. Los campos de texto son datos, sin HTML arbitrario.

Para omitir el bloque descriptivo, vaciar tanto el título como el cuerpo. Las imágenes son opcionales; cuando se usen, necesitan un archivo válido y dimensiones disponibles. Las imágenes informativas requieren texto alternativo y las decorativas se marcan como tales para presentar una alternativa vacía. Antes de una publicación comercial, sustituir toda la muestra por contenido aprobado y comprobar el destino real del CTA.

## Actualizar, desplegar y recuperar

**Publicar en Sanity no actualiza una web estática ya desplegada.** La persona responsable debe completar este flujo manual después de cada cambio:

1. Editar el documento `landingPage` en Studio, corregir las validaciones y publicar. Guardar un borrador no es publicar.
2. Ejecutar las pruebas y la comprobación de la web:

   ```sh
   npm --prefix web run test
   npm --prefix web run check
   npm --prefix web run build
   ```

3. Si cualquiera de los pasos falla, detener el despliegue y mantener intacta la última versión válida que está sirviendo el alojamiento.
4. Revisar el resultado con `npm --prefix web run preview`, confirmar contenido y metadatos e inspeccionar los archivos públicos para comprobar que no contienen secretos.
5. Crear una versión de despliegue nueva a partir de `web/dist/`, identificada por fecha y revisión del código. Conservar la versión válida anterior. Usar el mecanismo del alojamiento elegido para activar la versión completa de forma atómica, después de verificarla; no copiar archivos progresivamente sobre la versión que recibe tráfico.
6. Abrir la URL pública y comprobar el título nuevo, las imágenes y el CTA. Registrar la versión activada, el resultado y la persona que realizó el despliegue.
7. Si falla la comprobación pública, restaurar de forma atómica la versión válida anterior mediante el mecanismo de rollback del alojamiento y verificar la URL pública otra vez.

Los comandos concretos de despliegue, activación y rollback quedan pendientes de seleccionar el alojamiento. La construcción de Studio produce su propia aplicación en `studio/dist/`; su publicación y el acceso de editores también dependen del entorno autorizado. No hay despliegues automáticos ni webhooks.

Despublicar en Sanity no retira el HTML ya servido. Una retirada urgente exige actuar también sobre la versión desplegada; intentar reconstruir con el documento ausente producirá un error y, por diseño, no eliminará el sitio anterior.

## Evidencia y verificaciones pendientes

Registro del 16 de octubre de 2026:

| Verificación | Evidencia / estado |
| --- | --- |
| Entorno | Node `24.19.0`, npm `11.17.0`. |
| Pruebas web | 40 casos aprobados con `npm --prefix web run test`: contenido obligatorio, documento, ID publicado, enlaces, imágenes, omisión de opcionales, configuración y fallos simulados de consulta. |
| Pruebas Studio | 4 casos aprobados con `npm --prefix studio run test`: campos obligatorios, bloque descriptivo e imágenes accesibles. |
| Tipos de las funciones puras | Validación de contenido, configuración, enlaces, validadores editoriales y sus pruebas comprobados en modo estricto con un compilador TypeScript 5.9.3 ya disponible localmente. No incluye componentes Astro, SDK ni configuración de Studio. |
| Revisión del código | Corregidos dominios/correos mal formados y objetos de imagen vacíos; una mutación temporal que admitía esquemas no HTTPS fue detectada por 7 pruebas. Código original restaurado. |
| Contraste de colores definidos en CSS | Cálculo sRGB: texto principal 13,06:1, secundario 6,00:1, CTA 9,54:1 y foco 6,23:1 sobre sus fondos. No sustituye la revisión visual en navegador. |
| Instalación y archivos de bloqueo | Bloqueados por acceso al registro de npm; no hay lockfiles. |
| Tipos y construcción Astro / Studio | Pendientes de instalar las dependencias. |
| Sanity real, publicado frente a borrador | Pendiente de proyecto, dataset y acceso autorizado. |
| Navegadores, HTML de producción, imágenes y CTA | Pendientes de una construcción ejecutable. |
| Lighthouse | No ejecutado; no hay puntuación de rendimiento medida. |
| Despliegue, conservación de versión y rollback | Pendientes de alojamiento y responsable. |

Los casos locales validan funciones y utilizan datos o consultas simulados. No demuestran que el SDK consulte un dataset real, que Studio compile, que Astro genere HTML correcto ni que el recorrido completo de publicación funcione. En particular, rechazar un ID de borrador en una prueba no sustituye CA-04 contra Sanity.

Después de desbloquear instalación y configuración, realizar y registrar estas comprobaciones:

| Criterio | Procedimiento y resultado que debe registrarse |
| --- | --- |
| CA-01 | Desde una copia limpia, instalar con ambos lockfiles, completar las variables y ejecutar web y Studio siguiendo este README. Registrar versiones y salidas de los comandos. |
| CA-02 | En un dataset de pruebas autorizado, publicar `landingPage` con contenido válido, construir la web y servir `web/dist/`. Comprobar textos, imágenes y CTA contra el documento publicado. |
| CA-03 | Cambiar el título desde Studio, publicarlo, reconstruir y desplegar una nueva versión. Confirmar el nuevo título en la URL servida sin modificar componentes. |
| CA-04 | Guardar un título claramente distinto como borrador del mismo documento, sin publicarlo. Reconstruir; inspeccionar `web/dist/index.html` y confirmar que conserva el título publicado y no contiene el del borrador. |
| CA-05 | Preparar datos controlados de prueba sin documento, título o CTA obligatorio. Comprobar que una construcción que recibe esos datos termina con error de campo o documento y que no se activa ninguna versión incompleta. Studio también debe impedir publicar campos obligatorios inválidos. |
| CA-06, RF-07 | Publicar una variante sin imágenes ni bloque descriptivo: no debe haber espacios o títulos vacíos ni imágenes rotas. Repetir con imágenes informativas y decorativas; comprobar alternativa textual, dimensiones reservadas y ausencia de distorsión. |
| CA-07, RNF-02, RNF-05 | Recorrer todos los enlaces con Tab y activarlos con Enter. Comprobar foco visible y orden coherente. Medir contraste mínimo de 4,5:1 para texto normal y 3:1 para texto grande. |
| CA-08 | Revisar a 360, 768 y 1440 píxeles de ancho: sin desplazamiento horizontal, solapamientos ni CTA inaccesible. |
| CA-09 | Inspeccionar el HTML normal generado: un único `h1`, regiones y títulos coherentes, título SEO, descripción, idioma, canónica igual a `SITE_URL` y ausencia de un bloqueo accidental de indexación. |
| CA-10 | Desactivar JavaScript y recargar la construcción: el mensaje y el CTA deben seguir disponibles y el enlace debe funcionar. |
| CA-11 | Conservar una versión válida ya servida. Provocar un fallo controlado de la consulta al CMS en el entorno de construcción; comprobar su salida fallida, ausencia de credenciales en el error y que la URL servida continúa mostrando la versión anterior. |
| CA-12 | Inspeccionar HTML y recursos públicos de `web/dist/`: no deben contener tokens ni otros secretos. Si se usa una credencial de prueba, comprobar su ausencia sin imprimir su valor en logs ni evidencia. |
| CA-13 | Ejecutar tres auditorías Lighthouse móviles de la misma construcción de producción servida. Registrar las tres puntuaciones, su mediana, versión de Lighthouse y Chromium, sistema, URL, fecha, condiciones de CPU/red y caché. La mediana de rendimiento debe ser al menos 90. |
| RNF-11 | Repetir la revisión funcional en las versiones estables disponibles de Chromium, Firefox y Safari; registrar sus versiones y cualquier navegador no probado. |
| CA-14 | Obtener aprobación de marca, idioma, textos, imágenes, dominio y destino del CTA. Confirmar que no quedan recursos de muestra ni enlaces ficticios. |

La evidencia debe distinguir pruebas aprobadas, fallidas y no ejecutadas, e incluir el identificador de la construcción y los resultados observados. La revisión manual de teclado, contraste y pantallas complementa Lighthouse.

## Organización y límites

| Ruta | Responsabilidad |
| --- | --- |
| `web/src/pages/`, `layouts/`, `components/`, `styles/` | Ruta pública, HTML, presentación y estilos. |
| `web/src/lib/sanity.ts` | Consulta explícita al contenido publicado. |
| `web/src/lib/content.ts`, `landing.ts`, `config.ts` | Manejo de errores, validación del contenido y configuración. |
| `studio/schemaTypes/` | Modelo y validaciones editoriales. |
| `shared/links.ts` | Reglas de destinos compartidas entre web y Studio. |
| `web/tests/`, `studio/tests/` | Pruebas de validación sin servicios externos. |
| `content/landingPage.sample.ndjson` | Documento de muestra local e importable. |

El alcance se limita a una landing de estructura fija y un idioma, con contenido de Sanity consultado al construir. Blog, catálogo, comercio electrónico, cuentas de visitantes, buscador, formularios propios, CRM, analítica, pruebas A/B, páginas adicionales, múltiples idiomas, generador visual, edición visual en contexto, vista previa de borradores y automatización por webhooks permanecen fuera del alcance del PRD.

## Referencias oficiales

- [Astro: integración con Sanity](https://docs.astro.build/en/guides/cms/sanity/): integración de contenido del CMS con la web.
- [Astro: despliegue](https://docs.astro.build/en/guides/deploy/): generación y publicación de la salida estática.
- [Astro: referencia de comandos](https://docs.astro.build/en/reference/cli-reference/) y [configuración](https://docs.astro.build/en/reference/configuration-reference/): modos de ejecución, directorio de salida y generación estática.
- [Cliente JavaScript/TypeScript de Sanity](https://github.com/sanity-io/client): cliente oficial, fecha de API y configuración de consulta.
- [Sanity: perspectivas de contenido](https://www.sanity.io/docs/content-lake/perspectives): consulta de contenido publicado y separación de borradores.
- [Sanity Studio: tipos de esquema](https://www.sanity.io/docs/studio/schema-types): estructura y validación del contenido editable.
- [Sanity Studio: documentos singleton](https://www.sanity.io/docs/studio/structure-builder-cheat-sheet): API utilizada para abrir el documento fijo `landingPage` y prevenir su duplicación editorial.

El alcance, los criterios de aceptación y los umbrales de esta entrega proceden de [PRD.md](PRD.md).
