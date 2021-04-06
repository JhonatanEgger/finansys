import { BaseResourceListComponent } from './../../../shared/components/base-resource-list/base-resource-list.component';
import { Component } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  breadCrumbItems = [{ text: 'Categorias', link: '/categories' }];
  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
