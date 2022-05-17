import { userStore } from "@/store/user";
import { todoStore } from "@/store/todo";
import { documentStore } from "@/store/documents";
import { goalStore } from "@/store/goals";

export default () => {
  const user = userStore();
  const todo = todoStore();
  const documents = documentStore();
  const goals = goalStore();
  return { user, todo, documents, goals };
};
