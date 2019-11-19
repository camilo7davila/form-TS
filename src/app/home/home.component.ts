import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CountryService } from '../service/country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nameInfo: string = '';
  documentInfo: string = '';
  phoneInfo: string = '';
  emailInfo: string = '';
  itemInfo: boolean;

  myClass: boolean = false;
  myClassDocument: boolean = false;
  myClassPhone: boolean = false;
  myClassEmail: boolean = false;

  countryList: any

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.getCountryTable();
  }

  getCountryTable() {
    this.countryService.getCountry().subscribe(data => {
      this.countryList = data;
    })
  }

  validar() {

    var regex = new RegExp(/\w+@\w+\.+[a-z]/);
    this.myClass = false;
    this.myClassDocument = false;
    this.myClassEmail = false;
    this.myClassPhone = false;

    if (this.nameInfo == '' || this.nameInfo.length <= 15) {
      this.myClass = true;
      Swal.fire({
        title: 'Error',
        text: 'Por favor validar espacio de nombre',
        position: 'top',
        timer: 1000,
        icon: 'warning'
      });
      return false

    } else if (this.documentInfo == '' || this.documentInfo.length <= 6 || this.documentInfo.length >= 20) {
      this.myClassDocument = true;
      Swal.fire({
        title: 'Error',
        text: 'Por favor validar espacio del documento debe estar entre 6 y 20 numeros',
        position: 'top',
        timer: 1000,
        icon: 'warning'
      });
      return false

    } else if (this.phoneInfo == '' || this.phoneInfo.length < 10) {
      this.myClassPhone = true;
      Swal.fire({
        title: 'Error',
        text: 'Los numeros celulares tienen 10 numeros verificar',
        position: 'top',
        timer: 1000,
        icon: 'warning'
      });
      return false

    } else if (isNaN(parseInt(this.phoneInfo))) {
      this.myClassPhone = true
      Swal.fire({
        title: 'Error',
        text: 'el numero ingresado tiene letras',
        position: 'top',
        timer: 1000,
        icon: 'warning'
      });
      return false

    } else if (!regex.test(this.emailInfo)) {
      this.myClassEmail = true;
      Swal.fire({
        title: 'Error',
        text: 'Este no es un correo',
        position: 'top',
        timer: 1000,
        icon: 'warning'
      });
      return false

    } else if (!this.itemInfo) {
      Swal.fire({
        title: 'Error',
        text: 'Debe aceptar terminos y condiciones',
        position: 'top',
        timer: 1000,
        icon: 'warning'
      });
      return false

    }
    else {
      this.nameInfo = '';
      this.documentInfo = '';
      this.phoneInfo = '';
      this.emailInfo = '';
      this.itemInfo = false;

      Swal.fire({
        title: 'Error',
        text: 'Gracias recibimos tus datos',
        position: 'top',
        timer: 5000,
        icon: 'success'
      });
    }
  }



}
