<template>
    <div>
        <div ref="chart" class="chart">
            <apexchart id="apex" @dataPointMouseLeave="mmw" height="350" type="line" :options="chartOptions" :series="series"/>
            <v-img :style='{top: y + "px", left: x + "px"}' class='point-image' v-show="tooltip" :src="imageUrl"/>
            <v-dialog
                    v-model="dialog"
                    max-width="60%"
            >
                <v-card>
                    <v-img width="100%" contain src="https://picsum.photos/id/1/690/480"/>
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
  import data from '../../stabs/items';

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
    },
    data() {
      return {
        dialog: false,
        x: 0,
        y: 0,
        series: [
          {
            name: this.type,
            data: data.map(e => e[this.type])
          }
        ],
        tooltip: false,
        imagesArray: [],
        imageUrl: 'https://picsum.photos/30/30?random',
        chartOptions: {
          chart: {
            toolbar: false,
            events: {
              dataPointMouseEnter: this.mmm
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
      mmm(e, r, c) {
        const {x: canvasOffsetX, y: canvasOffsetY} = document.getElementById('apex').getBoundingClientRect();
        const {x: dotOffsetX, y: dotOffsetY} = e.target.getBoundingClientRect();

        this.x = - canvasOffsetX + dotOffsetX - 5;
        this.y = - canvasOffsetY + dotOffsetY - 50;

        this.imageUrl = `https://picsum.photos/id/${c.dataPointIndex}/30/30`;
        if (!this.imagesArray[c.dataPointIndex]) {
          const img = new Image();
          img.src = this.imageUrl;
          this.imagesArray[c.dataPointIndex] = img;
        }
        this.tooltip = true;
      },
      mmw() {
        this.tooltip = false
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
</style>
