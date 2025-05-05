import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { ProgramsService } from '@app/@core/services/programs.service';
import { Program } from '@app/@core/interfaces/pages.interface';
import { Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeInOut', [transition(':enter', [style({ opacity: 0 }), animate('200ms ease-out', style({ opacity: 1 }))]), transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))])]),
    trigger('slideInOut', [
      transition(':enter', [style({ transform: 'translateY(20px)' }), animate('250ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ transform: 'translateY(0)' }))]),
      transition(':leave', [animate('200ms ease-in', style({ transform: 'translateY(20px)' }))]),
    ]),
  ],
})
export class ProgramsComponent {
  searchQuery = '';
  programs$: Observable<Program[]>;
  selectedProgram: Program | null = null;

  constructor(private programsService: ProgramsService) {
    this.programs$ = this.programsService.getPrograms();
  }

  filterPrograms(programs: Program[]): Program[] {
    if (!this.searchQuery) return programs;
    return programs.filter((p) => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.description.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  openModal(program: Program) {
    this.selectedProgram = program;
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
  }

  closeModal() {
    this.selectedProgram = null;
    document.body.style.overflow = '';
  }
}
