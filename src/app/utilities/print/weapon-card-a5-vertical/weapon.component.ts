import { Component, ElementRef, Input, ViewChild, OnInit, Output, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weapon } from '../../../models/weapon.model';
import { SharedModule } from '../../../shared.module';
import { NgxPrintModule } from 'ngx-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WeaponService } from '../../../services/weapon.service';
import { SvgIconComponent } from "../../icon/icon.component";

@Component({
  selector: 'print-WeaponCardA5Vertical',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css'],
  imports: [CommonModule, SharedModule, NgxPrintModule, SvgIconComponent]
})
export class WeaponCardA5VerticalComponent implements OnInit, AfterViewInit {
  weapon: Weapon = new Weapon();
  m_less: boolean = false;
  render: boolean = false;
  @ViewChild('a5v_pdf') pdfContent!: ElementRef;
  @Input() public index: string | string = '';

  constructor(private weaponService: WeaponService) {
    
  }
  ngOnInit(): void {
    this.weapon = this.weaponService.getWeapon(this.index);
  }

  ngAfterViewInit(): void {
    this.render = true;
    this.generatePDF('a4l');
  }

  public generatePDF(format: 'a4l' | 'a4r' | 'img' | 'm_less') {
    if (format == 'm_less') {
      this.m_less = true;
    }
    const div = this.pdfContent.nativeElement;
    html2canvas(div, { scale: 3, useCORS: true
        , logging: false
        , allowTaint: true
        }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      if (format == 'a4l' || format == 'a4r') {
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const imgWidth = 148;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 149, 0, imgWidth, imgHeight, '', 'FAST');
        pdf.save('weapon.pdf');
      } else {
        var aDownloadLink = document.createElement('a');
        aDownloadLink.download = 'canvas_image.png';
        aDownloadLink.href = imgData;
        aDownloadLink.click();
      }
    });
  }
}