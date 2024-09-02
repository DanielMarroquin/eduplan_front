import { Component, OnInit } from '@angular/core';
import { NgForOf, NgOptimizedImage } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentsService, Student } from "../../../core/services/students.service";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export default class StudentsComponent implements OnInit{
  columns = [
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
    { name: 'Acciones' },

  ];

  rows:any;

  filteredRows: any;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService

  ) {
    this.productForm = this.fb.group({
      logo: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudent();
  }

  openAddModal(): void {
    // Implement the logic to open your modal for adding a new product
  }

  updateStudent(row: any): void {
    console.log('Actualizar', row);
    // Implement your update logic
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const productId = 'some-unique-id'; // Generate or retrieve unique ID
    const newProduct = { id: productId, ...this.productForm.value };

    // this.productService.createProduct(newProduct).subscribe({
    //   next: () => {
    //     Swal.fire('Producto Creado', 'El producto ha sido creado exitosamente.', 'success').then(() => {
    //       this.loadProducts();
    //     });
    //   },
    //   error: () => {
    //     Swal.fire('Error', 'Hubo un problema al crear el producto. Por favor, intenta de nuevo.', 'error');
    //   }
    // });
  }

  deleteStudent(row: any): void {
    // Swal.fire({
    //   title: `¿Estás seguro de eliminar ${row.name}?`,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Sí',
    //   cancelButtonText: 'No, gracias'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.productService.deleteProduct(row.id).subscribe({
    //       next: () => {
    //         this.rows = this.rows.filter(product => product.id !== row.id);
    //         this.filteredRows = [...this.rows];
    //         Swal.fire('Eliminado', `${row.name} ha sido eliminado.`, 'success');
    //       },
    //       error: () => {
    //         Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, intenta de nuevo.', 'error');
    //       }
    //     });
    //   }
    // });
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
    });
  }


}
