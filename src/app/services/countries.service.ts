import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';

interface CountryResponse {
  countries: Country[];
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private apollo: Apollo) { }

  searchCountries(query: string): Observable<Country[]> {
    // Split the query into words
    const words = query.split(' ');

    // Capitalize the first letter of each word except for "and"
    const capitalizedWords = words.map(word => {
      return word.toLowerCase() === 'and' ? 'and' : word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a single string
    const searchTerm = capitalizedWords.join(' ');

    // Construct the GraphQL query with the modified search term
    const searchTermRegex = `.*${searchTerm}.*`;

    return this.apollo.watchQuery<CountryResponse>({
      query: gql`
        query SearchCountries($searchTermRegex: String!) {
          countries(filter: { name: { regex: $searchTermRegex } }) {
            name
            capital
            currency
            emoji
            phone
            languages {
              name
            }
            continent {
              name
            }
          }
        }
      `,
      variables: {
        searchTermRegex: searchTermRegex
      }
    }).valueChanges.pipe(
      map(result => result.data.countries)
    );
  }
}
