import { isValidDestination } from '../../../shared/links.ts';

type Environment = Record<string, string | undefined>;

export function readSanityConfig(env: Environment) {
  const projectId = env.SANITY_PROJECT_ID?.trim();
  const dataset = env.SANITY_DATASET?.trim();
  const apiVersion = env.SANITY_API_VERSION?.trim();
  if (!projectId || !/^[a-z0-9]+$/.test(projectId)) throw new Error('Configura SANITY_PROJECT_ID con el ID de tu proyecto.');
  if (!dataset || !/^[a-z0-9][a-z0-9_-]*$/.test(dataset)) throw new Error('Configura SANITY_DATASET con el nombre del dataset.');
  if (!apiVersion || !/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) ||
    !Number.isFinite(Date.parse(apiVersion)) || new Date(apiVersion).toISOString().slice(0, 10) !== apiVersion || apiVersion < '2025-02-19') {
    throw new Error('Configura SANITY_API_VERSION con una fecha fija válida desde 2025-02-19.');
  }
  return {
    projectId, dataset, apiVersion,
    perspective: 'published' as const,
    useCdn: false,
    token: env.SANITY_READ_TOKEN?.trim() || undefined,
    timeout: 15_000,
    maxRetries: 1,
  };
}

export function readSiteUrl(value: string | undefined, sample: boolean): string {
  if (sample) return 'http://localhost:4321/';
  const url = value?.trim() ?? '';
  if (!url.startsWith('https://') || !isValidDestination(url)) {
    throw new Error('Configura SITE_URL con la URL HTTPS real de la landing.');
  }
  const site = new URL(url);
  if (site.pathname !== '/' || site.search || site.hash) throw new Error('SITE_URL debe apuntar a la raíz /, sin query ni fragmento.');
  return site.href;
}
