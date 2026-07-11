import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jb-not-found',
    imports: [ NgTemplateOutlet ],
    templateUrl: './not-found.html',
    styleUrl: './not-found.scss',
})
export class NotFound {
    private readonly _router = inject(Router);

    public goToHome(): void {
        this._router.navigate(['/'], { replaceUrl: true });
    }
}
