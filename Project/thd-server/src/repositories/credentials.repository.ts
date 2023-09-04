import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Credentials, CredentialsRelations} from '../models';

export class CredentialsRepository extends DefaultCrudRepository<
  Credentials,
  typeof Credentials.prototype.id,
  CredentialsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Credentials, dataSource);
  }
}
