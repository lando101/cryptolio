import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { analytics } from 'firebase';
import * as moment from 'moment';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { Subscription } from 'rxjs';

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
  @Input() coinName= '';
  @Input() commentHeight= '';


  ngOnInit(): void {
    console.log(this.coinName);
    console.log('COIN NAME');
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
    const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/${this.coinName}/coin_comments`);
    const coin = coinRef.ref.orderBy("time", "desc");
    let coinSub = coin.get();
    // console.log(coin);

    coinSub.then(data=>{
      data.forEach((doc: any) => {
        console.log(doc, '=>', doc.data());
        this.coinDataArray.push(doc.data());
      });
    })
    console.log('comment service');

    // coinSub = coin.subscribe(data=>{
    //     data.forEach((doc: any) => {
    //     console.log(doc, '=>', doc.data());
    //     this.coinDataArray.push(doc.data());
    //   });
    // });
    // this.coinDataArray.sort((a, b) => a.time.seconds - b.time.seconds);

    // this.coinDataArray.forEach(element => {
    //   console.log("AGE");

    //   // element.time = moment.unix(element.time.seconds).format();
    //   // element.age = moment().startOf('hour').fromNow();
    //   // console.log(moment().startOf('hour').fromNow());
    // });

  }

  getRealTimeComments(){
    const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/${this.coinName}/coin_comments/`);
    const coin = coinRef.valueChanges();

    // console.log(coin);

    // console.log(coin);
    // coin.pipe(
    //   map(actions => actions.map(a => this.coinDataArray.push(a.payload.doc.data())))
    // );

    coin.subscribe(data=>{
      console.log(data);
      data.sort((a, b) => b.time.seconds - a.time.seconds)
      if(data.length > this.coinDataArray.length){
        // let difference = data.length - this.coinDataArray.length;
        // for (let index = difference; index < data.length; index++) {
        //   this.coinDataArray.push(data[index]);
        // }
        // data[0].time = moment.unix(data[0].time.seconds).format();
        this.coinDataArray.push(data[0]);
      } else if(data.length === this.coinDataArray.length){
        for (let index = 0; index < this.coinDataArray.length; index++) {
          // const element = array[index];
          if(data[index].like !== this.coinDataArray[index].like){
            this.coinDataArray[index].like = data[index].like;
          }
          if(data[index].dislike !== this.coinDataArray[index].dislike){
            this.coinDataArray[index].dislike = data[index].dislike;
          }
        }
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
      const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/${this.coinName}/coin_comments`);
      // const coin = coinRef.add('test');

      const commentData: any = {
        id: this.coinName + "_comment_" + this.coinDataArray.length,
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

  getComment(like:boolean, id: string){
    const coinRef: AngularFirestoreCollection<any> = this.afs.collection(`coins/${this.coinName}/coin_comments`);
    let coinSub = coinRef.ref.where("id", "in", [id]).get();
    // coinSub.;
    coinSub.then(data=>{
      // console.log(data.docs.;
      data.docs.forEach(element => {
        console.log(element.id);
        if(like){
          this.addLike(element.data(), element.id);
        } else if(!like){
          this.addDislike(element.data(), element.id)
        }
      });
    });
    // console.log(coinSub.get());
    console.log('COIN QUERY');
  }

  // ADD A LIKE TO A COMMENT
  addLike(element: any, id: any){
    const coinRef: AngularFirestoreDocument<any> = this.afs.doc(`coins/${this.coinName}/coin_comments/${id}`);
    coinRef.update({like: element.like+=1});
  }

  // ADD A DISLIKE TO A COMMENT
  addDislike(element: any, id: any){
    const coinRef: AngularFirestoreDocument<any> = this.afs.doc(`coins/${this.coinName}/coin_comments/${id}`);
    coinRef.update({dislike: element.dislike+=1});
  }
}
