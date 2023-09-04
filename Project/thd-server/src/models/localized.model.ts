import {Entity, model, property} from '@loopback/repository';

@model()
export class Localized extends Entity {
  @property({
    type: 'string',
  })
  english?: string;

  @property({
    type: 'string',
  })
  deutsch?: string;


  constructor(data?: Partial<Localized>) {
    super(data);
  }
}

export interface LocalizedRelations {
  // describe navigational properties here
}

export type LocalizedWithRelations = Localized & LocalizedRelations;
