import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<any> => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "https://countries.trevorblades.com"
          })
        };
      },
      deps: [HttpLink]
    }
  ]
})
export class ApolloConfigModule { }
