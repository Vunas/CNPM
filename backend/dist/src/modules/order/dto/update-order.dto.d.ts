export declare class UpdateOrderDto {
    totalPrice?: number;
    orderStatus?: 'Pending' | 'Confirmed' | 'Finished' | 'Cancelled';
    orderType?: 'Dine-in' | 'Takeaway' | 'Delivery';
    paymentMethod?: 'Cash' | 'Credit Card' | 'E-wallet';
    tableId?: string;
    customerContact?: string;
    accountId?: string;
    restaurantId?: string;
    status?: number;
}
