import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Credentials,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCredentialsController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User has one Credentials',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credentials),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Credentials>,
  ): Promise<Credentials> {
    return this.userRepository.credentials(id).get(filter);
  }

  @post('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Credentials)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credentials, {
            title: 'NewCredentialsInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) credentials: Omit<Credentials, 'id'>,
  ): Promise<Credentials> {
    return this.userRepository.credentials(id).create(credentials);
  }

  @patch('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User.Credentials PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credentials, {partial: true}),
        },
      },
    })
    credentials: Partial<Credentials>,
    @param.query.object('where', getWhereSchemaFor(Credentials)) where?: Where<Credentials>,
  ): Promise<Count> {
    return this.userRepository.credentials(id).patch(credentials, where);
  }

  @del('/users/{id}/credentials', {
    responses: {
      '200': {
        description: 'User.Credentials DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Credentials)) where?: Where<Credentials>,
  ): Promise<Count> {
    return this.userRepository.credentials(id).delete(where);
  }
}
