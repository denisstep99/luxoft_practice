import Vue from 'vue'
import VueRouter from 'vue-router'
import Chart from "@/components/Chart/Chart";
import SliderWidget from "../components/SliderWidget";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/temperature'
  },
  {
    path: '/temperature',
    component: Chart,
    props: {type: 'temperature'}
  },
  {
    path: '/humidity',
    component: Chart,
    props: {type: 'humidity'}
  },
  {
    path: '/speed',
    component: Chart,
    props: {type: 'speed'}
  },
  {
    path: '/slider',
    component: SliderWidget,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router
