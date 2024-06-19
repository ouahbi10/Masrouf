import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "@/views/HomePage.vue";
import SignUp from "@/views/SignUp.vue";
import SignIn from "@/views/SignIn.vue";
import OverView from "@/views/OverView.vue";
import UseCases from "@/views/UseCases.vue";
import AboutUs from "@/views/AboutUs.vue";
import ContactUs from "@/views/ContactUs.vue";
import DashBoard from "@/components/DashBoard.vue";
import TransAction from "@/components/TransAction.vue";
import OverStatistics from "@/components/OverStatistics.vue";
import OverBudget from "@/components/OverBudget.vue";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "SignIn",
    path: "/signin",
    component: SignIn,
  },
  {
    name: "UseCases",
    path: "/usecases",
    component: UseCases,
  },
  {
    name: "About Us",
    path: "/about",
    component: AboutUs,
  },
  {
    name: "Contact Us",
    path: "/contact",
    component: ContactUs,
  },
  {
    name: "Overview",
    path: "/overview",
    component: OverView,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "",
        component: DashBoard,
      },
      {
        path: "transaction",
        component: TransAction,
      },
      {
        path: "statistics",
        component: OverStatistics,
      },
      {
        path: "budget",
        component: OverBudget,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("sign in to get acces");
      next("/");
    }
  } else {
    next();
  }
});
export default router;
