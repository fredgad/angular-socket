import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { WebSocketSubject } from 'rxjs/webSocket';

export interface BufferDataI {
  type: string;
  data: number[];
}

export type BufferStringI = BufferDataI | string;

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  private wsUrl = 'ws://localhost:9000/';
  private subscription: Subscription = new Subscription();
  private webSocket$!: WebSocketSubject<BufferDataI | string>;

  public message = '';

  public ngOnInit(): void {
    this.connectToWebSocket();
  }

  private connectToWebSocket() {
    const wsUrl = 'ws://localhost:9000/'; // Replace WebSocket server URL
    this.webSocket$ = new WebSocketSubject(wsUrl);

    this.subscription = this.webSocket$.subscribe(
      (value: BufferDataI | string): void => {
        let decodedString = '';

        if (typeof value === 'string') {
          decodedString = value;
        } else {
          const uint8Array = new Uint8Array(value.data);
          decodedString = new TextDecoder('utf-8').decode(uint8Array);
        }

        decodedString = decodedString.replace(/^"|"$/g, '');

        this.message = decodedString;
        console.log(value, '!!!webSocket$ message!!!', decodedString);
      },
      (error) => {
        console.error('WebSocket error:', error);
      },
      () => {
        console.log('WebSocket closed.');
      }
    );
  }

  public sendTosServer(event: Event): void {
    if (this.webSocket$) {
      this.webSocket$.next(this.message);
    }
  }

  public ngOnDestroy(): void {
    this.webSocket$.complete();

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.webSocket$) {
      this.webSocket$.complete();
    }
  }
}
