import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchModule } from '../search/search.module';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY FOR DEMO

// ALWAYS REQUIRED 
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { EgretSidebarComponent, EgretSidebarTogglerDirective } from './egret-sidebar/egret-sidebar.component';
import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
import { EgretExampleViewerComponent } from './example-viewer/example-viewer.component';
import { EgretExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';
import { EgretNotifications2Component } from './egret-notifications2/egret-notifications2.component';
import { DividerComponent } from './divider/divider.component';
import { allMaterialModules, commonMaterialModules } from '../material-imports';
import { PerfectScrollbarModule } from './perfect-scrollbar';
// Components that are NOT standalone
const nonStandaloneComponents = [
  ButtonLoadingComponent,
  EgretSidebarComponent,
  EgretSidebarTogglerDirective,
  BottomSheetShareComponent,
  EgretExampleViewerComponent,
  EgretExampleViewerTemplateComponent
];

// Standalone components that need to be imported
const standaloneComponents = [
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AuthLayoutComponent,
  EgretNotifications2Component,
  FooterComponent,
  AppComfirmComponent,
  DividerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    PerfectScrollbarModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    ...commonMaterialModules,
    ...allMaterialModules,
    // Import all standalone components
    ...standaloneComponents
  ],
  declarations: [
    // Only declare non-standalone components
    ...nonStandaloneComponents
  ],
  exports: [
    // Export both standalone and non-standalone components
    ...standaloneComponents,
    ...nonStandaloneComponents
  ]
})
export class SharedComponentsModule { }