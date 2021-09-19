import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUsersDto } from "../users/dto/create-users.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('login')
  login(@Body() userDto: CreateUsersDto) {
    return this.authService.login(userDto)
  }

  @Post('registration')
  registration(@Body() userDto: CreateUsersDto) {
    return this.authService.registration(userDto)
  }

}
