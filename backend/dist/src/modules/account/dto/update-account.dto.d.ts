export declare class UpdateAccountDto {
    username?: string;
    passwordHash?: string;
    role?: 'Admin' | 'Employee' | 'Kitchen';
    email?: string;
    phone?: string;
    restaurantId?: string;
    status?: number;
}
