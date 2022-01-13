import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RatingModule} from 'primeng/rating';
import {EditorModule} from 'primeng/editor';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ColorPickerModule,
    InputTextareaModule,
    InputSwitchModule,
    RatingModule,
    EditorModule,
    DropdownModule
  ],
  exports:[CardModule,ToolbarModule,ButtonModule,TableModule,ConfirmDialogModule,ToastModule,ColorPickerModule,InputTextareaModule,
    InputSwitchModule,RatingModule,EditorModule,DropdownModule
  ]
})
export class PrimengModule { }
