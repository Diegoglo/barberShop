import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent} from './layout/navbar/navbar.component';
import { FooterComponent} from './layout/footer/footer.component';
import { ProductInfoComponent} from './shared/product-info/product-info.component';
import { MainComponent} from './layout/main/main.component';
import { ServicesComponent} from './shared/services/services.component';
import { BarberProfileComponent} from './shared/barber-profile/barber-profile.component';
import { DiaryComponent} from './shared/diary/diary.component';
import { LoginComponent} from './auth/login/login.component';
import { RegisterComponent} from './auth/register/register.component';
import { BarbersComponent} from './barbers/barbers.component';
import { ScheduleTableComponent} from './shared/schedule-table/schedule-table.component';
import { PracticaExamenComponent} from './practica-examen/practica-examen.component';

// import { ScheduleComponent} from '../app/schedule/schedule.component';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
// import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    ProductInfoComponent,
    ServicesComponent,
    BarberProfileComponent,
    DiaryComponent,
    LoginComponent,
    RegisterComponent,
    BarbersComponent,
    ScheduleTableComponent,
    PracticaExamenComponent
    // ContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    // GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
