import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SearchPipe } from '../pipes/search/search';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FriendsPage } from '../pages/friends/friends';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBisLQe2DYSltK83gE8ayT1ndZvJT07B4Q",
  authDomain: "mensajes-a1b8b.firebaseapp.com",
  databaseURL: "https://mensajes-a1b8b.firebaseio.com",
  projectId: "mensajes-a1b8b",
  storageBucket: "",
  messagingSenderId: "638752268722"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FriendsPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FriendsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
