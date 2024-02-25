import React from "react";
import {Chart as ChartJS, RadialLinearScale,BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip,  Legend, defaults} from "chart.js";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import {downloadExcel} from "../../utils/downloadExcel"

ChartJS.register(ArcElement, RadialLinearScale,BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
defaults.font.family = "BYekan"

/**
 * @param {object} props
 * @param {object[]} props.dataCollection
 * @param {string[]} props.dataCollection[].data EX: [10, 12, 13]
 * @param {string} props.dataCollection[].label EX: "label 1"
 * @param {string} props.labels EX: ["label1", "label2", "label3"]
 * @param {string} props.title EX: "My Chart"
 * @param {'pie' | 'v-bar' | 'h-bar' | 'doughnut' | 'line' | 'polar'} props.type Accepts only "pie" | "v-bar" | "x-bar" | "doughnut" | "line"
 * @returns
 */

const chartColors = ['#FF5733','#FFE033','#33BBFF','#FF3355','#4dc9f6',
'#f67019',
'#f53794',
'#537bc4',
'#acc236',
'#166a8f',
'#00a950',
'#58595b',
'#8549ba']

const ChartContent = ({dataCollection, labels, type, title}) => {
  const datasets = dataCollection.map((c, i) => ({
    label: c.label,
    data: c.data,
    borderColor: dataCollection.length == 1 ? chartColors : (chartColors[i] || chartColors[0]),
    backgroundColor: dataCollection.length == 1 ? chartColors.map((c) => c + "55") : ((chartColors[i] || chartColors[0])+"55"),
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',        
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  if (type == "h-bar") options.indexAxis = "y"
  if (type == "v-bar") options.indexAxis = "x"
  if (type == "pie" || type == "polar" || type == "doughnut") options.plugins.legend.position = "right"

  const trimmedType = type.trim()

  const handleShowData = ()=>{
   
    //const obj = Object.assign({}, ...data.labels.map((label, index) => ({ [label]: data.datasets[0].data[index] })));
   
    //const obj = Object.assign({}, ...data.labels.map((label, index) => ({ [label]: data.datasets.map(dataset => dataset.data[index]) })));
    //const obj = Object.assign({}, ...data.labels.map((label, index) => ({ [label]: data.datasets.map(dataset => ({ [dataset.label]: dataset.data[index] }) ) })))
    
    //way 1
    // const obj = data.labels.map((label, index) => {
    //   const newObj = { "شرح": label };
    //   data.datasets.forEach((dataset) => {
    //     newObj[dataset.label] = dataset.data[index];
    //   });
    //   return newObj;
    // });
    //way 2
    const obj = data.labels.map((label, index) => {
      const newObj = { "شرح": label };
      data.datasets.forEach((dataset) => {
        Object.assign(newObj, { [dataset.label]: dataset.data[index] });
      });
      return newObj;
    });
    //way 3
    // const obj = data.labels.map((label, index) => {
    //   return data.datasets.reduce((acc, dataset) => {
    //     acc.name = label;
    //     acc[dataset.label] = dataset.data[index];
    //     return acc;
    //   }, {});
    // });
    //console.log(obj);
    downloadExcel(obj,"دیتای چارت")
  }

  return (
    <ChartCard>
      <button class="bg-sky-500 hover:bg-sky-700 ..." onClick={handleShowData}>دانلود اکسل</button>
        {
            trimmedType == "pie" ? 
            (<Pie options={options} data={data}/>) : 

            trimmedType == "v-bar" ?
            (<Bar options={options} data={data} />) : 

            trimmedType == "h-bar" ?
            (<Bar options={options} data={data} />) : 

            trimmedType == "doughnut" ?
            (<Doughnut options={options} data={data} />) : 

            trimmedType == "polar" ?
            (<PolarArea options={options} data={data} />) : 

            trimmedType == "line" ?
            (<Line options={options} data={data}/>) : ""
        }
    </ChartCard>
  );
};

export default ChartContent;
