import assert from 'node:assert/strict';
import { it } from 'node:test';
import { readFile } from 'node:fs/promises';
import { fetchPublishedLanding } from '../src/lib/content.ts';
import { parseLanding } from '../src/lib/landing.ts';

it('detiene la carga si el CMS falla, sin devolver muestra ni filtrar credenciales', async () => {
  await assert.rejects(fetchPublishedLanding(async () => { throw new Error('Bearer secret-canary'); }), (error: Error) => {
    assert.match(error.message, /consulta.*landingPage/);
    assert.ok(!error.message.includes('secret-canary'));
    assert.equal(error.cause, undefined);
    return true;
  });
});

it('identifica la falta del documento después de una consulta exitosa', async () => {
  await assert.rejects(fetchPublishedLanding(async () => null), /Contenido inválido en landingPage/);
});

it('la muestra importable respeta el contrato y se identifica como muestra', async () => {
  const source = await readFile(new URL('../../content/landingPage.sample.ndjson', import.meta.url), 'utf8');
  const sample = JSON.parse(source);
  const page = parseLanding(sample);
  assert.match(page.brandName, /muestra/i);
  assert.match(page.hero.description, /muestra/i);
  assert.equal(page.primaryCta.href, 'https://astro.build/');
});
