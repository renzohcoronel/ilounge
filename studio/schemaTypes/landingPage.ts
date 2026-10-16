import {defineArrayMember, defineField, defineType} from 'sanity';
import {validateDetails, validateRequiredText} from './validation';

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing page',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Nombre de la marca',
      type: 'string',
      validation: (Rule) => Rule.required().custom(validateRequiredText),
    }),
    defineField({name: 'logo', title: 'Logotipo', type: 'accessibleImage'}),
    defineField({
      name: 'hero',
      title: 'Bloque principal',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          title: 'Título principal',
          type: 'string',
          validation: (Rule) => Rule.required().custom(validateRequiredText),
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required().custom(validateRequiredText),
        }),
        defineField({name: 'image', title: 'Imagen principal', type: 'accessibleImage'}),
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Acción principal',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Bloque descriptivo',
      description: 'Completa los dos campos o déjalos vacíos para omitir el bloque.',
      type: 'object',
      validation: (Rule) => Rule.custom(validateDetails),
      fields: [
        defineField({name: 'title', title: 'Título', type: 'string'}),
        defineField({name: 'body', title: 'Texto', type: 'text', rows: 6}),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Pie de página',
      type: 'object',
      fields: [
        defineField({name: 'text', title: 'Texto de cierre', type: 'text', rows: 3}),
        defineField({
          name: 'links',
          title: 'Enlaces',
          type: 'array',
          of: [defineArrayMember({type: 'link'})],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Metadatos',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          title: 'Título de la página',
          type: 'string',
          validation: (Rule) => Rule.required().custom(validateRequiredText),
        }),
        defineField({
          name: 'description',
          title: 'Descripción de la página',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required().custom(validateRequiredText),
        }),
        defineField({name: 'shareImage', title: 'Imagen para compartir', type: 'accessibleImage'}),
      ],
    }),
  ],
  preview: {select: {title: 'brandName', subtitle: 'hero.title', media: 'logo'}},
});
