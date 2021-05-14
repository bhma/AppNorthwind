import { ReportService } from './../../services/report.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

interface ICard {
    categoryName: string;
    qtdSaled: number;
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    @ViewChild('chartCategory', { static: true }) chartCategory: ElementRef;
    labels: string[] = [];
    qtdSaled: number[] = [];

    first: ICard = {
        categoryName: '',
        qtdSaled: 0
    };
    second: ICard = {
        categoryName: '',
        qtdSaled: 0
    };
    third: ICard = {
        categoryName: '',
        qtdSaled: 0
    };
    fourth: ICard = {
        categoryName: '',
        qtdSaled: 0
    };

    constructor(
        private rService: ReportService
    ) { }

    ngOnInit(): void {
        this.rService.getReportCategories()
            .subscribe(data => {
                this.labels = data.map(e => e.CategoryName);
                this.qtdSaled = data.map(e => e.qtd_Products);

                this.first = {
                    categoryName: data[0].CategoryName,
                    qtdSaled: data[0].qtd_Products
                }
                this.second = {
                    categoryName: data[1].CategoryName,
                    qtdSaled: data[1].qtd_Products
                }
                this.third = {
                    categoryName: data[2].CategoryName,
                    qtdSaled: data[2].qtd_Products
                }
                this.fourth = {
                    categoryName: data[3].CategoryName,
                    qtdSaled: data[3].qtd_Products
                }
                this.createChart();
            });

    }

    createChart() {
        new Chart(this.chartCategory.nativeElement, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        data: this.qtdSaled,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(23, 162, 184, 0.2)',
                            'rgba(40, 167, 69, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(23, 162, 184)',
                            'rgba(40, 167, 69)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

}
