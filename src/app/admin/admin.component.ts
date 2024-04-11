import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AdminService } from './admin.service';
import { response } from 'express';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  grades: { label: string, y: number }[] = [];

  chartOptions : any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.refreshTable();
}

data : any;


  refreshTable() {
	this.adminService.getGradesRate().subscribe(res => {
		let json_res = JSON.stringify(res);
		localStorage.setItem('grades', json_res);
	});

	this.data = JSON.parse(localStorage.getItem('grades') ?? '{}');

	this.chartOptions = {
		title: {
		  text: "Students final grades for the 1st Semester"
		},
		data: [{
		  type: "column",
		  dataPoints: [
			{ label: "5.00-5.99",  y: this.data[5]  },
			{ label: "6.00-6.99", y: this.data[6]  },
			{ label: "7.00-7.99", y: this.data[7]  },
			{ label: "8.00-8.99",  y: this.data[8]  },
			{ label: "9.00-9.99",  y: this.data[9]  },
			{ label: "10.00",  y: this.data[10]  }
		  ]
		}]                
	  };
  }

}
