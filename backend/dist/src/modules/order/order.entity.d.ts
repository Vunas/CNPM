import { Restaurant } from '../restaurant/restaurant.entity';
import { Account } from '../account/account.entity';
import { RestaurantTable } from '../restauranttable/restaurantTable.entity';
export declare class Order {
    orderId: string;
    orderDate: Date;
    totalPrice: number;
    orderStatus: 'Pending' | 'Confirmed' | 'Prepared' | 'Finished' | 'Cancelled';
    orderType: 'Dine-in' | 'Takeaway' | 'Delivery';
    paymentMethod: 'Cash' | 'Credit Card' | 'E-wallet' | null;
    tableId: string | null;
    restaurantTable: RestaurantTable | null;
    customerContact: string;
    accountId: string | null;
    account: Account | null;
    restaurant: Restaurant;
    status: number;
}
