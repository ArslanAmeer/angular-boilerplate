export interface Program {
  id: string; // Unique identifier
  name: string; // "Google VDP"
  logo: string; // "/assets/logos/google.png"
  description: string; // "Report security issues..."
  public: boolean; // true = public program
  category: string; // "Web", "Mobile", etc.
  url: string; // "https://google.com/vdp"
  updatedAt: Date; // Last updated date
}

export interface Tutorial {
  id: string;
  title: string;
  url: string; // YouTube URL
  thumbnail: string; // YouTube thumbnail URL
  duration: string; // "12:34"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tech: string; // "Metasploit", "Kali Linux", etc.
  category: string; // "XSS", "SQLi", "PrivEsc"
  description: string;
  datePosted: Date;
}
