export type {
  Flight,
  FlightSearchValues,
  Passenger,
  EmergencyInfo,
  BookedFlights,
  CreditInfo,
  AuthInfo,
  PaymentFormInfo,
  FlightPrice,
  FilterAirlines,
};

interface Flight {
  id: string;
  logo: string;
  airline: string;
  duration: string;
  time: string;
  stops: {
    name: string;
    duration: string;
  }[];
  price: {
    subtotal: number;
    taxes: number;
    total: number;
  };
  flightType: string;
  flightNumber: string;
  autoBook: boolean;
}

interface FlightSearchValues {
  from: string;
  to: string;
  flightType: string;
  slectedDates: string[];
  passengerCount: { adults: number; minors: number; infants: number };
  cabin: string;
}

interface Passenger {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  email: string;
  phone: string;
  redress: string;
  knownTraveler: string;
  ageGroup?: string;
  bags?: number;
}
interface EmergencyInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface BookedFlights {
  flights?: Flight[];
  from?: string;
  to?: string;
  selectedDates?: string[];
  passengers?: Passenger[];
  emergency?: EmergencyInfo;
  bags?: number[];
}
interface CreditInfo {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}
interface AuthInfo {
  email: string;
  password: string;
}

interface PaymentFormInfo {
  paymentInfo: CreditInfo;
  authInfo?: AuthInfo;
}

interface FlightPrice {
  lowest_price: number;
  price_level: string;
  typical_price_range: number[];
  price_history: number[][];
}

interface FilterAirlines {
  'Air Canada': boolean;
  'Air Caraibes': boolean;
  'Air France': boolean;
  'Air New Aealand': boolean;
  'Air Tahiti Nui': boolean;
  'Air Transat': boolean;
  Alaska: boolean;
  American: boolean;
  Austrian: boolean;
  'British Airways': boolean;
  'Brussels Airlines': boolean;
  Delta: boolean;
  Finnair: boolean;
  'French bee': boolean;
  Hawaiian: boolean;
  Iberia: boolean;
  KLM: boolean;
  Lufthansa: boolean;
  'Qatar Airways': boolean;
  Saudia: boolean;
  'Singapore Airlines': boolean;
  'Tap Air Portugal': boolean;
  United: boolean;
  'Virgin Atlantic': boolean;
}
