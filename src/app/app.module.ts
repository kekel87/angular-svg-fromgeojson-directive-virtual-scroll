import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';


import { AppComponent } from './app.component';
import { FromGeojsonDirective } from './from-geojson.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ScrollingModule  ],
  declarations: [ AppComponent, FromGeojsonDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
