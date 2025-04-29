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
