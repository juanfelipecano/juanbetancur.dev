import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'jb-contact',
    imports: [ReactiveFormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.scss',
})
export class Contact {
    sent = signal(false);

    form = new FormGroup({
        name: new FormControl('', { validators: Validators.required, nonNullable: true }),
        email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
        message: new FormControl('', { validators: Validators.required, nonNullable: true }),
    });

    submit() {
        if (this.form.invalid) return;

        this.sent.set(true);
        setTimeout(() => {
            this.sent.set(false);
            this.form.reset();
        }, 2200);
    }
}
