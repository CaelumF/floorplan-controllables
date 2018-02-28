import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { LightInterfaceComponent } from './components/light-interface/light-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LightInterfaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
