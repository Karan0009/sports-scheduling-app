import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './utils/prisma/prisma.service';
import { SportsScheduleService } from './services/sports-schedule/sports-schedule.service';
import { SportsScheduleController } from './controllers/sports-schedule/sports-schedule.controller';
import { AuthService } from './services/auth/auth.service';
import { CryptoService } from './utils/crypto/crypto.service';
import { UserService } from './services/user/user.service';
import { JwtService } from './utils/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { HelperFunctionsService } from './utils/helper-functions/helper-functions.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, SportsScheduleController],
  providers: [
    AppService,
    PrismaService,
    SportsScheduleService,
    AuthService,
    CryptoService,
    UserService,
    JwtService,
    HelperFunctionsService,
  ],
})
export class AppModule {}
