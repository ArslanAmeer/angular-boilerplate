import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Challenge, Tournament } from '@app/@core/interfaces/pages.interface';
import { ChallengesService } from '@app/@core/services/challenges.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule],
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
})
export class ChallengesComponent {
  // View Management
  isListView = false;
  selectedDifficulty = 'all';
  difficultyLevels = ['Beginner', 'Medium', 'Advanced'];

  // Data Streams
  challenges$: Observable<Challenge[]>;
  tournaments$: Observable<Tournament[]>;

  // VM State
  activeChallenge: Challenge | null = null;
  activeTournament$: Observable<Tournament | undefined>;

  constructor(
    private challengesService: ChallengesService,
    private sanitizer: DomSanitizer,
  ) {
    this.challenges$ = this.challengesService.getChallenges();
    this.tournaments$ = this.challengesService.getTournaments();

    this.activeTournament$ = this.tournaments$.pipe(map((tournaments) => tournaments.find((t) => new Date() >= t.startDate && new Date() <= t.endDate)));
  }

  get filteredChallenges$() {
    return this.challenges$.pipe(map((challenges) => challenges.filter((ch) => this.selectedDifficulty === 'all' || ch.difficulty === this.selectedDifficulty)));
  }

  toggleViewMode() {
    this.isListView = !this.isListView;
  }

  launchChallenge(challenge: Challenge) {
    this.activeChallenge = challenge;
    document.body.style.overflow = 'hidden';
  }

  closeVM() {
    this.activeChallenge = null;
    document.body.style.overflow = '';
  }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
