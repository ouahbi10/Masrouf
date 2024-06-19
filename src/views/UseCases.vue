<template>
  <div class="usecases-page">
    <NavBarVue />
    <div class="usecases-container">
      <h1 class="usecases-title">Use Cases</h1>
      <ul>
        <li>- Users can create an account and log in to the app.</li>
        <li>- Users can add their income sources.</li>
        <li>- Users can add their expenses.</li>
        <li>- Users can categorize their income and expenses.</li>
        <li>- Users can view a summary of their financial status.</li>
        <li>- Users can set budget limits for different categories.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
export default {
  components: {
    NavBarVue,
  },
};
</script>

<style lang="scss" scoped>
$text-color: #060316;

.usecases-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $text-color;
  color: white;
}

.usecases-container {
  width: 90%;
  max-width: 1200px;
  padding: 40px;
  border: 1px solid rgb(222, 123, 16);
  border-radius: 20px;
  margin: 20px auto;
  background-color: $text-color;
}

.usecases-title {
  font-size: 2.4rem;
  font-weight: bold;
  text-transform: uppercase;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    font-size: 1.3rem;
    font-weight: 100;
    padding: 10px 0;
  }
  @media screen and (max-width: 576px) {
    li {
      font-size: 1.1rem;
    }
  }
}
</style>
