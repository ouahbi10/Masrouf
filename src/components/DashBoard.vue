<template>
  <div class="dashboard">
    <h3 class="dashboard-heading">Overview</h3>
    <p class="dashboard-quote">Monitor how your finances are working</p>
    <Transition>
      <div v-if="isLoaded" class="dashboard-container">
        <select class="category-input" v-model="transactionDuration">
          <option value="all time" selected>All Time</option>
          <option value="month">This Month</option>
          <option value="day">This Day</option>
        </select>
        <div class="dashboard-cards">
          <div class="dashboard-card">
            <div class="dashboard-cart-heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                height="1.4rem"
              >
                <path
                  d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"
                />
              </svg>
              <h4>Income</h4>
            </div>
            <h2>{{ formattedTotalIncome }}</h2>
          </div>
          <div class="dashboard-card">
            <div class="dashboard-cart-heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                height="1.4rem"
              >
                <path
                  d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"
                />
              </svg>
              <h4>Expenses</h4>
            </div>
            <h2>{{ formattedTotalExpense }}</h2>
          </div>
        </div>
        <div class="last-transactions">
          <div class="dashboard-transaction-heading">
            <h3 class="dashboard-heading">Last Transactions</h3>
            <router-link to="/overview/transaction">See All</router-link>
          </div>
          <div class="no-transactions" v-if="!hasTransactions">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              height="4rem"
            >
              <path
                d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"
              />
            </svg>
            <h3>You Have No Transactions</h3>
          </div>
          <div class="last-transactions-cards" v-if="hasTransactions">
            <div
              class="last-transactions-card"
              v-for="transaction in threeTransactions"
              :key="transaction.transactionid"
            >
              <div class="last-transactions-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="2rem"
                  v-if="transaction.category == 'food'"
                >
                  <path
                    d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  height="2rem"
                  v-if="transaction.category == 'electronics'"
                >
                  <path
                    d="M96 0C78.3 0 64 14.3 64 32v96h64V32c0-17.7-14.3-32-32-32zM288 0c-17.7 0-32 14.3-32 32v96h64V32c0-17.7-14.3-32-32-32zM32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c0 77.4 55 142 128 156.8V480c0 17.7 14.3 32 32 32s32-14.3 32-32V412.8C297 398 352 333.4 352 256V224c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  height="2rem"
                  v-if="transaction.category == 'home necessities'"
                >
                  <path
                    d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5H336c-19.1 0-36.3 8.4-48 21.7V208c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64V416H112c-26.5 0-48-21.5-48-48V256H32c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304V448H544V304H352zm-48-16c0-17.7 14.3-32 32-32H560c17.7 0 32 14.3 32 32V448h32c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48H544 352 304c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16h32V288z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  height="2rem"
                  v-if="transaction.category == 'home rent'"
                >
                  <path
                    d="M320.7 352c8.1-89.7 83.5-160 175.3-160c8.9 0 17.6 .7 26.1 1.9L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64l.7 0zM640 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  height="2rem"
                  v-if="transaction.category == 'travel'"
                >
                  <path
                    d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="2rem"
                  v-if="transaction.category == 'others charges'"
                >
                  <path
                    d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="2rem"
                  v-if="transaction.category == 'Money Received'"
                >
                  <path
                    d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"
                  />
                </svg>
              </div>
              <div class="last-transactions-details">
                <h3 class="last-transactions-category">
                  {{ transaction.category }}
                </h3>
                <h3 class="last-transactions-name">{{ transaction.name }}</h3>
              </div>
              <div class="last-transactions-date">
                {{ formatDate(transaction.date) }}
              </div>
              <div class="last-transactions-amount">
                <h3
                  v-if="transaction.type == 'expense'"
                  class="expense-transaction"
                >
                  {{ formatAmount(transaction) }}
                </h3>
                <h3
                  v-if="transaction.type == 'income'"
                  class="income-transaction"
                >
                  {{ formatAmount(transaction) }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { database } from "../main.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
export default {
  data() {
    return {
      transactions: [],
      transactionDuration: "all time",
      isLoaded: false,
      threeTransactions: [],
    };
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
        this.transactions = userData.transactions.map((transaction) => {
          // Convert Firestore Timestamp to JavaScript Date
          if (transaction.date && transaction.date.toDate) {
            transaction.date = transaction.date.toDate();
          }
          return transaction;
        });
      });
    }
    this.threeTransactions = await this.lastThreeTransactions();
    this.isLoaded = true;
  },
  computed: {
    hasTransactions() {
      return this.transactions.length > 0;
    },
    TotalExpense() {
      let total = 0;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const currentDay = currentDate.getDate();
      this.transactions.forEach((transaction) => {
        const transactionDate = transaction.date;
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();
        const transactionDay = transactionDate.getDate();
        if (
          transaction.type == "expense" &&
          (this.transactionDuration == "all time" ||
            (this.transactionDuration == "month" &&
              transactionMonth == currentMonth &&
              transactionYear == currentYear) ||
            (this.transactionDuration == "day" &&
              transactionDay == currentDay &&
              transactionMonth == currentMonth &&
              transactionYear == currentYear))
        ) {
          total += transaction.amount;
        }
      });
      return total;
    },
    TotalIncome() {
      let total = 0;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const currentDay = currentDate.getDate();
      this.transactions.forEach((transaction) => {
        const transactionDate = transaction.date;
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();
        const transactionDay = transactionDate.getDate();
        if (
          transaction.type == "income" &&
          (this.transactionDuration == "all time" ||
            (this.transactionDuration == "month" &&
              transactionMonth == currentMonth &&
              transactionYear == currentYear) ||
            (this.transactionDuration == "day" &&
              transactionDay == currentDay &&
              transactionMonth == currentMonth &&
              transactionYear == currentYear))
        ) {
          total += transaction.amount;
        }
      });
      return total;
    },
    formattedTotalExpense() {
      return this.formatCurrency(this.TotalExpense);
    },
    formattedTotalIncome() {
      return this.formatCurrency(this.TotalIncome);
    },
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
    formatAmount(transaction) {
      if (transaction.type == "expense") {
        return `-${this.formatCurrency(transaction.amount)}`;
      } else {
        return this.formatCurrency(transaction.amount);
      }
    },
    lastThreeTransactions() {
      return this.transactions
        .slice()
        .sort((a, b) => b.date - a.date)
        .slice(0, 3);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(value);
    },
  },
};
</script>

<style lang="scss" scoped>
$text-color: #060316;
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fafafa;
  padding: 0 20px;
  padding-top: 20px;
  height: 100%;
}
.dashboard .dashboard-heading {
  align-self: flex-start;
  font-size: 1.6rem;
  color: $text-color;
  font-weight: bold;
  margin: 0;
}
.dashboard .dashboard-quote {
  align-self: flex-start;
  font-size: 1rem;
  color: #a2a2a2;
  font-weight: 200;
}

.dashboard-transaction-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  a {
    text-decoration: none;
    color: $text-color;
    font-size: 1rem;
    font-weight: 300;
    transition: 0.4s ease-in-out;
  }
  a:hover {
    scale: 1.02;
    transform: translateX(-10px);
  }
}
.dashboard .dashboard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.dashboard .dashboard-container .dashboard-cards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px 0;
}

.dashboard .dashboard-container .dashboard-cards .dashboard-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 45%;
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 0 5px rgba(175, 175, 175, 0.5);
}
.dashboard
  .dashboard-container
  .dashboard-cards
  .dashboard-card
  .dashboard-cart-heading {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  h4 {
    margin: 0;
    font-size: 1.4rem;
    color: #a2a2a2;
    font-weight: 200;
    padding: 0 10px;
  }
}

.dashboard-card:first-of-type .dashboard-cart-heading {
  svg {
    fill: green;
  }
}
.dashboard-card:last-of-type .dashboard-cart-heading {
  svg {
    fill: red;
  }
}

.dashboard .dashboard-container .dashboard-cards .dashboard-card h2 {
  font-size: 2.5rem;
  color: $text-color;
  padding-top: 10px;
}
.category-input {
  appearance: none;
  // Additional resets for further consistency
  background-color: #e9e9e9;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0;
  width: 60%;
  align-self: flex-start;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  color: $text-color;
  border: 1px solid transparent;
  transition: 0.4s ease-in-out;
  text-transform: capitalize;
}
.category-input:focus {
  outline: none;
  border-color: #a2a2a2;
  box-shadow: 0 0 5px rgba(81, 167, 232, 0.5);
}

.dashboard .last-transactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
}
.dashboard .last-transactions .last-transactions-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
}
.dashboard .last-transactions .last-transactions-cards .last-transactions-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 15px 0;
  .last-transactions-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 20px;
    background-color: #f7f7f7;
    border: 1px solid #a2a2a2;
    margin-right: 10px;
    width: 10%;
    svg {
      fill: $text-color;
      height: 2rem;
    }
  }
  .last-transactions-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 40%;
    h3:first-of-type {
      font-size: 1.2rem;
      color: $text-color;
      font-weight: bold;
      margin: 0;
      text-transform: capitalize;
    }
    h3:last-of-type {
      font-size: 1rem;
      color: #a2a2a2;
      font-weight: 200;
      margin: 0;
      text-transform: capitalize;
    }
  }
  .last-transactions-date {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a2a2a2;
  }
  .last-transactions-amount {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      font-size: 1rem;
      font-weight: 600;
    }
    .expense-transaction {
      color: rgba($color: red, $alpha: 0.8);
    }
    .income-transaction {
      color: rgba($color: green, $alpha: 0.8);
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
@media screen and (max-width: 1044px) {
  .dashboard .dashboard-container .dashboard-cards .dashboard-card h2 {
    font-size: 1.6rem;
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
