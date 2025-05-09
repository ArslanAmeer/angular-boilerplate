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
    {
      id: '7',
      title: 'Network Scanning with Nmap',
      url: 'https://youtu.be/vwx234',
      thumbnail: 'https://img.youtube.com/vi/vwx234/mqdefault.jpg',
      duration: '14:18',
      difficulty: 'Beginner',
      tech: 'Nmap',
      category: 'Network',
      description: 'Learn basic network scanning techniques with Nmap',
      datePosted: new Date('2024-01-15'),
    },
    {
      id: '8',
      title: 'Web App Testing with OWASP ZAP',
      url: 'https://youtu.be/yza890',
      thumbnail: 'https://img.youtube.com/vi/yza890/mqdefault.jpg',
      duration: '22:40',
      difficulty: 'Medium',
      tech: 'OWASP ZAP',
      category: 'Web Security',
      description: 'Automated scanning and manual testing of web applications',
      datePosted: new Date('2024-02-01'),
    },
    {
      id: '9',
      title: 'Password Cracking with Hashcat',
      url: 'https://youtu.be/bcd123',
      thumbnail: 'https://img.youtube.com/vi/bcd123/mqdefault.jpg',
      duration: '19:55',
      difficulty: 'Advanced',
      tech: 'Hashcat',
      category: 'Password Cracking',
      description: 'Advanced password cracking techniques using Hashcat',
      datePosted: new Date('2024-02-10'),
    },
    {
      id: '10',
      title: 'Python for Security Automation',
      url: 'https://youtu.be/cde456',
      thumbnail: 'https://img.youtube.com/vi/cde456/mqdefault.jpg',
      duration: '28:12',
      difficulty: 'Medium',
      tech: 'Python (Security Scripting)',
      category: 'Programming',
      description: 'Automate security tasks with Python scripts',
      datePosted: new Date('2024-02-20'),
    },
    {
      id: '11',
      title: 'Packet Analysis with Wireshark',
      url: 'https://youtu.be/efg789',
      thumbnail: 'https://img.youtube.com/vi/efg789/mqdefault.jpg',
      duration: '17:30',
      difficulty: 'Medium',
      tech: 'Wireshark',
      category: 'Network',
      description: 'Analyze network traffic and detect anomalies',
      datePosted: new Date('2024-03-05'),
    },
    {
      id: '12',
      title: 'Advanced Burp Suite Techniques',
      url: 'https://youtu.be/fgh012',
      thumbnail: 'https://img.youtube.com/vi/fgh012/mqdefault.jpg',
      duration: '32:45',
      difficulty: 'Advanced',
      tech: 'Burp Suite',
      category: 'Web Security',
      description: 'Master advanced features of Burp Suite for web testing',
      datePosted: new Date('2024-03-15'),
    },
    {
      id: '13',
      title: 'Creating Custom Metasploit Modules',
      url: 'https://youtu.be/hij345',
      thumbnail: 'https://img.youtube.com/vi/hij345/mqdefault.jpg',
      duration: '26:20',
      difficulty: 'Advanced',
      tech: 'Metasploit',
      category: 'Exploitation',
      description: 'Develop your own Metasploit modules in Ruby',
      datePosted: new Date('2024-04-01'),
    },
    {
      id: '14',
      title: 'Nmap Scripting Engine (NSE) Deep Dive',
      url: 'https://youtu.be/jkl678',
      thumbnail: 'https://img.youtube.com/vi/jkl678/mqdefault.jpg',
      duration: '21:15',
      difficulty: 'Medium',
      tech: 'Nmap',
      category: 'Network',
      description: 'Write and use custom NSE scripts for advanced scanning',
      datePosted: new Date('2024-04-10'),
    },
    {
      id: '15',
      title: 'Building Security Tools with Python',
      url: 'https://youtu.be/lmn901',
      thumbnail: 'https://img.youtube.com/vi/lmn901/mqdefault.jpg',
      duration: '35:50',
      difficulty: 'Advanced',
      tech: 'Python (Security Scripting)',
      category: 'Programming',
      description: 'Create custom security tools from scratch',
      datePosted: new Date('2024-04-20'),
    },
    {
      id: '16',
      title: 'Advanced OSINT Techniques',
      url: 'https://youtu.be/nop234',
      thumbnail: 'https://img.youtube.com/vi/nop234/mqdefault.jpg',
      duration: '24:30',
      difficulty: 'Advanced',
      tech: 'Other',
      category: 'OSINT',
      description: 'Advanced open-source intelligence gathering methods',
      datePosted: new Date('2024-05-01'),
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
