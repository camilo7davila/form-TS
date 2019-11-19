import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CountryService } from '../service/country.service';
import { countryInfo } from './interface/country.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nameInfo: string='';
  documentInfo: string='';
  phoneInfo: string='';
  emailInfo: string='';
  itemInfo: boolean;
  countryInfo: string='';

  myClass: boolean=false;
  myClassDocument: boolean=false;
  myClassPhone: boolean=false;
  myClassEmail: boolean=false;

  countryList: any

  documentSelectInfo:any;

  constructor( private countryService: CountryService) {  }

  ngOnInit() {
    this.getCountryTable()
  }

  getCountryTable(){
    this.countryService.getCountry().subscribe(data=>{
      this.countryList = data;
      console.log(this.countryList);
      
    })
  }

  validar(){
    var regex = new RegExp(/\w+@\w+\.+[a-z]/);
    this.myClass=false;
    this.myClassDocument=false;
    this.myClassEmail=false;
    this.myClassPhone=false;
    if(this.nameInfo=='' || this.nameInfo.length <= 15){
      console.log("Por favor validar espacio de nombre");
      this.myClass=true
      return false

    } else if( this.documentInfo=='' || this.documentInfo.length <=8 ){
      this.myClassDocument=true;
      console.log("el documento es muy corto");
      return false

    }else if(this.phoneInfo=='' || this.phoneInfo.length < 10){
      this.myClassPhone=true;
      console.log("Los numeros celulares tienen 10 numeros");
      return false

    }else if(this.emailInfo=='' || this.emailInfo.length <= 11){
      this.myClassEmail=true;
      console.log("falta informacion de correo");
      return false

    }else if(isNaN(parseInt(this.phoneInfo))){
      this.myClassPhone=true
      console.log("el numero ingresado tiene letras");
      return false

    } else if(!regex.test(this.emailInfo)){
      console.log("validar la estructura del correo");
      return false

    }else if(!this.itemInfo){
      console.log("debe aceptar terminos y condiciones");
      return false

    }else if(this.countryInfo != ''){
      console.log(this.countryInfo);
      return false
    }
    else{
      console.log("satisfactorio");
    }
  }
  
  

}
