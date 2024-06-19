<template>
  <div class="usecases-page">
    <NavBarVue />
    <div class="usecases-container">
      <h1 class="usecases-title">About US</h1>
      <p>
        Welcome to Masrouf, your trusted companion in managing personal finances
        with ease and efficiency. Our mission is to empower individuals to take
        control of their financial lives by providing a user-friendly platform
        that simplifies budgeting, tracking expenses, and planning for the
        future. We love hearing from our users! Whether you have a question,
        feedback, or need assistance, our support team is here to help. Reach
        out to us at or visit our
        <router-link to="/contact">contact us</router-link> for more ways to get
        in touch
      </p>
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
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}
p {
  padding: 20px 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 200;
  line-height: 2;
  a {
    text-decoration: none;
    color: rgb(222 123 16);
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    color: white;
    scale: 1.03;
  }
}
</style>
