import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
declare let AMap: any;


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
  userChartOption: any;
  highSpeedRailChartOption: any;
  xLineValue = [];
  yLineKmValue = [];
  yLineMaxSpeed = [];

  ticketOption: any;

  ngOnInit() {
    this.getData();
    // this.initMap();
    setTimeout(() => {
      this.getLineChart();
      this.getUserChart();
      this.getTicketsChart();
      this.getHighSpeedRail();
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
    // this.chartOption = this.option;
  }

  getUserChart() {
    this.homeService.getUser().subscribe(r => { // 获取用户数量
      console.log(r);
      const res: any = r;
      const xUserValue = [];
      const yUserValue = [];
      const resData = res.data.result;
      resData.forEach(item => {
        if (!item.active) {
          item.active = 0;
        }
        xUserValue.push(item.username);
        yUserValue.push(item.active);
      });
      this.userChartOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['在线/离线']
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
          // name: '系统用户',
          position: 'bottom',
          nameLocation: 'middle',
          nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            lineHeight: 22
          },
          boundaryGap: true, // 横坐标是否从0开始
          data: xUserValue
        },
        yAxis: {
          name: '在线状态',
          minInterval: 1,
          nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            lineHeight: 22
          },
          type: 'value'
        },
        series: [
          {
            name: '在线/离线',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: yUserValue,
            smooth: true // 代表平滑曲线
          }
        ]
      };
      console.log(this.userChartOption);
    });
  }
  getLineChart() {
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
          nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            lineHeight: 22
          },
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
          nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 12
          },
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
          itemStyle: {
            normal: {
              label: {
                show: true,		// 开启显示
                position: 'top',	// 在上方显示
                textStyle: {	    // 数值样式
                  color: '#e5323e',
                  fontSize: 16
                }
              }
            }
          },
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

  getTicketsChart() {
    this.homeService.getTickets().subscribe(r => {
      console.log(r);
      if (r.code === 5001) {
        const resData = r.data.result;
        const xData = [];
        const yOneData = [];
        const ySecData = [];
        const yTheData = [];
        resData.forEach(item => {
          xData.push(item.hs_railId);
          yOneData.push(item.ticket_num1);
          ySecData.push(item.ticket_num2);
          yTheData.push(item.ticket_num3);
        });
        this.ticketOption = {
          color: ['#2B76CC', '#e5323e', '#202020'],
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['一等票', '二等票', '站票']
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
          // 为数组代表柱状图一格里显示多条，为对象一格展示一条多层
          xAxis: [{
            type: 'category',
            boundaryGap: true, // false代表从0刻度开始
            // nameLocation: 'middle',
            data: xData
          }],
          // 为数组代表柱状图一格里显示多条，为对象一格展示一条多层
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		// 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: '#2B76CC',
                      fontSize: 16
                    }
                  }
                }
              },
              name: '一等票',
              type: 'bar',
              // stack: '总量',
              data: yOneData
            },
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		// 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: '#e5323e',
                      fontSize: 16
                    }
                  }
                }
              },
              name: '二等票',
              type: 'bar',
              // stack: '总量',
              data: ySecData
            },
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,		// 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: '#202020',
                      fontSize: 16
                    }
                  }
                }
              },
              name: '站票',
              type: 'bar',
              // stack: '总量',
              data: yTheData
            }
          ]
        };
      }
    });
  }

  getHighSpeedRail() {
    this.homeService.getHighSpeedRail().subscribe(r => {
      const xData = [];
      const yData1 = [];
      const yData2 = [];
      const yData3 = [];
      console.log(r);
      if (r.code === 3001) {
      const resData = r.data.result;
      resData.forEach(item => {
        xData.push(item.hs_carnum);
        yData1.push(item.site_num); // 座位数
        yData2.push(item.max_speed); // max speed
        yData3.push(item.hs_numCar); // 车厢
      });
      }
      this.highSpeedRailChartOption = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['座位数', '最高时速', '车厢数']
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
          // boundaryGap: false,
          boundaryGap: true, // false代表从0刻度开始
          data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '座位数',
            type: 'bar',
            stack: '总量',
            data: yData1
          },
          {
            name: '最高时速',
            type: 'bar',
            stack: '总量',
            data: yData2
          },
          {
            name: '车厢数',
            type: 'line',
            stack: '总量',
            data: yData3,
            smooth: true // 代表平滑曲线

          }
        ]
      };
    });
  }
}
