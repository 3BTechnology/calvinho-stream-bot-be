import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '../prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({ data: data });
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(
    input: Omit<Prisma.UserUpdateInput, 'id' | 'email'>,
    where: Prisma.UserWhereUniqueInput,
  ) {
    return await this.prismaService.user.update({ data: input, where });
  }
}
