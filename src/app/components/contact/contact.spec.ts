import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';
import { ContactMe } from '../../services';

describe('Contact', () => {
    let component: Contact;
    let fixture: ComponentFixture<Contact>;
    let contactMeMock: Partial<ContactMe>;

    beforeEach(() => {
        contactMeMock = {
            perform: vi.fn().mockResolvedValue(true),
        };
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Contact],
            providers: [
                provideTranslateTesting(),
                { provide: ContactMe, useValue: contactMeMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Contact);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not send when the form is invalid', async () => {
        await component.submit();

        expect(component.isSending()).toBe(false);
        expect(contactMeMock.perform).not.toHaveBeenCalled();
    });

    it('should send and then reset the form when valid', async () => {
        component.form.setValue({
            name: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hello there',
        });

        const submitPromise = component.submit();

        expect(component.isSending()).toBe(true);
        expect(component.form.value.name).toBe('Jane Doe');

        await submitPromise;

        expect(contactMeMock.perform).toHaveBeenCalledWith({
            name: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hello there',
        });
        expect(component.isSending()).toBe(false);
        expect(component.isSuccess()).toBe(true);
        expect(component.form.value.name).toBe('');
    });

    it('should not reset the form and mark as unsuccessful when the service call fails', async () => {
        (contactMeMock.perform as ReturnType<typeof vi.fn>).mockResolvedValue(false);

        component.form.setValue({
            name: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hello there',
        });

        await component.submit();

        expect(component.isSending()).toBe(false);
        expect(component.isSuccess()).toBe(false);
        expect(component.form.value.name).toBe('Jane Doe');
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

        component.isSending.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(button?.disabled).toBe(true);
        expect(button?.textContent).toContain('Sending');
    });
});
