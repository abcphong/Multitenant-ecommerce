
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { generateTenantURL } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";



interface Props {
    slug: string;
}
export const Navbar = ({slug}: Props) => {

    return(
        <nav className= "h-20 border-b font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <p className="text-xl">Checkout</p>

                <Button
                    variant="elavated"
                    asChild
                >
                    <Link href={generateTenantURL(slug)}>
                    Continue Shopping
                    </Link>
                    </Button>
            </div>
        </nav>
    )
};


