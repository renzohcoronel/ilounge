import { isValidDestination } from '../../../shared/links.ts';

export type CallToAction = { label: string; href: string };
export type LandingImage = { url: string; alt: string; width: number; height: number };
export type Landing = {
  brandName: string;
  logo?: LandingImage;
  hero: { title: string; description: string; image?: LandingImage };
  primaryCta: CallToAction;
  details?: { title: string; body: string };
  footer: { text?: string; links: CallToAction[] };
  seo: { title: string; description: string; shareImage?: LandingImage };
};

function invalid(path: string, reason: string): never {
  // No incluir el valor recibido: puede contener datos sensibles.
  throw new Error(`Contenido inválido en landingPage${path ? `.${path}` : ''}: ${reason}.`);
}

function object(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) invalid(path, 'se requiere un objeto');
  return value as Record<string, unknown>;
}

function text(value: unknown, path: string, required = true): string | undefined {
  if (value == null && !required) return undefined;
  if (typeof value !== 'string') invalid(path, 'se requiere texto');
  const result = value.trim();
  if (!result && required) invalid(path, 'el campo es obligatorio');
  return result || undefined;
}

function requiredText(value: unknown, path: string): string {
  return text(value, path)!;
}

function link(value: unknown, path: string): CallToAction {
  const data = object(value, path);
  const label = requiredText(data.label, `${path}.label`);
  const href = requiredText(data.href, `${path}.href`);
  if (!isValidDestination(href)) invalid(`${path}.href`, 'usar un destino HTTPS, mailto o tel válido y no ficticio');
  return { label, href };
}

function dimension(value: unknown, path: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) invalid(path, 'se requiere una dimensión positiva');
  return value;
}

function image(value: unknown, path: string): LandingImage | undefined {
  if (value == null) return undefined;
  const data = object(value, path);
  if (data.decorative != null && typeof data.decorative !== 'boolean') invalid(`${path}.decorative`, 'se requiere un booleano');
  const alternative = text(data.alt, `${path}.alt`, false);
  if (data.asset == null && data.assetRef == null && !alternative && data.decorative !== true) return undefined;
  const asset = object(data.asset, `${path}.asset`);
  const url = requiredText(asset.url, `${path}.asset.url`);
  if (!/^https:\/\/cdn\.sanity\.io\/images\/[a-z0-9]+\/[a-zA-Z0-9_-]+\/[^\s?#]+$/.test(url)) {
    invalid(`${path}.asset.url`, 'se requiere una imagen del CDN de Sanity');
  }
  const dimensions = object(object(asset.metadata, `${path}.asset.metadata`).dimensions, `${path}.asset.metadata.dimensions`);
  const width = dimension(dimensions.width, `${path}.width`);
  const height = dimension(dimensions.height, `${path}.height`);
  const alt = data.decorative === true ? '' : requiredText(alternative, `${path}.alt`);
  return { url, alt, width, height };
}

export function parseLanding(value: unknown): Landing {
  const data = object(value, '');
  if (data._id !== 'landingPage') invalid('_id', 'se requiere el documento publicado landingPage');
  if (data._type !== 'landingPage') invalid('_type', 'se requiere el tipo landingPage');
  const hero = object(data.hero, 'hero');
  const seo = object(data.seo, 'seo');
  let details: Landing['details'];
  if (data.details != null) {
    const detail = object(data.details, 'details');
    const title = text(detail.title, 'details.title', false);
    const body = text(detail.body, 'details.body', false);
    if (title || body) {
      details = {
        title: requiredText(title, 'details.title'),
        body: requiredText(body, 'details.body'),
      };
    }
  }
  const footer = data.footer == null ? {} : object(data.footer, 'footer');
  if (footer.links != null && !Array.isArray(footer.links)) invalid('footer.links', 'se requiere una lista');
  const links = Array.isArray(footer.links) ? footer.links.map((item, i) => link(item, `footer.links[${i}]`)) : [];
  return {
    brandName: requiredText(data.brandName, 'brandName'),
    logo: image(data.logo, 'logo'),
    hero: {
      title: requiredText(hero.title, 'hero.title'),
      description: requiredText(hero.description, 'hero.description'),
      image: image(hero.image, 'hero.image'),
    },
    primaryCta: link(data.primaryCta, 'primaryCta'),
    details,
    footer: { text: text(footer.text, 'footer.text', false), links },
    seo: {
      title: requiredText(seo.title, 'seo.title'),
      description: requiredText(seo.description, 'seo.description'),
      shareImage: image(seo.shareImage, 'seo.shareImage'),
    },
  };
}
