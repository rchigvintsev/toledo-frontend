import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ColorBlockModule} from 'ngx-color/block';

import {routes} from '../app-routing.module';
import {TranslateHttpLoaderFactory} from '../app.module';
import {AppComponent} from '../app.component';
import {AlertComponent} from '../component/alert/alert.component';
import {SigninComponent} from '../component/signin/signin.component';
import {TasksComponent} from '../component/tasks/tasks.component';
import {TaskCommentsComponent} from '../component/task-comments/task-comments.component';
import {TagsComponent} from '../component/tags/tags.component';
import {TaskListsComponent} from '../component/task-lists/task-lists.component';
import {TasksByGroupComponent} from '../component/tasks-by-group/tasks-by-group.component';
import {TasksByTagComponent} from '../component/tasks-by-tag/tasks-by-tag.component';
import {TaskListComponent} from '../component/task-list/task-list.component';
import {TaskDetailsComponent} from '../component/task-details/task-details.component';
import {SidenavMenuComponent} from '../component/sidenav-menu/sidenav-menu.component';
import {ConfirmationDialogComponent} from '../component/confirmation-dialog/confirmation-dialog.component';
import {ColorPickerDialogComponent} from '../component/color-picker-dialog/color-picker-dialog.component';
import {NotFoundComponent} from '../component/not-found/not-found.component';
import {DummyComponent} from '../component/dummy/dummy.component';
import {LocalizedDatePipe} from '../pipe/localized-date.pipe';
import {LocalizedRelativeDatePipe} from '../pipe/localized-relative-date.pipe';

export class TestSupport {
  public static readonly IMPORTS = [
    FormsModule,
    ReactiveFormsModule,
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
    MatBadgeModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    ColorBlockModule,
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
    TaskCommentsComponent,
    TagsComponent,
    TaskListsComponent,
    TasksByGroupComponent,
    TasksByTagComponent,
    TaskListComponent,
    TaskDetailsComponent,
    SidenavMenuComponent,
    ConfirmationDialogComponent,
    ColorPickerDialogComponent,
    NotFoundComponent,
    DummyComponent,
    LocalizedDatePipe,
    LocalizedRelativeDatePipe
  ];
}
