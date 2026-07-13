import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactMe } from '../../services';

@Component({
    selector: 'jb-contact',
    imports: [
        ReactiveFormsModule,
        TranslatePipe
    ],
    templateUrl: './contact.html',
    styleUrl: './contact.scss',
})
export class Contact {
    private readonly _contactMeService = inject(ContactMe);

    public isSuccess = signal<boolean | null>(null);
    public isSending = signal(false);

    public form = new FormGroup({
        name: new FormControl('', { validators: Validators.required, nonNullable: true }),
        email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
        message: new FormControl('', { validators: Validators.required, nonNullable: true }),
    });

    constructor() {
        effect(() => {
            if (this.isSending()) {
                this.form.get('name')?.disable();
                this.form.get('email')?.disable();
                this.form.get('message')?.disable();
            } else {
                this.form.get('name')?.enable();
                this.form.get('email')?.enable();
                this.form.get('message')?.enable();
            }
        });
    }

    protected isInvalid(control: 'name' | 'email' | 'message'): boolean {
        const field = this.form.controls[control];
        return field.invalid && field.touched;
    }

    public async submit(): Promise<void> {
        if (this.form.invalid) return;

        this.isSending.set(true);

        const data = this.form.value as { name: string; email: string; message: string };
        const success = await this._contactMeService.perform(data);

        this.isSending.set(false);

        if (!success) {
            this.isSuccess.set(false);
            return;
        }

        this.isSuccess.set(true);
        this.form.reset();
    }
}
