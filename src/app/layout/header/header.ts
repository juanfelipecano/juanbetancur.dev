import { Component, signal } from '@angular/core';

@Component({
    selector: 'jb-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    protected isMenuClosed = signal(true);

    protected toggleMenu(): void {
        this.isMenuClosed.update((value: boolean) => !value);
    }
}
