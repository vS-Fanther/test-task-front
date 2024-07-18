<template>
  <div class="leaders">
    <div class="controls">
      <select v-model="selectedMonth">
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.text }}
        </option>
      </select>
      <button @click="generateData">Generate Data</button>
      <button @click="showReport">Show Report</button>
    </div>
    <div v-if="report.length > 0" class="report">
      <h2>Report</h2>
      <ul>
        <li v-for="report in report" :key="report.country">
          {{ report.country }} - {{ convertWeight(report.mining) }} ({{ convertWeight(report.plan) }})
        </li>
      </ul>
    </div>
    <h2 v-if="isNotFound">Nothing found</h2>
  </div>
</template>

<script>
import API from "@/api";

export default {
  data() {
    return {
      isNotFound: false,
      selectedMonth: new Date().getMonth() + 1, // текущий месяц
      months: [
        {value: 1, text: 'January'},
        {value: 2, text: 'February'},
        {value: 3, text: 'March'},
        {value: 4, text: 'April'},
        {value: 5, text: 'May'},
        {value: 6, text: 'June'},
        {value: 7, text: 'July'},
        {value: 8, text: 'August'},
        {value: 9, text: 'September'},
        {value: 10, text: 'October'},
        {value: 11, text: 'November'},
        {value: 12, text: 'December'},
      ],
      report: [],
    };
  },
  methods: {
    async generateData() {
      try {
        await API.post('/generate');
        alert('Data generated successfully');
      } catch (error) {
        console.error('Error generating data:', error);
        alert('Failed to generate data');
      }
    },
    convertWeight(weightInGrams) {
      if (weightInGrams >= 1000000) {
        return (weightInGrams / 1000000).toFixed(2) + ' T';
      } else if (weightInGrams >= 1000) {
        return (weightInGrams / 1000).toFixed(2) + ' kg';
      } else {
        return weightInGrams + ' g';
      }
    },
    async showReport() {
      this.isNotFound = false;
      try {
        const response = await API.get('/minings/month', {
          params: {
            month: this.selectedMonth
          }
        });
        this.report = response.data.data;
        if (this.report.length === 0) this.isNotFound = true;
      } catch (error) {
        console.error('Error fetching report:', error);
        alert('Failed to fetch report');
      }
    },
  },
};
</script>

<style scoped>
.leaders {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.report {
  margin-top: 20px;
}
</style>
