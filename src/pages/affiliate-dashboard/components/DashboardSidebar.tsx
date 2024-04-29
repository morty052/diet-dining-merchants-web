import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Package2, Home, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarLink = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Dashboard</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Dashboard</TooltipContent>
    </Tooltip>
  );
};

export function DashBoardSidebar() {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden  w-20 lg:w-60 flex-col border-r border-lightBlack bg-transparent sm:flex">
        <nav className="flex flex-col gap-4 px-2 sm:py-5">
          <Link
            to="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <SidebarLink />
        </nav>
        <nav className="mt-auto flex flex-col  gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
