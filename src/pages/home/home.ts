import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MESSAGE } from './home.exports'; 
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data:any[];
  i=0;
  newmsg = new MESSAGE();
  dateTime = new Date().toISOString();
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private db:AngularFireDatabase,private toast:ToastController){
    db.list('/messages').valueChanges().subscribe(data=>{
      this.data = data
      this.i = this.data.length
      this.i = 1000 - this.i;
      console.log("val i = "+ this.i)
      console.log(this.data)
    })
    
  }
  ionViewDidLoad(){
    this.navCtrl.push(LoginPage)
  }
  addmessage(){
    let alert = this.alertCtrl.create({
      title: 'Send Message to World',
      inputs: [
        {
          type:'text',
          name: 'title',
          placeholder: 'Title',
          
        },
        {
          type:'text',
          name: 'name',
          placeholder: 'Your name(Optional)',
          
        },
        {
          type:'text',
          name: 'message',
          placeholder: 'Message',
          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'save',
          handler: data => {
            this.newmsg.msg = data.message;
            this.newmsg.title = data.title;
            this.newmsg.name = data.name;
            this.newmsg.date = this.dateTime.split(".")[0];
            console.log(this.newmsg)
            console.log("i="+this.i)
            let newmessage = this.db.database.ref('/messages');
            newmessage.child('message'+this.i).update(this.newmsg).then(data=>{
              this.toast.create({
                message : "Your message has been saved. Thank you !!",
                duration:3000
              }).present();
            })

          console.log(data)
          }
        }
      ]
    });
    alert.present();

  }


  open(x){
    console.log(x)
  }

}
