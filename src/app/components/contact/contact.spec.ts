import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';

describe('Contact', () => {
    let component: Contact;
    let fixture: ComponentFixture<Contact>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Contact],
        }).compileComponents();

        fixture = TestBed.createComponent(Contact);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not send when the form is invalid', () => {
        component.submit();

        expect(component.sent()).toBe(false);
    });

    it('should send and then reset the form after a delay when valid', () => {
        vi.useFakeTimers();

        component.form.setValue({
            name: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hello there',
        });

        component.submit();

        expect(component.sent()).toBe(true);
        expect(component.form.value.name).toBe('Jane Doe');

        vi.advanceTimersByTime(2200);

        expect(component.sent()).toBe(false);
        expect(component.form.value.name).toBe('');

        vi.useRealTimers();
    });

    it('should disable the submit button while invalid and show the sent state', async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        const button = compiled.querySelector<HTMLButtonElement>('button[type="submit"]');
        expect(button?.disabled).toBe(true);

        component.form.setValue({
            name: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hello there',
        });
        fixture.detectChanges();
        await fixture.whenStable();

        expect(button?.disabled).toBe(false);

        component.sent.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(button?.disabled).toBe(true);
        expect(button?.textContent).toContain('Sent');
    });
});
