import { IsEmail, IsNotEmpty, Length, IsEnum } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    id!: string;

    @IsNotEmpty()
    firstName!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    phoneNumber!: string;

    @IsEmail()
    email!: string;

    @Length(8)
    password!: string;

    @IsEnum(['user', 'admin'])
    role!: 'user' | 'admin';
}
