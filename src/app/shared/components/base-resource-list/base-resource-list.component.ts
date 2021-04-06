import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';

export class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  resources: T[] = [];

  constructor(
    protected resourceService: BaseResourceService<T>,
  ) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert(`Erro ao carregar a lista: ${error}`)
    );
  }

  deleteResource(id: number) {
    const mustDelete = confirm('Deseja realmente excluir este item? ');
    if (mustDelete) {
      this.resourceService.delete(id).subscribe(
        () => this.resources = this.resources.filter(resources => resources.id !== id),
        () => alert('Erro ao tentar excluir'));
    }
  }

}
