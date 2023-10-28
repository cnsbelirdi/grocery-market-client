import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PublicService } from 'src/app/services/common/public.service';
Chart.register(...registerables);

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  constructor(private publicService: PublicService) {}
  async ngOnInit() {
    var sales = await this.publicService.getSalesByCategory();
    var categories = Object.keys(sales);
    var counts = Object.values(sales);
    var doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [
          {
            label: '% of sales in',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(250, 92, 179, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(250, 92, 179, 1)',
            ],
            borderWidth: 1,
            spacing: 8,
            borderRadius: 3,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgb(255, 99, 132)',
              borderRadius: 5,
            },
            position: 'left',
          },
        },
      },
    });
  }
}
