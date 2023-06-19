import {
  PipeTransform,
  Injectable,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from 'src/utils/jwt/jwt.service';

@Injectable()
export class AuthPipe implements PipeTransform {
  constructor(private readonly jwt: JwtService) {}

  transform(@Req() request): Request {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwt.verifyToken(token);
      request.user = decoded;
      return request;
    } catch (error) {
      throw new UnauthorizedException('Invalid authorization token');
    }
  }
}
