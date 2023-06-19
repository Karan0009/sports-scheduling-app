import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CryptoService } from 'src/utils/crypto/crypto.service';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}

  async validateUserPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) return null;
    const isPasswordValid = await this.crypto.compareHash(
      password,
      user.password,
    );
    if (isPasswordValid) return { ...user, password: undefined };
    return null;
  }

  async signupUser(data: Prisma.UserCreateInput): Promise<User | null> {
    try {
      const password: string = await this.crypto.generateHash({
        stringToHash: data.password,
      });
      if (password === '') throw new Error('could not hash password');
      return await this.prisma.user.create({
        data: { ...data, password: password },
      });
    } catch (err) {
      return null;
    }
  }
}
