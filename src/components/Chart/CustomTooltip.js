export default function({w, dataPointIndex, series, seriesIndex}) {
  return `
                            <img style="width: 140px;" alt="" src="${this.globalData[dataPointIndex].imgUrl}"/>
                            <div style="width: 140px; max-height: 100px; overflow: hidden; white-space: normal; font-size: 12px; padding: 10px">
                                <span>${this.globalData[dataPointIndex].description || '' }</span>
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
