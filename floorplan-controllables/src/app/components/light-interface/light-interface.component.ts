import { Component, OnInit, Inject,  } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { debug } from 'util';


@Component({
  selector: 'app-light-interface',
  templateUrl: './light-interface.component.html',
  styleUrls: ['./light-interface.component.css']

})

export class LightInterfaceComponent {
  visible = true;
  show = true;
  constructor(public matDialog: MatDialog, public dialogRef: MatDialogRef<LightInterfaceComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {

   }
}
