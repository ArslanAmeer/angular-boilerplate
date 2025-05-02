import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { ProgramsService } from '@app/@core/services/programs.service';
import { Program } from '@app/@core/interfaces/pages.interface';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ProgramsComponent {
  searchQuery = '';
  programs$: Observable<Program[]>;

  constructor(private programsService: ProgramsService) {
    this.programs$ = this.programsService.getPrograms();
  }

  filterPrograms(programs: Program[]): Program[] {
    if (!this.searchQuery) return programs;
    return programs.filter((p) => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.description.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
