import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge, Tournament } from '../interfaces/pages.interface';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  private mockChallenges: Challenge[] = [
    {
      id: 'xss-1',
      title: 'DOM XSS Challenge',
      description: 'Exploit a client-side XSS vulnerability',
      category: 'Web Security',
      difficulty: 'medium',
      points: 250,
      isActive: false,
      vmUrl: 'https://demo.testfire.net/search.aspx', // Example vulnerable site
    },
    {
      id: 'crypto-3',
      title: 'RSA Key Extraction',
      description: 'Extract private key from a poorly implemented RSA system',
      category: 'Cryptography',
      difficulty: 'hard',
      points: 500,
      isActive: true,
      vmUrl: 'https://example.com/crypto-lab', // Example URL
    },
  ];
  private mockTournaments: Tournament[] = [
    {
      id: 'tournament-2025',
      name: 'Hackason Annual CTF',
      description: '24-hour -- Seek & Destroy',
      startDate: new Date('2025-08-15'),
      endDate: new Date('2025-08-17'),
    },
  ];

  getChallenges(): Observable<Challenge[]> {
    return of(this.mockChallenges);
  }

  getTournaments(): Observable<Tournament[]> {
    return of(this.mockTournaments);
  }
}
