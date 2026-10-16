import { createClient } from '@sanity/client';
import { readSanityConfig } from './config.ts';
import { fetchPublishedLanding } from './content.ts';

const imageProjection = `{
  alt, decorative, "assetRef": asset._ref,
  asset->{url, metadata{dimensions{width, height}}}
}`;

export const landingQuery = `*[_type == "landingPage" && _id == $id][0]{
  _id, _type, brandName,
  logo${imageProjection},
  hero{title, description, image${imageProjection}},
  primaryCta{label, href},
  details{title, body},
  footer{text, links[]{label, href}},
  seo{title, description, shareImage${imageProjection}}
}`;

export async function getPublishedLanding() {
  const config = readSanityConfig(import.meta.env);
  return fetchPublishedLanding(() => createClient(config).fetch<unknown>(landingQuery, { id: 'landingPage' }));
}
