import { Component } from '@angular/core';
import { Layout } from "../../componets/layout/layout";

@Component({
  selector: 'app-attendance',
  imports: [Layout],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class Attendance {}
