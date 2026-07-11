import { Component, inject } from '@angular/core';
import { ScrollToSection } from '../../services';

@Component({
    selector: 'jb-footer',
    imports: [],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
})
export class Footer {
    private readonly _scrollToSection = inject(ScrollToSection);

    protected scrollToSection(id: string): void {
        this._scrollToSection.perform(id);
    }
}
