"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import {
    PiBellDuotone,
    PiBookOpenDuotone,
    PiBroadcastDuotone,
    PiBugBeetleDuotone,
    PiCaretDownBold,
    PiCaretRightBold,
    PiChartPieDuotone,
    PiChatsDuotone,
    PiClockCounterClockwiseDuotone,
    PiFolderDuotone,
    PiHouseDuotone,
    PiIdentificationBadgeDuotone,
    PiIdentificationCardDuotone,
    PiListDuotone,
    PiMoonDuotone,
    PiNotebookDuotone,
    PiSidebarSimpleDuotone,
    PiSunDuotone,
    PiUserPlusDuotone,
    PiUsersDuotone
} from "react-icons/pi";
import { Outlet } from 'react-router-dom';
import logoImg from "../../assets/logo.png";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from '../../lib/utils';
import { Icon } from "../icons";
import { Button } from '../ui/button';


const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={onClick}
        className={cn(
            "w-full justify-start group",
            active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
        )}>
        {active && <div className="w-1 h-4 rounded-full bg-foreground absolute left-0" />}
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </Button>
);


const CollapsibleSidebarItem = ({ icon: Icon, label, active, children, defaultOpen = false, className }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={cn("select-none w-full", className)}>
            <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full justify-start group",
                    active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}>
                <span className="opacity-70 group-hover:opacity-100 transition-opacity text-muted-foreground">
                    {isOpen ? <PiCaretDownBold className="size-3" /> : <PiCaretRightBold className="size-3" />}
                </span>
                {/* Visual marker if parent is active, though usually children determine active state */}
                <Icon />
                <span>{label}</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-5"
                    >
                        <div className="flex flex-col gap-1 py-1 pl-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SubMenuItem = ({ label, active }) => (
    <div className={cn(
        "text-sm px-2 py-1.5 rounded-md cursor-pointer transition-colors",
        active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    )}>
        {label}
    </div>
);

export default function AppShell() {
    const { resolvedTheme, setTheme } = useTheme()
    const isMobile = useMediaQuery("(max-width: 768px)", {
        defaultValue: undefined,
    });
    const [leftPanelOpen, setLeftPanelOpen] = useState(isMobile ? false : true);
    const [rightPanelOpen, setRightPanelOpen] = useState(isMobile ? false : true);
    const rightSidePanelRef = useRef(null);
    const leftSidePanelRef = useRef(null);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    };

    const handleOutsideClick = (event) => {
        if (rightSidePanelRef.current && !rightSidePanelRef.current.contains(event.target)) {
            setRightPanelOpen(false);
        }
        if (leftSidePanelRef.current && !leftSidePanelRef.current.contains(event.target)) {
            setLeftPanelOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        if (isMobile) {
            setLeftPanelOpen(false);
            setRightPanelOpen(false);
        }
    }, [isMobile]);

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">

            <AnimatePresence mode='wait'>
                {leftPanelOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 240, opacity: 1 }} // Reduced width slightly to match design compactness
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className={cn(
                            "fixed left-0 inset-y-0 z-50 bg-sidebar md:left-auto md:relative",
                            "shrink-0 border-r border-border flex flex-col pt-6 pb-4 overflow-y-auto no-scrollbar px-3",
                            leftPanelOpen ? "w-64" : "w-0"
                        )}
                    >
                        <div className="flex items-center gap-3 px-6 mb-8 w-full">
                            <img src={logoImg} className="size-6 rounded-full" alt="ByeWind" />
                            <span className="font-semibold text-base">ByeWind</span>
                            <Button type="button" onClick={() => {
                                setLeftPanelOpen(false)
                                if (isMobile) {
                                    setRightPanelOpen(false)
                                }
                            }} variant='ghost' size='icon' className="ml-auto -mr-3 md:hidden">
                                <PiSidebarSimpleDuotone />
                            </Button>
                        </div>

                        <div className="space-y-6 px-3">
                            <div>
                                <div className="text-xs font-medium text-muted-foreground/70 px-3 mb-2 flex justify-between items-center gap-4">
                                    <span className="text-foreground/80">Favorites</span>
                                    <span className="cursor-pointer hover:text-foreground transition-colors">Recently</span>
                                </div>
                                <div className="space-y-0.5 relative">
                                    <SidebarItem icon={PiListDuotone} label="Overview" />
                                    <SidebarItem icon={PiFolderDuotone} label="Projects" />
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-muted-foreground/70 px-3 mb-2">Dashboards</div>
                                <div className="space-y-0.5 relative">
                                    <SidebarItem icon={PiChartPieDuotone} label="Default" active />
                                    <SidebarItem icon={PiHouseDuotone} label="eCommerce" />
                                    <SidebarItem icon={PiFolderDuotone} label="Projects" />
                                    <SidebarItem icon={PiBookOpenDuotone} label="Online Courses" />
                                </div>
                            </div>

                            <div>
                                <div className="text-xs font-medium text-muted-foreground/70 px-3 mb-2">Pages</div>
                                <div className="space-y-0.5 relative">
                                    <CollapsibleSidebarItem icon={PiIdentificationBadgeDuotone} label="User Profile" defaultOpen={true}>
                                        <SubMenuItem label="Overview" />
                                        <SubMenuItem label="Projects" />
                                        <SubMenuItem label="Campaigns" />
                                        <SubMenuItem label="Documents" />
                                        <SubMenuItem label="Followers" />
                                    </CollapsibleSidebarItem>

                                    <SidebarItem icon={PiIdentificationCardDuotone} label="Account" />
                                    <SidebarItem icon={PiUsersDuotone} label="Corporate" />
                                    <SidebarItem icon={PiNotebookDuotone} label="Blog" />
                                    <SidebarItem icon={PiChatsDuotone} label="Social" />
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>


            <main className="flex-1 flex flex-col min-w-0 bg-background">
                <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm sticky top-0 z-10 @container">
                    <div className="flex items-center gap-4 text-sm">
                        <Button variant='ghost' size='icon' onClick={() => {
                            setLeftPanelOpen(!leftPanelOpen)
                            if (isMobile) {
                                setRightPanelOpen(false)
                            }
                        }} className="text-muted-foreground hover:text-foreground">
                            <PiSidebarSimpleDuotone className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Icon name="star" className="size-4" />
                            <span>Dashboards</span>
                            <span className="text-muted-foreground/40 hidden @xl:block">/</span>
                            <span className="text-foreground font-medium hidden @xl:block">Default</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative hidden @xl:block mr-2">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-secondary/40 border-none rounded-lg pl-3 pr-10 py-1.5 text-sm w-48 focus:ring-1 focus:ring-accent focus:bg-background outline-none transition-all placeholder:text-muted-foreground/60"
                            />
                            <span className="absolute right-2 top-1.5 text-xs text-muted-foreground/60 p-0.5 border border-border rounded bg-background/50">⌘/</span>
                        </div>

                        <Button onClick={toggleTheme} variant='ghost' size='icon' className="text-muted-foreground hover:text-foreground">
                            {resolvedTheme === 'dark' ? <PiSunDuotone className="w-5 h-5" /> : <PiMoonDuotone className="w-5 h-5" />}
                        </Button>
                        <Button variant='ghost' size='icon' className="text-muted-foreground hover:text-foreground">
                            <PiClockCounterClockwiseDuotone className="w-5 h-5" />
                        </Button>
                        <Button variant='ghost' size='icon' className="relative text-muted-foreground hover:text-foreground">
                            <PiBellDuotone className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-background ring-2 ring-background"></span>
                        </Button>
                        <Button
                            onClick={() => {
                                setRightPanelOpen(!rightPanelOpen)
                                if (isMobile) {
                                    setLeftPanelOpen(false)
                                }
                            }}
                            variant='ghost'
                            size='icon'
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <PiSidebarSimpleDuotone className="w-5 h-5 transform scale-x-[-1]" />
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                    <Outlet />
                </div>
            </main>

            <AnimatePresence>
                {rightPanelOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed right-0 inset-y-0 z-50 bg-sidebar md:right-auto md:relative space-y-4",
                            "shrink-0 border-r border-border flex flex-col pt-6 pb-4 overflow-y-auto no-scrollbar px-3",
                            rightPanelOpen ? "w-64" : "w-0"
                        )}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 px-6 w-full">
                                <Button type="button" onClick={() => {
                                    setRightPanelOpen(false)
                                    if (isMobile) {
                                        setLeftPanelOpen(false)
                                    }
                                }} variant='ghost' size='icon' className="-ml-6 md:hidden">
                                    <PiSidebarSimpleDuotone />
                                </Button>
                                <h3 className="font-semibold text-sm">Notifications</h3>
                            </div>
                            <div className="space-y-0">
                                <Button variant='ghost' size='xl' className="justify-start group w-full px-3 text-left">
                                    <div className="size-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                                        <PiBugBeetleDuotone className="size-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs truncate group-hover:text-primary transition-colors">You have a bug that needs...</p>
                                        <span className="text-[10px] text-muted-foreground">Just now</span>
                                    </div>
                                </Button>
                                <Button variant='ghost' size='xl' className="justify-start group w-full px-3 text-left">
                                    <div className="size-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                                        <PiUserPlusDuotone className="size-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs truncate group-hover:text-primary transition-colors">New user registered</p>
                                        <span className="text-[10px] text-muted-foreground">59 minutes ago</span>
                                    </div>
                                </Button>
                                <Button variant='ghost' size='xl' className="justify-start group w-full px-3 text-left">
                                    <div className="size-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                                        <PiBugBeetleDuotone className="size-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs truncate group-hover:text-primary transition-colors">You have a bug that needs...</p>
                                        <span className="text-[10px] text-muted-foreground">12 hours ago</span>
                                    </div>
                                </Button>
                                <Button variant='ghost' size='xl' className="justify-start group w-full px-3 text-left">
                                    <div className="size-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                                        <PiBroadcastDuotone className="size-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs truncate group-hover:text-primary transition-colors">Andi Lane subscribed to you</p>
                                        <span className="text-[10px] text-muted-foreground">Today, 11:59 AM</span>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Activities</h3>
                            <div className="relative space-y-0">
                                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border/60" />
                                {[
                                    { user: '1', text: 'You have a bug that needs...', time: 'Just now' },
                                    { user: '2', text: 'Released a new version', time: '59 minutes ago' },
                                    { user: '3', text: 'Submitted a bug', time: '12 hours ago' },
                                    { user: '4', text: 'Modified A data in Page X', time: 'Today, 11:59 AM' },
                                    { user: '5', text: 'Deleted a page in Project X', time: 'Feb 2, 2023' },
                                ].map((item, i) => (
                                    <Button variant='ghost' key={i} size='xl' className="justify-start group w-full px-3 text-left">
                                        <div className="size-6 rounded-full overflow-hidden shrink-0 ring-2 ring-background bg-secondary">
                                            <img src={`https://i.pravatar.cc/150?u=${item.user}`} alt="User" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <p className="text-xs truncate">{item.text}</p>
                                            <span className="text-[10px] text-muted-foreground">{item.time}</span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Contacts</h3>
                            <div className="space-y-1">
                                {['Natali Craig', 'Drew Cano', 'Orlando Diggs', 'Andi Lane', 'Kate Morrison', 'Koray Okumus'].map((name) => (
                                    <Button key={name} variant='ghost' size='default' className="justify-start group w-full px-3 text-left">
                                        <div className="size-6 rounded-full overflow-hidden shrink-0">
                                            <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-xs font-medium group-hover:text-foreground text-muted-foreground transition-colors">{name}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}