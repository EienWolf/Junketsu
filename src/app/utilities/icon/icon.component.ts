import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, fromEvent, interval, Subscription, Observable } from 'rxjs';

const globalSvgCache = new Map<string, SafeHtml>();

@Component({
  selector: 'app-svg-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  imports: [CommonModule]
})
export class SvgIconComponent implements OnInit, OnDestroy {
  private _icon_name: string ='';
  @Input() 
  set iconName(value: string)
  {
    this._icon_name = value;
    this.currentIconValue = this.getCssVariableValue();
    this.loadSvg(this.currentIconValue);
  }
  get iconName(): string {
    return this._icon_name;
  }
  @Input() iconClass: string = '';
  @Input() forceTheme: boolean = true;
  constructor(private el: ElementRef, private sanitizer: DomSanitizer){
  }
  iconSvg: SafeHtml = '';
  private subscription!: Subscription;
  private mutationObserver!: MutationObserver;
  currentIconValue: string | undefined;

  ngOnInit() {
    if (this.forceTheme) {
      this.createThemeChangeObservable();
    } else {
      this.subscription = interval(100).pipe(debounceTime(50), distinctUntilChanged()).subscribe(() => {
        const newValue = this.getCssVariableValue();
        if (newValue !== this.currentIconValue) {
          this.currentIconValue = newValue;
          this.loadSvg(newValue);
        }
      });
    }
  }
  private createThemeChangeObservable() {
    this.mutationObserver = new MutationObserver(() => {
      console.log("res");
      const newValue = this.getCssVariableValue();
      if (newValue !== this.currentIconValue) {
        this.currentIconValue = newValue;
        this.loadSvg(newValue);
      }
    });
    
    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.mutationObserver?.disconnect();
  }
  
  private async loadSvg(iconUrl: string) {
    if (!iconUrl) return;
    try {
      if (globalSvgCache.has(iconUrl)) {
        this.iconSvg = globalSvgCache.get(iconUrl)!;
        return;
      }
      const response = await fetch(iconUrl);
      if (response.ok) {
        const svg = await response.text();
        this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
        globalSvgCache.set(iconUrl, this.iconSvg);
      }
    } catch (error) {
      console.log('Error loading SVG:', error);
      this.iconSvg = '';
    }
  }

  private getCssVariableValue(): string {
    // const targetElement = this.forceTheme 
    //   ? document.documentElement 
    //   : this.el.nativeElement;
    const targetElement = this.el.nativeElement;
    return getComputedStyle(targetElement)
      .getPropertyValue(this.iconName)
      .trim()
      .replace("url(", '')
      .replace(")", '')
      .replace(/^["']|["']$/g, '');
  }
}