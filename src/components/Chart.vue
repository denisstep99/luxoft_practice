<template>
    <div>
        <div ref="chart" class="chart">
                <apexchart height="350" type="line" :options="chartOptions" :series="series"/>
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
            const hashDate = this.$router.history.current.hash.slice(1);
            const page = this.globalData.findIndex(e => e.date === hashDate);

            if (~page) {
                this.page = Math.floor(page / 10 + 1);
            }
            this.selectedRows = this.globalData.filter(e => e.date === hashDate);
        },
        data() {
            return {
                chartOptions: {
                    chart: {
                        toolbar: false
                    },
                    xaxis: {
                        type: "datetime",
                        categories: data.map(e => e[X_AXIS])
                    }
                },
                series: [
                    {
                        name: this.type,
                        data: data.map(e => e[this.type])
                    }
                ],
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
        methods: {
            toggle(isSelected, select, date) {
                if (!isSelected) {
                    history.replaceState("", document.title, '#' + date);
                } else {
                    history.replaceState("", document.title, ' ');
                }
                select(!isSelected)
            }
        }
    }
</script>

<style scoped>

</style>
