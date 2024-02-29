// search.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { CountriesService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  isLoading: boolean = false;
  private searchSubscription: Subscription | undefined;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((value: string | null): value is string => value !== null && typeof value === 'string' && value.length > 2),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap((value: string) => {
        return this.countriesService.searchCountries(value || '');
      }),
      debounceTime(500),
      tap(() => this.isLoading = false),
    ).subscribe({
      next: () => {
        // Navigate to search results route with query parameter
        this.router.navigate(['/search-results'], { queryParams: { q: this.searchControl.value } });
      },
      error: () => {
        this.isLoading = false; // Set isLoading to false on error
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the search subscription to prevent memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  clearSearch(): void {
    if (!this.searchControl.value || this.searchControl.value.trim().length === 0) {
      // Clear the countries array and route when input field is empty
      this.router.navigate(['/']);
    }
  }
}
