import { Restaurant } from '../restaurant/restaurant.entity';
export declare class Account {
    accountId: string;
    username: string;
    passwordHash: string;
    role: 'Admin' | 'Employee' | 'Kitchen';
    email: string;
    phone: string;
    createdAt: Date;
    status: number;
    restaurant: Restaurant;
}
