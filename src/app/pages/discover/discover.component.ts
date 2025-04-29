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
  currentPanel = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
      const rect = panel.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        this.currentPanel = index;
        this.animatePanel(panel);
      }
    });
  }

  private animatePanel(panel: Element) {
    // Add your animation logic here
    panel.classList.add('active');
  }
}
