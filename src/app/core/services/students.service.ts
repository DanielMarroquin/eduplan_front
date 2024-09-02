import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment'

export interface Student {
  id: number;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  informacionAcademica: string;
  tipoDocumento: string;
  documentoIdentidad: string;
  fechaInscripcion: string;
  fechaNacimiento: string;
  status: number;
}




@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl

  findAllStudents() {
    const url = `${this.apiUrl}/students/list-all`
    return this.http.get(url)
  }

  createStudent(model: any) {
    const url = `${this.apiUrl}/students/create`
    const body = { model }
    return this.http.post(url, body)
  }

  delete(id: any) {
    const url = `${this.apiUrl}/students/delete/${id}`;
    return this.http.delete(url, {
      responseType: "arraybuffer",
      body: null,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  update(model: any, id: any) {
    const url = `${this.apiUrl}/students/update/${id}`
    const body = { model }
    return this.http.put(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }



}
