import {Entity, model, property} from '@loopback/repository';

@model()
export class NewsResponse extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  sub_title?: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'Date',
    required: true,
  })
  publish_date: Date;


  constructor(data?: Partial<NewsResponse>) {
    super(data);
  }
}

export interface NewsResponseRelations {
  // describe navigational properties here
}

export type NewsResponseWithRelations = NewsResponse & NewsResponseRelations;
