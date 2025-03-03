import { price_insights } from '@shared/data';
import ReactApexChart from 'react-apexcharts';
import styles from './PriceHistory.module.scss';

export const PriceHistory = () => {
  const prices = price_insights.price_history.map((entry) => entry[1]);
  const timestamps = price_insights.price_history.map((entry) =>
    new Date(entry[0] * 1000).toString(),
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    title: {
      text: 'Prices are currently typical for your search',
      align: 'left',
    },
    subtitle: {
      text: `cost between  $${price_insights.typical_price_range[0]}-${price_insights.typical_price_range[1]}`,
      align: 'left',
    },
    labels: timestamps,
    xaxis: {
      type: 'datetime',

      labels: {
        rotate: 0,
        format: 'MM/dd',
      },
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: 'center',
    },
  };

  const series = [{ name: 'Flight Price', data: prices }];

  return (
    <div className={styles['price-history']}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};
