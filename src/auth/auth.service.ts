import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { CreateUsersDto } from "../users/dto/create-users.dto";
import { UsersService } from "../users/users.service";
import { Users } from "../users/schema/users.schema";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUsersDto) {
    const user = await this.validateUser(userDto) // проверяю существования юзера
    return this.generateToken(user) // есть есть отдаю токен
  }

  async registration(userDto: CreateUsersDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email) // создаю переменную кандидаты , где проверяю на существования
    if(candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST) // если почта занята
    }
    const hashPassword = await bcrypt.hash(userDto.password,5) // кеширую пароль с солью 5
    const user = await this.userService.createUsers({...userDto,password: hashPassword}) // создаю пользователя по объекту , изменял поле пароль на кешированный
    return this.generateToken(user) // возвращаю пользователю токен
  }

  private async generateToken(user: Users) {
    const payload = { email: user.email } // прячу в токен email
    return {
      token: this.jwtService.sign(payload) // создаю токен по пейлоаду
    }
  }

  private async validateUser(userDto: CreateUsersDto) {
    const user = await this.userService.getUserByEmail(userDto.email) // поиск юзера
    const passEquals = await bcrypt.compare(userDto.password, user.password) // проверяю прешедший пароль и пароль из БД
    if(user && passEquals) { // если все хорошо , то возвращаю пользователя
      return user
    }
    throw new UnauthorizedException({message: 'Некорректная почта или пароль'}) // ошибка для пользователя
  }
}
