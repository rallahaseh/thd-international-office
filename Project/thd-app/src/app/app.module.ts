import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageComponent } from './language/language.component';
import { HomeComponent } from './home/home.component';
import { RegisterInterfaceComponent } from './register/register-interface/register-interface.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegistrationComponent } from './register/admin-registration/admin-registration.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { LabsComponent } from './labs/labs.component';
import { NewsDialogComponent } from './news/news-dialog/news-dialog.component';
import { LabsDialogComponent } from './labs/labs-dialog/labs-dialog.component';
import { LabsReserveComponent } from './labs/labs-reserve/labs-reserve.component';
import { ApplyComponent } from './students/apply/apply.component';
import { InternationalComponent } from './students/international/international.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// HTTP package
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';

// Navigation-bar components
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
// Language components
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Error dialogs component
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ErrorDialogService } from './error-dialog.service';

// Authentication component
import { AuthenticationService } from './services/authentication.service';

/*
*****************************
*  Material Design Modules  *
*****************************
 */
// CDK Layout
import { LayoutModule } from '@angular/cdk/layout';
// <mat-toolbar> is a container for headers, titles, or actions.
import { MatToolbarModule } from '@angular/material/toolbar';
// mat-icon makes it easier to use vector-based icons in your app. This directive supports both icon fonts and SVG icons, but not bitmap-based formats (png, jpg, etc.).
import { MatIconModule } from '@angular/material/icon';
// Angular Material buttons are native <button> or <a> elements enhanced with Material Design styling and ink ripples.
import { MatButtonModule } from '@angular/material/button';
// <mat-divider> is a component that allows for Material styling of a line separator with various orientation options. 
import { MatDividerModule } from '@angular/material/divider';
// <mat-menu> is a floating panel containing list of options.
import { MatMenuModule } from '@angular/material/menu';
// <mat-list> is a container component that wraps and formats a series of line items. As the base list component, it provides Material Design styling, but no behavior of its own.
import { MatListModule } from '@angular/material/list';
// The sidenav components are designed to add side content to a fullscreen app. To set up a sidenav we use three components: <mat-sidenav-container> which acts as a structural container for our content and sidenav, <mat-sidenav-content> which represents the main content, and <mat-sidenav> which represents the added side content.
import { MatSidenavModule } from '@angular/material/sidenav';
// <mat-select> is a form control for selecting a value from a set of options, similar to the native <select> element. You can read more about selects in the Material Design spec. It is designed to work inside of a <mat-form-field> element.
import { MatSelectModule } from '@angular/material/select';
// <mat-card> is a content container for text, photos, and actions in the context of a single subject.
import { MatCardModule } from '@angular/material/card';
// The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar. It is made up of several components, directives and the date implementation module that work together.
import { MatDatepickerModule } from '@angular/material/datepicker';
// Native Datepicker
import { MatNativeDateModule } from '@angular/material/core';
// <mat-radio-button> provides the same functionality as a native <input type="radio"> enhanced with Material Design styling and animations.
import { MatRadioModule } from '@angular/material/radio';
// matInput is a directive that allows native <input> and <textarea> elements to work with <mat-form-field>.
import { MatInputModule } from '@angular/material/input';
// <mat-form-field> is a component used to wrap several Angular Material components and apply common Text field styles such as the underline, floating label, and hint messages.
import { MatFormFieldModule } from '@angular/material/form-field';
// <mat-grid-list> is a two-dimensional list view that arranges cells into grid-based layout.
import { MatGridListModule } from '@angular/material/grid-list';
// The MatDialog service can be used to open modal dialogs with Material Design styling and animations.
import { MatDialogModule } from '@angular/material/dialog';
// Badges are small status descriptors for UI elements. A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.
import { MatBadgeModule } from '@angular/material/badge';
// The mat-table provides a Material Design styled data-table that can be used to display rows of data.
import { MatTableModule } from '@angular/material/table';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterInterfaceComponent,
    AdminRegistrationComponent,
    RegisterComponent,
    NavigationBarComponent,
    LanguageComponent,
    LoginComponent,
    NewsComponent,
    NewsDialogComponent,
    LabsComponent,
    LabsDialogComponent,
    LabsReserveComponent,
    ApplyComponent,
    InternationalComponent,
    ChatComponent,
    UsersComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDialogModule,
    MatBadgeModule,
    MatTableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ErrorDialogService,
    AuthenticationService,
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
