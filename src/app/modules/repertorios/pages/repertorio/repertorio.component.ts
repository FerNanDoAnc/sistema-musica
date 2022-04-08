import { Component, OnInit } from '@angular/core';
import { RepertorioList } from '../../../../core/interfaces/repertorio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RepertorioService } from '../../../../shared/services/repertorio.service';
import { switchMap } from 'rxjs/operators';
import { CancionService } from '../../../../shared/services/cancion.service';

// componente del dialogo crear cancion
import { MatDialog } from '@angular/material/dialog';
import { CrearCancionDialogComponent } from '../../../canciones/crear-cancion-dialog/crear-cancion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddListIntegrantesComponent } from '../../../../modules/integrantes/pages/add-list-integrantes/add-list-integrantes.component';

@Component({
  selector: 'app-repertorio',
  templateUrl: './repertorio.component.html',
  styleUrls: ['./repertorio.component.scss']
})
export class RepertorioComponent implements OnInit {

  idRepertorioLocal:any=localStorage.getItem('_id_repertorio');

  repertorio! : any;
  canciones:any[]=[];
  cancion: any= {
    nombre:'',
    link:'',
  }

  constructor(
    private activatedRoute:ActivatedRoute,
    private repertoriosService:RepertorioService,
    private cancionesService:CancionService,
    private router:Router,

    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getRepertorioPorId();
    this.getCancionRepertorio();
  }

  getRepertorioPorId(){
    this.activatedRoute.params
    .pipe(
      switchMap( ({_id})=>this.repertoriosService.getRepertorioPorId(_id))
    )
    .subscribe( repertorio=>{
      this.repertorio=repertorio; 
    });
  }

  volver(){
    this.router.navigate(['/home/repertorios']);
  }


// CANCIONES =====================================================
  getCancionRepertorio(){
    this.activatedRoute.params
    .pipe(
      switchMap(({_id})=>this.cancionesService.getCancionPorRepertorio(_id)))
    .subscribe(
      canciones=>{
        this.canciones=canciones;
      },
      err=>console.log(err)
    );
  }

  onNewCancion(){
    this.openDialog();
  }
// =============================================================
  openDialog(): void {
    const dialogRef= this.dialog.open(CrearCancionDialogComponent,{
      // width: '500px',
      // height: '500px',
      // data: {message: '¿Desea crear una nueva canción?'}

    });
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("resp",resp);
      }
    });
  }

  // =============================================================
  // MUSICOS-INTEGRANTES
  // =============================================================
  onNewMusician(){
    this.openDialogNewMusician(this.repertorio);
  }
  openDialogNewMusician(repertorio?: any): void {
    const config={
      data:{
        content:this.repertorio
      }
    };
    const dialogRef= this.dialog.open(AddListIntegrantesComponent,config);
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("resp",resp);
      }
    });
  }
  // =============================================================
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2500,
    });
  }

}
