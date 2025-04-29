import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { ProgramsService } from '@app/@core/services/program.service';
import { Program } from '@app/@core/interfaces/pages.interface';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  imports: [
    CommonModule,
    FormsModule, // <-- Add this to enable ngModel
  ],
})
export class ProgramsComponent {
  // Search functionality
  searchQuery = ''; // Tied to the input via [(ngModel)]

  // Program data (will be loaded from service)
  programs$: Observable<Program[]>;

  constructor(private programsService: ProgramsService) {
    // Load programs data
    this.programs$ = this.programsService.getPrograms();
  }

  // Simple search filter (add this if you want live filtering)
  filterPrograms(programs: Program[]): Program[] {
    if (!this.searchQuery) return programs;
    return programs.filter((p) => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.description.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
