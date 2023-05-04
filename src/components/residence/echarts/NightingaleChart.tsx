import * as echarts from "echarts";
import { useEffect } from "react";

type EChartsOption = echarts.EChartsOption;

const NightingaleChart = () => {
  const initChart = () => {
    let chartDom = document.getElementById("main")!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      legend: {
        top: "bottom",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      label: {
        show: true,
        position: "outer",
        formatter: "{b} \n ({d}%)",
      },
      labelLine: {
        show: true,
        length: 0.1,
        length2: 1,
        smooth: true,
      },

      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [20, 50],
          center: ["50%", "50%"],
          roseType: "area",
          // itemStyle: {
          //   borderRadius: 8,
          // },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" },
          ],
        },
      ],
    };
    option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, []);

  return <div id='main' className='w-[250px] h-[250px] justify-center'></div>;
};

export default NightingaleChart;
