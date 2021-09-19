import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./schema/users.schema";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.getOneUsers(id)
  }

  @Post()
  create(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.createUsers(createUsersDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Users> {
    return this.usersService.removeUsers(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto): Promise<Users> {
    return this.usersService.updateUsers(id,updateUsersDto)
  }
}
