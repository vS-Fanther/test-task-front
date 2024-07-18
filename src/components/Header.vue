<template>
  <div class="header">
    <div class="home">
      <router-link to="/" style="color: white">
        <i class="fas fa-home"/>
      </router-link>
    </div>

    <div class="navbar">
      <nav>
        <ul class="nav-list">
          <li>
            <router-link to="/">Countries</router-link>
          </li>
          <li>
            <router-link to="/companies">Companies</router-link>
          </li>
          <li>
            <router-link to="/leaders">Leaders</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogVisible: false,
    }
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  background: teal;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home,
.login {
  flex: 0 1 auto;
}

.navbar {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin: 0;
}

.nav-list a {
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
}

.nav-list a:hover {
  text-decoration: underline;
}

.fa-home,
.fa-user {
  font-size: 2rem; /* Увеличение размера иконок */
}
</style>