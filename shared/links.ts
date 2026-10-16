function isPublicHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return host.length <= 253 && host.includes('.') &&
    host.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) &&
    !/^(?:0|10|127)\./.test(host) &&
    !/(^|\.)(localhost|local|test|invalid|example)$/.test(host) &&
    !/(^|\.)example\.(com|net|org)$/.test(host);
}

/** Destinos editoriales completos. No realiza peticiones ni comprueba titularidad. */
export function isValidDestination(value: string): boolean {
  if (!value || /[\s\u0000-\u001f\u007f\\]/.test(value)) return false;
  if (/^tel:\+?[1-9]\d{6,14}$/.test(value)) return true;
  if (value.startsWith('mailto:')) {
    const address = value.slice(7);
    if (!/^[a-zA-Z0-9.!#$%&'*+\/=^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(address)) return false;
    const [local, domain] = address.split('@');
    return Boolean(local && local.length <= 64 && !local.startsWith('.') && !local.endsWith('.') && !local.includes('..')) && isPublicHost(domain ?? '');
  }
  if (!value.startsWith('https://')) return false;
  try {
    const url = new URL(value);
    return !url.username && !url.password && isPublicHost(url.hostname);
  } catch {
    return false;
  }
}
