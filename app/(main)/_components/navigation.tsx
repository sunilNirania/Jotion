"use client"

import { ChevronsLeft, MenuIcon,PlusCircle, Search, Settings,Plus, Trash} from "lucide-react";
import { useRef,ElementRef,useState, use} from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { UserItems } from "./user-items";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import {Popover,PopoverTrigger,PopoverContent} from "@/components/ui/popover"
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";

export const Navigation = () => {

    const pathname = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")
    const create = useMutation(api.documents.create)
    const search = useSearch();
    const settings = useSettings();

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null) 
    const [isReseting, setIsReseting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX
        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if(sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if(sidebarRef.current && navbarRef.current) {
           setIsCollapsed(false)
           setIsReseting(true)

           sidebarRef.current.style.width = isMobile ? "100%" : "240px"
           navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)")
           navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
        }

        setTimeout(() => setIsReseting(false), 300)
    }

    const collapse = () => {
        if(sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsReseting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")

            setTimeout(() => setIsReseting(false), 300)
        }
    }

    const handleCreate = () => {
        const promise = create({title:"untitled"})

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "new note created!",
            error: "Error!"
        })
    }
    return ( 
        <>
            <aside
                ref={sidebarRef}
                className={`group/sidebar h-full bg-secondary w-60 overflow-y-auto relative 
                flex flex-col z-[99999] ${isReseting && `transition-all ease-in-out  duration-300`}
                ${isMobile && `w-0`}`} 
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={`h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300
                    dark:hover:bg-neutral-700 absolute top-3 right-4 
                    opacity-0 group-hover/sidebar:opacity-100 transition ${isMobile && `opacity-100`}`}
                >
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItems/>
                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item
                        label="Setting"
                        icon={Settings} 
                        onClick={settings.onOpen}
                    />
                    <Item
                        label="New Page"
                        icon={PlusCircle}
                        onClick={handleCreate}
                    />
                </div>
                <div className="mt-4">
                   <DocumentList/>
                   <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label="Add a new Page"
                   />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item
                                icon={Trash}
                                label="Trash"
                            />
                        </PopoverTrigger>
                        <PopoverContent 
                            side={isMobile? "bottom":"right"}
                            className="p-0 w-72"
                        >
                            <TrashBox/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div 
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute
                    h-full w-1 bg-primary/10 right-0 top-0" 
                />
            </aside>
            <div
                ref={navbarRef}
                className={`absolute top-0 left-60 z-[99999] w-[calc(100%-240px)] ${isReseting && `transition-all ease-in-out duration-300`}
                ${isMobile && `left-0 w-full`}`}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground"/>}
                </nav>
            </div>
        </>
     );
}
 
