import { Component, inject, signal } from '@angular/core';
import { ScrollToSection } from '../../services';

@Component({
    selector: 'jb-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    private readonly _scrollToSection = inject(ScrollToSection);

    protected isMenuClosed = signal(true);

    protected toggleMenu(): void {
        this.isMenuClosed.update((value: boolean) => !value);
    }

    protected scrollToSection(id: string): void {
        this._scrollToSection.perform(id);
        this.isMenuClosed.set(true);
    }
}
