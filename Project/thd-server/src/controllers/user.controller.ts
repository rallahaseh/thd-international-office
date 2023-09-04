import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, model, property, repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, post, requestBody, response} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {BasicAuthorization} from '../middlewares/auth.middleware';
import {User} from '../models';
import {UserCredentials, UserRepository} from '../repositories';
import {PasswordHasher} from '../services';

// User Profile Schema
const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'string'},
    first_name: {type: 'string'},
    last_name: {type: 'string'},
    email: {type: 'string'},
    date_of_birth: {type: 'date'},
  },
};

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, UserCredentials>,
  ) {
  }

  @post('/users/sign-up', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'Register Users as Student or Instructor',
            exclude: ['id'],
          }),
        },
      },
    })
    studentRequest: Omit<User, 'id'>,
  ): Promise<User> {
    // Encrypt the password
    const password = await this.passwordHasher.hashPassword(
      studentRequest.password,
    );
    studentRequest.password = password;

    try {
      // Save member data in database and return object
      const savedUser = await new Promise<User>((resolve, reject) => {
        this.userRepository
          .create(studentRequest).then(
            function (result) {
              return resolve(result);
            },
            function (error) {
              return reject(new HttpErrors.UnprocessableEntity(error));
            },
          );
      });
      // Save user id inside credentials
      await this.userRepository
        .credentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && (error.errmsg.includes('index: uniqueEmail') | error.errmsg.includes('index: uniqueUsername'))) {
        throw new HttpErrors.Conflict('Email/Username value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/admin/sign-up', {
    responses: {
      '200': {
        description: 'Admin',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createAdmin(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'Register Admin',
            exclude: ['id', 'role'],
          }),
        },
      },
    })
    adminRequest: Omit<User, 'id'>,
  ): Promise<User> {
    adminRequest.role = 'admin';
    // Encrypt the password
    const password = await this.passwordHasher.hashPassword(
      adminRequest.password,
    );
    adminRequest.password = password;

    try {
      // Save member data in database and return object
      const savedUser = await new Promise<User>((resolve, reject) => {
        this.userRepository
          .create(adminRequest).then(
            function (result) {
              return resolve(result);
            },
            function (error) {
              return reject(new HttpErrors.UnprocessableEntity(error));
            },
          );
      });
      // Save user id inside credentials
      await this.userRepository
        .credentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && (error.errmsg.includes('index: uniqueEmail') | error.errmsg.includes('index: uniqueUsername'))) {
        throw new HttpErrors.Conflict('Email/Username value is already taken');
      } else {
        throw error;
      }
    }
  }


  @get('/users/', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [BasicAuthorization],
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }
  
  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [BasicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'Required input for login',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    }) credentials: UserCredentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    let id = user.id;
    let role = user.role;
    let fullName = user.first_name + ' ' + user.last_name

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    let response = { id, token, role, fullName };
    
    return response;
  }
  
  @del('/users/delete/{id}')
  @response(204, {
    description: 'Labs DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
