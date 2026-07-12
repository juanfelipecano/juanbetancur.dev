import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { App } from './app';
import { createLocalStorageMock } from './testing/local-storage-testing';
import { provideTranslateTesting } from './testing/translate-testing.providers';

describe('App', () => {
    let translateService: TranslateService;

    beforeEach(async () => {
        vi.stubGlobal('localStorage', createLocalStorageMock());

        await TestBed.configureTestingModule({
            imports: [App],
            providers: [provideTranslateTesting()],
        }).compileComponents();

        translateService = TestBed.inject(TranslateService);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should register the supported languages on init', () => {
        const addLangsSpy = vi.spyOn(translateService, 'addLangs');

        TestBed.createComponent(App).detectChanges();

        expect(addLangsSpy).toHaveBeenCalledWith(['en', 'es']);
    });

    it('should use the browser language when there is no stored preference', () => {
        vi.spyOn(translateService, 'getBrowserLang').mockReturnValue('es');
        const useSpy = vi.spyOn(translateService, 'use');

        TestBed.createComponent(App).detectChanges();

        expect(useSpy).toHaveBeenCalledWith('es');
    });

    it('should ignore an unsupported browser language when there is no stored preference', () => {
        vi.spyOn(translateService, 'getBrowserLang').mockReturnValue('fr');
        const useSpy = vi.spyOn(translateService, 'use');

        TestBed.createComponent(App).detectChanges();

        expect(useSpy).not.toHaveBeenCalled();
    });

    it('should use the stored preference over the browser language', () => {
        localStorage.setItem('preferred-lang', 'es');
        vi.spyOn(translateService, 'getBrowserLang').mockReturnValue('en');
        const useSpy = vi.spyOn(translateService, 'use');

        TestBed.createComponent(App).detectChanges();

        expect(useSpy).toHaveBeenCalledWith('es');
    });
});
