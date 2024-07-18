<template>
  <div>
    <h2>Companies List</h2>
    <ul>
      <li v-for="company in companies" :key="company.id">
        {{ company.name }}
        {{ company.email }}
        {{ company.country.name }}
        <button @click="editClicked(company)">Edit</button>
        <button @click="deleteCountry(company.id)">Delete</button>
      </li>
    </ul>
    <div v-if="isEditClicked">
      <input type="text" placeholder="name" v-model="company.name">
      <input type="text" placeholder="email" v-model="company.email">
      <button @click="edit">Submit</button>
    </div>
    <div>
      <button @click="showAddForm">Add</button>
    </div>
    <div v-if="isAddClicked" style="padding: 20px;">
      <input type="text" placeholder="name" v-model="company.name">
      <input type="text" placeholder="email" v-model="company.email">
      <input type="text" placeholder="country_id" v-model="company.id">
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
      isCompaniesLoading: false,
      companies: [],
      error: '',
      isEditClicked: false,
      isAddClicked: false,
      company: {
        name: '',
        email: '',
        id: ''
      }
    }
  },
  methods: {
    async fetchCompanies() {
      try {
        this.isCompaniesLoading = true;
        const response = await API.get('/companies');
        this.companies = response.data.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isCompaniesLoading = false;
      }
    },
    editClicked(country) {
      this.company = country;
      this.isEditClicked = true;
    },
    showAddForm() {
      this.isAddClicked = true;
    },
    async edit() {
      await API.put('/companies/' + this.company.id, {
        name: this.company.name,
        email: this.company.email
      });
      await this.fetchCompanies()
      this.isEditClicked = false;
      this.company = {
        name: '',
        email: ''
      };
    },
    async add() {
      await API.post('/companies/add', {
        name: this.company.name,
        email: this.company.email,
        countryId: this.company.id
      });
      await this.fetchCompanies()
      this.isAddClicked = false;
      this.company = {
        name: '',
        email: ''
      };
    },
    async deleteCountry(id) {
      try {
        await API.delete('/companies', {
          params: {
            id: id
          }
        })
        await this.fetchCompanies();
      } catch (e) {
        this.error = 'Integrity constraint';
      }

    }
  },
  mounted() {
    this.fetchCompanies();
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