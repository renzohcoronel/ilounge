import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseLanding } from '../src/lib/landing.ts';
import { isValidDestination } from '../../shared/links.ts';

export const validLanding = {
  _id: 'landingPage', _type: 'landingPage', brandName: 'Marca de prueba',
  hero: { title: 'Título de prueba', description: 'Descripción de prueba' },
  primaryCta: { label: 'Consultar Astro', href: 'https://astro.build/' },
  seo: { title: 'Título SEO de prueba', description: 'Descripción SEO de prueba' },
};

describe('contenido de la landing', () => {
  it('acepta contenido completo sin opcionales y recorta espacios', () => {
    const page = parseLanding({ ...validLanding, brandName: ' Marca ' });
    assert.equal(page.brandName, 'Marca');
    assert.equal(page.details, undefined);
    assert.equal(page.hero.image, undefined);
    assert.deepEqual(page.footer.links, []);
  });
  it('rechaza un documento ausente', () => assert.throws(() => parseLanding(null), /landingPage/));
  it('rechaza borradores y otros documentos', () => {
    for (const id of ['drafts.landingPage', 'otro', 'versions.release.landingPage']) {
      assert.throws(() => parseLanding({ ...validLanding, _id: id }), /_id/);
    }
  });
  it('identifica cada campo obligatorio inválido', () => {
    const cases = [
      { ...validLanding, brandName: ' ' },
      { ...validLanding, hero: { ...validLanding.hero, title: '' } },
      { ...validLanding, hero: { title: 'Título' } },
      { ...validLanding, primaryCta: { href: 'https://astro.build/' } },
      { ...validLanding, primaryCta: { label: 'Acción', href: '#' } },
      { ...validLanding, seo: { title: 'Título' } },
      { ...validLanding, seo: { description: 'Descripción' } },
    ];
    for (const value of cases) assert.throws(() => parseLanding(value), /landingPage\./);
  });
  it('omite details vacío y rechaza un bloque parcial', () => {
    assert.equal(parseLanding({ ...validLanding, details: { title: ' ', body: '' } }).details, undefined);
    assert.throws(() => parseLanding({ ...validLanding, details: { title: 'Solo título' } }), /details.body/);
  });
  it('rechaza enlaces de pie incompletos', () => {
    assert.throws(() => parseLanding({ ...validLanding, footer: { links: [{ label: 'Enlace' }] } }), /footer.links\[0\].href/);
  });
  it('conserva texto sin interpretarlo como HTML', () => {
    assert.equal(parseLanding({ ...validLanding, hero: { ...validLanding.hero, title: '<script>test</script>' } }).hero.title, '<script>test</script>');
  });
  it('omite objetos de imagen vacíos y rechaza referencias rotas', () => {
    const page = parseLanding({ ...validLanding, logo: { asset: null, alt: null, decorative: false } });
    assert.equal(page.logo, undefined);
    assert.throws(() => parseLanding({ ...validLanding, logo: { asset: { _ref: 'image-deleted-800x600-jpg', url: null }, decorative: true } }), /logo.asset.url/);
    assert.throws(() => parseLanding({ ...validLanding, logo: { assetRef: 'image-deleted-800x600-jpg', asset: null } }), /logo.asset/);
  });
  it('exige dimensiones, asset y alt en imágenes informativas', () => {
    const image = { asset: { url: 'https://cdn.sanity.io/images/abc/production/image.jpg', metadata: { dimensions: { width: 800, height: 600 } } } };
    assert.throws(() => parseLanding({ ...validLanding, hero: { ...validLanding.hero, image } }), /hero.image.alt/);
    const page = parseLanding({ ...validLanding, hero: { ...validLanding.hero, image: { ...image, decorative: true } } });
    assert.equal(page.hero.image?.alt, '');
    assert.throws(() => parseLanding({ ...validLanding, logo: { alt: 'Logo', asset: null } }), /logo.asset/);
    assert.throws(() => parseLanding({ ...validLanding, logo: { ...image, alt: 'Logo', asset: { ...image.asset, metadata: { dimensions: { width: 0, height: 600 } } } } }), /width/);
  });
});

describe('destinos del CTA y del pie', () => {
  for (const href of ['https://astro.build/', 'mailto:equipo@sanity.io', 'tel:+541155551234']) {
    it(`acepta ${href}`, () => assert.equal(isValidDestination(href), true));
  }
  for (const href of ['', '#', '/contacto', 'javascript:alert(1)', 'data:text/html,test', 'http://astro.build', 'https://', 'https://user:password@astro.build', 'https://example.com', 'https://sub.example.org', 'https://localhost', 'https://astro.build\n', 'mailto:mal', 'mailto:a@example.com', 'mailto:a@sanity.io?subject=test', 'tel:123', 'https://astro.build\\@evil.test', 'https://foo..com/', 'https://.com/', 'https://-foo.com/', 'mailto:.@sanity.io', 'mailto:a..b@sanity.io', 'mailto:a@-sanity.io']) {
    it(`rechaza ${JSON.stringify(href)}`, () => assert.equal(isValidDestination(href), false));
  }
});
