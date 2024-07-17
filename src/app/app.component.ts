import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChildren('dot')
  dotrefs!: QueryList<ElementRef>;

  dots = Array.from(Array(170).keys());
  colors = [
    'red',
    'green',
    'blue',
    'purple',
    'pink',
    'cyan',
    'violet',
    'black',
  ];
  randomcolorindex = 0;
  counter = 2000;
  myinterval: any;
  title: any;
  isgamestarted = false;
  isgameend = false;
  iswon = false;
  cleancount = 10;
  dirtycount = 0;

  ngOnInit(): void {
    this.starttimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.myinterval);
  }

  changestyle(event: MouseEvent) {
    const dot = event.target as HTMLElement;
    if (!dot) {
      return;
    }
    this.randomcolorindex = Math.floor(Math.random() * this.colors.length);
    if (!this.isgameend) {
      dot.className += ` ${this.colors[this.randomcolorindex]}`;
      this.checkgamestatus();
    }
  }

  starttimer() {
    this.isgamestarted = true;
    this.myinterval = setInterval(() => {
      if (this.counter > 1) {
        this.counter--;
      } else {
        this.isgameend = true;
      }
    }, 1000);
  }

  checkgamestatus() {
    this.cleancount = 0;
    this.dirtycount = 0;
    this.dotrefs.forEach((dotref) => {
      if (dotref.nativeElement.classList.length > 1) {
        this.dirtycount++;
      } else {
        this.cleancount++;
      }
    });
    if (this.isgamestarted) {
      this.starttimer();
    }
    if (this.dirtycount == 160) {
      this.iswon = true;
      this.isgameend = true;
    }
  }
}