import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CanvasSelectComponent } from './main/canvas-select/canvas-select.component';
import { EditTextComponent } from './main/edit-text/edit-text.component';
import { FiltersSelectComponent } from './main/filters-select/filters-select.component';
import { ImageSelectComponent } from './main/image-select/image-select.component';
import { LogoSelectComponent } from './main/logo-select/logo-select.component';
import { SizesSelectComponent } from './main/sizes-select/sizes-select.component';
import { TextSelectComponent } from './main/text-select/text-select.component';
import { ControlPanelComponent } from './main/control-panel/control-panel.component';
import { OverlayLogoComponent } from './main/overlay-logo/overlay-logo.component';
import { OverlayTextsComponent } from './main/overlay-texts/overlay-texts.component';
import { SelectableDirective } from './shared/directives/selectable.directive';
import { MoveClampedToParentDirective } from './shared/directives/move-clamped-to-parent.directive';
import { EditableTextComponent } from './main/editable-text/editable-text.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageLayerComponent } from './main/image-layer/image-layer.component';
import { OverlayImageLayerComponent } from './main/overlay-image-layer/overlay-image-layer.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CanvasSelectComponent,
    EditTextComponent,
    FiltersSelectComponent,
    ImageSelectComponent,
    LogoSelectComponent,
    SizesSelectComponent,
    TextSelectComponent,
    ControlPanelComponent,
    OverlayLogoComponent,
    OverlayTextsComponent,
    SelectableDirective,
    MoveClampedToParentDirective,
    EditableTextComponent,
    ImageLayerComponent,
    OverlayImageLayerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA 
  ]
})
export class AppModule { }
