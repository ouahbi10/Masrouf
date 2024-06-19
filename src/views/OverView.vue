<template>
  <div class="overview">
    <div class="sidebar-overview">
      <SideBarVue />
    </div>
    <div class="overview-body">
      <router-view />
    </div>
    <div class="overview-dash">
      <OverViewDash />
    </div>
  </div>
</template>

<script>
import SideBarVue from "../components/SideBar.vue";
import OverViewDash from "../components/OverViewDash.vue";
export default {
  components: {
    SideBarVue,
    OverViewDash,
  },
};
</script>

<style lang="scss" scoped>
.overview {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.overview .sidebar-overview {
  flex-basis: 20%;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.overview-body {
  overflow-y: auto;
  flex-basis: 50%;
  height: 100vh;
}

/* Scrollbar styling */
.overview-body::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar */
}

.overview-body::-webkit-scrollbar-thumb {
  background-color: #e3e2e2; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Roundness of the scrollbar thumb */
  border: 2px solid #e0e0e0; /* Adds space around the thumb */
}

.overview-body::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the scrollbar track */
}

.overview-dash {
  flex-basis: 30%;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

@media screen and (max-width: 992px) {
  .overview {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  .overview .sidebar-overview,
  .overview-body,
  .overview-dash {
    flex-basis: 100%;
    width: 100%;
    height: auto;
    position: static;
  }
  .overview-body {
    overflow-y: auto;
  }
}
</style>
