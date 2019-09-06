import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material Imports
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MyNavbarComponent } from './my-navbar/my-navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';

// NG terminal
import { NgTerminalModule } from 'ng-terminal';

// Router
import { RouterModule, Routes } from '@angular/router';

// Providers

import {InstanceService} from './services/instance.service'
import {InfrastructureService} from './services/infrastructure.service'
import {PlaybookService} from './services/playbook.service';
import { NewPlaybookFormComponent } from './new-playbook-form/new-playbook-form.component';
import { NewInstanceFormComponent } from './new-instance-form/new-instance-form.component'

// SOCKET IO
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ConsoleService } from './services/console.service';
import { ConsoleLoggerComponent } from './console-logger/console-logger.component';
import { MyInfrastructureComponent } from './my-infrastructure/my-infrastructure.component';
import { AddInstanceDialogComponent } from './add-instance-dialog/add-instance-dialog.component';

import { ip } from './ip';

const config: SocketIoConfig = { url: 'http://' + ip + ':3000', options: {} };

const appRoutes: Routes = [
  { path: '', component: MyDashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavbarComponent,
    MyDashboardComponent,
    NewPlaybookFormComponent,
    NewInstanceFormComponent,
    ConsoleLoggerComponent,
    MyInfrastructureComponent,
    AddInstanceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    ScrollingModule,
    NgTerminalModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    InstanceService,
    InfrastructureService,
    PlaybookService,
    ConsoleService
  ],
  entryComponents: [
    AddInstanceDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
