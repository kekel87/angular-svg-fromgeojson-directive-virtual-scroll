import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';

  geojsons$: Observable<any>;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.geojsons$ = this.http.get(url).pipe(
      map((c: { features: any[] }) => [
        ...c.features,
        ...c.features,
        ...c.features,
        ...c.features,
        ...c.features,
        ...c.features,
        ...c.features,
        ...c.features,
        ])
    );
  }

}   
