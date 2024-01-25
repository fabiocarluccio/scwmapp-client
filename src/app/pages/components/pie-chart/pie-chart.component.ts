import {Component, Input, OnInit} from '@angular/core';
import {Color} from "chart.js";
import {Citizen} from "../../../models/citizen";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit{  // https://www.digitalocean.com/community/tutorials/angular-chartjs-ng2-charts
  @Input() separationPerformancePercentage!: number
  @Input() wasteTypes!: string[]
  @Input() wasteVolumeGenerated!: number[]

  @Input() customColors: Color[] = ['#333', '#FF5733', '#36A2EB', '#55aa44', '#FFC107', '#9C27B0']

  separationPerformanceColor: string | null = null

  pieChartLoaded = false

  ngOnInit(): void {
    this.separationPerformanceColor = Citizen.getSeparationPerformanceColor(this.separationPerformancePercentage)

    this.delay(50).then(() => {
      this.pieChartLoaded = true
    });
  }

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
  protected readonly Citizen = Citizen;

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showPieChart(): string {
    if (this.pieChartLoaded)
      return " not-transparent "
    return " transparent "
  }
  showPercentage(): string {
    if (this.pieChartLoaded)
      return " not-transparent-percentage "
    return " transparent "
  }

}
