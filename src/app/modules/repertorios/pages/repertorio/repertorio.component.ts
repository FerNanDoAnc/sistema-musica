import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepertorioService } from '../../../../shared/services/repertorio.service';
import { switchMap } from 'rxjs/operators';
import { CancionService } from '../../../../shared/services/cancion.service';

// componente del dialogo crear cancion
import { MatDialog } from '@angular/material/dialog';
import { CrearCancionDialogComponent } from '../../../canciones/crear-cancion-dialog/crear-cancion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddListIntegrantesComponent } from '../../../../modules/integrantes/pages/add-list-integrantes/add-list-integrantes.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NewMsgComponent } from 'src/app/modules/whatsapp/pages/new-msg/new-msg.component';
import { WebSocketService } from 'src/app/shared/services/web-socket.service';

@Component({
  selector: 'app-repertorio',
  templateUrl: './repertorio.component.html',
  styleUrls: ['./repertorio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RepertorioComponent implements OnInit {

  idRepertorioLocal:any=localStorage.getItem('_id_repertorio');
  idLocal:any=localStorage.getItem('_id');

  usuarioRepComp:any[]=[];
  mostrarBotonesReper:boolean=false;

  usuarioCanReper:any[]=[];
  mostrarBotones:boolean=false;

  repertorios:any[]=[];
  repertorio! : any;
  repertorioNombre! : any;

  canciones:any[]=[];
  cancion: any= {
    nombre:'',
    link:'',
  }

  noAutor:boolean=true; 

  constructor(
    private activatedRoute:ActivatedRoute,
    private repertoriosService:RepertorioService,
    private cancionesService:CancionService,
    private router:Router,

    public dialog: MatDialog,
    private snackBar: MatSnackBar,

    private webSocketService: WebSocketService,

  ) { }

  ngOnInit(): void {
    this.getRepertorioPorId();
    this.getCancionRepertorio();
    // this.listarWs(); 
    this.listUpdate();
  }
// ==========================================================================================================================
  // en deshuso por el momento
  listarWs(){
    this.activatedRoute.params
    .pipe(
      switchMap(({_id})=>this.webSocketService.emitirEvento('listDos-cancion-rep',{_id:_id}))) 
    .subscribe(
      data=>{ 
        this.canciones=data.canciones; 
      },
      err=>console.log(err)
    );
  }

  listUpdate(){
    this.webSocketService.listen('update-index-cancion').subscribe((data)=>{ 
      console.log(data);
      this.getCancionRepertorio();
    })
  }
  
  updateIndexCan(data:any){  
    this.webSocketService.emit('update-index-cancion',data);
  }
  // ======================================================================================================================
  
  capitalizarPrimeraLetra(str:any) { 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  getRepertorioPorId(){
    this.activatedRoute.params
    .pipe(
      switchMap( ({_id})=>this.repertoriosService.getRepertorioPorId(_id))
    )
    .subscribe( repertorio=>{
      let nomCap=this.capitalizarPrimeraLetra(repertorio.nombre);
      this.repertorioNombre=nomCap;
      this.repertorio=repertorio; 
      this.repertorios.push(repertorio);
      
      for(let i of this.repertorios){
        this.usuarioRepComp.push(i.usuario._id);
      }
      for(let i of this.usuarioRepComp){
        if(this.idLocal==i){
          this.mostrarBotonesReper=true;
          this.noAutor=false;
        }
      }
    });
  }

  volver(){
    if(this.mostrarBotonesReper==true){
      this.router.navigate(['/home/repertorios']);
    }
    if(this.mostrarBotonesReper==false){
      this.router.navigate(['/home/compartidos/lista']);
    }
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
        
      }
    });
  }
  // ============================================================= 
  // WHATSAPP
  // =============================================================
  onNewWhatsApp(){
    this.NewMsgComponent(this.repertorio);
  }
  NewMsgComponent(repertorio?: any): void {
    const config={
      height:'auto',
      width:'420px',
      data:{
        content:this.repertorio
      }
    };
    const dialogRef= this.dialog.open(NewMsgComponent,config);
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        
      }
    });
  }
  // =============================================================
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2500,
    });
  }

  // =============================================================
  onDropped(event:CdkDragDrop<any>){
    try {
      const anterior=event.previousIndex;
      const actual=event.currentIndex;
      moveItemInArray(this.canciones,anterior,actual);
      
      this.canciones.forEach((cancion,index)=>{ 
        cancion.indice=index; 
      }); 

      this.updateIndexCan(this.canciones);
       
    } catch (error) {
        console.log(error);
    }
  }
  
  // En deshuso
  trackCancion(index : number, cancionTrack: any) { 
    return cancionTrack._id;
  };

}
