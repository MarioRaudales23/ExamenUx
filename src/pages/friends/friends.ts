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
import { IonicPage, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { SearchPipe } from '../../pipes/search/search';
/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  userRef: any;
  users: AngularFireList<any>;
  homepage = HomePage;
  currentUser: any;
  current: any[];
  public filterList: Array<any>;
  public loadedfilterList: Array<any>;
  public filterRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth) {

    this.userRef = afDatabase.list('users');
    this.users = this.userRef.valueChanges();

    this.filterRef = firebase.database().ref('/users');
    this.filterRef.on('value', usuariosList => {
      let usuarios = [];
      usuariosList.forEach(usuario => {
        usuarios.push(usuario.val());
        return false;
      });
      this.filterList = usuarios;
      this.loadedfilterList = usuarios;
    });
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = { uid: user.uid, photoURL: user.photoURL };
    });
  }
  initializeItems(): void {
    this.filterRef.on('value', usuariosList => {
      let usuarios = [];
      usuariosList.forEach(usuario => {
        usuarios.push(usuario.val());
        return false;
      });
      this.filterList = usuarios;
      this.loadedfilterList = usuarios;
    });
    this.filterList = this.loadedfilterList;
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.filterList = this.filterList.filter((v) => {
      if (v.displayName && q) {
        if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }
  changeCur(user) {
    this.currentUser = user;
    return false;
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
  addfriend(user, Friends1: Array<any>, Friends2: Array<any>) {
    let x = [];
    let y = [];
    if (Friends1 == null && Friends2 == null) {
      x.push(user.userId);
      y.push(this.currentUser.userId);
      this.userRef.update(this.currentUser.userId, { friends: x });
      this.userRef.update(user.userId, { friends: y });
    } else if (Friends1 == null) {
      x.push(user.userId);
      Friends2.push(this.currentUser.userId);
      this.userRef.update(this.currentUser.userId, { friends: x });
      this.userRef.update(user.userId, { friends: Friends2 });
    } else if (Friends2 == null) {
      y.push(this.currentUser.userId);
      Friends1.push(user.userId);
      this.userRef.update(this.currentUser.userId, { friends: Friends1 });
      this.userRef.update(user.userId, { friends: y });
    } else {
      Friends1.push(user.userId);
      Friends2.push(this.currentUser.userId);
      this.userRef.update(this.currentUser.userId, { friends: Friends1 });
      this.userRef.update(user.userId, { friends: Friends2 });
    }
  }
}
