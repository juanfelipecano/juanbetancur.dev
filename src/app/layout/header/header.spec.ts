import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { ScrollToSection } from '../../services';

describe('Header', () => {
    let component: Header;
    let fixture: ComponentFixture<Header>;
    let scrollToSection: ScrollToSection;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Header],
        }).compileComponents();

        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        scrollToSection = TestBed.inject(ScrollToSection);
        await fixture.whenStable();
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
});
