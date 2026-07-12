import { WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { Header } from './header';
import { ScrollToSection } from '../../services';
import { createLocalStorageMock } from '../../testing/local-storage-testing';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('Header', () => {
    let component: Header;
    let fixture: ComponentFixture<Header>;
    let scrollToSection: ScrollToSection;
    let translateService: TranslateService;

    beforeEach(async () => {
        vi.stubGlobal('localStorage', createLocalStorageMock());

        await TestBed.configureTestingModule({
            imports: [Header],
            providers: [provideTranslateTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        scrollToSection = TestBed.inject(ScrollToSection);
        translateService = TestBed.inject(TranslateService);
        await fixture.whenStable();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delegate scrolling to the ScrollToSection service and close the menu', () => {
        const performSpy = vi.spyOn(scrollToSection, 'perform');
        component['isMenuClosed'].set(false);

        component['scrollToSection']('work');

        expect(performSpy).toHaveBeenCalledWith('work');
        expect(component['isMenuClosed']()).toBe(true);
    });

    it('should start with the menu closed', () => {
        expect(component['isMenuClosed']()).toBe(true);
    });

    it('should toggle the menu state', () => {
        component['toggleMenu']();
        expect(component['isMenuClosed']()).toBe(false);

        component['toggleMenu']();
        expect(component['isMenuClosed']()).toBe(true);
    });

    it('should toggle the menu label and open class when the button is clicked', async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const toggle = compiled.querySelector<HTMLButtonElement>('.header__menu-toggle');
        const end = compiled.querySelector<HTMLElement>('.header__end');

        expect(toggle?.textContent).toContain('menu');
        expect(end?.classList.contains('open')).toBe(false);

        toggle?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(toggle?.textContent).toContain('close x');
        expect(end?.classList.contains('open')).toBe(true);
    });

    it('should default currentLang to en', () => {
        expect(component['currentLang']()).toBe('en');
    });

    it('should fall back to "en" when the translate service has no current language', () => {
        (translateService as unknown as { _currentLang: WritableSignal<string | null> })['_currentLang'].set(null);

        expect(component['currentLang']()).toBe('en');
    });

    it('should toggle the language and persist the preference', async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const langToggle = compiled.querySelector<HTMLButtonElement>('.header__lang-toggle');

        expect(langToggle?.textContent).toContain('ES');

        component['toggleLanguage']();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(translateService.currentLang()).toBe('es');
        expect(localStorage.getItem('preferred-lang')).toBe('es');
        expect(langToggle?.textContent).toContain('EN');

        component['toggleLanguage']();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(translateService.currentLang()).toBe('en');
        expect(localStorage.getItem('preferred-lang')).toBe('en');
        expect(langToggle?.textContent).toContain('ES');
    });
});
