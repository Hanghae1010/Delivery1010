import { Test, TestingModule } from '@nestjs/testing';
import * as usersDb from 'src/mock-db/users.json';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Users service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('사용자 회원가입', () => {
    const createAccountArgs = {
      name: 'jeonghyun',
      email: 'test@email.com',
      password: 'test.password',
      role: 0,
      address: 'asdf123',
    };

    test('중복 회원가입 불가', async () => {
      // findOne
      const findResult = await usersDb.find((user) => user.id === 1);
      expect(findResult).toEqual(usersDb[0]);
    });

    test('회원가입 성공', async () => {
      const result = await service.createAccount(createAccountArgs);

      expect(result).toEqual(true);
    });
  });
});
