import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    private readonly _translateService = inject(TranslateService);
    private readonly _document = inject(DOCUMENT);

    protected readonly title = signal('juanbetancur.dev');
    private readonly languages = ['en', 'es'];

    constructor() {
        effect(() => {
            const lang = this._translateService.currentLang();
            if (lang) {
                this._document.documentElement.lang = lang;
            }
        });
    }

    public ngOnInit(): void {
        this.configureLanguages();
        this.recoverLanguage();
    }

    private configureLanguages(): void {
        this._translateService.addLangs(this.languages);
    }

    private recoverLanguage(): void {
        const browserLang = this._translateService.getBrowserLang();
        const preferredLang = localStorage.getItem('preferred-lang');

        if (!preferredLang && browserLang && this.languages.includes(browserLang)) {
            this._translateService.use(browserLang).subscribe();
            return;
        }

        if (preferredLang) {
            this._translateService.use(preferredLang).subscribe();
        }
    }
}
