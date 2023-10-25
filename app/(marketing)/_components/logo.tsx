import Image from "next/image"
import { Poppins } from "next/font/google"

const font = Poppins({
    subsets: ["latin"],
    weight: ["600","600"]
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/logo.svg"
                height="40"
                width="40"
                alt="Logo"
                className="dark:hidden"
            />
            <Image
                src="/logo-dark.svg"
                height="40"
                width="40"
                alt="Logo"
                className="hidden dark:block"
            />
            <p className={`font-semibold ${font.className}`}>
                Jotion
            </p>
        </div>
    )
}