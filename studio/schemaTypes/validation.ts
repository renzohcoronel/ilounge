type ValidationResult = true | string;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateRequiredText(value: unknown): ValidationResult {
  return hasText(value) || 'Completa este campo con texto; no puede contener solo espacios.';
}

export function validateDetails(value: unknown): ValidationResult {
  if (value == null) return true;
  if (!isObject(value)) return 'El bloque descriptivo debe contener un título y un texto.';
  const {title, body} = value;
  if ((title != null && typeof title !== 'string') || (body != null && typeof body !== 'string')) {
    return 'Utiliza texto plano para el título y el contenido del bloque descriptivo.';
  }
  return hasText(title) === hasText(body)
    || 'Completa tanto el título como el texto, o vacía ambos para omitir este bloque.';
}

export function validateImage(value: unknown): ValidationResult {
  if (value == null) return true;
  if (!isObject(value)) return 'Selecciona una imagen válida.';
  const {asset, alt, decorative} = value;
  if (decorative != null && typeof decorative !== 'boolean') {
    return 'Indica si la imagen es decorativa mediante la casilla correspondiente.';
  }
  if (alt != null && typeof alt !== 'string') return 'La alternativa debe ser texto plano.';

  // Un objeto todavía vacío en el editor equivale a una imagen opcional omitida.
  if (asset == null && !hasText(alt) && decorative !== true) return true;
  if (
    !isObject(asset)
    || typeof asset._ref !== 'string'
    || !/^image-[a-zA-Z0-9]+-[1-9]\d*x[1-9]\d*-[a-zA-Z0-9]+$/.test(asset._ref)
  ) {
    return 'Selecciona un archivo de imagen o elimina este campo opcional.';
  }
  return decorative === true || hasText(alt)
    || 'Describe la imagen para quienes no pueden verla, o márcala como decorativa.';
}
