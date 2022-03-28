import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearCancionDialogComponent } from '../../../modules/canciones/crear-cancion-dialog/crear-cancion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { CancionService } from '../../services/cancion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CrearPartituraDialogComponent } from '../../../modules/partituras/pages/crear-partitura-dialog/crear-partitura-dialog.component';
import { ListarPartituraDialogComponent } from '../../../modules/partituras/pages/listar-partitura-dialog/listar-partitura-dialog.component';

@Component({
  selector: 'app-cancion-tarjeta',
  templateUrl: './cancion-tarjeta.component.html',
  styleUrls: ['./cancion-tarjeta.component.scss']
})
export class CancionTarjetaComponent implements OnInit  {

  idLocal:any=localStorage.getItem('_id');
  idRepPorId:any=localStorage.getItem('repertorioPorId');

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cancionService: CancionService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  @Input() cancion!: any ;

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return
    }
    this.getCancionPorIdFuncion();
    
  }
  // para obtener cancion y borrarla
  getCancionPorIdFuncion(){
    this.activatedRoute.params
    .pipe(
      switchMap(({_id})=>this.cancionService.getCancionPorId(_id))
    )
    .subscribe(cancion=>{
      this.cancion=cancion;
    });
  }

  borrarCancion(){
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data:{...this.cancion}
    })

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.cancionService.borrarCancion(this.cancion._id!)
            .subscribe(resp=>{
              this.mostrarSnackBar("Cancion borrada ");
              // window.history.back();
              window.location.reload();
            })
        }
      }
    );
  }

  //  =====================================================
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }

  onEditCancion(){
    this.openDialog(this.cancion);
  }
  
  openDialog(cancion?: any): void {
    const config={
      data:{
        content:this.cancion
      }
    };
    const dialogRef= this.dialog.open(CrearCancionDialogComponent,config);
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("onEditCancion",resp);
        // this.guardarCancion();
        // this.router.navigate(['/home/crear-cancion']);
      }
    });
  }

  // =====================================================
  // PARTITURAS
  // =====================================================
  onViewPartitura(){
    this.openDialogListPartiture(this.cancion);
  }
  openDialogListPartiture(cancion?: any){
    const config={
      data:{
        content:this.cancion
      }
    };
    const dialogRef= this.dialog.open(ListarPartituraDialogComponent,config);
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("onViewPartitura",resp);
      }
    });
  }
  // 
  onAddPartitura(){
    this.openDialogPartitura();
  }
  openDialogPartitura(): void {
    const dialogRef= this.dialog.open(CrearPartituraDialogComponent,{
      // width: '500px',
      // height: '500px',
      // data: {message: '¿Desea crear una nueva canción?'}

    });
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("onAddPartitura",resp);
      }
    });
  }
}
