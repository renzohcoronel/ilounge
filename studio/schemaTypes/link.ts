import {defineField, defineType} from 'sanity';
import {isValidDestination} from '../../shared/links.ts';
import {validateRequiredText} from './validation';

export const link = defineType({
  name: 'link',
  title: 'Enlace',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Texto del enlace',
      type: 'string',
      validation: (Rule) => Rule.required().custom(validateRequiredText),
    }),
    defineField({
      name: 'href',
      title: 'Destino',
      type: 'string',
      description: 'HTTPS completo, mailto: con un destinatario o tel: con 7 a 15 dígitos (y + opcional). Usa un destino real y aprobado.',
      validation: (Rule) => Rule.required().custom((value) =>
        (typeof value === 'string' && isValidDestination(value))
        || 'Introduce un destino HTTPS, correo o teléfono válido; no se admiten destinos ficticios.',
      ),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
});
