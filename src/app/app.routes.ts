import { Route } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { GameComponent } from './pages/game/game.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
];

// { path: 'room', component: RoomComponent, canActivate: [AuthGuard] },
// { path: 'game', component: GameComponent, canActivate: [AuthGuard] },