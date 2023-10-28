import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PublicService } from 'src/app/services/common/public.service';
Chart.register(...registerables);

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarChartComponent implements OnInit {
  constructor(private publicService: PublicService) {}
  async ngOnInit() {
    var data = await this.publicService.getTotalOrdersLast12Days();
    var dates = Object.keys(data);
    var counts = Object.values(data);
    var barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Orders Number',
            data: counts,
            backgroundColor: 'rgba(93, 66, 245, 0.5)',
            barThickness: 16,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
      },
    });
  }
}
