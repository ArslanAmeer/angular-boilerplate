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
      description: 'Exploit a client-side XSS vulnerability in a search function',
      category: 'Web Security',
      difficulty: 'Medium',
      points: 250,
      isActive: false,
      vmUrl: 'https://demo.testfire.net/search.aspx',
    },
    {
      id: 'xss-2',
      title: 'Stored XSS in Comments',
      description: 'Inject persistent XSS through a comment form',
      category: 'Web Security',
      difficulty: 'Beginner',
      points: 150,
      isActive: true,
      vmUrl: 'https://xss-game.appspot.com/level1',
    },
    {
      id: 'sqli-1',
      title: 'Basic SQL Injection',
      description: 'Bypass login using SQL injection',
      category: 'Web Security',
      difficulty: 'Beginner',
      points: 200,
      isActive: true,
      vmUrl: 'https://demo.testfire.net/login.jsp',
    },
    {
      id: 'sqli-2',
      title: 'Blind SQLi',
      description: 'Extract database information using boolean-based blind SQLi',
      category: 'Web Security',
      difficulty: 'Advanced',
      points: 450,
      isActive: false,
      vmUrl: 'https://example.com/blind-sqli-lab',
    },
    {
      id: 'crypto-1',
      title: 'Weak Encryption',
      description: 'Break a homebrew encryption algorithm',
      category: 'Cryptography',
      difficulty: 'Medium',
      points: 300,
      isActive: true,
      vmUrl: 'https://example.com/weak-crypto-lab',
    },
    {
      id: 'crypto-2',
      title: 'Padding Oracle',
      description: 'Exploit a padding oracle vulnerability',
      category: 'Cryptography',
      difficulty: 'Advanced',
      points: 500,
      isActive: false,
      vmUrl: 'https://example.com/padding-oracle-lab',
    },
    {
      id: 'crypto-3',
      title: 'RSA Key Extraction',
      description: 'Extract private key from a poorly implemented RSA system',
      category: 'Cryptography',
      difficulty: 'Advanced',
      points: 500,
      isActive: true,
      vmUrl: 'https://example.com/crypto-lab',
    },
    {
      id: 'misc-1',
      title: 'JWT Tampering',
      description: 'Modify JWT tokens to escalate privileges',
      category: 'Web Security',
      difficulty: 'Medium',
      points: 350,
      isActive: true,
      vmUrl: 'https://example.com/jwt-lab',
    },
    {
      id: 'misc-2',
      title: 'CSRF Exploit',
      description: 'Perform actions as another user via CSRF',
      category: 'Web Security',
      difficulty: 'Medium',
      points: 300,
      isActive: false,
      vmUrl: 'https://example.com/csrf-lab',
    },
    {
      id: 'misc-3',
      title: 'File Upload Bypass',
      description: 'Upload a malicious file by bypassing filters',
      category: 'Web Security',
      difficulty: 'Advanced',
      points: 400,
      isActive: true,
      vmUrl: 'https://example.com/upload-lab',
    },
    {
      id: 'misc-4',
      title: 'SSRF Exploit',
      description: 'Access internal services via Server-Side Request Forgery',
      category: 'Web Security',
      difficulty: 'Advanced',
      points: 450,
      isActive: false,
      vmUrl: 'https://example.com/ssrf-lab',
    },
    {
      id: 're-1',
      title: 'Basic Reverse Engineering',
      description: 'Analyze a binary to find the secret key',
      category: 'Reverse Engineering',
      difficulty: 'Beginner',
      points: 200,
      isActive: true,
      vmUrl: 'https://example.com/re-basic-lab',
    },
    {
      id: 're-2',
      title: 'Obfuscated JavaScript',
      description: 'Deobfuscate malicious JavaScript code',
      category: 'Reverse Engineering',
      difficulty: 'Medium',
      points: 350,
      isActive: false,
      vmUrl: 'https://example.com/js-obfuscation-lab',
    },
    {
      id: 'pwn-1',
      title: 'Buffer Overflow',
      description: 'Exploit a simple stack-based buffer overflow',
      category: 'Binary Exploitation',
      difficulty: 'Advanced',
      points: 500,
      isActive: true,
      vmUrl: 'https://example.com/bof-lab',
    },
    {
      id: 'osint-1',
      title: 'User Recon',
      description: 'Find hidden information about a user from public sources',
      category: 'OSINT',
      difficulty: 'Beginner',
      points: 150,
      isActive: false,
      vmUrl: 'https://example.com/osint-lab',
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
