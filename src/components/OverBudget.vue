<template>
  <div class="budget">
    <h1 class="budget__title">Budget</h1>
    <div class="budget__container">
      <div class="transaction-form">
        <div class="transaction-input">
          <h3>amount :</h3>
          <input type="text" placeholder="Amount" v-model="budget.amount" />
        </div>
        <div class="transaction-input">
          <h3>Category :</h3>
          <select class="category-input" v-model="budget.category">
            <option value="" disabled selected>Select a category</option>
            <option>food</option>
            <option>electronics</option>
            <option>home necessities</option>
            <option>home rent</option>
            <option>travel</option>
            <option>others charges</option>
          </select>
        </div>
      </div>
      <Transition name="slide-fade">
        <div class="inputs-fill" v-if="ErrorMessage.showError">
          <h3>{{ alertHandle() }}</h3>
        </div>
      </Transition>
      <button class="btn btn-primary align-self-center mt-3" @click="addBudget">
        Add Budget
      </button>
    </div>
    <div class="all-budgets">
      <AllBudgetsVue />
    </div>
  </div>
</template>

<script>
import { database } from "../main.js";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import AllBudgetsVue from "./AllBudgets.vue";
export default {
  components: {
    AllBudgetsVue,
  },
  data() {
    return {
      budget: {
        amount: 0,
        category: "",
      },
      ErrorMessage: {
        value: "",
        showError: false,
      },
    };
  },
  methods: {
    negativeAmount(amount) {
      if (typeof amount !== "number" || isNaN(amount)) {
        return false;
      } else if (amount < 0) {
        return false;
      } else {
        return true;
      }
    },
    async addBudget() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!this.budget.amount || !this.budget.category) {
        this.ErrorMessage.value = "inputs_not_filled";
        this.ErrorMessage.showError = true;
        return;
      }
      const parsedAmount = parseFloat(this.budget.amount);
      if (!this.negativeAmount(parsedAmount)) {
        this.ErrorMessage.value = "negative_amount";
        this.ErrorMessage.showError = true;
        return;
      }
      try {
        const q = query(
          collection(database, "users"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            const userData = docSnapshot.data();
            const userBalance = userData.balance;
            const userBudget = userData.budget || [];
            const totalBudget = userBudget.reduce(
              (sum, budget) => sum + budget.amount,
              0
            );
            if (this.OutOfBudgetCheck(totalBudget, parsedAmount, userBalance)) {
              this.ErrorMessage.value = "out_of_budget";
              this.ErrorMessage.showError = true;
              return;
            }
            const existingBudget = userBudget.find(
              (budget) => budget.category === this.budget.category
            );
            if (existingBudget) {
              // Update the existing budget
              const updatedBudgets = userBudget.map((budget) =>
                budget.category === this.budget.category
                  ? { ...budget, amount: budget.amount + parsedAmount }
                  : budget
              );

              await updateDoc(docSnapshot.ref, {
                budget: updatedBudgets,
              });
            } else {
              // Add new budget
              await updateDoc(docSnapshot.ref, {
                budget: arrayUnion({
                  budgetid: uuidv4(),
                  category: this.budget.category,
                  amount: parsedAmount,
                  date: new Date(),
                  spent: 0,
                }),
              });
            }
          });
          this.budget = {
            name: "",
            amount: "",
          };
        }
      } catch (error) {
        alert(error.message);
      }
    },
    OutOfBudgetCheck(totalBudget, newBudgetAmount, balance) {
      return totalBudget + newBudgetAmount > balance;
    },
    alertHandle() {
      if (this.ErrorMessage.value == "negative_amount") {
        return "Please enter a valid amount";
      } else if (this.ErrorMessage.value == "inputs_not_filled") {
        return "Please fill in all fields";
      } else if (this.ErrorMessage.value == "out_of_budget") {
        return "You are out of budget";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$text-color: #060316;
.budget {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  background-color: #fafafa;
}
.budget__title {
  font-size: 3rem;
  font-weight: 300;
  color: $text-color;
  text-transform: uppercase;
}
.budget__container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  width: 100%;
}
.budget__container .transaction-form {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.budget__container .transaction-form .transaction-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
}
.budget__container .transaction-form .transaction-input h3 {
  font-size: 1rem;
  font: 200;
  color: $text-color;
  padding: 0 10px;
  margin: 0;
  text-transform: capitalize;
}
.budget__container .transaction-form .transaction-input input[type="text"] {
  background-color: #e9e9e9;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: $text-color;
  transition: 0.4s ease-in-out;
}
.budget__container
  .transaction-form
  .transaction-input
  input[type="text"]:focus {
  outline: none;
  border-color: #a2a2a2;
}
.budget__container .transaction-form .transaction-input select {
  appearance: none;
  // Additional resets for further consistency
  background-color: #e9e9e9;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0;
  width: 60%;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  color: $text-color;
  border: 1px solid transparent;
  transition: 0.4s ease-in-out;
  text-transform: capitalize;
}
.budget-container .transaction-form .transaction-input select:focus {
  outline: none;
  border-color: #a2a2a2;
  box-shadow: 0 0 5px rgba(81, 167, 232, 0.5);
}

.inputs-fill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  background-color: rgb(249, 151, 151);
  border-radius: 5px;
  margin: 10px 0;
  h3 {
    color: rgb(148, 0, 0);
    font-size: 1.2rem;
    font-weight: 100;
    margin: 0;
  }
}
.all-budgets {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
}
// slide Transition
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
@media screen and (max-width: 992px) {
  .budget__container .transaction-form .transaction-input {
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin: 20px 0;
    }
    input,
    select {
      width: 100%;
    }
  }
}
</style>
