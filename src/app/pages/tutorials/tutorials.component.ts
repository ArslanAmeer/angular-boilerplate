import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tutorial } from '@app/@core/interfaces/pages.interface';
import { TutorialsService } from '@app/@core/services/tutorials.service';
import { Observable, map } from 'rxjs';

@Component({
  standalone: true,
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TutorialsComponent {
  // Filter controls
  selectedCategory = 'all';
  selectedTech = 'all';

  // Data streams
  tutorials$: Observable<Tutorial[]>;
  categories$: Observable<string[]>;
  technologies$: Observable<string[]>;

  constructor(private tutorialsService: TutorialsService) {
    // Load data
    this.tutorials$ = this.tutorialsService.getTutorials();
    this.categories$ = this.tutorials$.pipe(map((tutorials) => [...new Set(tutorials.map((t) => t.category))]));
    this.technologies$ = this.tutorials$.pipe(map((tutorials) => [...new Set(tutorials.map((t) => t.tech))]));
  }

  // Filter function
  filterTutorials(tutorials: Tutorial[]): Tutorial[] {
    return tutorials.filter((t) => (this.selectedCategory === 'all' || t.category === this.selectedCategory) && (this.selectedTech === 'all' || t.tech === this.selectedTech));
  }
}
