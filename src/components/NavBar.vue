<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/logo-white.png" alt="Masrouf Logo" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @blur="removeFocusBorder"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="navbar-toggler-icon"
          height="1.8rem"
          fill="white"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/usecases">Use Cases</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/overview">Overview</router-link>
          </li>
          <li class="nav-item nav-icons d-flex">
            <router-link to="/signin" v-if="!isSigned" class="sign-in-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="1.8rem"
              >
                <path
                  d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                />
              </svg>
            </router-link>
            <div
              v-if="isSigned"
              class="sign-out-button ms-3"
              @click="signOutHandle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="1.8rem"
              >
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
let auth;
export default {
  data() {
    return {
      isSigned: false,
    };
  },
  async mounted() {
    auth = await getAuth();
    await onAuthStateChanged(auth, (user) => {
      this.isSigned = !!user;
    });
  },
  methods: {
    async signOutHandle() {
      await signOut(auth);
      this.$router.push("/");
    },
    removeFocusBorder(event) {
      event.target.style.outline = "none";
    },
  },
};
</script>

<style lang="scss" scoped>
$main-transition: 0.4s ease-in-out;
.navbar {
  background-color: transparent;
  padding: 20px 30px;
  z-index: 3;
  width: 100%;
}

.navbar .navbar-brand img {
  height: 35px;
}
ul {
  width: 100%;
  padding: 0 40px;
  justify-content: space-between;
}

.navbar-nav .nav-item .nav-link {
  color: #fff;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  transition: $main-transition;
  margin: 0;
}

.navbar-nav .nav-item .nav-link:hover {
  color: rgb(222, 123, 16);
}

.sign-out-button,
.sign-in-button {
  position: relative;
  transition: $main-transition;
}

.sign-in-button:hover::after,
.sign-out-button:hover::after {
  opacity: 1;
  visibility: visible;
}

.sign-out-button::after,
.sign-in-button::after {
  content: attr(data-tooltip);
  position: absolute;
  left: -10px;
  bottom: -30px;
  color: white;
  background-color: rgb(222, 123, 16);
  border-radius: 5px;
  padding: 0 5px;
  opacity: 0;
  visibility: hidden;
  transition: opacity $main-transition, visibility $main-transition;
}

.nav-icons svg {
  cursor: pointer;
  transition: $main-transition;
  fill: white;
}

.nav-icons svg:hover {
  fill: rgb(222, 123, 16);
}
.navbar-toggler {
  border: none;
  outline: none;
  transition: $main-transition;

  &:focus,
  &:active,
  &-icon:focus {
    border: 1px solid white;
    outline: none;
    box-shadow: none;
  }
}
@media screen and (max-width: 992px) {
  .nav-item {
    padding: 10px 0;
  }
  .nav-item:not(:last-of-type) {
    border-bottom: 1px solid white;
  }
  ul {
    padding: 0;
  }
}
</style>
