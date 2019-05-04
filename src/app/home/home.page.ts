import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({

        // THIS IS THE QUERY...
        query: gql`
          query traerTodosLosUsuarios
          {
            allUsers{
              id
              name
            }
          }
        `,
      })
      // WHEN THE VALUE CHANGES, WE GET A STREAM FROM THE SUBSCRIPTION
      .valueChanges.subscribe((result : ApolloQueryResult<any> ) => {
        console.log(result.data.allUsers);
        
        // THE RATES THAT ARE RETURNED ARE NOW AVAILABLE
        // FOR DISPLAY IN THE UI
        this.rates = result.data && result.data.allUsers;
        
        // LOADING STATUS
        
        this.loading = result.loading;
               
        // ERRORS
        this.error = result.errors;
      });
  }
}
