import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactRequest {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Booking {
    status: BookingStatus;
    destination: string;
    date: string;
    name: string;
    specialRequests: string;
    time: string;
    vehiclePreference: string;
    passengers: bigint;
    email: string;
    timestamp: Time;
    phone: string;
    pickupLocation: string;
}
export type Time = bigint;
export interface BookRequest {
    destination: string;
    date: string;
    name: string;
    specialRequests: string;
    time: string;
    vehiclePreference: string;
    passengers: bigint;
    email: string;
    phone: string;
    pickupLocation: string;
}
export enum BookingStatus {
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export interface backendInterface {
    createBooking(request: BookRequest): Promise<bigint>;
    createContactRequest(name: string, email: string, message: string): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllContactRequests(): Promise<Array<ContactRequest>>;
    getBooking(id: bigint): Promise<Booking>;
    getContactRequest(id: bigint): Promise<ContactRequest>;
    updateBookingStatus(id: bigint, status: BookingStatus): Promise<void>;
}
