import { redirect } from "next/navigation";

export default function AddBrandsRedirect() {
  redirect("/admin/brands/add_brands");
}
