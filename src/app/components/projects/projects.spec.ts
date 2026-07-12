import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('Projects', () => {
    let component: Projects;
    let fixture: ComponentFixture<Projects>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Projects],
            providers: [provideTranslateTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(Projects);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no project selected initially', () => {
        expect(component['selected']()).toBeNull();
    });

    it('should select a project and render the modal', async () => {
        const project = component['projects'][0];

        component['selectProject'](project);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).toBe(project);

        const compiled = fixture.nativeElement as HTMLElement;
        const modal = compiled.querySelector('.projects-modal__overlay');
        expect(modal).toBeTruthy();
        expect(modal?.querySelector('.projects-modal__title')?.textContent).toContain(project.title);
    });

    it('should close the modal', () => {
        component['selectProject'](component['projects'][0]);

        component['closeModal']();

        expect(component['selected']()).toBeNull();
    });

    it('should stop propagation when clicking inside the modal content', () => {
        const event = new Event('click');
        const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

        component['stopPropagation'](event);

        expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it('should open the modal when clicking a project item and close it via overlay click', async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const item = compiled.querySelector<HTMLElement>('.projects__item');
        item?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).not.toBeNull();

        const overlay = compiled.querySelector<HTMLElement>('.projects-modal__overlay');
        overlay?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).toBeNull();
    });

    it('should not close the modal when clicking inside the modal content', async () => {
        component['selectProject'](component['projects'][0]);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const content = compiled.querySelector<HTMLElement>('.projects-modal__content');
        content?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).not.toBeNull();
    });

    it('should close the modal via the close button', async () => {
        component['selectProject'](component['projects'][0]);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const closeButton = compiled.querySelector<HTMLElement>('.projects-modal__actions__close');
        closeButton?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).toBeNull();
    });
});
