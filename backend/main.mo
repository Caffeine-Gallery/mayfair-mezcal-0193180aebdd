import Int "mo:base/Int";
import Nat "mo:base/Nat";

import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

actor {
    // Types
    type Reservation = {
        name: Text;
        email: Text;
        date: Text;
        time: Text;
        guests: Nat;
        phone: Text;
        notes: Text;
    };

    type ContactMessage = {
        name: Text;
        email: Text;
        message: Text;
        timestamp: Int;
    };

    // Stable storage
    private stable var reservations : [Reservation] = [];
    private stable var messages : [ContactMessage] = [];

    // Reservation management
    public func makeReservation(reservation: Reservation) : async Result.Result<Text, Text> {
        let newReservations = Array.append<Reservation>(reservations, [reservation]);
        reservations := newReservations;
        #ok("Reservation confirmed")
    };

    public query func getReservations() : async [Reservation] {
        reservations
    };

    // Contact form
    public func submitContact(name: Text, email: Text, message: Text) : async Result.Result<Text, Text> {
        let newMessage : ContactMessage = {
            name = name;
            email = email;
            message = message;
            timestamp = Time.now();
        };
        
        let newMessages = Array.append<ContactMessage>(messages, [newMessage]);
        messages := newMessages;
        #ok("Message received")
    };
}
