//import { Component, VERSION } from '@angular/core';
import { AfterViewInit, VERSION, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  version = 'Angular: v' + VERSION.full;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  persons: any = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const dataUrl = 'https://raw.githubusercontent.com/l-lin/angular-datatables/master/demo/src/data/data.json';

    this.dtOptions = {
        scrollX:        true,
        scrollCollapse: true,
        paging:         true,
        fixedColumns:   {
            leftColumns: 1,
            rightColumns: 1
        }
    };
    this.http.get(dataUrl)
      .subscribe((response:any) => {
        setTimeout(() => {
          this.persons = response.data;
          console.log(response);
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
      });

  }

  ngAfterViewInit(): void {


  }
}
