export type ParagraphClassProperties = {
  content: string;
  order: number;
  title: string;
  inArticle: [{
    beacon: string;
  }]
}

export const ParagraphClass = {
  class: 'Paragraph',
  description: 'A wiki paragraph',
  vectorIndexConfig: {
    vectorCacheMaxObjects: 150000000000,
    ef: 256,
    efConstruction: 512,
    maxConnections: 128,
  },
  properties: [
    {
      dataType: ['string'],
      description: 'Title of the paragraph',
      name: 'title',
      indexInverted: true,
      moduleConfig: {
        'text2vec-transformers': {
          skip: true,
          vectorizePropertyName: false,
        },
      },
    },
    {
      dataType: ['text'],
      description: 'The content of the paragraph',
      name: 'content',
      indexInverted: true,
      moduleConfig: {
        'text2vec-transformers': {
          skip: false,
          vectorizePropertyName: false,
        },
      },
    },
    {
      dataType: ['int'],
      description: 'Order of the paragraph',
      name: 'order',
      indexInverted: true,
      moduleConfig: {
        'text2vec-transformers': {
          skip: true,
          vectorizePropertyName: false,
        },
      },
    },
    {
      dataType: ['Article'],
      description: 'Article this paragraph is in',
      name: 'inArticle',
      moduleConfig: {
        'text2vec-transformers': {
          skip: true,
          vectorizePropertyName: false,
        },
      },
    },
  ],
}
