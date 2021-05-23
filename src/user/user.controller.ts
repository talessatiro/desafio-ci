import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    listUsers(): UserDTO[] {
        return this.userService.listUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string): UserDTO {
        return this.userService.getUser(id);
    }

    @Post()
    saveUser(@Body() userDTO: UserDTO): UserDTO {
        return this.userService.saveUser(userDTO);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() userDTO: UserDTO): UserDTO {
        return this.userService.updateUser(id, userDTO);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string): void {
        this.userService.removeUser(id);
    }

}
