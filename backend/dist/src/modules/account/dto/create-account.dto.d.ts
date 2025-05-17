export declare class CreateAccountDto {
    username: string;
    passwordHash: string;
    role: 'Admin' | 'Employee' | 'Kitchen';
    email?: string;
    phone?: string;
    restaurantId?: string;
}
