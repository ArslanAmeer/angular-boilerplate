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
      tech: 'Burp Suite', // From `Technology`
      category: 'XSS', // From `Category`
      description: 'Cross-site scripting fundamentals',
      datePosted: new Date('2023-10-01'),
    },
    {
      id: '3',
      title: 'Wi-Fi Hacking with Aircrack-ng',
      url: 'https://youtu.be/jkl012',
      thumbnail: 'https://img.youtube.com/vi/jkl012/mqdefault.jpg',
      duration: '18:30',
      difficulty: 'Medium',
      tech: 'Aircrack-ng', // From `Technology`
      category: 'Wireless', // From `Category`
      description: 'Crack WPA2 passwords using Aircrack-ng',
      datePosted: new Date('2023-11-05'),
    },
    {
      id: '4',
      title: 'Advanced SQL Injection with SQLmap',
      url: 'https://youtu.be/mno345',
      thumbnail: 'https://img.youtube.com/vi/mno345/mqdefault.jpg',
      duration: '25:12',
      difficulty: 'Advanced',
      tech: 'SQLmap', // From `Technology`
      category: 'Injection', // From `Category`
      description: 'Automate SQLi attacks with SQLmap',
      datePosted: new Date('2023-11-20'),
    },
    {
      id: '5',
      title: 'Reverse Engineering Malware with Ghidra',
      url: 'https://youtu.be/pqr678',
      thumbnail: 'https://img.youtube.com/vi/pqr678/mqdefault.jpg',
      duration: '30:50',
      difficulty: 'Advanced',
      tech: 'Ghidra', // From `Technology`
      category: 'Reverse Engineering', // From `Category`
      description: 'Decompile and analyze malware samples',
      datePosted: new Date('2023-12-10'),
    },
    {
      id: '6',
      title: 'OSINT: Find Hidden Data with Maltego',
      url: 'https://youtu.be/stu901',
      thumbnail: 'https://img.youtube.com/vi/stu901/mqdefault.jpg',
      duration: '12:15',
      difficulty: 'Beginner',
      tech: 'Other', // From `Technology`
      category: 'OSINT', // From `Category`
      description: 'Map relationships using open-source intelligence',
      datePosted: new Date('2024-01-05'),
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
