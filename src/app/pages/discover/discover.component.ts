import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-discover',
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
  standalone: true,
})
export class DiscoverComponent {
  showAnswer = false;

  ngAfterViewInit() {
    // Double reset to ensure proper alignment
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = 'auto'; // Temporary disable
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = '';
      });
    }, 100);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.scrollToNextSection();
      event.preventDefault();
    }
    if (event.key === 'ArrowUp') {
      this.scrollToPrevSection();
      event.preventDefault();
    }
  }

  private scrollToNextSection() {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const nextSectionPos = Math.ceil(currentScroll / windowHeight) * windowHeight;
    window.scrollTo({ top: nextSectionPos, behavior: 'smooth' });
  }

  private scrollToPrevSection() {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;

    // Special case for top section
    if (currentScroll < windowHeight * 0.1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const prevSectionPos = Math.floor(currentScroll / windowHeight) * windowHeight;

    // Use this instead of the block property
    window.scrollTo({
      top: prevSectionPos,
      behavior: 'smooth',
    });
  }
}
