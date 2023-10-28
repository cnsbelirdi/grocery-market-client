import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PublicService } from 'src/app/services/common/public.service';
Chart.register(...registerables);

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss'],
})
export class LineChartComponent implements OnInit {
  constructor(private publicService: PublicService) {}
  async ngOnInit() {
    const datas = await this.publicService.getIncomeExpenseByMonth();
    const income = Object.values(datas['Income']);
    const expense = Object.values(datas['Expense']);
    const months = Object.keys(datas['Income']);
    var lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: income,
            borderColor: 'rgb(66, 245, 108)',
            backgroundColor: 'rgba(66, 245, 108, 0.5)',
            yAxisID: 'y1',
          },
          {
            label: 'Expense',
            data: expense,
            borderColor: 'rgb(245, 66, 87)',
            backgroundColor: 'rgba(245, 66, 87, 0.5)',
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
  }

  getData() {}
}
