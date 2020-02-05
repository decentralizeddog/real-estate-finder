import { User } from './user';
export interface Apartment {
    _id: string;
    name: string;
    description: string;
    size: number;
    price: number;
    roomNums: number;
    realtor: User;
    rented: boolean;
    created: Date;
    coordinates?: Array<number>;
}
