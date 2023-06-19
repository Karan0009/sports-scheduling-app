import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './services/auth/auth.service';
import { SignupUserDto } from './models/dtos/signup-user-dto';
import { UserService } from './services/user/user.service';
import ApiResponse from './models/api-response';
import { LoginUserDto } from './models/dtos/login-user-dto';
import { JwtService } from './utils/jwt/jwt.service';
import { Response } from 'express';

@Controller({ path: '/api' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly auth: AuthService,
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() data: LoginUserDto, @Res() res: Response) {
    try {
      const doesUserExists = await this.user.getUserByEmail(data.email);
      if (!doesUserExists)
        return res
          .status(401)
          .json(
            new ApiResponse(
              null,
              false,
              401,
              'Invalid username/ password',
              'Invalid username/ password',
            ),
          );
      const user = await this.auth.validateUserPassword(
        data.email,
        data.password,
      );
      if (!user)
        return res
          .status(401)
          .json(
            new ApiResponse(
              null,
              false,
              401,
              'Invalid username/ password',
              'Invalid username/ password',
            ),
          );
      const token = await this.jwt.generateToken({
        payload: user,
        expiresIn: '24h',
      });
      return res
        .status(200)
        .json(
          new ApiResponse(
            { user: user, token: token },
            true,
            200,
            'login successful',
            null,
          ),
        );
    } catch (err) {
      return res
        .status(500)
        .json(new ApiResponse(null, false, 500, 'Something went wrong', err));
    }
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async signupUser(@Body() data: SignupUserDto, @Res() res: Response) {
    try {
      const doesUserExists = await this.user.getUserByEmail(data.email);
      if (doesUserExists)
        return res
          .status(400)
          .json(
            new ApiResponse(
              null,
              false,
              400,
              'User already exists',
              'User already exists',
            ),
          );
      const newUser = await this.auth.signupUser({
        email: data.email,
        full_name: data.fullName,
        password: data.password,
      });
      return res
        .status(201)
        .json(
          new ApiResponse(
            { user: newUser },
            true,
            201,
            'Signup successfull',
            null,
          ),
        );
    } catch (err) {
      return res
        .status(500)
        .json(new ApiResponse(null, false, 500, 'Something went wrong', err));
    }
  }
}
