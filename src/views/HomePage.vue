<template>
  <div class="landing">
    <NavBar />
    <div class="container">
      <div class="landing-content">
        <h1>Take Control of Your Finances Today</h1>
        <p>
          Welcome to <span>MASROUF</span>, your ultimate personal finance
          manager. Whether you're looking to track your expenses, plan your
          budget, or set financial goals, FinanceMaster provides the tools you
          need to manage your money effectively. With real-time data
          visualization, secure authentication, and intuitive features, staying
          on top of your finances has never been easier. Join us and start your
          journey towards financial freedom today.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.landing {
  position: relative;
  min-height: 100vh;
  background-image: url(../assets/landing.jpg);
  background-size: cover;
}
.landing::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}
.container {
  position: relative;
  z-index: 2;
}
.landing .landing-content {
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 50px 0;
}
.landing .landing-content h1 {
  color: #fff;
  font-size: 5rem;
  font-weight: bolder;
}
@media screen and (max-width: 576px) {
  .landing .landing-content h1 {
    font-size: 3rem;
  }
}
.landing .landing-content p {
  margin: 30px 0;
  color: rgba($color: #fff, $alpha: 0.8);
  font-size: 1.2rem;
  font-weight: 100;
  span {
    color: rgb(222 123 16);
  }
}
</style>
