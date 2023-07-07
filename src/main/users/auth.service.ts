import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserRole, UserStatus } from './entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    address: string,
    status: UserStatus,
  ) {
    // 이메일 중복 확인
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('이메일은 사용중입니다');
    }
    // 비밀번호 hashing : hash + salt = hashed pw
    //  - salt 생성
    const salt = randomBytes(8).toString('hex');
    //  - 비밀번호 + salt값 hashing
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //  - hash 값, salt 값 '.'으로 join
    const passwordResult = salt + '.' + hash.toString('hex');
    // - 유저 생성 및 저장
    const user = await this.usersService.create(
      name,
      email,
      passwordResult,
      role,
      address,
      status,
    );
    return user;
  }
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('사용자를 찾지 못했습니다');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }
    return user;
  }
}
