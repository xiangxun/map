import * as echarts from "echarts";
import { useEffect } from "react";
import "../../../components/theme/vintage.js";

type EChartsOption = echarts.EChartsOption;

const PieChart = () => {
  const initChart = () => {
    let chartDom = document.getElementById("main")!;
    let myChart = echarts.init(chartDom, "vintage");
    let option: EChartsOption;
    option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: 20,
        left: "center", // doesn't perfectly work with our tricks, disable it
        selectedMode: false,
        itemWidth: 10,
        itemHeight: 5,
        textStyle: {
          color: "#000000",
          fontSize: 8,
        },
      },
      label: {
        normal: {
          textStyle: {
            fontsize: 8,
          },
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["30%", "60%"],
          center: ["50%", "50%"], // adjust the start angle
          startAngle: 180,
          label: {
            show: true,
            position: "outside",
            alignTo: "none",
            bleedMargin: 5,
            fontSize: 10,
            formatter(param) {
              // correct the percentage
              return param.name;
              // + " (" + param.percent! * 2 + "%)";
            },
          },
          labelLine: {
            length: 12,
            length2: 10,
            maxSurfaceAngle: 80,
          },
          data: [
            { value: 41.45, name: "客厅" },
            { value: 7.12, name: "厨房" },
            { value: 20.04, name: "楼梯间" },
            { value: 41.27, name: "卧室" },
            { value: 7.44, name: "盥洗室" },
            { value: 12.52, name: "生活阳台" },
            { value: 54.87, name: "绿色阳台" },
            {
              // make an record to fill the bottom 50%
              value: 41.45 + 7.12 + 20.04 + 41.27 + 7.44 + 12.52 + 54.87,
              itemStyle: {
                // stop the chart from rendering this piece
                color: "none",
                decal: {
                  symbol: "none",
                },
              },
              label: {
                show: true,
                fontSize: 2,
              },
            },
          ],
        },
      ],
    };
    option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, []);

  return <div id='main' className='w-[220px] h-[150px] justify-center'></div>;
};

export default PieChart;
