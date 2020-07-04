import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';
import { element } from 'protractor';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.sass']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a, b) => b.id - a.id),
      error => alert(`Erro ao carregar a lista: ${error}`)
    );
  }

  deleteEntry(id: number) {
    const mustDelete = confirm('Deseja realmente excluir este item? ');
    if (mustDelete) {
      this.entryService.delete(id).subscribe(
        () => this.entries = this.entries.filter(entry => entry.id !== id),
        () => alert('Erro ao tentar excluir'));
    }
  }

}
