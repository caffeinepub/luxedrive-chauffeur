import Order "mo:core/Order";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  type Booking = {
    name : Text;
    email : Text;
    phone : Text;
    pickupLocation : Text;
    destination : Text;
    date : Text;
    time : Text;
    passengers : Nat;
    vehiclePreference : Text;
    specialRequests : Text;
    status : BookingStatus;
    timestamp : Time.Time;
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
  };

  type ContactRequest = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type QuoteRequest = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Int.compare(booking1.timestamp, booking2.timestamp);
    };
  };

  public type BookRequest = {
    name : Text;
    email : Text;
    phone : Text;
    pickupLocation : Text;
    destination : Text;
    date : Text;
    time : Text;
    passengers : Nat;
    vehiclePreference : Text;
    specialRequests : Text;
  };

  let bookings = Map.empty<Nat, Booking>();
  let contactRequests = Map.empty<Nat, ContactRequest>();
  var nextId = 0;

  public query ({ caller }) func getBooking(id : Nat) : async Booking {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) { booking };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray().sort();
  };

  public shared ({ caller }) func createBooking(request : BookRequest) : async Nat {
    let id = nextId;
    nextId += 1;
    let booking : Booking = {
      request with
      status = #pending;
      timestamp = Time.now();
    };
    bookings.add(id, booking);
    id;
  };

  public query ({ caller }) func getContactRequest(id : Nat) : async ContactRequest {
    switch (contactRequests.get(id)) {
      case (null) { Runtime.trap("Contact request not found") };
      case (?contact) { contact };
    };
  };

  public query ({ caller }) func getAllContactRequests() : async [ContactRequest] {
    contactRequests.values().toArray();
  };

  public shared ({ caller }) func createContactRequest(name : Text, email : Text, message : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let contactRequest : ContactRequest = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactRequests.add(id, contactRequest);
    id;
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : BookingStatus) : async () {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = { booking with status };
        bookings.add(id, updatedBooking);
      };
    };
  };
};
