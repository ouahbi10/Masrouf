<template>
  <div class="sidebar-top">
    <button
      class="sidebar-icon"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        height="2rem"
      >
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
      </svg>
    </button>
  </div>

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-body">
      <button
        class="closing-button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          height="1.5rem"
        >
          <path
            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
          />
        </svg>
      </button>
      <div class="sidebar-logo">
        <router-link to="/"><img src="@/assets/logo-white.png" /></router-link>>
      </div>
      <div class="sidebar-menu">
        <h2 class="menu-heading">Menu</h2>
        <ul>
          <li>
            <router-link
              class="menu-link"
              :class="{ active: $route.path === '/overview' }"
              to="/overview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="1.2rem"
              >
                <path
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                />
              </svg>
              <h3>Dashboard</h3>
            </router-link>
          </li>
          <li>
            <router-link
              class="menu-link"
              :class="{ active: $route.path === '/overview/transaction' }"
              to="/overview/transaction"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="1.2rem"
              >
                <path
                  d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"
                />
              </svg>
              <h3>Transaction</h3>
            </router-link>
          </li>
          <li>
            <router-link
              class="menu-link"
              :class="{ active: $route.path === '/overview/statistics' }"
              to="/overview/statistics"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="1.2rem"
              >
                <path
                  d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
                />
              </svg>
              <h3>Statistics</h3>
            </router-link>
          </li>
          <li>
            <router-link
              class="menu-link"
              :class="{ active: $route.path === '/overview/budget' }"
              to="/overview/budget"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="1.2rem"
              >
                <path
                  d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
              <h3>Budget</h3>
            </router-link>
          </li>
        </ul>
        <h2 class="menu-heading">Other Menu</h2>
        <div class="other-menu" @click="signOutHandle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1.2rem"
          >
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
          <h3>Sign Out</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="sidebar">
    <div class="sidebar-logo">
      <router-link to="/"><img src="@/assets/logo-white.png" /></router-link>
    </div>
    <div class="sidebar-menu">
      <h2 class="menu-heading">Menu</h2>
      <ul>
        <li>
          <router-link
            class="menu-link"
            :class="{ active: $route.path === '/overview' }"
            to="/overview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="1.2rem"
            >
              <path
                d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
              />
            </svg>
            <h3>Dashboard</h3>
          </router-link>
        </li>
        <li>
          <router-link
            class="menu-link"
            :class="{ active: $route.path === '/overview/transaction' }"
            to="/overview/transaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="1.2rem"
            >
              <path
                d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"
              />
            </svg>
            <h3>Transaction</h3>
          </router-link>
        </li>
        <li>
          <router-link
            class="menu-link"
            :class="{ active: $route.path === '/overview/statistics' }"
            to="/overview/statistics"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="1.2rem"
            >
              <path
                d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
              />
            </svg>
            <h3>Statistics</h3>
          </router-link>
        </li>
        <li>
          <router-link
            class="menu-link"
            :class="{ active: $route.path === '/overview/budget' }"
            to="/overview/budget"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="1.2rem"
            >
              <path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
              />
            </svg>
            <h3>Budget</h3>
          </router-link>
        </li>
      </ul>
      <h2 class="menu-heading">Other Menu</h2>
      <div class="other-menu" @click="signOutHandle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="1.2rem"
        >
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
        <h3>Sign Out</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
let auth;
export default {
  methods: {
    signOutHandle() {
      auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$main-transition: 0.4s ease-in-out;
.offcanvas,
.btn {
  display: none;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #060316;
  height: 100vh;
  padding: 0 15%;
}

.sidebar-logo {
  padding: 20px 0;
}
.sidebar-logo img {
  height: 30px;
}

.sidebar-menu {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sidebar-menu .menu-heading {
  color: #6d6c75;
  font-size: 1.5rem;
}

.sidebar-menu ul {
  align-self: flex-start;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
}
.sidebar-menu ul li {
  transition: $main-transition;
  margin: 20px 0;
}
.sidebar-menu .menu-link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: $main-transition;
  h3 {
    color: #21327f;
    font-size: 1.2rem;
    margin: 0;
    padding-left: 10px;
    transition: $main-transition;
  }
  svg {
    fill: #21327f;
    transition: $main-transition;
  }
}
.other-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.4s ease-in-out;
  cursor: pointer;
  margin: 20px 0;
  h3 {
    color: #21327f;
    font-size: 1.2rem;
    margin: 0;
    padding-left: 10px;
    transition: 0.4s ease-in-out;
  }
  svg {
    fill: #21327f;
    transition: 0.4s ease-in-out;
  }
}
.sidebar-menu ul li a.active {
  svg {
    fill: #3d61e9;
  }
  h3 {
    color: #fff;
  }
}

.sidebar-menu ul li:hover .menu-link,
.other-menu:hover {
  h3 {
    color: #3d61e9;
    transform: translateX(5px);
  }
  svg {
    fill: #3d61e9;
    transform: scale(1.1);
  }
}
.sidebar-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.sidebar-icon {
  background-color: transparent;
  padding: 10px;
  border: 2px solid #060316;
  border-radius: 10px;
  width svg {
    fill: #060316;
  }
}

.sidebar-top {
  display: none;
}
.offcanvas-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #060316;
  height: 100vh;
  padding: 0 15%;
  position: relative;
}

.offcanvas .closing-button {
  position: absolute;
  background-color: transparent;
  border: none;
  top: 2%;
  right: 2%;
  svg {
    fill: #fff;
  }
}

@media screen and (max-width: 992px) {
  .sidebar {
    display: none;
  }
  .offcanvas,
  .btn {
    display: block;
  }
  .sidebar-top {
    display: flex;
  }
}
</style>
