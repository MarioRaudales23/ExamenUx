import { Component, Input } from '@angular/core';
import {
  NavController,
  AlertController, // To Add Button
  ActionSheetController, // To delete
  Button
} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { FriendsPage } from '../friends/friends';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  friendspage = FriendsPage;
  currentUser: any;
  mensajesRef: any;
  mensajes: AngularFireList<any>;
  userRef: any;
  users: AngularFireList<any>;
  isLookingFriends: boolean = false;
  mensajesorder: any[] = [];


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.mensajesRef = afDatabase.list('Mensajes',ref => ref.orderByChild('order'));
    this.mensajes = this.mensajesRef.valueChanges();
    this.userRef = afDatabase.list('users');
    this.users = this.userRef.valueChanges();
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = { uid: user.uid, photoURL: user.photoURL };
    });
  }
  
  addmessage() {
    let prompt = this.alertCtrl.create({
      title: 'Mensaje',
      message: "Escribe un mensaje",
      inputs: [
        {
          name: 'texto',
          placeholder: 'Texto'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const NewMensajeRef = this.mensajesRef.push({});
            NewMensajeRef.set({
              id: NewMensajeRef.key,
              texto: data.texto,
              user: this.currentUser,
              like: 0,
              dislike: 0,
              order: 0,
              tipo: 'Publico'
            });
            this.elegir(NewMensajeRef.key);
          }
        }
      ]
    });
    prompt.present();
  }
  elegir(id) {
    let actionSheet = this.alertCtrl.create({
      title: 'Tipo de Publicacion',
      inputs: [
        {
          type: 'radio',
          value: 'Publico',
          label: 'Publico',
          checked: true
        },
        {
          type: 'radio',
          value: 'Privado',
          label: 'Privado'
        },
        {
          type: 'radio',
          value: 'Amigos',
          label: 'Amigos'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.mensajesRef.update(id, {
              tipo: data
            });
          }
        }
      ]
    });
    actionSheet.present();
  }
  Visible(tipo, user, Friends1: Array<any>) {
    if (tipo == 'Privado') {
      return false;
    } else
      if (tipo == 'Amigos') {
        if (this.isFriend(user, Friends1)) {
          return true;
        } else {
          return false;
        }
      }
    if (tipo == 'Publico') {
      return true;
    }
  }
  changeStatus() {
    
  }
  isFriend(user, Friends1: Array<any>) {
    if (Friends1 == null) {
      return false;
    } else if (Friends1.find(x => x == user)) {
      return true;
    } else {
      return false;
    }
  }
  showOptions(mensajeId, userId) {
    if (userId == this.currentUser.uid) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Delete Song',
            role: 'destructive',
            handler: () => {
              this.removeSong(mensajeId);
            }
          }, {
            text: 'Update title',
            handler: () => {
              this.elegir(mensajeId);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'What do you want to do?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }
  show() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'LogOut',
          role: 'destructive',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    actionSheet.present();
  }
  like(mensajeId, userid, likes, orders) {
    this.mensajesRef.update(mensajeId, {
      like: likes + 1, order: orders - 1, lastUpdatedBy: this.currentUser.userId
    });
  }
  dislike(mensajeId, userid, dislikes, orders) {
    this.mensajesRef.update(mensajeId, {
      dislike: dislikes + 1, order: orders - 1, lastUpdatedBy: this.currentUser.userId
    });
  }
  removeSong(mensajeId: string) {
    this.mensajesRef.remove(mensajeId);
  }
  changeCur(user) {
    this.currentUser = user;
    return false;
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log('resultado login google:', response);
        const userRef = this.afDatabase.list('users');
        userRef.update(response.user.uid,
          {
            userId: response.user.uid,
            displayName: response.user.displayName,
            photoURL: response.user.photoURL
          });
      });
  }
  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then((xx) => {

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
