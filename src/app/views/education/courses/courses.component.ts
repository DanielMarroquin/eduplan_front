import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgForOf, NgOptimizedImage } from "@angular/common";
import { CoursesService } from "../../../core/services/courses.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export default class CoursesComponent implements OnInit {

  columns = [
    { name: 'Nombre del curso' },
    { name: 'Descripción' },
    { name: 'Duración' },
    { name: 'Objetivos' },
    { name: 'Responsables' },
    { name: 'Fecha de inicio' },
    { name: 'Fecha de fin' },
    { name: 'Acciones' }
  ];

  rows: any;
  filteredRows: any;
  courseForm: FormGroup;  // Cambio aquí para reflejar el formulario de cursos

  isModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService
  ) {
    this.courseForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      duracion: ['', Validators.required],
      objetivos: ['', Validators.required],
      responsables: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateCourses(row: any): void {
    console.log('Actualizar', row);
    // Implementa tu lógica de actualización
  }

  saveCourses(): void {
    if (this.courseForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const newCourse = { ...this.courseForm.value };

    this.courseService.create(newCourse).subscribe({
      next: () => {
        console.log('Curso creado exitosamente');
        this.closeModal();
        this.loadCourses();  // Recarga la lista de cursos después de guardar
      },
      error: () => {
        console.error('Hubo un problema al crear el curso');
      }
    });
  }

  deleteCourse(row: any): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar el curso ${row.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No, gracias'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.courseService.delete(row.id).subscribe({
          next: () => {
            this.rows = this.rows.filter((course: any) => course.id !== row.id);
            this.filteredRows = [...this.rows];
            Swal.fire('Eliminado', `El curso ${row.nombre} ha sido eliminado.`, 'success');
          },
          error: () => {
            Swal.fire('Error', 'Hubo un problema al eliminar el curso. Por favor, intenta de nuevo.', 'error');
          }
        });
      }
    });
  }


  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredRows = this.rows.filter((row: { nombre: string }) =>
      row.nombre && row.nombre.toLowerCase().includes(searchTerm)
    );
  }

  loadCourses(): void {
    this.courseService.findAllCourses().subscribe(response => {
      this.rows = response;
      this.filteredRows = [...this.rows];
    });
  }
}
