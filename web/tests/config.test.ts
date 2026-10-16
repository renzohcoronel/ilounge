import assert from 'node:assert/strict';
import { it } from 'node:test';
import { readSanityConfig, readSiteUrl } from '../src/lib/config.ts';

it('exige configuración explícita del CMS sin revelar valores', () => {
  assert.throws(() => readSanityConfig({}), /SANITY_PROJECT_ID/);
  assert.throws(() => readSanityConfig({ SANITY_PROJECT_ID: 'abc123', SANITY_DATASET: 'test', SANITY_API_VERSION: '2025-02-30' }), /SANITY_API_VERSION/);
  const config = readSanityConfig({ SANITY_PROJECT_ID: 'abc123', SANITY_DATASET: 'production', SANITY_API_VERSION: '2025-02-19', SANITY_READ_TOKEN: 'secret-canary' });
  assert.equal(config.perspective, 'published');
  assert.equal(config.useCdn, false);
  assert.equal(config.token, 'secret-canary');
});

it('exige un SITE_URL público HTTPS de raíz para la página comercial', () => {
  for (const value of ['', 'http://astro.build/', 'https://example.com/', 'https://astro.build/path', 'https://astro.build/?query=value']) {
    assert.throws(() => readSiteUrl(value, false), /SITE_URL/);
  }
  assert.equal(readSiteUrl('https://astro.build', false), 'https://astro.build/');
  assert.equal(readSiteUrl('', true), 'http://localhost:4321/');
});
