import { Component, computed, inject, signal } from '@angular/core';
import { ScrollToSection } from '../../services';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'jb-header',
    imports: [ TranslatePipe ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    private readonly _scrollToSection = inject(ScrollToSection);
    private readonly _translateService = inject(TranslateService);

    protected isMenuClosed = signal(true);
    protected currentLang = computed(() => this._translateService.currentLang() ?? 'en');

    protected toggleMenu(): void {
        this.isMenuClosed.update((value: boolean) => !value);
    }

    protected scrollToSection(id: string): void {
        this._scrollToSection.perform(id);
        this.isMenuClosed.set(true);
    }

    protected toggleLanguage(): void {
        const nextLang = this.currentLang() === 'en' ? 'es' : 'en';
        this._translateService.use(nextLang).subscribe();
        localStorage.setItem('preferred-lang', nextLang);
    }
}
