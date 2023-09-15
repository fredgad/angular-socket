import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../shared/services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  private firebaseService = inject(FirebaseService);
  public fireStoreTextsOne$ = this.firebaseService.fireStoreTextsOne$;
  public fireStoreTextsTwo$ = this.firebaseService.fireStoreTextsTwo$;

  public sendTosServer(event: any, num: number): void {
    // console.log(event.data, num, 'event.data, num');
    this.firebaseService.fireStoreTextsUpdate(event.data, num);
  }

  public ngOnInit(): void {
    this.firebaseService.init();
  }
}
