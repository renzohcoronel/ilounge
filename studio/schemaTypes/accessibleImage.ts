import {defineField, defineType} from 'sanity';
import {validateImage} from './validation';

export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Imagen',
  type: 'image',
  fields: [
    defineField({
      name: 'decorative',
      title: 'Imagen decorativa',
      type: 'boolean',
      description: 'Activa esta opción solo si la imagen no aporta información. Se mostrará con alternativa vacía.',
      initialValue: false,
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Describe la información que comunica la imagen. Obligatorio si no es decorativa.',
      hidden: ({parent}) => parent?.decorative === true,
    }),
  ],
  validation: (Rule) => Rule.custom(validateImage),
});
