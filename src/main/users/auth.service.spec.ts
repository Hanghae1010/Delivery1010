import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User, UserRole, UserStatus } from './entities/user.entity';
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (
        name: string,
        email: string,
        password: string,
        role: UserRole,
        address: string,
        status: UserStatus,
      ) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          name,
          email,
          password,
          role,
          address,
          status,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  test('should be defined', async () => {
    expect(service).toBeDefined();
  });

  test('비밀번호 해싱 테스트', async () => {
    const user = await service.signup(
      'name',
      'fdjsal@gmail.com',
      '123',
      UserRole.Client,
      'address',
      UserStatus.Active,
    );
    expect(user.password).not.toEqual('123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('중복된 이메일로 회원가입 에러 반환', async () => {
    await service.signup(
      'name',
      'fdjsal@gmail.com',
      '123',
      UserRole.Client,
      'address',
      UserStatus.Active,
    );
    await expect(
      service.signup(
        'name2',
        'fdjsal@gmail.com',
        '123213',
        UserRole.Client,
        'address2',
        UserStatus.Active,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('회원가입 되지 않은 이메일로 로그인 시 에러 반환', async () => {
    await expect(
      service.signin('asdflk2222j@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('잘못된 비밀번호로 로그인 시 에러 반환', async () => {
    await service.signup(
      'name',
      'fdjsal@gmail.com',
      '123',
      UserRole.Client,
      'address',
      UserStatus.Active,
    );
    await expect(
      service.signin('fdjsal@gmail.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('유효한 이메일, 비밀번호로 로그인 시 로그인 성공', async () => {
    await service.signup(
      'name',
      'fdjsal@gmail.com',
      '123',
      UserRole.Client,
      'address',
      UserStatus.Active,
    );
    const user = await service.signin('fdjsal@gmail.com', '123');
    expect(user).toBeDefined();
  });
});
