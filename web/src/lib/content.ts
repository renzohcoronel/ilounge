import { parseLanding, type Landing } from './landing.ts';

export async function fetchPublishedLanding(query: () => Promise<unknown>): Promise<Landing> {
  let data: unknown;
  try {
    data = await query();
  } catch {
    // No propagar errores del SDK: pueden incluir cabeceras o configuración privada.
    throw new Error('Falló la consulta publicada de landingPage a Sanity. Revisa conexión, proyecto, dataset y permisos de lectura. No desplegar esta construcción.');
  }
  return parseLanding(data);
}
