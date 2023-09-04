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
import {News, NewsResponse} from '../models';
import {NewsRepository} from '../repositories';

export class NewsController {
  constructor(
    @repository(NewsRepository)
    public newsRepository : NewsRepository,
  ) {}

  @post('/news')
  @response(200, {
    description: 'News model instance',
    content: {'application/json': {schema: getModelSchemaRef(News)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {
            title: 'NewNews',
            exclude: ['id', 'publish_date'],
          }),
        },
      },
    })
    news: Omit<News, 'id'>,
  ): Promise<News> {
    let currentDate = new Date();
    news.publish_date = currentDate
    return this.newsRepository.create(news);
  }

  @get('/news/count')
  @response(200, {
    description: 'News model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.count(where);
  }

  @get('/news')
  @response(200, {
    description: 'Array of News model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NewsResponse),
        },
      },
    },
  })
  async find(
    @param.filter(News) filter?: Filter<News>,
    @param.query.string('language') language?: string,
  ): Promise<NewsResponse[]> {
    let returnedData = this.newsRepository.find(filter);
    var response: NewsResponse[] = [];
    (await returnedData).forEach(function (item) {
      var object = new NewsResponse();
      object.id = item.id;
      object.title = ((language == 'en') ? item.title.english : item.title.deutsch) ?? '';
      object.sub_title = (language == 'en') ? item.sub_title.english : item.sub_title.deutsch;
      object.content = ((language == 'en') ? item.content.english : item.content.deutsch) ?? '';
      object.publish_date = item.publish_date ?? new Date();
      response.push(object);
    });
    return response;
  }

  @patch('/news')
  @response(200, {
    description: 'News PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {partial: true}),
        },
      },
    })
    news: News,
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.updateAll(news, where);
  }

  @get('/news/{id}')
  @response(200, {
    description: 'News model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(News, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(News, {exclude: 'where'}) filter?: FilterExcludingWhere<News>
  ): Promise<News> {
    return this.newsRepository.findById(id, filter);
  }

  @patch('/news/{id}')
  @response(204, {
    description: 'News PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {partial: true}),
        },
      },
    })
    news: News,
  ): Promise<void> {
    await this.newsRepository.updateById(id, news);
  }

  @put('/news/{id}')
  @response(204, {
    description: 'News PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() news: News,
  ): Promise<void> {
    await this.newsRepository.replaceById(id, news);
  }

  @del('/news/delete/{id}')
  @response(204, {
    description: 'News DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.newsRepository.deleteById(id);
  }
}
