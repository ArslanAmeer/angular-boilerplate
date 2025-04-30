import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Program } from '../interfaces/pages.interface';

@Injectable({
  providedIn: 'root', // <- Makes it globally available
})
export class ProgramsService {
  getPrograms() {
    // Mock data - replace with real API later
    const mockPrograms: Program[] = [
      {
        id: 'google',
        name: 'Google VDP',
        logo: '/assets/logos/google.png',
        description: 'Report vulnerabilities in Google services',
        public: true,
        category: 'Web',
        url: 'https://bughunters.google.com',
        updatedAt: new Date('2023-10-01'),
      },
      {
        id: 'microsoft',
        name: 'Microsoft Bounty',
        logo: '/assets/logos/microsoft.png',
        description: 'Earn rewards for finding security flaws',
        public: true,
        category: 'Cloud',
        url: 'https://www.microsoft.com/msrc/bounty',
        updatedAt: new Date('2023-09-15'),
      },
    ];

    return of(mockPrograms); // Wrap in Observable
  }
}
