import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutEditorComponent } from './layout-editor/layout-editor.component';
import { LayoutModule } from '../../core/layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../core/core.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { LayoutEditorRowComponent } from './layout-editor-row/layout-editor-row.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from '../../pipes/pipes.module';
import { ClipboardModule } from 'ngx-clipboard';
import { TextQuestionPopupModule } from '../text-question-popup/text-question-popup.module';
import { NgSerializerModule } from '@kaiu/ng-serializer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ClipboardModule,

    CoreModule,
    LayoutModule,
    NgxDnDModule,
    PipesModule,
    TextQuestionPopupModule,

    NgSerializerModule,

    TranslateModule,
    NgZorroAntdModule
  ],
  declarations: [LayoutEditorComponent, LayoutEditorRowComponent],
  exports: [LayoutEditorComponent],
  entryComponents: [LayoutEditorComponent]
})
export class LayoutEditorModule {
}
