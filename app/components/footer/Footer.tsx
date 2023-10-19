import Link from "next/link";
import { Container } from "../Container";
import { FooterList } from "./FooterList";

export default function Footer() {
  return (
    <footer className=" bg-black text-white/80 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className=" text-base font-bold">Shop Categories</h3>

            <Link href="#">Phone</Link>
            <Link href="#">Laptop</Link>
            <Link href="#">Desktop</Link>
            <Link href="#">Watch</Link>
            <Link href="#">TV</Link>
          </FooterList>

          <FooterList>
            <h3 className=" text-base font-bold">CORPORATE INFO</h3>

            <Link href="#">Services</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>

          <FooterList>
            <h3 className=" text-base font-bold">CUSTOMER SERVICE</h3>

            <Link href="#">FAQs</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Connect Via WhatsApp</Link>
            <Link href="#">Sitemap</Link>
            <Link href="#">Stores</Link>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
