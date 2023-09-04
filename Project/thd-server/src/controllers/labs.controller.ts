import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Labs} from '../models';
import {LabsRepository} from '../repositories';

export class LabsController {
  constructor(
    @repository(LabsRepository)
    public labsRepository : LabsRepository,
  ) {}

  @post('/labs')
  @response(200, {
    description: 'Labs model instance',
    content: {'application/json': {schema: getModelSchemaRef(Labs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Labs, {
            title: 'NewLabs',
            exclude: ['id', 'reserved', 'instructor'],
          }),
        },
      },
    })
    labs: Omit<Labs, 'id'>,
  ): Promise<Labs> {
    labs.reserved = false;
    return this.labsRepository.create(labs);
  }

  @get('/labs/count')
  @response(200, {
    description: 'Labs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Labs) where?: Where<Labs>,
  ): Promise<Count> {
    return this.labsRepository.count(where);
  }

  @get('/labs')
  @response(200, {
    description: 'Array of Labs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Labs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Labs) filter?: Filter<Labs>,
  ): Promise<Labs[]> {
    return this.labsRepository.find(filter);
  }

  @patch('/labs')
  @response(200, {
    description: 'Labs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Labs, {partial: true}),
        },
      },
    })
    labs: Labs,
    @param.where(Labs) where?: Where<Labs>,
  ): Promise<Count> {
    return this.labsRepository.updateAll(labs, where);
  }

  @get('/labs/{id}')
  @response(200, {
    description: 'Labs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Labs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Labs, {exclude: 'where'}) filter?: FilterExcludingWhere<Labs>
  ): Promise<Labs> {
    return this.labsRepository.findById(id, filter);
  }

  @patch('/labs/{id}')
  @response(204, {
    description: 'Labs PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Labs, {partial: true}),
        },
      },
    })
    labs: Labs,
  ): Promise<void> {
    await this.labsRepository.updateById(id, labs);
  }

  @put('/labs/{id}')
  @response(204, {
    description: 'Labs PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() labs: Labs,
  ): Promise<void> {
    await this.labsRepository.replaceById(id, labs);
  }

  @put('/labs/reserve/{id}')
  @response(204, {
    description: 'Reserve Lab PUT success',
  })
  async reserveById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Labs, {
            title: 'Reserve Lab',
            exclude: ['id', 'name', 'description', 'category', 'location'],
          }),
        },
      },
    }) labs: Labs,
  ): Promise<void> {
    let lab = this.labsRepository.findById(id);
    (await lab).instructor = labs.instructor;
    (await lab).reserved = labs.reserved;
    await this.labsRepository.replaceById(id, await lab);
  }

  @del('/labs/delete/{id}')
  @response(204, {
    description: 'Labs DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.labsRepository.deleteById(id);
  }
}
