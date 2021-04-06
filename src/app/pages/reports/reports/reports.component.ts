import { Category } from './../../categories/shared/category.model';
import { CategoryService } from './../../categories/shared/category.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import currencyFormatter from 'currency-formatter';
import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxis: [
        {
          ticks: {
            beginAtZero: true
          }
        },
      ]
    }
  };

  selectYear = [];

  categories: Category[];
  entries: Entry[];

  @ViewChild('month', { static: false }) month: ElementRef = null;
  @ViewChild('year', { static: false }) year: ElementRef = null;

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
  ) { }

  ngOnInit() {
    this.createYear();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  getEntries() {

  }

  createYear() {
    for (let i = new Date().getFullYear(); i > 2000; i--) {
      this.selectYear.push(i);
    }
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert('Você precisa selecionar o mês e o ano para gerar o relatório.');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#e03131');
  }

  private getChartData(type: string, title: string, color: string) {
    const chartData = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId === category.id) && (entry.type === type)
      );

      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce((total, entry) => total + this.formatBrl(entry.amount, false), 0);
        chartData.push({
          categoryName: category.name,
          totalAmount
        });
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {

      if (entry.type === 'revenue') {
        revenueTotal += this.formatBrl(entry.amount, false);
      } else {
        expenseTotal += this.formatBrl(entry.amount, false);
      }
    });

    this.expenseTotal = this.formatBrl(expenseTotal);
    this.revenueTotal = this.formatBrl(revenueTotal);
    this.balance = this.formatBrl(revenueTotal - expenseTotal);
  }

  formatBrl(value, format = true) {
    if (format) {
      return currencyFormatter.format(value, { code: 'BRL' });
    } else {
      return currencyFormatter.unformat(value, { code: 'BRL' });
    }
  }

}
