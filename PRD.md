# PRD — Bootstrap de una landing page con Astro + Sanity CMS

| Campo | Valor |
| --- | --- |
| Versión | 1.0 |
| Fecha | 16 de octubre de 2026 |
| Estado | Propuesta de requisitos para revisión |
| Producto | Landing page con contenido administrado desde Sanity CMS |
| Frontend | Astro + TypeScript |
| Gestión de contenido | Sanity Studio + Content Lake |
| Entregable de esta solicitud | Documento Markdown; sin implementación ni modificaciones de repositorios |

> **Objetivo principal: crear una landing page con Astro y gestionar su contenido mediante Sanity CMS. El bootstrap debe preparar la base técnica y editorial necesaria para construir, ejecutar y publicar esa landing page.**

> **Procedencia:** esta es una nueva redacción basada en los requisitos disponibles y en la aclaración de que el producto es una landing page. El texto íntegro de la respuesta anterior no estuvo accesible; por ello, este documento no se presenta como una transcripción ni garantiza conservar sus tablas o redacción originales. Los requisitos no confirmados se identifican como propuestas o decisiones pendientes.

## 1. Contexto y necesidad

Se necesita iniciar un proyecto que permita presentar una propuesta de valor en una landing page rápida, adaptable a distintos dispositivos y fácil de mantener. El equipo responsable del contenido debe poder modificar textos, imágenes y enlaces desde un CMS sin editar componentes de la web.

Astro se utilizará para construir la experiencia pública. Sanity se utilizará para modelar, editar y publicar el contenido que consume esa página. Astro está orientado a sitios basados en contenido, y su documentación reconoce la integración con Sanity como CMS. [Astro](https://astro.build/), [Sanity y Astro](https://docs.astro.build/en/guides/cms/sanity/).

El bootstrap deberá dejar una primera landing funcional con contenido de muestra claramente identificado y una estructura suficiente para sustituirlo por contenido real. La aprobación de marca, mensajes y recursos finales corresponde al responsable del producto.

## 2. Objetivos y resultados esperados

### 2.1 Objetivo de producto

Crear una landing page que comunique una propuesta de valor y conduzca al visitante hacia una acción principal mediante un enlace configurable. El tipo concreto de conversión y su destino se definirán antes de la publicación pública.

### 2.2 Objetivo del bootstrap

Dejar preparada una base reproducible que conecte Astro con Sanity, incluya un modelo de contenido para la landing y permita comprobar el recorrido completo de edición, publicación en el CMS, construcción y despliegue del sitio.

| Resultado | Condición de éxito |
| --- | --- |
| Landing funcional | La ruta `/` muestra el contenido de la landing y su llamado a la acción principal. |
| Contenido administrable | Un editor puede cambiar los campos definidos en este PRD desde Sanity Studio. |
| Integración comprobable | Un cambio publicado aparece en la web después de una nueva construcción y un despliegue exitosos. |
| Arranque reproducible | Otra persona puede instalar y ejecutar el proyecto siguiendo su documentación y usando las variables requeridas. |
| Base mantenible | La consulta al CMS, la validación del contenido y los componentes de presentación están separados. |
| Preparación para publicación | Existen verificaciones de contenido, navegación, adaptación a pantallas y metadatos. |

No se fija una tasa de conversión: faltan la oferta, el público, la fuente de tráfico y una línea de base. La medición analítica no forma parte del bootstrap propuesto.

## 3. Usuarios y necesidades

| Usuario | Necesidad | Recorrido esperado |
| --- | --- | --- |
| Visitante | Entender la propuesta y saber qué acción realizar. | Accede a la landing, lee su contenido y utiliza el enlace principal. |
| Editor de contenido | Actualizar la información sin modificar código. | Accede a Studio, edita el documento de la landing, valida y publica. |
| Desarrollador | Ejecutar y mantener una integración clara. | Configura el entorno, ejecuta el sitio, comprueba el contenido y genera la versión publicable. |
| Responsable del producto | Validar que la página representa la oferta correcta. | Revisa mensajes, recursos visuales, destino del CTA y resultado final. |

## 4. Alcance

### 4.1 Requisitos confirmados

- El producto a construir es una **landing page**.
- El frontend utiliza **Astro**.
- El contenido se administra con **Sanity CMS**.
- Se requiere un PRD en Markdown que incluya estructura, tablas, criterios de aceptación y referencias.
- Esta solicitud entrega documentación; no ejecuta el bootstrap, no modifica repositorios y no implementa funcionalidades.

### 4.2 Base propuesta para el bootstrap

Estas decisiones permiten concretar el documento sin asumir características comerciales no suministradas:

- Una landing en la ruta `/`, para una marca u oferta y un solo idioma.
- Una estructura fija de presentación con contenido editable; los cambios de diseño se realizan en código.
- Una cabecera, un bloque principal con propuesta de valor, un bloque descriptivo y un pie de página.
- Un llamado a la acción principal, representado por texto y enlace.
- Imágenes opcionales administradas desde Sanity.
- Un documento de contenido de la landing con identificador conocido.
- Generación estática de la página con contenido publicado consultado durante la construcción.
- Sanity Studio separado de la web pública.
- Un procedimiento manual documentado para reconstruir y desplegar después de publicar contenido.

### 4.3 Fuera del alcance propuesto

No se incorporan blog, catálogo, comercio electrónico, cuentas para visitantes, buscador, páginas dinámicas adicionales, formularios con procesamiento propio, CRM, analítica, pruebas A/B, múltiples idiomas, generador visual de páginas, edición visual en contexto, vista previa de borradores ni automatización de despliegues mediante webhooks.

Cualquier incorporación posterior deberá tratarse como una ampliación del alcance. El acceso de editores a Sanity utiliza las capacidades del CMS y no implica crear un sistema de autenticación para la landing.

## 5. Experiencia de la landing

### 5.1 Estructura propuesta

| Bloque | Propósito | Contenido editable | Regla de presentación |
| --- | --- | --- | --- |
| Cabecera | Identificar la marca. | Nombre y logotipo opcional. | Debe mantener una lectura clara en pantallas pequeñas. |
| Bloque principal o hero | Explicar la propuesta y presentar la acción principal. | Título, descripción, imagen opcional, texto y destino del CTA. | Debe contener el único encabezado `h1`. |
| Bloque descriptivo | Ampliar la información sobre la oferta. | Título y texto. | Se omite si no contiene información; no deja espacios ni títulos vacíos. |
| Pie de página | Mostrar información de cierre. | Texto y enlaces suministrados por el responsable del producto. | Solo muestra enlaces completos y válidos. |

No se presupone que existan testimonios, precios, estadísticas, clientes o certificaciones. No deben inventarse para completar el diseño.

### 5.2 Comportamiento del CTA

- El CTA será un enlace semántico con etiqueta comprensible.
- El destino deberá estar completo antes de la publicación pública.
- Se admiten enlaces HTTPS y, si la acción elegida lo requiere, enlaces de correo o teléfono validados.
- No se aceptan destinos vacíos, enlaces ficticios ni esquemas ejecutables como `javascript:`.
- El enlace debe poder utilizarse con teclado y sin depender de JavaScript de cliente.
- Si se decide abrir un destino en otra pestaña, deberá indicarse de forma accesible y aplicarse una configuración segura del enlace.

### 5.3 Contenido provisional

El entorno de desarrollo puede utilizar textos e imágenes de ejemplo identificados como tales. No se publicará la landing comercial hasta sustituirlos por contenido aprobado y comprobar el destino real del CTA.

## 6. Gestión y modelo de contenido

Sanity Studio permite definir esquemas de contenido para estructurar los datos que edita el equipo. El siguiente modelo es una propuesta específica para esta landing. [Esquemas de Sanity](https://www.sanity.io/docs/studio/schema-types).

### 6.1 Documento `landingPage`

Se propone un documento con identificador estable `landingPage`, seleccionado explícitamente por la consulta. La interfaz de Studio debe facilitar la edición de ese documento y evitar su duplicación accidental. Esa configuración editorial no debe tratarse como una restricción de unicidad de la base de datos.

| Campo | Tipo propuesto | Obligatorio | Validación o uso |
| --- | --- | --- | --- |
| `brandName` | Texto corto | Sí | Nombre visible de la marca; no vacío. |
| `logo` | Imagen | No | Si se utiliza, debe tener tratamiento accesible adecuado. |
| `hero.title` | Texto corto | Sí | Mensaje principal; se renderiza como `h1`. |
| `hero.description` | Texto | Sí | Explicación breve de la propuesta. |
| `hero.image` | Imagen | No | Recurso visual asociado al mensaje. |
| `hero.image.alt` | Texto | Condicional | Requerido cuando la imagen comunica información. |
| `hero.image.decorative` | Booleano | No | Si es verdadero, la imagen se presenta con alternativa vacía. |
| `primaryCta.label` | Texto corto | Sí | Describe la acción que realizará el visitante. |
| `primaryCta.href` | Texto validado como destino | Sí | HTTPS, correo o teléfono según la decisión de producto. |
| `details.title` | Texto corto | No | Solo se muestra junto a un bloque descriptivo completo. |
| `details.body` | Texto | No | Contenido descriptivo sin HTML arbitrario. |
| `footer.text` | Texto | No | Información de cierre aprobada. |
| `footer.links` | Lista de objetos | No | Cada elemento debe tener etiqueta y destino válidos. |
| `seo.title` | Texto corto | Sí | Título de la página en los metadatos. |
| `seo.description` | Texto | Sí | Descripción de la página. |
| `seo.shareImage` | Imagen | No | Imagen para compartir la página cuando haya un recurso aprobado. |

### 6.2 Reglas editoriales

1. Los campos obligatorios deben mostrar errores comprensibles antes de publicar desde Studio.
2. El proceso de construcción debe validar también los datos recibidos: las validaciones del editor no reemplazan la validación del consumidor.
3. Los campos opcionales vacíos se omiten de la presentación.
4. Una publicación inválida recibida por la integración debe impedir generar una nueva versión incompleta del sitio.
5. El contenido se trata como datos: no se ejecutan scripts ni se acepta HTML arbitrario desde campos de texto.
6. Los recursos de muestra y los datos reales deben distinguirse claramente en la documentación.

## 7. Requisitos funcionales

Todos los requisitos de esta tabla pertenecen a la propuesta de alcance de la versión inicial.

| ID | Requisito | Criterio de aceptación |
| --- | --- | --- |
| RF-01 | Ejecutar la landing con Astro. | La ruta `/` carga con el contenido esperado en desarrollo y en la compilación de producción. |
| RF-02 | Administrar el contenido con Sanity Studio. | Un editor autorizado puede modificar los campos descritos sin cambiar archivos del frontend. |
| RF-03 | Consultar el documento correcto. | La web recupera el documento de identificador conocido y los campos necesarios; no selecciona arbitrariamente el primer documento disponible. |
| RF-04 | Mostrar únicamente contenido publicado. | Un borrador con un título diferente no aparece en el HTML generado para la landing. |
| RF-05 | Renderizar la estructura de la landing. | Cabecera, hero, CTA y pie se presentan correctamente; los bloques opcionales respetan sus reglas de omisión. |
| RF-06 | Permitir una acción principal. | El CTA utiliza la etiqueta y el destino configurados, y funciona con ratón y teclado. |
| RF-07 | Presentar imágenes del CMS. | Los recursos presentes se muestran sin distorsión, con espacio reservado y alternativa accesible cuando corresponde. |
| RF-08 | Generar metadatos. | El HTML contiene título, descripción, idioma y URL canónica coherente con la URL pública configurada. |
| RF-09 | Validar el contenido antes de publicar el sitio. | Si falta el título, el CTA o el documento, la construcción falla con un mensaje útil. |
| RF-10 | Documentar la actualización del sitio. | El README explica editar, publicar, reconstruir, desplegar y comprobar el cambio. |
| RF-11 | Configurar el entorno sin secretos en el código. | Existe una plantilla de variables sin credenciales y la documentación explica cómo completar cada una. |
| RF-12 | Producir una salida desplegable. | La construcción genera los archivos de la landing y se verifica que pueden servirse desde un alojamiento estático. |

## 8. Arquitectura propuesta

### 8.1 Responsabilidades

| Elemento | Responsabilidad |
| --- | --- |
| Sanity Studio | Edición, validación editorial y publicación del documento. |
| Sanity Content Lake | Almacenamiento y consulta de contenido. |
| Cliente de Sanity | Recuperación de los campos publicados necesarios durante la construcción. |
| Validación de la landing | Comprobación del contenido recibido y generación de errores claros. |
| Astro | Generación del HTML, estilos, estructura y metadatos de la landing. |
| Alojamiento estático | Entrega de la versión construida al visitante. |

Flujo de contenido:

```text
Editor → Sanity Studio → Publicación en Content Lake
                                  ↓
                    Construcción de Astro
                 consulta + validación de contenido
                                  ↓
                       HTML y recursos estáticos
                                  ↓
                        Despliegue → Visitante
```

### 8.2 Consulta y generación

Se propone utilizar el cliente oficial `@sanity/client` desde el código ejecutado al construir Astro. La integración oficial `@sanity/astro` es una alternativa disponible, pero el bootstrap no necesita instalar ambos mecanismos de consulta ni incrustar Studio en la landing. [Cliente oficial de Sanity](https://github.com/sanity-io/client), [Integración oficial para Astro](https://github.com/sanity-io/sanity-astro).

La configuración debe declarar una fecha fija de API compatible, `perspective: 'published'` y `useCdn: false` para consultar la API durante la construcción. La perspectiva publicada excluye cambios sin publicar; la fecha fija evita variar el comportamiento de la API por usar la fecha del día de forma dinámica. [Perspectivas de Sanity](https://www.sanity.io/docs/content-lake/perspectives), [Configuración del cliente](https://github.com/sanity-io/client).

El visitante recibe el contenido en el HTML generado. La landing no depende de una consulta a Sanity desde el navegador para mostrar su mensaje o su CTA.

### 8.3 Publicación y actualización

**Publicar en Sanity no actualiza automáticamente una landing estática ya desplegada.** El flujo inicial propuesto exige reconstruir y desplegar la web después de publicar el contenido.

El responsable de ejecutar ese paso debe quedar identificado en el README. La automatización mediante webhooks queda fuera del alcance inicial. Astro permite generar una salida estática para su despliegue. [Despliegue de Astro](https://docs.astro.build/en/guides/deploy/).

Si la consulta falla o el contenido es inválido, se debe detener el nuevo despliegue y conservar la última versión válida. La retirada urgente de contenido ya publicado requiere actuar también sobre el sitio desplegado; despublicar solo en el CMS no elimina el HTML que ya se está sirviendo.

## 9. Configuración y organización técnica

### 9.1 Tecnologías y versiones

| Elemento | Criterio propuesto |
| --- | --- |
| Astro | Versión estable compatible seleccionada al iniciar la implementación. |
| TypeScript | Configuración estricta para tipos del contenido y contratos entre módulos. |
| Sanity Studio | Versión estable compatible con su entorno y dependencias. |
| Cliente Sanity | Cliente oficial con configuración explícita. |
| Node.js | Versión soportada por las versiones elegidas de Astro y Studio. |
| Gestor de paquetes | npm, con archivos de bloqueo incluidos en la futura entrega técnica. |
| Estilos | CSS de componentes y estilos globales mínimos; sin framework adicional obligatorio. |

El README deberá registrar las versiones probadas. Este PRD no afirma que una combinación concreta ya haya sido instalada o verificada.

### 9.2 Estructura de referencia

La siguiente estructura describe la futura implementación; no se crea como parte de esta entrega documental.

```text
proyecto/
├── web/
│   ├── src/
│   │   ├── pages/index.astro
│   │   ├── layouts/LandingLayout.astro
│   │   ├── components/
│   │   ├── lib/sanity.ts
│   │   ├── lib/landing.ts
│   │   └── styles/global.css
│   ├── tests/
│   ├── public/
│   ├── .env.example
│   ├── astro.config.mjs
│   └── package.json
├── studio/
│   ├── schemaTypes/
│   ├── sanity.config.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

### 9.3 Variables propuestas

Estos nombres constituyen una convención del proyecto que deberá conectarse explícitamente con las configuraciones correspondientes.

| Variable | Consumidor | Finalidad | Tratamiento |
| --- | --- | --- | --- |
| `SANITY_PROJECT_ID` | Construcción web | Identificar el proyecto Sanity. | Configuración; no es una credencial. |
| `SANITY_DATASET` | Construcción web | Seleccionar el dataset. | Configuración. |
| `SANITY_API_VERSION` | Construcción web | Fijar una fecha de versión de API. | Valor fijo documentado. |
| `SANITY_READ_TOKEN` | Construcción web, si se requiere | Leer un dataset privado. | Secreto disponible únicamente durante la construcción. |
| `SITE_URL` | Construcción web | Definir la URL pública y canónica. | URL HTTPS real para producción. |
| `SANITY_STUDIO_PROJECT_ID` | Studio | Identificar el proyecto del editor. | Configuración visible del Studio. |
| `SANITY_STUDIO_DATASET` | Studio | Seleccionar el dataset del editor. | Configuración visible del Studio. |

La visibilidad pública o privada del dataset debe decidirse antes de configurarlo. Si se necesita un token de lectura, no debe incluirse en variables públicas, paquetes de navegador, archivos generados ni registros. Los permisos de edición pertenecen a los usuarios autorizados de Studio.

### 9.4 Contrato de comandos de la futura entrega

Los siguientes comandos deberán estar soportados por los scripts de la implementación. Se documentan como requisitos; no se ejecutan en esta solicitud.

| Acción | Comando desde la raíz propuesta |
| --- | --- |
| Instalar web con bloqueo existente | `npm --prefix web ci` |
| Instalar Studio con bloqueo existente | `npm --prefix studio ci` |
| Ejecutar web | `npm --prefix web run dev` |
| Ejecutar Studio | `npm --prefix studio run dev` |
| Comprobar tipos y archivos Astro | `npm --prefix web run check` |
| Ejecutar pruebas de validación | `npm --prefix web run test` |
| Construir web | `npm --prefix web run build` |
| Revisar localmente la construcción | `npm --prefix web run preview` |
| Construir Studio | `npm --prefix studio run build` |

### 9.5 Convenciones

- Componentes en `PascalCase`; funciones, campos y variables en `camelCase`.
- Tipos explícitos en la frontera con el CMS.
- Consultas y validaciones centralizadas fuera de los componentes visuales.
- Ninguna afirmación de validez basada solo en una conversión de tipos de TypeScript.
- Código breve, nombres descriptivos y ausencia de valores de contenido duplicados en componentes.

Ejemplo del contrato esperado para el CTA, sin constituir una implementación:

```ts
type CallToAction = {
  label: string;
  href: string;
};
```

## 10. Requisitos de calidad

Los umbrales siguientes son objetivos propuestos para la entrega, no resultados medidos.

| ID | Área | Condición verificable |
| --- | --- | --- |
| RNF-01 | Adaptación a pantallas | Sin desbordamiento horizontal ni superposición de contenido a 360, 768 y 1440 píxeles de ancho. |
| RNF-02 | Acceso por teclado | Todos los enlaces accesibles por teclado, orden de foco coherente y foco visible. |
| RNF-03 | Semántica | Un `h1`, jerarquía de títulos coherente y regiones principales identificables. |
| RNF-04 | Imágenes | Dimensiones o proporción reservadas; alternativa textual para imágenes informativas. |
| RNF-05 | Contraste | Texto normal con contraste mínimo de 4,5:1 y texto grande de 3:1. |
| RNF-06 | Funcionamiento básico | Mensaje principal y CTA utilizables con JavaScript desactivado. |
| RNF-07 | Rendimiento | Mediana de tres auditorías Lighthouse móviles de la compilación de producción igual o superior a 90 en rendimiento, con versión y condiciones registradas. |
| RNF-08 | SEO técnico | Título, descripción, idioma, canónica y ausencia de bloqueo de indexación accidental en producción. |
| RNF-09 | Protección de credenciales | Ningún secreto en archivos públicos, HTML generado o código del navegador. |
| RNF-10 | Errores de contenido | La construcción explica qué campo o consulta falló, sin mostrar credenciales. |
| RNF-11 | Compatibilidad | Revisión funcional en versiones estables de Chromium, Firefox y Safari disponibles al validar; registrar cualquier entorno no probado. |

La auditoría automatizada debe complementarse con revisión manual de teclado, textos, contraste y pantallas. No implica por sí sola una certificación de accesibilidad ni una garantía de posicionamiento.

## 11. Criterios de aceptación integrales

| ID | Escenario | Resultado esperado | Trazabilidad |
| --- | --- | --- | --- |
| CA-01 | Preparar el proyecto desde una copia limpia. | Las instrucciones permiten instalar, configurar y ejecutar web y Studio. | RF-01, RF-11 |
| CA-02 | Publicar un documento válido y construir la web. | La ruta `/` muestra sus textos, imágenes y CTA. | RF-03, RF-05, RF-07 |
| CA-03 | Modificar el título publicado desde Studio. | Una nueva construcción y despliegue muestran el cambio sin editar componentes. | RF-02, RF-10 |
| CA-04 | Guardar un título distinto como borrador. | La construcción pública mantiene el título publicado y no expone el borrador. | RF-04 |
| CA-05 | Eliminar un campo obligatorio del dato usado en la prueba. | La construcción se detiene con un error comprensible; no se despliega una página incompleta. | RF-09, RNF-10 |
| CA-06 | Dejar vacíos imagen y bloque descriptivo opcionales. | No aparecen imágenes rotas, bloques vacíos ni encabezados sin contenido. | RF-05, RF-07 |
| CA-07 | Activar el CTA con teclado. | Se alcanza el destino configurado y el foco es visible antes de la activación. | RF-06, RNF-02 |
| CA-08 | Revisar móvil, tableta y escritorio. | Los anchos definidos no presentan superposición ni desplazamiento horizontal. | RNF-01 |
| CA-09 | Inspeccionar el HTML de producción. | Contiene los metadatos, el contenido principal y un único `h1`. | RF-08, RNF-03, RNF-08 |
| CA-10 | Revisar con JavaScript desactivado. | La propuesta y el CTA siguen disponibles. | RNF-06 |
| CA-11 | Simular un fallo de consulta al CMS. | La nueva construcción falla y la versión desplegada previamente sigue disponible. | RF-09, RF-12 |
| CA-12 | Inspeccionar los archivos públicos generados. | No contienen tokens ni otros secretos. | RNF-09 |
| CA-13 | Ejecutar la auditoría de rendimiento acordada. | Se documentan tres ejecuciones y se alcanza el objetivo de la mediana. | RNF-07 |
| CA-14 | Revisar el contenido antes del lanzamiento. | Marca, mensajes, imágenes, dominio y destino del CTA están aprobados; no quedan ejemplos ni enlaces ficticios. | Objetivo de producto |

## 12. Estrategia de verificación

- **Pruebas de validación:** utilizar un ejecutor como Vitest en `web/tests/` para campos obligatorios, destinos inválidos y ausencia de datos opcionales. Deben comprobar resultados observables.
- **Prueba de integración con Sanity:** comprobar contenido publicado frente a un borrador distinto en un dataset de prueba o documento controlado. Una prueba simulada del cliente no sustituye esta verificación.
- **Comprobación de construcción:** ejecutar los comandos de verificación y construcción con las variables requeridas y revisar su salida.
- **Revisión en navegador:** comprobar la landing generada, enlaces, foco, imágenes y tamaños definidos.
- **Revisión editorial:** verificar contenido y CTA con el responsable del producto.
- **Evidencia:** registrar versiones, entorno, resultados y limitaciones. No se establece un porcentaje de cobertura sin relación con los riesgos del alcance.

Esta entrega es documental. No declara que la implementación, las pruebas, el rendimiento o el despliegue ya hayan sido realizados.

## 13. Entregables de la futura implementación

| Entregable | Contenido mínimo |
| --- | --- |
| Proyecto Astro | Landing en `/`, componentes, estilos, metadatos y consulta de contenido. |
| Sanity Studio | Esquema de la landing, acceso al documento fijo y validaciones editoriales. |
| Configuración de ejemplo | Variables documentadas sin credenciales. |
| Contenido inicial | Documento de muestra identificado y preparado para sustitución por contenido aprobado. |
| Verificaciones | Casos relevantes de validación y evidencia del recorrido completo de publicación. |
| README | Requisitos, comandos, configuración, edición, construcción, despliegue y recuperación de la última versión válida. |

El bootstrap se considera terminado cuando los criterios aplicables están satisfechos y las limitaciones quedan registradas. La publicación comercial exige, además, resolver las decisiones de contenido y dominio.

## 14. Dependencias, riesgos y decisiones pendientes

### 14.1 Dependencias

- Acceso autorizado a un proyecto y dataset de Sanity.
- Definición de la marca, público y propuesta de valor.
- Contenido e imágenes aprobados o recursos de muestra para desarrollo.
- Destino del CTA principal.
- Selección del alojamiento, dominio y responsable del despliegue.

### 14.2 Riesgos

| Riesgo | Consecuencia | Tratamiento propuesto |
| --- | --- | --- |
| Publicar contenido sin reconstruir la web | El visitante sigue viendo la versión anterior. | Documentar el flujo y asignar responsable. |
| Contenido incompleto o incompatible | Página incompleta o construcción fallida. | Validar en Studio y al construir; conservar la última versión válida. |
| Imágenes excesivamente pesadas | Carga lenta en móviles. | Usar tamaños adecuados y comprobar la versión final. |
| Confundir muestras con contenido real | Mensajes o enlaces incorrectos en producción. | Revisión editorial previa al lanzamiento. |
| Exponer un token | Acceso no previsto al contenido. | Mantenerlo en el entorno de construcción y revisar los artefactos públicos. |
| Cambios de dependencias sin validar | Incompatibilidades del proyecto. | Registrar versiones y conservar archivos de bloqueo. |

### 14.3 Decisiones pendientes

| Decisión | Responsable propuesto | Momento necesario |
| --- | --- | --- |
| Marca, oferta y público objetivo | Responsable del producto | Antes de cerrar el contenido y diseño. |
| Acción y destino del CTA | Responsable del producto | Antes de validar la landing comercial. |
| Textos, imágenes y estilo visual | Producto / diseño | Antes de publicar la versión final. |
| Idioma inicial | Responsable del producto | Antes de cargar el contenido definitivo. |
| Proyecto, dataset y visibilidad del contenido | Responsable técnico | Antes de configurar la integración. |
| Alojamiento y dominio | Responsable técnico / producto | Antes del despliegue público. |
| Persona que reconstruye y despliega | Responsable técnico | Antes de entregar el flujo editorial. |

Estas decisiones permanecen abiertas; no deben sustituirse por datos comerciales inventados. No impiden disponer de este PRD como base de revisión.

## 15. Límites de ejecución

- **Siempre:** mantener el foco en la landing, documentar supuestos, validar el contenido y comprobar que la versión generada utiliza datos publicados.
- **Requiere una decisión explícita de alcance:** añadir secciones funcionales nuevas, formularios, servicios externos, automatizaciones, páginas adicionales o cambiar el modelo de publicación.
- **Nunca dentro de esta solicitud:** modificar repositorios, crear infraestructura, cargar contenido en cuentas externas, instalar dependencias o desplegar una web. La entrega solicitada es este archivo Markdown.

## 16. Referencias

Fuentes oficiales consultadas el 16 de octubre de 2026. Las decisiones de producto y los umbrales propuestos pertenecen a este documento; no se atribuyen a los proveedores.

| Referencia | Aplicación en el PRD |
| --- | --- |
| [Astro — sitio oficial](https://astro.build/) | Elección del framework y enfoque en sitios basados en contenido. |
| [Sanity — sitio oficial](https://www.sanity.io/) | Plataforma de gestión de contenido seleccionada. |
| [Astro — integración con Sanity](https://docs.astro.build/en/guides/cms/sanity/) | Compatibilidad del CMS y recursos oficiales de integración. |
| [Sanity — integración oficial para Astro](https://github.com/sanity-io/sanity-astro) | Alternativa oficial de integración disponible. |
| [Sanity — cliente JavaScript/TypeScript](https://github.com/sanity-io/client) | Consulta, versión de API y configuración del cliente. |
| [Sanity — perspectivas de contenido](https://www.sanity.io/docs/content-lake/perspectives) | Separación entre contenido publicado y borradores. |
| [Sanity Studio — esquemas](https://www.sanity.io/docs/studio/schema-types) | Definición estructurada de campos y tipos. |
| [Astro — despliegue](https://docs.astro.build/en/guides/deploy/) | Construcción y entrega del sitio. |
