import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [

  ],
  exports: [
    TranslateModule, CommonModule, RouterModule
  ]
})
export class SharedModule { }