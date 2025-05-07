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
        logo: 'assets/mock/google-logo.png',
        description: 'Report vulnerabilities in Google services',
        public: true,
        category: 'Web',
        url: 'https://bughunters.google.com',
        updatedAt: new Date('2023-10-01'),
        inScope: ['*.google.com', '*.youtube.com', 'Android apps (Play Store distribution only)'],
        outScope: ['*.blogger.com', 'Google Cloud physical infrastructure', 'Social engineering'],
        rewards: {
          critical: 15000,
          high: 8000,
          medium: 2000,
          low: 500,
        },
        policyUrl: 'https://google.com/security',
        launchDate: new Date('2020-05-01'),
      },
      {
        id: 'microsoft',
        name: 'Microsoft Bounty Program',
        logo: 'assets/mock/microsoft-logo.png',
        description: 'Earn rewards for finding security vulnerabilities in Microsoft products and services. We welcome reports across our entire ecosystem.',
        public: true,
        category: 'Cloud, OS, Software',
        url: 'https://www.microsoft.com/msrc/bounty',
        updatedAt: new Date('2023-09-15'),
        inScope: ['*.microsoft.com', '*.azure.com', 'Windows 10/11 (latest builds)', 'Microsoft 365 web applications', 'Xbox Live services'],
        outScope: ['Microsoft Store apps (unless explicitly listed)', 'Third-party integrations', 'Social engineering/phishing', 'Physical security testing', 'DDoS vulnerabilities'],
        rewards: {
          critical: 20000,
          high: 10000,
          medium: 2500,
          low: 500,
        },
        policyUrl: 'https://www.microsoft.com/msrc/bounty-terms',
        launchDate: new Date('2013-06-15'),
      },
    ];

    return of(mockPrograms); // Wrap in Observable
  }
}
