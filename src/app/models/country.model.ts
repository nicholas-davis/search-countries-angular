export interface Country {
  name: string;
  capital: string;
  currency: string;
  emoji: string;
  phone: number;
  languages: {
    name: string
  }[];
  continent: {
    name: string
  };
}
