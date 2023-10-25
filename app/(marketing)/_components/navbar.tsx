"use client"
import { UseScrollTop } from "@/hooks/use-scroll-top"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "./logo"
import {useConvexAuth} from "convex/react"
import {SignInButton,UserButton} from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import Link from "next/link"


export const Navbar = () => {
    
    const {isAuthenticated,isLoading} = useConvexAuth()
    const scrolled = UseScrollTop()

    return (
        <div className={`z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 ${scrolled && `border-bottom shadow-md`}`}>
            <Logo />
            <div className="md:ml-auto w-full flex justify-between md:justify-end items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">Log In</Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">Get Jotion Free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">
                                Enter Jotion
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                    </>
                )}
                <ModeToggle/>
            </div>
        </div>
    )
}