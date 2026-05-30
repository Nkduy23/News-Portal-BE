import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const ADMIN = {
  email: 'admin@vov.vn',
  password: 'vov2026',
  role: 'admin',
};

interface JwtUser {
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  login(email: string, password: string) {
    if (email !== ADMIN.email || password !== ADMIN.password) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const payload = {
      sub: 'admin',
      email: ADMIN.email,
      role: ADMIN.role,
    };

    return {
      access_token: this.jwt.sign(payload),
      role: 'admin',
    };
  }

  getMe(user: JwtUser) {
    return {
      email: user.email,
      role: user.role,
    };
  }
}
