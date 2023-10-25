import {Logo} from "./logo"
import { Button } from "@/components/ui/button"
export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background dark:bg-[#1F1F1F] z-50">
          <Logo />
          <div className="w-full flex md:ml-auto justify-between md:justify-end items-center md:gap-x-2 gap-x-0">
              <Button variant="ghost" size="sm">
                  Privacy Policy
              </Button>
              <Button variant="ghost" size="sm">
                 Terms & Conditions
              </Button>
          </div>
        </div>
    )
}