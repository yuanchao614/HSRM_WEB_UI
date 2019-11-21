import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }
  userNum: any;
  lineNum: any;
  chartOption: any;
  lineChartOption: any;
  xLineValue = [];
  yLineKmValue = [];
  yLineMaxSpeed = [];

  option = {
    title: {
      text: '折线图堆叠'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  };

  ngOnInit() {
    this.getData();
    setTimeout(() => {
      this.getLineChart();
    }, 1000);
    // this.getLineChart();
  }


  getData() {
    this.homeService.getUser().subscribe(r => { // 获取用户数量
      console.log(r);
      const res: any = r;
      this.userNum = res.data.result.length;
    });
    this.homeService.getLine().subscribe(r => {
      console.log(r);
      const res: any = r;
      const resData = res.data.result;
      this.lineNum = res.data.result.length;
      resData.forEach(item => {
        this.xLineValue.push(item.line_num);
        this.yLineKmValue.push(item.km);
        this.yLineMaxSpeed.push(item.max_speed);
      });
    });
    this.chartOption = this.option;
  }

  getLineChart() {
    // app.title = '折柱混合';
    // this.xLineValue = [];
    // this.yLineKmValue = [];
    // this.yLineMaxSpeed = [];
    // this.homeService.getLine().subscribe(r => {
    //   console.log(r);
    //   const res: any = r;
    //   const resData = res.data.result;
    //   this.lineNum = res.data.result.length;
    //   resData.forEach(item => {
    //     this.xLineValue.push(item.line_num);
    //     this.yLineKmValue.push(item.km);
    //     this.yLineMaxSpeed.push(item.max_speed);
    //   });
    // });
    console.log(this.xLineValue);
    this.lineChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['kilometer', 'Max-Speed']
      },
      xAxis: [
        {
          type: 'category',
          name: 'High-speed Line Num',
          nameLocation: 'middle',
          data: this.xLineValue,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'km',
          min: 0,
          interval: 100,
          axisLabel: {
            formatter: '{value} km'
          }
        },
        {
          type: 'value',
          name: 'max-speed',
          min: 0,
          interval: 100,
          axisLabel: {
            formatter: '{value} km/h'
          }
        }
      ],
      series: [
        {
          name: 'kilometer',
          type: 'bar',
          data: this.yLineKmValue
        },
        {
          name: 'Max-Speed',
          type: 'line',
          yAxisIndex: 1,
          data: this.yLineMaxSpeed
        }
      ]
    };
    console.log(this.lineChartOption);
  }

}
