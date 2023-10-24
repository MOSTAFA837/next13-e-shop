import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export async function RedirectIfAuth() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/cart");
  }
}
