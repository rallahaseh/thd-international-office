import {Entity, model, property} from '@loopback/repository';

@model()
export class Labs extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string'
  })
  instructor?: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'boolean'
  })
  reserved?: boolean;


  constructor(data?: Partial<Labs>) {
    super(data);
  }
}

export interface LabsRelations {
  // describe navigational properties here
}

export type LabsWithRelations = Labs & LabsRelations;
