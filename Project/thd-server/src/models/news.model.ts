import {Entity, model, property} from '@loopback/repository';
import { Localized } from './localized.model';

@model()
export class News extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property()
  title: Localized;

  @property()
  sub_title: Localized;

  @property()
  content: Localized;

  @property({
    type: 'Date',
  })
  publish_date?: Date;


  constructor(data?: Partial<News>) {
    super(data);
  }
}

export interface NewsRelations {
  // describe navigational properties here
}

export type NewsWithRelations = News & NewsRelations;
