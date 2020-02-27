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
            <v-img
                    :style='{top: chartIconPosition.y + "px", left: chartIconPosition.x + "px"}'
                    class='point-image'
                    v-show="tooltip"
                    :src="imageUrl"
            >
                <template v-slot:placeholder>
                    <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                    >
                        <v-progress-circular size="20" indeterminate color="deep-orange lighten-2"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
            <v-dialog
                    v-model="dialog"
                    max-width="100vmin"
            >
                <v-card>
                    <v-img contain :src="mainImageUrl"/>
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
        imageUrl: '',
        mainImageUrl: 'https://picsum.photos/id/0/680/490',
        dialog: false,
        tooltip: false,
        page: 1,
        chartIconPosition: {x: 0, y: 0},
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
            enabled: false
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
        const ICON_WIDTH = 10, ICON_BOTTOM_OFFSET = 50;
        const {x: canvasOffsetX, y: canvasOffsetY} = document.getElementById('apex').getBoundingClientRect();
        const {x: dotOffsetX, y: dotOffsetY} = event.target.getBoundingClientRect();

        this.chartIconPosition.x = - canvasOffsetX + dotOffsetX - ICON_WIDTH / 2;
        this.chartIconPosition.y = - canvasOffsetY + dotOffsetY - ICON_BOTTOM_OFFSET;

        this.imageUrl = `https://picsum.photos/id/${currentState.dataPointIndex}/30/30`;
        this.mainImageUrl = `https://picsum.photos/id/${currentState.dataPointIndex}/980/600`;
        this.tooltip = true;
      },

      chartPointMouseLeave() {
        this.tooltip = false
      },

      loadImages() {
        for(let i = 0; i < 15; i++) {
            const img = new Image();

            // тут должны быть нормальные пути
            img.src = `https://picsum.photos/id/${i}/30/30`;
            this.imagesArray[i] = img;
        }
      }
    }
  }
</script>

<style scoped>
    .point-image{
        position: absolute;
        box-shadow:
                0 2px 2px 0 black,
                0 0 0 3px #dfe2ee;
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    @media all and (max-width: 768px) {
        .point-image{ display: none; }
    }

    @media (orientation: landscape) and (max-width: 1024px) {
        .point-image{ display: none; }
    }
</style>
