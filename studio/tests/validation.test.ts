import assert from 'node:assert/strict';
import {test} from 'node:test';
import {validateDetails, validateImage, validateRequiredText} from '../schemaTypes/validation.ts';

test('los textos obligatorios rechazan ausentes y espacios en blanco', () => {
  for (const value of [undefined, null, '', ' \n\t ', 42]) {
    assert.notEqual(validateRequiredText(value), true);
  }
  assert.equal(validateRequiredText('Propuesta aprobada'), true);
});

test('el bloque descriptivo puede omitirse o estar completo', () => {
  for (const value of [undefined, null, {}, {title: '', body: '  '}]) {
    assert.equal(validateDetails(value), true);
  }
  assert.equal(validateDetails({title: 'Acerca de la propuesta', body: 'Información aprobada.'}), true);
  assert.notEqual(validateDetails({title: 'Título aislado'}), true);
  assert.notEqual(validateDetails({body: 'Texto aislado'}), true);
  assert.notEqual(validateDetails({title: 42, body: 'Texto'}), true);
});

test('las imágenes vacías se pueden omitir, pero una imagen utilizada necesita archivo', () => {
  assert.equal(validateImage(undefined), true);
  assert.equal(validateImage({_type: 'accessibleImage'}), true);
  assert.notEqual(validateImage({alt: 'Una fotografía', decorative: false}), true);
  assert.notEqual(validateImage({decorative: true}), true);
  assert.notEqual(validateImage({asset: {_ref: 'sin-archivo'}, decorative: true}), true);
});

test('las imágenes informativas requieren texto alternativo y las decorativas pueden omitirlo', () => {
  const asset = {_type: 'reference', _ref: 'image-abc123-640x480-jpg'};
  assert.notEqual(validateImage({asset}), true);
  assert.notEqual(validateImage({asset, alt: '   '}), true);
  assert.equal(validateImage({asset, alt: 'Personas usando el producto'}), true);
  assert.equal(validateImage({asset, decorative: true}), true);
  assert.notEqual(validateImage({asset, decorative: 'true'}), true);
});
