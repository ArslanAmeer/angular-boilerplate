import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tutorial } from '../interfaces/pages.interface';

@Injectable({
  providedIn: 'root',
})
export class TutorialsService {
  private mockTutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Metasploit Framework Crash Course',
      url: 'https://youtu.be/abc123',
      thumbnail: 'https://img.youtube.com/vi/abc123/mqdefault.jpg',
      duration: '15:22',
      difficulty: 'Beginner',
      tech: 'Metasploit',
      category: 'Exploitation',
      description: 'Learn basic Metasploit modules',
      datePosted: new Date('2023-09-10'),
    },
    {
      id: '2',
      title: 'XSS for Beginners',
      url: 'https://youtu.be/def456',
      thumbnail: 'https://img.youtube.com/vi/def456/mqdefault.jpg',
      duration: '10:05',
      difficulty: 'Beginner',
      tech: 'Web',
      category: 'XSS',
      description: 'Cross-site scripting fundamentals',
      datePosted: new Date('2023-10-01'),
    },
  ];

  // Method to get tutorials (as Observable for async operations)
  getTutorials(): Observable<Tutorial[]> {
    return of(this.mockTutorials); // Wrap in Observable
  }

  // Optional: Get unique categories/techs for filters
  getCategories(): string[] {
    return [...new Set(this.mockTutorials.map((t) => t.category))];
  }

  getTechnologies(): string[] {
    return [...new Set(this.mockTutorials.map((t) => t.tech))];
  }
}
