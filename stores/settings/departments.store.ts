import { defineStore } from "pinia";
import { departmentsService } from "~/services";

import {
  Department,
  QueryDepartments,
} from "~/interfaces/settings/departments.interface";

type DepartmentsState = {
  total: number;
  departments: Department[];
};

export const useDepartmentsStore = defineStore("departments", {
  persist: true,
  state(): DepartmentsState {
    return {
      total: 0,
      departments: [],
    };
  },
  actions: {
    async getDepartments(queries: QueryDepartments) {
      try {
        const { departments, total } =
          await departmentsService.getDepartments(queries);
        this.departments = departments;
        this.total = total;
      } catch (error) {
        return error as Error;
      }
    },
    async saveDepartments(department: Department) {
      try {
        const { departments, total } =
          await departmentsService.saveDepartments(department);
        this.departments = departments;
        this.total = total;
      } catch (error) {
        return error as Error;
      }
    },
    async deleteDepartments(department: Department) {
      try {
        await departmentsService.deleteDepartments(department);
      } catch (err) {
        return err as Error;
      }
    },
  },
});
