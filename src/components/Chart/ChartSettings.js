import data from "@/stabs/items";

const X_AXIS = 'date';

export default {
  chartOptions: {
    chart: {
      toolbar: false
    },
    xaxis: {
      type: "datetime",
      categories: data.map(e => e[X_AXIS])
    },
    markers: {
      size: 10
    },
    tooltip: {
      intersect: true,
      shared: false,
      enabled: false
    }
  },
  page: 1,
  selectedRows: [],
  headers: [
    {
      text: 'Дата',
      align: 'left',
      value: 'date'
    },
    {text: 'Температура', value: 'temperature'},
    {text: 'Влажность', value: 'humidity'},
    {text: 'Скорость ветра', value: 'speed'},
  ],
  globalData: data,
}
