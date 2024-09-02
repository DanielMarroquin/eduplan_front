import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export default class CoursesComponent {

  columns = [
    { name: 'Logo' },
    { name: 'Nombre del producto' },
    { name: 'Descripción' },
    { name: 'Fecha de Liberación' },
    { name: 'Fecha de reestructuración' },
    { name: 'Acciones' }
  ];
  rows: any[] = [];
  filteredRows = [...this.rows];
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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
    this.loadProducts();
  }

  openAddModal(): void {
    // Implement the logic to open your modal for adding a new product
  }

  updateProduct(row: any): void {
    console.log('Actualizar', row);
    // Implement your update logic
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const productId = 'some-unique-id';
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

  deleteProduct(row: any): void {
    // Swal.fire({
    //   title: `¿Estás seguro de eliminar ${row.name}?`,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Sí',
    //   cancelButtonText: 'No, gracias'
    // }).then((result) => {
      // if (result.isConfirmed) {
      //   this.productService.deleteProduct(row.id).subscribe({
      //     next: () => {
      //       this.rows = this.rows.filter(product => product.id !== row.id);
      //       this.filteredRows = [...this.rows];
      //       Swal.fire('Eliminado', `${row.name} ha sido eliminado.`, 'success');
      //     },
      //     error: () => {
      //       Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, intenta de nuevo.', 'error');
      //     }
      //   });
      // }
    //});
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredRows = this.rows.filter(row =>
      row.name && row.name.toLowerCase().includes(searchTerm)
    );
  }

  loadProducts(): void {
    // this.productService.getAllProducts().subscribe(response => {
    //   this.rows = response.data;
    //   this.filteredRows = [...this.rows];
    // });
  }


}
