import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('Projects', () => {
    let component: Projects;
    let fixture: ComponentFixture<Projects>;

    // jsdom does not implement the native <dialog> API, so polyfill the bits
    // the component relies on (showModal / close + the 'close' event).
    beforeAll(() => {
        const proto = HTMLDialogElement.prototype;
        if (!proto.showModal) {
            proto.showModal = function () {
                this.setAttribute('open', '');
            };
            proto.close = function () {
                this.removeAttribute('open');
                this.dispatchEvent(new Event('close'));
            };
        }
    });

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

    it('should select a project and open the dialog with its content', async () => {
        const project = component['projects'][0];

        component['selectProject'](project);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).toBe(project);

        const compiled = fixture.nativeElement as HTMLElement;
        const dialog = compiled.querySelector('.projects-modal');
        expect(dialog?.hasAttribute('open')).toBe(true);
        expect(dialog?.querySelector('.projects-modal__title')?.textContent).toContain(project.title);
    });

    it('should close the dialog and clear the selection via closeModal', async () => {
        component['selectProject'](component['projects'][0]);
        fixture.detectChanges();
        await fixture.whenStable();

        component['closeModal']();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).toBeNull();
    });

    it('should clear the selection when the dialog emits close (Escape)', () => {
        component['selectProject'](component['projects'][0]);

        component['onDialogClose']();

        expect(component['selected']()).toBeNull();
    });

    it('should open the modal when activating a project item', async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const hit = compiled.querySelector<HTMLButtonElement>('.projects__item__hit');
        hit?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).not.toBeNull();
    });

    it('should close when clicking the backdrop (dialog element itself)', async () => {
        component['selectProject'](component['projects'][0]);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const dialog = compiled.querySelector<HTMLElement>('.projects-modal');
        dialog?.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component['selected']()).toBeNull();
    });

    it('should not close when clicking inside the modal content', async () => {
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
