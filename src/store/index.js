import { userStore } from "@/store/user";

export default () => {
  const user = userStore();
  return { user };
};
