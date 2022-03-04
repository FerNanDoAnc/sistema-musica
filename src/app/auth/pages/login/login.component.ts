import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  get usuario(){
    return this.authService.usuario;
  }

  miFormulario: FormGroup=this.fb.group({
    correo: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService


  ) { }


  login(){
    
    const {correo,password}=this.miFormulario.value;
    
    this.authService.login(correo,password)
      .subscribe( ok=>{
      
        if(ok===true){
          this.router.navigateByUrl('/dashboard');
          Swal.fire({
            title: this.usuario.msg,
            html: 'Bienvenido :'+this.usuario.nombre,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            width: 350
          });

        }else{
          Swal.fire({
            title: 'Error',
            text: ''+ok+'!',
            icon: 'error',
            timer: 2500,
            confirmButtonText: 'Ok',
            width: 350
          });
        }

      });

  }
}
