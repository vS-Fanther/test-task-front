<template>
  <div>
    <h2>Countries List</h2>
    <ul>
      <li v-for="country in countries" :key="country.id">
        {{ country.name }}
        {{ convertWeight(country.plan) }}
        <button @click="editClicked(country)">Edit</button>
        <button @click="deleteCountry(country.id)">Delete</button>
      </li>
    </ul>
    <div v-if="isEditClicked">
      <input type="text" placeholder="name" v-model="country.name">
      <input type="text" placeholder="plan" v-model="country.plan">
      <button @click="edit">Submit</button>
    </div>
    <div>
      <button @click="showAddForm">Add</button>
    </div>
    <div v-if="isAddClicked" style="padding: 20px;">
      <input type="text" placeholder="name" v-model="country.name">
      <input type="text" placeholder="plan" v-model="country.plan">
      <button @click="add">Submit</button>
    </div>
  </div>
  <h2 v-if="!error.isEmpty">{{ error }}</h2>
</template>

<script>
import API from "@/api";

export default {
  data() {
    return {
      isCountriesLoading: false,
      countries: [],
      error: '',
      isEditClicked: false,
      isAddClicked: false,
      country: {
        name: '',
        plan: ''
      }
    }
  },
  methods: {
    async fetchCountries() {
      try {
        this.isCountriesLoading = true;
        const response = await API.get('/countries');
        this.countries = response.data.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isCountriesLoading = false;
      }
    },
    editClicked(country) {
      this.country = country;
      this.isEditClicked = true;
    },
    showAddForm() {
      this.isAddClicked = true;
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
    async edit() {
      await API.put('/countries/' + this.country.id, {
        name: this.country.name,
        plan: this.country.plan
      });
      await this.fetchCountries()
      this.isEditClicked = false;
      this.country = {
        name: '',
        plan: ''
      };
    },
    async add() {
      await API.post('/countries/add', {
        name: this.country.name,
        plan: this.country.plan
      });
      await this.fetchCountries()
      this.isAddClicked = false;
      this.country = {
        name: '',
        plan: ''
      };
    },
    async deleteCountry(id) {
      try {
        await API.delete('/countries', {
          params: {
            id: id
          }
        })
        await this.fetchCountries();
      } catch (e) {
        this.error = 'Integrity constraint';
      }

    }
  },
  mounted() {
    this.fetchCountries();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  cursor: pointer;
}
</style>