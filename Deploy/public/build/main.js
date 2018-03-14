webpackJsonp([1],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__friends_friends__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, actionSheetCtrl, afDatabase, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.friendspage = __WEBPACK_IMPORTED_MODULE_5__friends_friends__["a" /* FriendsPage */];
        this.isLookingFriends = false;
        this.mensajesorder = [];
        this.mensajesRef = afDatabase.list('Mensajes', function (ref) { return ref.orderByChild('order'); });
        this.mensajes = this.mensajesRef.valueChanges();
        this.userRef = afDatabase.list('users');
        this.users = this.userRef.valueChanges();
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.currentUser = null;
                return;
            }
            _this.currentUser = { uid: user.uid, photoURL: user.photoURL };
        });
    }
    HomePage.prototype.addmessage = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var NewMensajeRef = _this.mensajesRef.push({});
                        NewMensajeRef.set({
                            id: NewMensajeRef.key,
                            texto: data.texto,
                            user: _this.currentUser,
                            like: 0,
                            dislike: 0,
                            order: 0,
                            tipo: 'Publico'
                        });
                        _this.elegir(NewMensajeRef.key);
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.elegir = function (id) {
        var _this = this;
        var actionSheet = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.mensajesRef.update(id, {
                            tipo: data
                        });
                    }
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.Visible = function (tipo, user, Friends1) {
        if (tipo == 'Privado') {
            return false;
        }
        else if (tipo == 'Amigos') {
            if (this.isFriend(user, Friends1)) {
                return true;
            }
            else {
                return false;
            }
        }
        if (tipo == 'Publico') {
            return true;
        }
    };
    HomePage.prototype.changeStatus = function () {
    };
    HomePage.prototype.isFriend = function (user, Friends1) {
        if (Friends1 == null) {
            return false;
        }
        else if (Friends1.find(function (x) { return x == user; })) {
            return true;
        }
        else {
            return false;
        }
    };
    HomePage.prototype.showOptions = function (mensajeId, userId) {
        var _this = this;
        if (userId == this.currentUser.uid) {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'What do you want to do?',
                buttons: [
                    {
                        text: 'Delete Song',
                        role: 'destructive',
                        handler: function () {
                            _this.removeSong(mensajeId);
                        }
                    }, {
                        text: 'Update title',
                        handler: function () {
                            _this.elegir(mensajeId);
                        }
                    }, {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'What do you want to do?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    HomePage.prototype.show = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'LogOut',
                    role: 'destructive',
                    handler: function () {
                        _this.logout();
                    }
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.like = function (mensajeId, userid, likes, orders) {
        this.mensajesRef.update(mensajeId, {
            like: likes + 1, order: orders - 1, lastUpdatedBy: this.currentUser.userId
        });
    };
    HomePage.prototype.dislike = function (mensajeId, userid, dislikes, orders) {
        this.mensajesRef.update(mensajeId, {
            dislike: dislikes + 1, order: orders - 1, lastUpdatedBy: this.currentUser.userId
        });
    };
    HomePage.prototype.removeSong = function (mensajeId) {
        this.mensajesRef.remove(mensajeId);
    };
    HomePage.prototype.changeCur = function (user) {
        this.currentUser = user;
        return false;
    };
    HomePage.prototype.login = function () {
        var _this = this;
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider())
            .then(function (response) {
            console.log('resultado login google:', response);
            var userRef = _this.afDatabase.list('users');
            userRef.update(response.user.uid, {
                userId: response.user.uid,
                displayName: response.user.displayName,
                photoURL: response.user.photoURL
            });
        });
    };
    HomePage.prototype.loginWithEmail = function () {
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].EmailAuthProvider()).then(function (xx) {
        });
    };
    HomePage.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Mario\crud\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <!--ion-buttons end *ngIf="afAuth.authState | async">\n          <button color="primary" ion-button icon-only (click)="addSong()">\n            <ion-icon name="add-circle"></ion-icon>\n          </button>\n        </ion-buttons-->\n\n    <ion-title>\n      <ion-item class="item item-trns text-center">\n        BlackDragonBoard\n        <ion-avatar item-end *ngIf="afAuth.authState | async" (click)="show()">\n          <img src={{currentUser.photoURL}}>\n        </ion-avatar>\n      </ion-item>\n\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="afAuth.authState | async as user; else showLogin">\n    <template *ngFor="let user of users | async">\n      <template *ngIf="user.userId == currentUser.uid">\n        <template *ngIf="changeCur(user)">\n        </template>\n      </template>\n    </template>\n    <h1>Hello {{ user.displayName }}!</h1>\n    <div>\n      <ion-list >\n        <ion-item>\n          <div *ngFor="let mensaje of mensajes| async">\n            <ion-card *ngIf="Visible(mensaje.tipo,mensaje.user.userId,currentUser.friends) || mensaje.user.userId == currentUser.userId">\n              <ion-card-header>\n                <ion-avatar item-begin style="text-align:left" *ngIf="afAuth.authState | async">\n                  <img src={{mensaje.user.photoURL}}> {{ mensaje.user.displayName }}\n                </ion-avatar>\n              </ion-card-header>\n              <ion-card-content>\n                <div (click)="showOptions(mensaje.id,mensaje.user.userId)">\n                  {{mensaje.texto}}\n                </div>\n                <button ion-button clear (click)="like(mensaje.id,currentUser.uid,mensaje.like,mensaje.order)">\n                  <ion-icon name="thumbs-up"></ion-icon>\n                </button>\n                Likes: {{mensaje.like}}\n                <button ion-button clear (click)="dislike(mensaje.id,currentUser.uid,mensaje.dislike,mensaje.order)">\n                  <ion-icon name="thumbs-down"></ion-icon>\n                </button>\n                DisLikes: {{mensaje.dislike}}\n              </ion-card-content>\n            </ion-card>\n          </div>\n        </ion-item>\n      </ion-list>\n    </div>\n    <ion-fab right bottom  style="position: fixed; bottom: 2em;right: 2em;">\n      <button ion-fab (click)="addmessage()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-fab>\n    <ion-fab left bottom >\n      <button ion-fab [navPush]="friendspage" style="position: fixed; bottom: 2em; left: 2em;">\n        <ion-icon name="person-add"></ion-icon>\n      </button>\n    </ion-fab>\n  </div>\n  <ng-template #showLogin>\n    <p>Please login.</p>\n    <button ion-button color="danger" full (click)="login()" icon-right>\n      <ion-icon name="logo-googleplus"></ion-icon>\n      Login with Google\n    </button>\n    <!--button ion-button color="danger"  full (click)="loginf()" icon-right>\n          <ion-icon name="logo-facebook"></ion-icon>\n          Login with Facebook\n        </button-->\n  </ng-template>\n</ion-content>'/*ion-inline-end:"C:\Users\Mario\crud\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FriendsPage = (function () {
    function FriendsPage(navCtrl, navParams, alertCtrl, actionSheetCtrl, afDatabase, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.homepage = __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */];
        this.userRef = afDatabase.list('users');
        this.users = this.userRef.valueChanges();
        this.filterRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users');
        this.filterRef.on('value', function (usuariosList) {
            var usuarios = [];
            usuariosList.forEach(function (usuario) {
                usuarios.push(usuario.val());
                return false;
            });
            _this.filterList = usuarios;
            _this.loadedfilterList = usuarios;
        });
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.currentUser = null;
                return;
            }
            _this.currentUser = { uid: user.uid, photoURL: user.photoURL };
        });
    }
    FriendsPage.prototype.initializeItems = function () {
        var _this = this;
        this.filterRef.on('value', function (usuariosList) {
            var usuarios = [];
            usuariosList.forEach(function (usuario) {
                usuarios.push(usuario.val());
                return false;
            });
            _this.filterList = usuarios;
            _this.loadedfilterList = usuarios;
        });
        this.filterList = this.loadedfilterList;
    };
    FriendsPage.prototype.getItems = function (searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }
        this.filterList = this.filterList.filter(function (v) {
            if (v.displayName && q) {
                if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    FriendsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FriendsPage');
    };
    FriendsPage.prototype.changeCur = function (user) {
        this.currentUser = user;
        return false;
    };
    FriendsPage.prototype.isFriend = function (user, Friends1) {
        if (Friends1 == null) {
            return false;
        }
        else if (Friends1.find(function (x) { return x == user; })) {
            return true;
        }
        else {
            return false;
        }
    };
    FriendsPage.prototype.addfriend = function (user, Friends1, Friends2) {
        var x = [];
        var y = [];
        if (Friends1 == null && Friends2 == null) {
            x.push(user.userId);
            y.push(this.currentUser.userId);
            this.userRef.update(this.currentUser.userId, { friends: x });
            this.userRef.update(user.userId, { friends: y });
        }
        else if (Friends1 == null) {
            x.push(user.userId);
            Friends2.push(this.currentUser.userId);
            this.userRef.update(this.currentUser.userId, { friends: x });
            this.userRef.update(user.userId, { friends: Friends2 });
        }
        else if (Friends2 == null) {
            y.push(this.currentUser.userId);
            Friends1.push(user.userId);
            this.userRef.update(this.currentUser.userId, { friends: Friends1 });
            this.userRef.update(user.userId, { friends: y });
        }
        else {
            Friends1.push(user.userId);
            Friends2.push(this.currentUser.userId);
            this.userRef.update(this.currentUser.userId, { friends: Friends1 });
            this.userRef.update(user.userId, { friends: Friends2 });
        }
    };
    FriendsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-friends',template:/*ion-inline-start:"C:\Users\Mario\crud\src\pages\friends\friends.html"*/'<!--\n  Generated template for the FriendsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Friends</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <template *ngFor="let user of users | async">\n    <template *ngIf="user.userId == currentUser.uid">\n      <template *ngIf="changeCur(user)">\n      </template>\n    </template>\n  </template>\n  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list>\n    <ion-item>\n      <div *ngFor="let user of filterList">\n        <ion-card *ngIf="currentUser.userId != user.userId">\n          <ion-card-header>\n            <ion-avatar item-begin style="text-align:left" *ngIf="afAuth.authState | async">\n              <img src={{user.photoURL}}> {{user.displayName }}\n            </ion-avatar>\n          </ion-card-header>\n          <ion-card-content>\n            <button right ion-button clear *ngIf="!isFriend(user.userId,currentUser.friends)" (click)="addfriend(user,currentUser.friends,user.friends)">\n              <ion-icon name="person-add"></ion-icon>\n            </button>\n          </ion-card-content>\n        </ion-card>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\Mario\crud\src\pages\friends\friends.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], FriendsPage);
    return FriendsPage;
}());

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 147;

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/friends/friends.module": [
		447,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 190;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(304);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_search_search__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_friends_friends__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// Import the AF2 Module



// AF2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyBisLQe2DYSltK83gE8ayT1ndZvJT07B4Q",
    authDomain: "mensajes-a1b8b.firebaseapp.com",
    databaseURL: "https://mensajes-a1b8b.firebaseio.com",
    projectId: "mensajes-a1b8b",
    storageBucket: "",
    messagingSenderId: "638752268722"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_search_search__["a" /* SearchPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/friends/friends.module#FriendsPageModule', name: 'FriendsPage', segment: 'friends', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_friends_friends__["a" /* FriendsPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SearchPipe = (function () {
    function SearchPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    SearchPipe.prototype.transform = function (items, terms) {
        if (!items)
            return [];
        if (!terms)
            return items;
        terms = terms.toLowerCase();
        return items.filter(function (it) {
            return it.displayName.toLowerCase().includes(terms); // only filter country name
        });
    };
    SearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'search',
        })
    ], SearchPipe);
    return SearchPipe;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Mario\crud\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Mario\crud\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[283]);
//# sourceMappingURL=main.js.map