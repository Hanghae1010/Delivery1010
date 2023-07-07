import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserRole, UserStatus } from 'src/main/users/entities/user.entity';

describe('User (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('회원가입을 할 수 있다', () => {
    const email = 'e2etest@gmail.com';
    const name = 'e2etester';
    const role = UserRole.Client;
    const address = 'tester';
    const status = UserStatus.Active;
    return request(app.getHttpServer())
      .post('/users/signup')
      .send({
        name,
        email,
        password: 'asdf',
        role,
        address,
        status,
      })
      .expect(201)
      .then((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.email).toEqual(email);
        expect(res.body.role).toEqual(role);
        expect(res.body.address).toEqual(address);
        expect(res.body.status).toEqual(status);
      });
  });

  test('회원가입 한 계정으로 로그인을 할 수 있다', () => {
    const email = 'e2etest@gmail.com';
    const password = 'asdf';
    return request(app.getHttpServer())
      .post('/users/signin')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.email).toEqual(email);
      });
  });
});
