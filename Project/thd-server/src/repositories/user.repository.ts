import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Credentials, User, UserRelations} from '../models';
import {CredentialsRepository} from './credentials.repository';

export type UserCredentials = {
  username: string;
  password: string;
  role?: string
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly credentials: HasOneRepositoryFactory<Credentials, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CredentialsRepository') protected credentialsRepositoryGetter: Getter<CredentialsRepository>,
  ) {
    super(User, dataSource);
    this.credentials = this.createHasOneRepositoryFactoryFor('credentials', credentialsRepositoryGetter);
    this.registerInclusionResolver('credentials', this.credentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<Credentials | undefined> {
    try {
      return await this.credentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
