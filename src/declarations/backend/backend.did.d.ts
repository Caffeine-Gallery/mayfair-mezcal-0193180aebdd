import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Reservation {
  'date' : string,
  'name' : string,
  'time' : string,
  'email' : string,
  'notes' : string,
  'phone' : string,
  'guests' : bigint,
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export interface _SERVICE {
  'getReservations' : ActorMethod<[], Array<Reservation>>,
  'makeReservation' : ActorMethod<[Reservation], Result>,
  'submitContact' : ActorMethod<[string, string, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
