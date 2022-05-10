import { userStore } from "@/store/user";
import { todoStore } from "@/store/todo";
import { documentStore } from "@/store/documents";

export default () => {
  const user = userStore();
  const todo = todoStore();
  const documents = documentStore();
  return { user, todo, documents };
};
