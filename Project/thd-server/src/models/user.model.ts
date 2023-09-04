import {Entity, hasOne, model, property} from '@loopback/repository';
import {Credentials} from './credentials.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
      uniqueUsername: {
        keys: {
          username: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})

export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date',
    },
  })
  date_of_birth?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string'
  })
  role: string;

  @hasOne(() => Credentials)
  credentials: Credentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
