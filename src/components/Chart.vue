<template>
    <div>
        <div ref="chart" class="chart">
            <apexchart
                    id="apex"
                    @dataPointMouseLeave="chartPointMouseLeave"
                    height="350"
                    type="line"
                    :options="chartOptions"
                    :series="series"
            />
            <v-dialog
                    v-model="dialog"
            >
                <v-card
                        @click="dialog = false"
                        max-height="90vh"
                        style="background-color: black"
                >
                    <v-img
                            class="white--text align-end"
                            :src="mainImageUrl"
                            contain
                            max-height="90vh"
                    >
                        <v-card-title style="background-color: rgba(0, 0, 0, 0.38)">Top 10 Australian beaches</v-card-title>
                        <v-card-text  style="background-color: rgba(0, 0, 0, 0.38)" class="text--primary">
                            <div class="white--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, eligendi!</div>

                            <div class="white--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid expedita ipsam molestias nostrum obcaecati officia pariatur quibusdam rem soluta voluptatem!</div>
                        </v-card-text>
                    </v-img>
                </v-card>
            </v-dialog>
        </div>

        <v-data-table
                v-model="selectedRows"
                :headers="headers"
                :items="globalData"
                item-key="date"
                :sort-by="['date']"
                :page.sync="page"
                single-select
        >
            <template v-slot:item="{ item, isSelected, select, headers }">
                <tr
                        :class='{"blue accent-4 white--text": isSelected}'
                        @click="toggle(isSelected, select, item.date)"
                >
                    <td
                            class="d-flex align-center justify-space-between d-sm-table-cell sm-border"
                            :key='index'
                            v-for="(element, index) in headers"
                    >
                        <span class="font-weight-bold hidden-sm-and-up">{{element.text}}</span>
                        <span class="d-block">{{item[element.value]}}</span>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
  import data from '../stabs/items';

  const X_AXIS = 'date';

  export default {
    name: "Chart",
    props: {
      type: {
        type: String,
        default: 'temperature',
        validator: function (value) {
          return ['temperature', 'humidity', 'speed'].indexOf(value) !== -1
        }
      }
    },


    beforeMount() {
      const hashDate = this.$route.hash.slice(1);
      const page = this.globalData.findIndex(e => e.date === hashDate);

      if (~page) {
        this.page = Math.floor(page / 10 + 1);
      }
      this.selectedRows = this.globalData.filter(e => e.date === hashDate);

      this.loadImages();
    },


    data() {
      return {
        mainImageUrl: 'https://picsum.photos/id/0/680/490',
        dialog: false,
        page: 1,
        imagesArray: [],
        selectedRows: [],
        globalData: data,
        series: [
          {
            name: this.type,
            data: data.map(e => e[this.type])
          }
        ],
        chartOptions: {
          chart: {
            toolbar: false,
            events: {
              dataPointMouseEnter: this.chartPointMouseEnter
            },
          },
          xaxis: {
            type: "datetime",
            categories: data.map(e => e[X_AXIS])
          },
          markers: {
            size: 10,
            onClick: (e) => {
              this.dialog = true;
              e.stopPropagation()
            }
          },
          tooltip: {
            intersect: true,
            shared: false,
            enabled: true,
            custom: this.constructTooltip
          }
        },
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
      };
    },


    beforeRouteEnter(to, from, next) {
      if(!to.hash && location.hash) {
        return next(to.fullPath + location.hash);
      }
      next();
    },


    methods: {
      toggle(isSelected, select, date) {
        if (!isSelected) {
          history.replaceState("", document.title, '#' + date);
        } else {
          history.replaceState("", document.title, ' ');
        }
        select(!isSelected)
      },

      chartPointMouseEnter(event, r, currentState) {
        this.mainImageUrl = `https://picsum.photos/id/${currentState.dataPointIndex}/680/490`;
        this.tooltip = true;
      },

      chartPointMouseLeave() {
        this.tooltip = false
      },

      loadImages() {
        for(let i = 0; i < 15; i++) {
            const img = new Image();

            // тут должны быть нормальные пути
            img.src = `https://picsum.photos/id/${i}/680/490`;
            this.imagesArray[i] = img;
        }
      },

      constructTooltip: ({w, dataPointIndex, series, seriesIndex}) => {
        return  `
                            <img style="width: 140px;" alt="" src="https://picsum.photos/id/${dataPointIndex}/680/490"/>
                            <div style="width: 140px; white-space: normal; font-size: 12px; padding: 10px">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                </div>
                            <div class="apexcharts-tooltip-series-group apexcharts-active" style="display: flex;">
                                <span class="apexcharts-tooltip-marker" style="background-color: rgb(0, 143, 251);"></span>
                                <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                    <div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-label">${w.globals.initialSeries[0].name}:</span>
                                        <span class="apexcharts-tooltip-text-value">${series[seriesIndex][dataPointIndex]}</span>
                                    </div>
                                </div>
                            </div>
                        `
      }
    }
  }
</script>

<style scoped>
</style>
