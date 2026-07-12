import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'jb-projects',
    imports: [ TranslatePipe ],
    templateUrl: './projects.html',
    styleUrl: './projects.scss',
})
export class Projects {
    private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('projectDialog');

    protected readonly projects = [
        {
            num: '01',
            title: 'Project 01',
            blurb: 'A short, warm sentence about what I built and why. Replace this in Projects.jsx.',
            stack: ['Angular', 'TypeScript', 'RxJS'],
            year: '2025',
        },
        {
            num: '02',
            title: 'Project 02',
            blurb: 'Another placeholder slot — fill in the description here.',
            stack: ['Angular', 'Signals'],
            year: '2024',
        },
        {
            num: '03',
            title: 'Project 03',
            blurb: 'Third project. Two-line max. Click-through has the long write-up.',
            stack: ['Angular', 'NgRx', 'Tailwind'],
            year: '2024',
        },
        {
            num: '04',
            title: 'Project 04',
            blurb: 'Fourth slot for whatever you want to feature.',
            stack: ['TypeScript', 'Vite'],
            year: '2023',
        },
    ];

    protected selected = signal<(typeof this.projects)[number] | null>(null);

    protected selectProject(project: (typeof this.projects)[number]): void {
        this.selected.set(project);
        this.dialogRef()?.nativeElement.showModal();
    }

    protected closeModal(): void {
        this.dialogRef()?.nativeElement.close();
    }

    protected onDialogClose(): void {
        this.selected.set(null);
    }

    protected onBackdropClick(event: MouseEvent): void {
        if (event.target === this.dialogRef()?.nativeElement) {
            this.closeModal();
        }
    }
}
