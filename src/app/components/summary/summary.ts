import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'jb-summary',
    imports: [
        NgTemplateOutlet

    ],
    templateUrl: './summary.html',
    styleUrl: './summary.scss',
})
export class Summary {}
