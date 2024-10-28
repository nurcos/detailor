import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  os: string = 'Other';
  browser: string = 'Other';
  res: string = 'Other';
  ip: string = 'Other';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getOS();
    this.getBrowser();
    this.getScreenRes();
    this.getIP();
  }

  getOS() {
    this.os = navigator.userAgent.slice(13).split(';')[0]
  }

  getBrowser() {
    var ua = navigator.userAgent;

    if(ua.indexOf("Opera")!=-1) {
      this.browser="Opera";
    }
    if(ua.indexOf("Firefox")!=-1 && ua.indexOf("Opera")==-1) {
        this.browser="Firefox";
        // Opera may also contains Firefox
    }
    if(ua.indexOf("Chrome")!=-1) {
        this.browser="Google Chrome";
    }
    if(ua.indexOf("Safari")!=-1 && ua.indexOf("Chrome")==-1) {
        this.browser="Safari";
        // Chrome always contains Safari
    }
    
    if(ua.indexOf("MSIE")!=-1 && (ua.indexOf("Opera")==-1 && ua.indexOf("Trident")==-1)) {
        this.browser="Internet Explorer";
        //user agent with MSIE and Opera or MSIE and Trident may exist.
    }
    
    if(ua.indexOf("Trident")!=-1) {
        this.browser="Internet Explorer";
    }
  }

  getScreenRes() {
    this.res = window.screen.width + ' x ' + window.screen.height;
  }

  getIP() {
    this.http.get('https://api64.ipify.org?format=json').subscribe((res:any) => {
      this.ip = res['ip']
    })
  }
  
}

