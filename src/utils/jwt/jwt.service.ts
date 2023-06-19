import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { GenerateTokenDto } from 'src/models/dtos/generate-token-dto';

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}

  generateToken(data: GenerateTokenDto): Promise<string | null> {
    try {
      let secretKey = this.config.get('JWT_SECRET_KEY');
      if (!secretKey) throw new Error('Secret key not found');
      return jwt.sign(data.payload, secretKey, {
        expiresIn: data.expiresIn,
      });
    } catch (err) {
      return null;
    }
  }

  async verifyToken(token: string): Promise<any | null> {
    try {
      let secretKey = this.config.get('JWT_SECRET_KEY');
      if (!secretKey) throw new Error('Secret key not found');
      const decodedToken = jwt.verify(token, secretKey);
      return decodedToken;
    } catch (err) {
      return null;
    }
  }
}
