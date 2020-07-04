import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { element } from 'protractor';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert(`Erro ao carregar a lista: ${error}`)
    );
  }

  deleteCategory(id: number) {
    const mustDelete = confirm('Deseja realmente excluir este item? ');
    if (mustDelete) {
      this.categoryService.delete(id).subscribe(
        () => this.categories = this.categories.filter(category => category.id !== id),
        () => alert('Erro ao tentar excluir'));
    }
  }

}
