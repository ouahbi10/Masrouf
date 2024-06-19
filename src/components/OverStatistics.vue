<template>
  <div class="stats-page">
    <h1 class="stats-page-title">Statistics</h1>
    <div class="chart-income-expense">
      <h3 class="chart-title">Income vs Expense</h3>
      <line-chart v-if="isLoaded" :data="incomeExpenseData" />
    </div>
    <div class="chart-pie">
      <h3 class="chart-title">Expenses by Category</h3>
      <div class="pie-chart-container">
        <pie-chart v-if="isLoaded" :data="expensesCategoryData" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

import { database } from "../main.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  components: {
    LineChart: Line,
    PieChart: Pie,
  },
  data() {
    return {
      transactions: [],
      incomeExpenseData: {},
      expensesCategoryData: {},
      isLoaded: false,
    };
  },
  methods: {
    async fetchData() {
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
          if (userData.transactions) {
            this.transactions = userData.transactions.map((transaction) => {
              if (transaction.date && transaction.date.toDate) {
                transaction.date = transaction.date.toDate();
              } else if (
                typeof transaction.date === "string" ||
                typeof transaction.date === "number"
              ) {
                transaction.date = new Date(transaction.date);
              }
              return transaction;
            });
          } else {
            this.transactions = [];
          }
          this.prepareChartData();
          this.prepareCategoryData();
        });
      }
      this.isLoaded = true;
    },
    prepareChartData() {
      const incomeExpenseByDate = this.transactions.reduce(
        (acc, transaction) => {
          const date = transaction.date.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
          if (!acc[date]) {
            acc[date] = { income: 0, expenses: 0 };
          }
          if (transaction.type === "income") {
            acc[date].income += transaction.amount;
          } else if (transaction.type === "expense") {
            acc[date].expenses += transaction.amount;
          }
          return acc;
        },
        {}
      );
      const labels = Object.keys(incomeExpenseByDate).sort();
      const incomeData = labels.map(
        (label) => incomeExpenseByDate[label].income
      );
      const expenseData = labels.map(
        (label) => incomeExpenseByDate[label].expenses
      );

      this.incomeExpenseData = {
        labels,
        datasets: [
          {
            label: "Income",
            backgroundColor: "green",
            borderColor: "green",
            fill: false,
            data: incomeData,
          },
          {
            label: "Expenses",
            backgroundColor: "red",
            borderColor: "red",
            fill: false,
            data: expenseData,
          },
        ],
      };
    },
    prepareCategoryData() {
      const expensesByCategory = this.transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === "expense") {
            if (!acc[transaction.category]) {
              acc[transaction.category] = 0;
            }
            acc[transaction.category] += transaction.amount;
          }
          return acc;
        },
        {}
      );

      const labels = Object.keys(expensesByCategory);
      const data = labels.map((label) => expensesByCategory[label]);

      this.expensesCategoryData = {
        labels,
        datasets: [
          {
            label: "Expenses by Category",
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
            data,
          },
        ],
      };
    },
    formatDate(date) {
      if (!(date instanceof Date)) {
        date = new Date(date);
      }
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
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(amount);
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
$text-color: #060316;
.stats-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  padding: 20px;
}
.stats-page-title {
  font-size: 2.5rem;
  font-weight: 100;
  color: $text-color;
  text-transform: uppercase;
}
.chart-income-expense,
.chart-pie {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.chart-title {
  font-size: 1.5rem;
  font-weight: 200;
  color: $text-color;
  align-self: flex-start;
  margin: 20px 0;
  text-transform: uppercase;
}
.chart-pie .pie-chart-container {
  width: 70%;
}
</style>
