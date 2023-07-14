import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { JWTProps } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkIfUserExist = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (checkIfUserExist) {
      return await this.userRepository.update(createUserDto, {
        id: checkIfUserExist.id,
      });
    }

    return await this.userRepository.create(createUserDto);
  }

  async findOne(id: string) {
    const checkIfUserExist = await this.userRepository.findOne(id);

    if (!checkIfUserExist) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return checkIfUserExist;
  }

  async me(token: string) {
    const decoded = this.jwtService.decode(token) as JWTProps;
    if (!decoded || !decoded.email) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return this.userRepository.findOneByEmail(decoded.email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const checkIfUserExist = await this.userRepository.findOne(id);

    if (!checkIfUserExist) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.update(updateUserDto, { id: id });
  }
}
