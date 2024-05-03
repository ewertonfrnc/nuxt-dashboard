import type { Component } from "vue";

export type Tabs = {
  label: string;
  icon: string;
  component: Component;
};

export type TabMenu = {
  label: string;
  icon: string;
  route: string;
};
