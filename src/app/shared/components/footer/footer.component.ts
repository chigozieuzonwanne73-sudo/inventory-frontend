import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class FooterComponent implements OnInit, OnDestroy {

  now: Date = new Date();
  today: Date = new Date();
  private intervalId: any;

  constructor() { }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getGreeting(): string {
    const hour = this.now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  user = {
    firstName: 'Khalifa'
  };



  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

}
