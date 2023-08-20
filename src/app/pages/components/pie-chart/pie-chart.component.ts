import {Component} from '@angular/core';
import {Color} from "chart.js";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {  // https://www.digitalocean.com/community/tutorials/angular-chartjs-ng2-charts
  customColors: Color[] = ['#FF5733', '#36A2EB', '#55aa44', '#333', '#FFC107', '#9C27B0']

  chartData = [
    {
      data: [330, 218, 52, 880],
      backgroundColor: this.customColors,
      label: 'Volume generato (kg)'
    }
  ];
  chartLabels = [
    'Plastica',
    'Carta',
    'Vetro',
    'Indifferenziata'
  ];

  chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Performance di separazione',
      },

    },
  }

}
