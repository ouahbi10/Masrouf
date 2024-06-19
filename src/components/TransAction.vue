<template>
  <div class="transaction">
    <Transition name="slide-fade">
      <div class="add-message" v-if="showTransactionMsg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="5rem"
        >
          <path
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
          />
        </svg>
        <h3>Transaction Added Successfully!</h3>
      </div>
    </Transition>
    <h1 class="transaction-heading">Transactions</h1>
    <div class="transaction-container">
      <h1 class="add-transaction-heading">Add Transaction</h1>
      <div class="transaction-form">
        <div class="transaction-input">
          <h3>Transaction Name :</h3>
          <input
            type="text"
            placeholder="Transaction Name"
            v-model="transaction.name"
          />
        </div>
        <div class="transaction-input">
          <h3>amount :</h3>
          <input
            type="text"
            placeholder="Amount"
            v-model="transaction.amount"
          />
        </div>
        <div class="transaction-input">
          <h3>Category :</h3>
          <select class="category-input" v-model="transaction.category">
            <option value="" disabled selected>Select a category</option>
            <option>food</option>
            <option>electronics</option>
            <option>home necessities</option>
            <option>home rent</option>
            <option>travel</option>
            <option>others charges</option>
            <option>Money Received</option>
          </select>
        </div>
        <div class="transaction-input">
          <h3>Type :</h3>
          <select class="type-input" v-model="transaction.type">
            <option value="" disabled selected>Select a type</option>
            <option>income</option>
            <option>expense</option>
          </select>
        </div>
      </div>
      <Transition name="slide-fade">
        <div class="inputs-fill" v-if="ErrorMessage.showError">
          <h3>{{ alertHandle() }}</h3>
        </div>
      </Transition>
      <button class="btn btn-primary mt-lg-3" @click="addTransaction">
        Add Transaction
      </button>
    </div>
    <div class="all-transactions">
      <h1 class="add-transaction-heading">All Transactions</h1>
      <AllTransactions />
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
import AllTransactions from "@/components/AllTransactions.vue";
export default {
  components: {
    AllTransactions,
  },
  data() {
    return {
      transaction: {
        name: "",
        amount: 0,
        category: "",
        type: "",
      },
      showTransactionMsg: false,
      ErrorMessage: {
        value: "",
        showError: false,
      },
    };
  },
  methods: {
    addTransactionToBalance(transaction) {
      if (transaction.type == "expense") {
        return -parseFloat(transaction.amount);
      } else {
        return parseFloat(transaction.amount);
      }
    },

    negativeAmount(amount) {
      if (typeof amount !== "number" || isNaN(amount)) {
        return false;
      } else if (amount < 0) {
        return false;
      } else {
        return true;
      }
    },
    transactionMessage() {
      this.showTransactionMsg = true;
      setTimeout(() => {
        this.showTransactionMsg = false;
      }, 1000);
    },
    async addTransaction() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (
        !this.transaction.amount ||
        !this.transaction.name ||
        !this.transaction.category ||
        !this.transaction.type
      ) {
        this.ErrorMessage.value = "inputs_not_filled";
        this.ErrorMessage.showError = true;
        return;
      }

      const parsedAmount = parseFloat(this.transaction.amount);

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
            if (
              this.transaction.type == "expense" &&
              this.transaction.amount > userBalance
            ) {
              this.ErrorMessage.value = "insufficient_balance";
              this.ErrorMessage.showError = true;
              return;
            }
            const updatedBalance =
              userData.balance + this.addTransactionToBalance(this.transaction);
            const userBudget = userData.budget || [];
            const updatedBudget = userBudget.map((budget) => {
              if (
                budget.category === this.transaction.category &&
                this.transaction.type == "expense"
              ) {
                return {
                  ...budget,
                  spent: budget.spent + parsedAmount,
                };
              }
              return budget;
            });
            await updateDoc(docSnapshot.ref, {
              transactions: arrayUnion({
                transactionid: uuidv4(),
                name: this.transaction.name,
                amount: parsedAmount,
                category: this.transaction.category,
                type: this.transaction.type,
                date: new Date(),
              }),
              balance: updatedBalance,
              budget: updatedBudget,
            });
            await this.transactionMessage();
          });
        }
        this.transaction = await {
          name: "",
          amount: "",
          category: "",
          type: "",
        };
        this.AllInputsFilled = true;
        this.negativeAmoutValue = false;
      } catch (error) {
        alert(error.message);
      }
    },
    alertHandle() {
      if (this.ErrorMessage.value == "negative_amount") {
        return "Please enter a valid amount";
      } else if (this.ErrorMessage.value == "inputs_not_filled") {
        return "Please fill in all fields";
      } else if (this.ErrorMessage.value == "insufficient_balance") {
        return "Your Balance is Insufficient";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$text-color: #060316;
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
.transaction {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}
.transaction .add-message {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  background-color: #4bb543;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  width: 70%;
  svg {
    fill: #fff;
    margin: 20px 0;
  }
  h3 {
    color: #fff;
    font-size: 1.2rem;
  }
}
.all-transactions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #fafafa;
  padding: 20px;
  width: 100%;
}
.transaction-heading {
  align-self: center;
  font-size: 2rem;
  font-weight: 200;
  color: $text-color;
  text-transform: uppercase;
  padding: 20px 0;
}
.transaction-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  width: 100%;
}
.transaction-container .transaction-form {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.transaction-container .transaction-form .transaction-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
}
.transaction-container .transaction-form .transaction-input h3 {
  font-size: 1rem;
  font: 200;
  color: $text-color;
  padding: 0 10px;
  margin: 0;
  text-transform: capitalize;
}
.transaction-container .transaction-form .transaction-input input[type="text"] {
  background-color: #e9e9e9;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: $text-color;
  transition: 0.4s ease-in-out;
}
.transaction-container
  .transaction-form
  .transaction-input
  input[type="text"]:focus {
  outline: none;
  border-color: #a2a2a2;
}
.transaction-container .transaction-form .transaction-input select {
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
.transaction-container .transaction-form .transaction-input select:focus {
  outline: none;
  border-color: #a2a2a2;
  box-shadow: 0 0 5px rgba(81, 167, 232, 0.5);
}
.add-transaction-heading {
  color: $text-color;
  font-size: 2rem;
  font-weight: bold;
}

.btn {
  align-self: center;
}
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
  .transaction-container .transaction-form .transaction-input {
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
