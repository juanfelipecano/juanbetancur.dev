import { Component, inject, OnInit, signal } from '@angular/core';
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

    protected readonly title = signal('juanbetancur.dev');
    private readonly languages = ['en', 'es'];

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
            this._translateService.use(browserLang);
            return;
        }

        if (preferredLang) {
            this._translateService.use(preferredLang);
        }
    }
}
