import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgOptimizedImage } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { StudentsService, Student } from "../../../core/services/students.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export default class StudentsComponent implements OnInit{
  columns = [
    { name: 'Acciones' },
    { name: 'Nombres y Apellidos' },
    { name: 'Dirección' },
    { name: 'Teléfono' },
    { name: 'Email' },
    { name: 'Información Académica' },
    { name: 'Tipo de Documento' },
    { name: 'Documento de Identidad' },
    { name: 'Fecha de Inscripción' },
    { name: 'Fecha de Nacimiento' },
    { name: 'Estado' },


  ];

  rows:any;

  isModalOpen = false;

  filteredRows: any;
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService

  ) {
    this.studentForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      informacionAcademica: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudent();
  }


  updateStudent(row: any): void {
    console.log('Actualizar', row);
    // Implement your update logic
  }


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


  saveStudent(): void {
    if (this.studentForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const newStudent = { ...this.studentForm.value };

    this.studentService.createStudent(newStudent).subscribe({
      next: () => {
        Swal.fire('Estudiante Creado', 'El estudiante ha sido creado exitosamente.', 'success').then(() => {
          this.loadStudent();
          this.closeModal();
        });
      },
      error: () => {
        Swal.fire('Error', 'Hubo un problema al crear el estudiante. Por favor, intenta de nuevo.', 'error');
      }
    });
  }

  deleteStudent(row: any): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar al estudiante ${row.primerApellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No, gracias'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.delete(row.id).subscribe({
          next: () => {
            this.filteredRows = [...this.rows];
            Swal.fire('Eliminado', `${row.primerApellido} ha sido eliminado.`, 'success');
          },
          error: () => {
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, intenta de nuevo.', 'error');
          }
        });
      }
    });
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredRows = this.rows.filter((row: { primerApellido: string; }) =>
      row.primerApellido && row.primerApellido.toLowerCase().includes(searchTerm)
    );
  }


  loadStudent(): void {
    this.studentService.findAllStudents().subscribe(response => {
      this.rows = response;
      this.filteredRows = this.rows
      console.log(this.filteredRows, 'datosososo')
    });
  }


}
