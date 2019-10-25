import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/auth/auth.module';

const COMPONENT = [
	LayoutsComponent
];

@NgModule({
	declarations: COMPONENT,
	exports: COMPONENT,
	imports: [
		CommonModule,
		NgZorroAntdModule,
		RouterModule,
		AuthModule
	]
})
export class LayoutsModule { }
