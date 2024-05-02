import { Body, Delete, Get, Post, Put, UploadedFile } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { PaginationResponse } from '@common/@types';
import { Action, File } from '@common/@types';
import { ApiFile, Public, UUIDParam } from '@common/decorators';
import { CursorPaginationDto } from '@common/dtos';
import { fileValidatorPipe } from '@common/misc';
import { User } from '@entities';
import { CheckPolicies, GenericPolicyHandler } from '@lib/casl';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';
import { GenericResolver } from '@common/decorators/resolver.decorator';
import { Args, Query, Resolver } from '@nestjs/graphql';

@GenericResolver('users')
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Query(() => User)
  findAll(
    @Args('CursorPaginationDto') PaginationDto: CursorPaginationDto,
  ): Observable<PaginationResponse<User>> {
    return this.userService.findAll(PaginationDto);
  }

  // @Public()
  // @Post('register')
  // @ApiFile({ fieldName: 'avatar', required: true }) // fix this
  // publicRegistration(
  //   @Body() dto: UserRegistrationDto,
  //   @UploadedFile(fileValidatorPipe({})) image: File,
  // ): Observable<User> {
  //   return this.userService.create({
  //     ...dto,
  //     roles: [Roles.AUTHOR],
  //     files: image,
  //   });
  // }

  @Get(':idx')
  @CheckPolicies(new GenericPolicyHandler(User, Action.Read))
  findOne(@UUIDParam('idx') index: string): Observable<User> {
    return this.userService.findOne(index);
  }

  @Post()
  @CheckPolicies(new GenericPolicyHandler(User, Action.Create))
  @ApiFile({ fieldName: 'avatar', required: true })
  create(
    @Body() dto: CreateUserDto,
    @UploadedFile(fileValidatorPipe({})) image: File,
  ): Observable<User> {
    return this.userService.create({ ...dto, files: image });
  }

  @Put(':idx')
  @CheckPolicies(new GenericPolicyHandler(User, Action.Update))
  update(
    @UUIDParam('idx') index: string,
    @Body() dto: EditUserDto,
    @UploadedFile(fileValidatorPipe({ required: false })) image?: File,
  ) {
    return this.userService.update(index, dto, image);
  }

  @Delete(':idx')
  @CheckPolicies(new GenericPolicyHandler(User, Action.Delete))
  remove(@UUIDParam('idx') index: string): Observable<User> {
    return this.userService.remove(index);
  }
}
