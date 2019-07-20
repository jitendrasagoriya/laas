import { Log } from './../../models/log';
import { LogService } from './../../services/log.service';
import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  public infoCount: number;
  public errorCount: number;
  public debugCount: number;
  public yesterDay: number;
  public logs: Log[];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Today','Yesterday'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private logService: LogService) {
    this.getInfoCount();
    this.getErrorCount();
    this.getDebugCount();
    this.getYesterdayTotalCount();
    console.log(this.infoCount);
  }
  ngOnInit() {
    this.getLogs();
  }

  getLogs(): void {
    this.logService.getLogs()
      .subscribe(logs => (this.logs = logs));
  }


  getErrorCount() {
    this.logService.getCount('ERROR').subscribe(count => {
      this.errorCount = count;
    });
  }

  getDebugCount() {
    this.logService.getCount('DEBUG').subscribe(count => {
      this.debugCount = count;
    });
  }

  getInfoCount() {
    this.logService.getCount('INFO').subscribe(count => {
      this.infoCount = count;
    });
  }

  getYesterdayTotalCount() {
    this.logService.getYesterDayCount('14').subscribe(count => {
      this.yesterDay = count;
    });
  }

}
