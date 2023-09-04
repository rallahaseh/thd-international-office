import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const atlasConfig = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://rallahaseh:LeUSvujZYkoS9OH8@cluster0.8zjjc.mongodb.net/thd-international-office?retryWrites=true&w=majority',
  host: 'mongodb+srv://rallahaseh',
  port: 27017,
  user: 'rallahaseh',
  password: 'LeUSvujZYkoS9OH8',
  database: 'thd-international-office',
  useNewUrlParser: true
};

const localConfig = {
  name: 'mongodb',
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'thd-international-office',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = localConfig;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = localConfig,
  ) {
    super(dsConfig);
  }
}
