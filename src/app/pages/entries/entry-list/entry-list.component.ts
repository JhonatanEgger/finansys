import { BaseResourceListComponent } from './../../../shared/components/base-resource-list/base-resource-list.component';
import { Component } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.sass']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  breadCrumbItems = [{ text: 'Lançamentos', link: '/entryes' }];

  constructor(protected entryService: EntryService) {
    super(entryService);
  }

}
