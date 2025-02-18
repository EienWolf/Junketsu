import { Component, ElementRef, Input, ViewChild, AfterViewInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weapon } from '../../../models/weapon.model';
import { SharedModule } from '../../../shared.module';
import { NgxPrintModule } from 'ngx-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'print-WeaponCardA5Vertical',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [CommonModule, SharedModule, NgxPrintModule]
})
export class WeaponCardA5VerticalComponent implements AfterViewInit {
  weapon: Weapon = new Weapon();
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  @Input() public index: string | undefined;

  constructor() {
    
  }
  ngAfterViewInit(): void {
    console.log();
    if (this.index !== null) {
      const storedWeaponsJson = localStorage.getItem('weapons');
      if (storedWeaponsJson) {
        const storedWeapons = JSON.parse(storedWeaponsJson);
        const storedWeaponsMap: Weapon[] = storedWeapons.map((data: any) => new Weapon(data));
        var weapon = storedWeaponsMap.find(weapon => weapon.id === this.index);
        if (!!weapon) {
          
        }
        this.weapon = weapon || new Weapon();
      }
    }
  }

  @Output() public generatePDF():boolean {
    const div = this.pdfContent.nativeElement;
    html2canvas(div, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a7');
      const imgWidth = 148;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('weapon.pdf');
    });
    return true;
  }
}