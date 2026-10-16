import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {dataset, projectId} from './environment';
import {schemaTypes} from './schemaTypes';

export default defineConfig({
  name: 'landing',
  title: 'Contenido de la landing',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {types: schemaTypes},
  document: {
    // Control editorial de Studio; no impone unicidad en Content Lake.
    singletons: ['landingPage'],
    actions: (actions, context) =>
      context.schemaType === 'landingPage'
        ? actions.filter(({action}) => action !== 'duplicate')
        : actions,
  },
});
