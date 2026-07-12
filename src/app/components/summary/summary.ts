import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'jb-summary',
    imports: [
        NgTemplateOutlet,
        TranslatePipe
    ],
    templateUrl: './summary.html',
    styleUrl: './summary.scss',
})
export class Summary {}
