<template>
    <div>
        <div ref="chart" class="chart">
            <apexchart
                    id="apex"
                    height="350"
                    type="line"
                    :options="chartOptions"
                    :series="series"
            />
            <v-dialog v-model="dialog">
                <v-card
                        @click="dialog = false"
                        max-height="90vh"
                        style="background-color: black"
                >
                    <v-img
                            class="white--text align-end"
                            :src="globalData[currentElement].imgUrl"
                            contain
                            max-height="90vh"
                    >
                        <v-card-title class="background--dark">{{globalData[currentElement].title}}</v-card-title>
                        <v-card-text class="text--primary background--dark">
                            <div class="white--text">{{globalData[currentElement].description}}</div>
                        </v-card-text>
                    </v-img>
                    <div @click.stop="cardSwipe(currentElement => --currentElement)" class="arrow arrow--left"/>
                    <div @click.stop="cardSwipe(currentElement => ++currentElement)" class="arrow  arrow--right"/>
                </v-card>
            </v-dialog>
        </div>

        <v-data-table
                single-select
                v-model="selectedRows"
                item-key="date"

                :headers="headers"
                :items="globalData"
                :sort-by="['date']"
                :page.sync="page"
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
  import CustomTooltip from "@/components/Chart/CustomTooltip";

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
      const DEFAULT_ITEMS_PER_PAGE = 10;

      const hashDate = this.$route.hash.slice(1);
      const currentRow = this.globalData.findIndex(record => record.date === hashDate);

      if (~currentRow) {
        this.page = Math.floor(currentRow / DEFAULT_ITEMS_PER_PAGE + 1);
      }
      this.selectedRows = this.globalData.filter(record => record.date === hashDate);

      this.loadImages();
    },


    data() {
      return {
        currentElement: 0,
        dialog: false,
        page: 1,
        imagesArray: [],
        selectedRows: [],
        globalData: data,
        series: [
          {
            name: this.type,
            data: data.map(record => record[this.type])
          }
        ],
        chartOptions: {
          chart: {
            toolbar: false,
            events: {
              dataPointMouseEnter: this.chartPointMouseEnter,
              dataPointMouseLeave: this.chartPointMouseLeave,
            },
          },
          xaxis: {
            type: "datetime",
            categories: data.map(record => record[X_AXIS])
          },
          markers: {
            size: 10,
            onClick: (event) => {
              this.dialog = true;
              event.stopPropagation();
            }
          },
          tooltip: {
            intersect: true,
            shared: false,
            custom: CustomTooltip.bind(this)
          }
        },
        headers: [
          {text: 'Дата', value: 'date'},
          {text: 'Температура', value: 'temperature'},
          {text: 'Влажность', value: 'humidity'},
          {text: 'Скорость ветра', value: 'speed'},
        ],
      };
    },


    beforeRouteEnter(to, from, next) {
      if (!to.hash && location.hash) {
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
        this.currentElement = currentState.dataPointIndex;
        this.tooltip = true;
      },

      chartPointMouseLeave() {
        this.tooltip = false
      },

      loadImages() {
        this.globalData.forEach((record, index) => {
          const img = new Image();
          img.src = record.imgUrl;
          this.imagesArray[index] = img;
        });
      },

      cardSwipe(incFunc) {
        this.currentElement = (this.globalData.length + incFunc(this.currentElement)) % this.globalData.length;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .background--dark {
        background-color: rgba(0, 0, 0, 0.38);
    }

    .arrow{
        height: 100%;
        position: absolute;
        top: 0;
        width: 60px;

        &::after {
            display: block;
            content: '';
            height: 24px;
            width: 24px;
            position: absolute;
            top: 50%;
            transition-duration: .15s;
            border: 4px solid rgba(255,255,255,0.4);
            border-bottom: none;
            border-left: none;
        }

        &:hover::after {
            border-color: rgba(255,255,255,0.65);
        }

        &--right {
            right: 0;
        }

        &--left {
            left: 0;
        }

        &--right::after {
            transform:  translateY(-12px) rotate(45deg);
            right: 15px;
        }

        &--left::after{
            transform:  translateY(-12px) rotate(-135deg);
            left: 15px;
        }
    }
</style>
