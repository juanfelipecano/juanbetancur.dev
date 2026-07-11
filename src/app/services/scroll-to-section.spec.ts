import { TestBed } from '@angular/core/testing';

import { ScrollToSection } from './scroll-to-section';

describe('ScrollToSection', () => {
    let service: ScrollToSection;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ScrollToSection);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should scroll the element into view when it exists', () => {
        const element = document.createElement('div');
        element.id = 'section';
        document.body.appendChild(element);
        const scrollIntoViewSpy = vi.fn();
        element.scrollIntoView = scrollIntoViewSpy;

        service.perform('section');

        expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

        element.remove();
    });

    it('should do nothing when the element does not exist', () => {
        expect(() => service.perform('missing')).not.toThrow();
    });
});
