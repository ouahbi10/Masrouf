<template>
  <h3 class="all-budgets-title">All Budgets</h3>
  <div class="no-transactions" v-if="!hasBudgets">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="4rem">
      <path
        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
      />
    </svg>
    <h3>You Have No Budgets</h3>
  </div>
  <div class="all-budgets-content" v-if="hasBudgets">
    <div class="budget" v-for="budget in budgets" :key="budget.budgetid">
      <div class="last-budgets-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1.4rem"
          v-if="budget.category == 'food'"
        >
          <path
            d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          height="1.4rem"
          v-if="budget.category == 'electronics'"
        >
          <path
            d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8C297 398 352 333.4 352 256V224c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          height="1.4rem"
          v-if="budget.category == 'home necessities'"
        >
          <path
            d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5H336c-19.1 0-36.3 8.4-48 21.7V208c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64V416H112c-26.5 0-48-21.5-48-48V256H32c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304V448H544V304H352zm-48-16c0-17.7 14.3-32 32-32H560c17.7 0 32 14.3 32 32V448h32c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48H544 352 304c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16h32V288z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          height="1.4rem"
          v-if="budget.category == 'home rent'"
        >
          <path
            d="M320.7 352c8.1-89.7 83.5-160 175.3-160c8.9 0 17.6 .7 26.1 1.9L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64l.7 0zM640 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          height="1.4rem"
          v-if="budget.category == 'travel'"
        >
          <path
            d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1.4rem"
          v-if="budget.category == 'others charges'"
        >
          <path
            d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="1.4rem"
          v-if="budget.category == 'Money Received'"
        >
          <path
            d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"
          />
        </svg>
      </div>
      <div class="last-budgets-details">
        <h3 class="last-budgets-category">{{ budget.category }}</h3>
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: `${getPercentageSpent(budget)}%` }"
          ></div>
        </div>
      </div>
      <div class="last-budget-amount">
        <h3>available</h3>
        <h4>{{ availableAmount(budget) }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../main.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      budgets: [],
      isLoaded: false,
    };
  },
  methods: {
    getPercentageSpent(budget) {
      return (budget.spent / budget.amount) * 100;
    },
    availableAmount(budget) {
      return this.formatCurrency(budget.amount - budget.spent);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(value);
    },
    async deleteInvalidBudgets() {
      const auth = getAuth();
      const user = auth.currentUser;

      for (let budget of this.budgets) {
        if (budget.spent >= budget.amount) {
          try {
            // Find the document for the current user
            const q = query(
              collection(database, "users"),
              where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const docSnapshot = querySnapshot.docs[0];
              const userData = docSnapshot.data();

              // Filter out the invalid budget from the user's budget array
              const updatedBudgets = userData.budget.filter(
                (b) => b.budgetid !== budget.budgetid
              );

              // Update the document in Firestore
              await updateDoc(docSnapshot.ref, {
                budget: updatedBudgets,
              });

              // Update the local budgets array
              this.budgets = updatedBudgets;
            }
          } catch (error) {
            console.error("Error deleting invalid budget: ", error);
          }
        }
      }
    },
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    const q = query(
      collection(database, "users"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      await querySnapshot.forEach((docSnapshot) => {
        const userData = docSnapshot.data();
        this.budgets = userData.budget;
      });
    }
    await this.deleteInvalidBudgets();
    this.isLoaded = true;
  },
  computed: {
    hasBudgets() {
      return this.budgets.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
$text-color: #060316;
.all-budgets-title {
  font-size: 1.6rem;
  align-self: flex-start;
  color: $text-color;
  font-weight: 400;
}
.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  height: 5px;
}

.progress {
  height: 100%;
  background-color: #3d61e9;
  transition: width 0.5s ease;
}

.all-budgets-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.budget {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-left: 20px;
  .last-budgets-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    svg {
      fill: $text-color;
      width: 1.4rem;
    }
  }
  .last-budgets-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 50%;
    h3 {
      font-size: 1.2rem;
      color: $text-color;
      font-weight: 300;
      text-transform: capitalize;
      width: 100%;
    }
  }
  .last-budget-amount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    h3 {
      align-self: center;
      text-transform: capitalize;
      font-size: 1.2rem;
      color: $text-color;
      margin: 0;
    }
    h4 {
      align-self: center;
      text-transform: capitalize;
      font-size: 1.2rem;
      color: $text-color;
      margin: 0;
    }
  }
}
.no-transactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px;
  svg {
    fill: red;
  }
  h3 {
    font-size: 1.6rem;
    color: $text-color;
    font-weight: 200;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
