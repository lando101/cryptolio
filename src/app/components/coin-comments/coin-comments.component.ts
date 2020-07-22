import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { analytics } from 'firebase';
import * as moment from 'moment';

@Component({
  selector: 'app-coin-comments',
  templateUrl: './coin-comments.component.html',
  styleUrls: ['./coin-comments.component.scss']
})
export class CoinCommentsComponent implements OnInit {

  constructor( private coinData: AuthenticationService, public afs: AngularFirestore, private formBuilder: FormBuilder) { }
  coinDataArray: any[] = [];
  comment: string = '';
  formGroup: FormGroup;

  ngOnInit(): void {

    // const doc = db.collection('cities').doc('SF');

    // const observer = doc.onSnapshot(docSnapshot => {
    //   console.log(`Received doc snapshot: ${docSnapshot}`);
    //   // [START_EXCLUDE]
    //   observer();
    //   done();
    //   // [END_EXCLUDE]
    // }, err => {
    //   console.log(`Encountered error: ${err}`);
    // });

    // this.coinData.GetComments().subscribe(data=>{
    //   // console.log();
    //   data.forEach((doc: any) => {
    //     console.log(doc, '=>', doc.data());

    //     this.coinDataArray.push(doc.data());
    //   });
    //   // console.log(data.data());
    //   console.log('coin data');
    // });
    // this.formGroup = this.formBuilder.group({
    //   'comment': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    // });
    this.getAllComments();
    this.getRealTimeComments();
  }


  commentFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  getAllComments(){
    const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/btc/coin_comments`);
    const coin = coinRef.get();

    // console.log(coin);
    console.log('comment service');

    let coinSub = coin.subscribe(data=>{
        data.forEach((doc: any) => {
        console.log(doc, '=>', doc.data());
        this.coinDataArray.push(doc.data());
      });
    });
    this.coinDataArray.sort((b, a) => a.time - b.time);

    this.coinDataArray.forEach(element => {
      element.time = moment.unix(element.time.seconds).format();
    });

    coinSub.unsubscribe;
  }

  getRealTimeComments(){
    const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/btc/coin_comments/`);
    const coin = coinRef.valueChanges();
    // console.log(coin);

    // console.log(coin);
    // coin.pipe(
    //   map(actions => actions.map(a => this.coinDataArray.push(a.payload.doc.data())))
    // );

    coin.subscribe(data=>{
      console.log(data);
      data.sort((a, b) => b.time - a.time)
      if(data.length > this.coinDataArray.length){
        // let difference = data.length - this.coinDataArray.length;
        // for (let index = difference; index < data.length; index++) {
        //   this.coinDataArray.push(data[index]);
        // }
        data[0].time = moment.unix(data[0].time.seconds).format();
        this.coinDataArray.push(data[0]);
      }
    })

    // this.coinDataArray = [];

    // console.log(this.coinDataArray);
    // console.log('comment service');

    // coin.subscribe(data=>{
    //     data.forEach((doc: any) => {
    //     console.log(doc, '=>', doc.data());

    //     this.coinDataArray.push(doc.data());
    //   });
    // })
    console.log('REAL TIME');
  }

  // "7Gdmdo1D5kPQr3DT6kTK"

  setComments(comment: string){
    if(this.commentFormControl.value){
      const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/btc/coin_comments`);
      // const coin = coinRef.add('test');

      const commentData: any = {
        comment: this.commentFormControl.value,
        like: 0,
        dislike: 0,
        time: new(Date)
        // favorites: user.favorites = ["XRP"]
      }
      const coin = coinRef.add(commentData);
      // this.getAllComments();
      this.commentFormControl.pristine;
      this.commentFormControl.setValue('')
      this.commentFormControl.clearAsyncValidators();
      // this.commentFormControl.setErrors();
    }

    // this.commentFormControl.errors;

  }
}
