export interface Program {
  id: string; // Unique identifier
  name: string; // "Google VDP"
  logo: string; // "/assets/logos/google.png"
  description: string; // "Report security issues..."
  public: boolean; // true = public program
  category: string; // "Web", "Mobile", etc.
  url: string; // "https://google.com/vdp"
  updatedAt: Date; // Last updated date
  inScope: string[];
  outScope: string[];
  rewards?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  policyUrl?: string;
  launchDate?: Date;
}

export interface Tutorial {
  id: string;
  title: string;
  url: string; // YouTube URL
  thumbnail: string; // YouTube thumbnail URL
  duration: string; // "12:34"
  difficulty: Difficulty;
  tech: Technology;
  category: Category;
  description: string;
  datePosted: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  points: number;
  isActive: boolean;
  vmUrl?: string; // Make this optional with ?
  vulnerabilities?: string[]; // Optional array of CWE IDs
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export type Difficulty = 'Beginner' | 'Medium' | 'Advanced';

export type Category =
  | 'Injection' // SQLi, NoSQLi, Command Injection, etc.
  | 'XSS' // Cross-Site Scripting
  | 'Broken Authentication' // Session hijacking, weak passwords
  | 'Sensitive Data Exposure' // Data leaks, insecure storage
  | 'XXE' // XML External Entities
  | 'Misconfigurations' // Security misconfigurations
  | 'CSRF' // Cross-Site Request Forgery
  | 'SSRF' // Server-Side Request Forgery
  | 'RCE' // Remote Code Execution
  | 'IDOR' // Insecure Direct Object Reference
  | 'LFI/RFI' // Local/Remote File Inclusion
  | 'API Security' // Broken API auth, excessive data exposure
  | 'Deserialization' // Insecure deserialization
  | 'Logic Flaws' // Business logic vulnerabilities
  | 'Cryptography' // Weak encryption, improper key management
  | 'Zero-Day' // Exploiting unpublished vulnerabilities
  | 'Phishing' // Social engineering attacks
  | 'Forensics' // Digital forensics & incident response
  | 'Reverse Engineering' // Malware analysis, binary exploitation
  | 'Wireless' // Wi-Fi hacking (WPA2, WPS, etc.)
  | 'IoT Hacking' // Embedded devices, firmware analysis
  | 'Cloud Security' // AWS/GCP/Azure misconfigurations
  | 'OSINT' // Open-source intelligence gathering
  | 'Privilege Escalation' // Linux/Windows privilege escalation
  | 'Evasion' // AV/EDR bypass techniques
  | 'Malware Development' // Writing custom malware (ethical)
  | 'Exploitation';

export type Technology =
  // Core Pentesting
  | 'Metasploit'
  | 'Burp Suite'
  | 'Nmap'

  // Web Security
  | 'OWASP ZAP'
  | 'SQLmap'

  // Network/Wireless
  | 'Wireshark'
  | 'Aircrack-ng'

  // Reverse Engineering
  | 'Ghidra'

  // Password Cracking
  | 'Hashcat'

  // Programming
  | 'Python (Security Scripting)'

  // Catch-all
  | 'Other';
