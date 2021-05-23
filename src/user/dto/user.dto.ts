import { v4 } from 'uuid';

export class UserDTO {
    id: string;
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.id = v4();
        this.name = name;
        this.age = age;
    }
}