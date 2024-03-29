import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  hide = true;
  
  get usuario(){
    return this.authService.usuario;
  }

  miFormulario: FormGroup=this.fb.group({
    correo: ['',[
      Validators.required,
      Validators.email,
      Validators.maxLength(80),
      Validators.pattern(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService


  ) { }


  get formValidate(){
    return this.miFormulario.controls;
  }

  login(){
    
    const {correo,password}=this.miFormulario.value;
    
    this.authService.login(correo,password)
      .subscribe( ok=>{
      
        if(ok===true){
          this.router.navigateByUrl('/home');
          Swal.fire({
            // title: this.usuario.msg,
            html: '¡Bienvenid@ '+this.usuario.nombre+'!',
            icon: 'success',
            iconColor: "#7ecb20",
            showConfirmButton: true, 
            confirmButtonColor: "#673ab7",  
            width: 350, 
            background: "#FFF",
            backdrop:'rgba(224, 224, 224, 0.39)',
          });

        }else{
          console.log(this.usuario.msg);
          Swal.fire({
            title: 'Error',
            text: ''+ok+'!',
            icon: 'error',
            confirmButtonText: 'Ok',
            width: 350
          });
        }

      });

  }
}
