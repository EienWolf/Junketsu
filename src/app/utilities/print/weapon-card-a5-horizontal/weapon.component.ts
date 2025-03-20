import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weapon } from '../../../models/weapon.model';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared.module';
import { NgxPrintModule } from 'ngx-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [CommonModule, SharedModule, NgxPrintModule],
})
export class WeaponComponent implements OnInit {
  weapon: Weapon = new Weapon();
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      const storedWeaponsJson = localStorage.getItem('weapons');
      if (storedWeaponsJson) {
        const storedWeapons = JSON.parse(storedWeaponsJson);
        const storedWeaponsMap: Weapon[] = storedWeapons.map(
          (data: Weapon) => new Weapon(data),
        );
        const weapon = storedWeaponsMap.find((weapon) => weapon.id === index);
        this.weapon = weapon || new Weapon();
      }
    }
  }

  generatePDF() {
    const div = this.pdfContent.nativeElement;
    html2canvas(div, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a7');
      const imgWidth = 148;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('weapon.pdf');
    });
  }
}
