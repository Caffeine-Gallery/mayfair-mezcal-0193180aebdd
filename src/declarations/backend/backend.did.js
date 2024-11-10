export const idlFactory = ({ IDL }) => {
  const Reservation = IDL.Record({
    'date' : IDL.Text,
    'name' : IDL.Text,
    'time' : IDL.Text,
    'email' : IDL.Text,
    'notes' : IDL.Text,
    'phone' : IDL.Text,
    'guests' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'getReservations' : IDL.Func([], [IDL.Vec(Reservation)], ['query']),
    'makeReservation' : IDL.Func([Reservation], [Result], []),
    'submitContact' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
