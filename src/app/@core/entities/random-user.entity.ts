import { Type } from 'class-transformer';

export class RandomUserEntity {
  gender: string;

  @Type(() => Name)
  name: Name;

  @Type(() => Location)
  location: Location;

  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

class Name {
  title: string;
  first: string;
  last: string;

  get fullName(): string {
    return `${this.first} ${this.last}`;
  }
}

class Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;

  get fullAddress(): string {
    return `${this.street.number} ${this.street.name}, ${this.city}, ${this.state}, ${this.country}, ${this.postcode}`;
  }
}

class Street {
  number: number;
  name: string;
}

class Coordinates {
  latitude: string;
  longitude: string;
}

class Timezone {
  offset: string;
  description: string;
}

class Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

class Dob {
  date: string;
  age: number;
}

class Registered {
  date: string;
  age: number;
}

class Id {
  name: string;
  value: any;
}

class Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
