import {schemaClasses} from "./config";
import weaviate, {WeaviateClass, WeaviateClient} from "weaviate-ts-client";
import {ArticleClassProperties} from "./article.class";
import {ParagraphClassProperties} from "./paragraph.class";
import { uuid } from 'uuidv4';

export class Weaviate {
  private client: WeaviateClient;

  constructor() {
    this.client = weaviate.client({
      scheme: 'https',
      host: process.env.WEAVIATE_HOST || 'localhost',
    });
  }

  async init(){
    await this.flushClasses()
    for await (const classObj of schemaClasses) {
      await this.createClass(classObj)
    }
  }

  private listSchemaClasses() {
    return this.client
        .schema
        .getter()
        .do()
  }

  private async flushClasses() {
    const {classes} = await this.listSchemaClasses();
    for await (const classObj of classes as WeaviateClass[]) {
      await this.client.schema.classDeleter().withClassName(classObj.class as string).do()
    }
  }


  private async createClass(classObj: WeaviateClass) {
    return this.client
      .schema
      .classCreator()
      .withClass(classObj)
      .do()
  }

  public addArticle(title: string, rawContent: string) {
    const articleId = uuid();
    const paragraphs: ParagraphClassProperties[] = rawContent
        .split('\n').map((content, index) => ({
      content,
      order: index,
      title: 'title',
      inArticle: [{
        beacon: `weaviate://localhost/Article/${articleId}`
      }]
    }))

    const articleData: ArticleClassProperties = {
      title: 'title',
      content: 'content',
      hasParagraphs: paragraphs
    }

    return this.client.data.creator()
      .withClassName('Article')
      .withProperties(articleData)
      .do()
  }
}
