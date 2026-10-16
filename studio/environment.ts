function requireSetting(value: string | undefined, name: string, pattern: RegExp): string {
  if (!value || !pattern.test(value)) {
    throw new Error(`Configura ${name} en studio/.env.local con un valor válido de tu proyecto Sanity.`);
  }
  return value;
}

// El acceso estático es necesario para que Sanity sustituya estas variables al compilar.
export const projectId = requireSetting(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'SANITY_STUDIO_PROJECT_ID',
  /^[a-z0-9]+$/,
);

export const dataset = requireSetting(
  process.env.SANITY_STUDIO_DATASET,
  'SANITY_STUDIO_DATASET',
  /^[a-z0-9][a-z0-9_-]*$/,
);
