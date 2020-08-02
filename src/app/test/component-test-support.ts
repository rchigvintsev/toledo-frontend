import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {routes} from '../app-routing.module';
import {TranslateHttpLoaderFactory} from '../app.module';
import {AppComponent} from '../app.component';
import {AlertComponent} from '../alert/alert.component';
import {SigninComponent} from '../signin/signin.component';
import {TasksComponent} from '../tasks/tasks.component';
import {TaskDetailComponent} from '../task-detail/task-detail.component';
import {TaskCommentsComponent} from '../task-comments/task-comments.component';
import {TaskGroupsComponent} from '../task-groups/task-groups.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {NotFoundComponent} from '../error/not-found/not-found.component';
import {DummyComponent} from '../dummy/dummy.component';
import {LocalizedDatePipe} from '../pipe/localized-date.pipe';
import {LocalizedRelativeDatePipe} from '../pipe/localized-relative-date.pipe';

export class ComponentTestSupport {
  public static readonly IMPORTS = [
    FormsModule,
    HttpClientTestingModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    RouterTestingModule.withRoutes(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaterialTimepickerModule
  ];

  public static readonly DECLARATIONS = [
    AppComponent,
    AlertComponent,
    SigninComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskCommentsComponent,
    TaskGroupsComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,
    DummyComponent,
    LocalizedDatePipe,
    LocalizedRelativeDatePipe
  ];
}
