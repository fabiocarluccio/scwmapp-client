import {Component, Input} from '@angular/core';
import {Color} from "chart.js";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {  // https://www.digitalocean.com/community/tutorials/angular-chartjs-ng2-charts
  @Input() separationPerformancePercentage: number = 0
  @Input() wasteTypes!: string[]
  @Input() wasteVolumeGenerated!: number[]

  @Input() customColors: Color[] = ['#333', '#FF5733', '#36A2EB', '#55aa44', '#FFC107', '#9C27B0']


  /* spostato in html dato che da problemi quando aggiungo altri plugins
  chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Performance di separazione',
      },
    },
  }
  */
}
