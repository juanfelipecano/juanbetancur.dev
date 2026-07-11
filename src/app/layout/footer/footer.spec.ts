import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';
import { ScrollToSection } from '../../services';

describe('Footer', () => {
    let component: Footer;
    let fixture: ComponentFixture<Footer>;
    let scrollToSection: ScrollToSection;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Footer],
        }).compileComponents();

        fixture = TestBed.createComponent(Footer);
        component = fixture.componentInstance;
        scrollToSection = TestBed.inject(ScrollToSection);
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delegate scrolling to the ScrollToSection service', () => {
        const performSpy = vi.spyOn(scrollToSection, 'perform');

        component['scrollToSection']('about');

        expect(performSpy).toHaveBeenCalledWith('about');
    });
});
