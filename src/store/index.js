import { userStore } from "@/store/user";
import { todoStore } from "@/store/todo";

export default () => {
  const user = userStore();
  const todo = todoStore();
  return { user, todo };
};
