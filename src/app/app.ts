import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenu } from './component/appmenu/appmenu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AppMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('authapp');
}
