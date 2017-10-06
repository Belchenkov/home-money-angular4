import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

// Components
import { AppComponent } from './app.component';

// Services
import { UsersService } from "./shared/services/users.service";
import { AuthService } from "./shared/services/auth.service";
import { SystemModule } from "./system/system.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    SystemModule
  ],
  providers: [UsersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
