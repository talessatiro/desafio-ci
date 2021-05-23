import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    private users: UserDTO[] = [];

    constructor() { }

    listUsers(): UserDTO[] {
        return this.users;
    }

    getUser(id: string): UserDTO {
        const user = this.users.find((user: UserDTO) => user.id === id);

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    saveUser(userDTO: UserDTO): UserDTO {
        const user = new UserDTO(userDTO.name, userDTO.age);
        this.users.push(user);

        return user;
    }

    updateUser(id: string, userDTO: UserDTO): UserDTO {
        const user = this.getUser(id);

        user.name = userDTO.name;
        user.age = userDTO.age;

        return user;
    }

    removeUser(id: string): void {
        const user = this.users.find((user: UserDTO) => user.id === id);

        if (!user) {
            throw new ConflictException(`The user with id ${id} already was removed`);
        }

        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
    }
}
