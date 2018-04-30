import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Component({
  selector: 'app-full-page',
  templateUrl: './full-page.component.html',
  styleUrls: ['./full-page.component.css']
})
export class FullPageComponent implements OnInit {

  /* //Default values
   displayLeftRight : boolean = true;
   lookupFinishPayButtons : boolean = false;
   lookupFinishFlow : boolean = false;*/

  //For Testing
  displayLeftRight: boolean = true;
  lookupFinishPayButtons: boolean = false;
  lookupFinishFlow: boolean = false;
  // finishAndPay : boolean = false;

  @Output() emitToTable = new EventEmitter<any>();

  itemDetails: any;
  itemDetailsArr: any = [];

  isItemFound : boolean = false;
  itemFoundIndex : number;

  constructor() { }

  ngOnInit() {
  }

  onClickingMemberButton() {
    this.displayLeftRight = false,
      this.lookupFinishPayButtons = true

  }

  onClickingLookupButton() {

    this.lookupFinishPayButtons = false,
      this.lookupFinishFlow = true
  }

  onClickingFinishPay() {
    this.lookupFinishPayButtons = false
    //this.finishAndPay=true

  }
  onClickingItem(itemDetails) {
    //console.log("Event came from lookup item component: ", itemDetails);
    this.lookupFinishFlow = false;
    this.lookupFinishPayButtons = true;

    if (this.itemDetailsArr.length == 0) {
      console.log("Inside if condition for firsttime");
      this.itemDetailsArr.push(itemDetails);
    } else {
      for (this.itemFoundIndex = 0; this.itemFoundIndex < this.itemDetailsArr.length; this.itemFoundIndex++) {
        if (this.itemDetailsArr[this.itemFoundIndex]["ITEM_NAME"] === itemDetails["ITEM_NAME"]) {
          this.isItemFound = true;
          break;
        }
      }
      this.callAMethod(itemDetails);
    }

  }

  callAMethod(itemDetails){
      console.log("this.isItemFound: ", this.isItemFound, " Index: ", this.itemFoundIndex);
      if(this.isItemFound == true){
        console.log("Found matching item");
        let quantity = this.itemDetailsArr[this.itemFoundIndex]["ITEM_QUANTITY"];
        quantity = ++quantity;
        this.itemDetailsArr[this.itemFoundIndex]["ITEM_QUANTITY"] = quantity;
        this.itemDetailsArr[this.itemFoundIndex]["ITEM_PRICE"] = quantity * itemDetails["ITEM_PRICE"]
      } else{
        console.log("Not found matching item");
        this.itemDetailsArr.push(itemDetails);
      }
      this.isItemFound = false;
  }

}

