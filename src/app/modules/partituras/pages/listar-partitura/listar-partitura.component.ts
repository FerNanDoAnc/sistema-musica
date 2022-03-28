import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListarPartituraDialogComponent } from '../listar-partitura-dialog/listar-partitura-dialog.component';

@Component({
  selector: 'app-listar-partitura',
  templateUrl: './listar-partitura.component.html',
  styleUrls: ['./listar-partitura.component.scss']
})
export class ListarPartituraComponent implements OnInit {

  @Input() cancion!: any ;

  constructor(
    public dialogRef: MatDialogRef<ListarPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

  ) { }

  ngOnInit(): void {
    if(this.data?.content?.hasOwnProperty('_id')){
      this.cancion=this.data.content;
      console.log("cancion desde PARTITURA TS",this.cancion);
    }
  }

}
