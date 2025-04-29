// challenges.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  points: number;
  isActive: boolean;
}

interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-challenges',
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
  standalone: true,
})
export class ChallengesComponent {
  isListView = false;
  selectedDifficulty = 'all';

  difficultyLevels = ['easy', 'medium', 'hard', 'insane'];

  challenges: Challenge[] = [
    {
      id: 'xss-1',
      title: 'DOM XSS Challenge',
      description: 'Exploit a client-side XSS vulnerability in this simulated banking app.',
      category: 'Web Security',
      difficulty: 'medium',
      points: 250,
      isActive: false,
    },
    {
      id: 'crypto-3',
      title: 'RSA Key Extraction',
      description: 'Extract private key from a poorly implemented RSA system.',
      category: 'Cryptography',
      difficulty: 'hard',
      points: 500,
      isActive: true,
    },
    // TODO: Add more challenges...
  ];

  activeTournament: Tournament = {
    id: 'tournament-2023',
    name: 'Hackason Annual CTF',
    description: '48-hour marathon with $10k in prizes',
    startDate: new Date('2023-11-15'),
    endDate: new Date('2023-11-17'),
  };

  get filteredChallenges() {
    return this.challenges.filter((challenge) => this.selectedDifficulty === 'all' || challenge.difficulty === this.selectedDifficulty);
  }

  toggleViewMode() {
    this.isListView = !this.isListView;
  }

  startChallenge(id: string) {
    const challenge = this.challenges.find((c) => c.id === id);
    if (challenge) {
      challenge.isActive = true;
      // Add navigation to challenge detail in real implementation
      console.log(`Starting challenge: ${challenge.title}`);
    }
  }
}
