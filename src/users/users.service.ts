import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "./schema/users.schema";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async getAllUsers() {
    return this.usersModel.find().exec()
  }

  async getOneUsers(id: string): Promise<Users> {
    return this.usersModel.findById(id)
  }

  async createUsers(createUsersDto: CreateUsersDto): Promise<Users> {
    const newUsers = new this.usersModel(createUsersDto)
    return newUsers.save()
  }

  async removeUsers(id): Promise<Users> {
    return this.usersModel.findByIdAndRemove(id)
  }

  async updateUsers(id, updateUsersDto: UpdateUsersDto): Promise<Users> {
    return this.usersModel.findByIdAndUpdate(id,updateUsersDto)
  }

  async getUserByEmail(email: string) { // поиск по почте , возвращает true || false
    const user = await this.usersModel.findOne({where: {email},include: {new: true}})
    return user;
  }
}
