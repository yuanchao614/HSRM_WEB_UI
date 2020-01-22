import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../../public/public-service';
declare let AMap: any;

@Component({
  selector: 'sj-marquee-board',
  templateUrl: './marquee-board.component.html',
  styleUrls: ['./marquee-board.component.css'],
})
export class MarqueeBoardComponent implements OnInit {
  dotPosition = 'left';
  isClick = false;
  boardList: any[] = [
    {
      arr: [
        {
          name: 'Jurong East',
          number: '22%',
          status: 'high',
          statusNumber: '4.92%',
          icon: ''
        },
        {
          name: 'Tempreture',
          number: '22%',
          status: 'high',
          statusNumber: '4.92%',
          icon: ''
        },
        {
          name: 'Weather',
          number: '22%',
          status: 'high',
          statusNumber: '4.92%',
          icon: ''
        },
        {
          name: 'Humidity',
          number: '22%',
          status: 'high',
          statusNumber: '4.92%',
          icon: ''
        },
        {
          name: 'Incident',
          number: '22%',
          status: 'high',
          statusNumber: '4.92%',
          icon: ''
        },
        {
          name: 'Luminaires6',
          number: '22%',
          status: 'high',
          statusNumber: '4.92%',
          icon: ''
        }
      ]
    }
  ];
  notice = false;
  warning = true;
  location = 'Singapore';
  userName = 'Y ACE';
  role = 'Admin';
  rollingBarData: any[] = [
    {
      majorData: [
        { line: '28℃', id: 1 },
        { rail: '14%', id: 2 },
        { ticket: '20%', id: 3 },
        { user: '36%', id: 4 },
      ]
    },
    {
      liftData: [
        { tempreture: '3.32%', id: 1 },
        { weather: '15%', id: 2 },
        { humidity: '20%', id: 3 },
        { windPower: '15%', id: 4 },
      ],
    }
  ];
  autoPlay = true;
  locationCity: any;
  // 左右滚动的位置数组
  marqueeContent = ['Jurong East', 'Jurong South', 'Jurong West', 'Jurong North'];
  newMarqueeContent = null;
  noticeContent = 'A car accident occured in Woodland 19# street, traffic police i';

  constructor(
    private router: Router,
    private publicService: PublicService
  ) { }
  ngOnInit() {
    this.getData();
    this.showCityInfo();
    // 将数组转为字符串
    const a = this.marqueeContent.toString();
    // 将空格替换为空格
    this.newMarqueeContent = a.replace(/,/g, '  ');
    // this.publicService.getRollingStickerBarData().subscribe(res => {
    //   console.log(res);
    // });
  }
  // 轮播条鼠标进入时禁止轮播
  over() {
    this.autoPlay = false;
  }
  // 轮播条鼠标离开时允许轮播
  out() {
    this.autoPlay = true;
  }
  bell() {
    console.log('bell');
  }
  setting() {
    console.log(this.isClick);
    if (this.isClick === false) {
      this.isClick = true;
      this.router.navigate(['./signal-centre/setting']);
    } else {
      this.router.navigate(['./signal-centre/home-pages']);
      this.isClick = false;
    }
  }

  getData() {
    this.publicService.getUser().subscribe(r => {
      console.log(r);
      if (r.code === 1001) {
        const resData = r.data.result;
        this.rollingBarData[0].majorData[3].user = resData.length;
      }
    });
    this.publicService.getLine().subscribe(r => {
      console.log(r);
      if (r.code === 2001) {
        const resData = r.data.result;
        this.rollingBarData[0].majorData[0].line = resData.length;
      }
    });
    this.publicService.getRail().subscribe(r => {
      console.log(r);
      if (r.code === 3001) {
        const resData = r.data.result;
        this.rollingBarData[0].majorData[1].rail = resData.length;
      }
    });
  }

  showCityInfo() {
    const map = new AMap.Map('container', {
      resizeEnable: true,
      center: [116.397428, 39.90923],
      zoom: 13
    });
    // 实例化城市查询类
    const citysearch = new AMap.CitySearch();
    // 自动获取用户IP，返回当前城市
    citysearch.getLocalCity((status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        if (result && result.city && result.bounds) {
          const cityinfo = result.city;
          const citybounds = result.bounds;
          // document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;
          console.log(cityinfo);
          this.locationCity = cityinfo;
          this.getWeather();
          // 地图显示当前城市
          map.setBounds(citybounds);
        }
      } else {
        console.warn(result.info);
      }
    });
  }

  getWeather() {
    // 加载天气查询插件
    AMap.plugin('AMap.Weather', () => {
      // 创建天气查询实例
      const weather = new AMap.Weather();

      // 执行实时天气信息查询
      weather.getLive(this.locationCity, (err, data) => {
        console.log(data);
        this.rollingBarData[1].liftData[0].tempreture = data.temperature;
        this.rollingBarData[1].liftData[1].weather = data.weather;
        this.rollingBarData[1].liftData[2].humidity = data.humidity;
        this.rollingBarData[1].liftData[3].windPower = data.windPower;
        console.log(this.rollingBarData[1].liftData);
      });
    });
  }

  changePwd() {
    console.log('changePwd');
  }
  logOut() {
    console.log('退出登录');
  }
}
