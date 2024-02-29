import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  noResultsFound: boolean = false;
  private searchSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        // Call the searchCountries method with the query
        this.searchSubscription = this.countriesService.searchCountries(query).subscribe(countries => {
          this.countries = countries;
          this.noResultsFound = this.countries.length === 0; // Set flag based on countries length
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the search subscription to prevent memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
