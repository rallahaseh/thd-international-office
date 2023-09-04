import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Labs, LabsRelations} from '../models';

export class LabsRepository extends DefaultCrudRepository<
  Labs,
  typeof Labs.prototype.id,
  LabsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Labs, dataSource);
  }
}
