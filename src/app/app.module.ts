import { AuthenticationService } from './services/authentication.service';
import { MessageService } from './services/message.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { ConfigurationService } from './services/configuration.service';
import { LogService } from './services/log.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { LogsComponent } from './components/logs/logs.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { ExceptionService } from './services/exception.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up',  component: SignupComponent },
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent
      },
        {
          path: 'viewlogs',
          component: LogsComponent
        }
    ]

  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogsComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    LogService,
    ConfigurationService,
    ExceptionService,
    HttpErrorHandler,
    MessageService,
    AuthenticationService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
