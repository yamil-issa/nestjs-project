import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}
  //Signup
  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('email') userEmail: string,
    @Body('username') userName: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.userService.createUser(
      userName,
      userEmail,
      hashedPassword,
    );
    return {
      msg: 'User successfully created',
      userId: result.id,
      userName: result.username,
    };
  }

  //Login
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.userService.getUser(credentials.email);
    if (user) {
      const passwordMatch = await bcrypt.compare(credentials.password, user.password);
      if (passwordMatch) {
        const token = this.authService.generateToken(user);
        return {
          msg: 'User successfully logged in',
          token };
      }
    }
    throw new UnauthorizedException('Invalid email or password');
  }
}

 
