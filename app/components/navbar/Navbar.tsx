import Link from "next/link";
import { Container } from "../Container";
import CartCount from "./CartCount";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { UserMenu } from "./UserMenu";

export default async function Navbar() {
  const currentUser = await getCurrentUser();

  return (
    <nav className="sticky top-0 w-full bg-gray-100 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className=" font-bold text-2xl">
              E-SHOP
            </Link>

            <div className="hidden md:block">search</div>

            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />

              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}
