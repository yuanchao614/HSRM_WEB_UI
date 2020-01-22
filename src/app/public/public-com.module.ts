import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ShareModule } from '../share/ShareModule';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { JunctionModelService } from './junctionDemo/junction-model.service';
// import { JunctionModelComponent } from './junctionDemo/junction-model.component';
// import { PopupTemplateComponent } from './popup-template/popup-template.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { MarqueeBoardComponent } from './marquee-board/marquee-board.component';


const COMPONENT = [
	MarqueeBoardComponent
];

@NgModule({
	declarations: COMPONENT,
	imports: [
		// ShareModule,
		CommonModule,
		NgZorroAntdModule,
		NzCarouselModule,
		NgxEchartsModule
	],
	exports: [...COMPONENT],
	providers: []
})
export class PublicComModule { }
