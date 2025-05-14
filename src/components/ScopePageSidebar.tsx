
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

interface ScopePageSidebarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ScopePageSidebar = ({
  categories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery
}: ScopePageSidebarProps) => {
  const { open, isMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);

  // This prevents hydration errors with client-side rendering of the sidebar
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar
      className={open ? "w-64" : "w-16"}
      variant="sidebar"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent className="px-1">
            {open && (
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
                <Input 
                  placeholder="Search services..." 
                  className="pl-8 text-sm h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup defaultOpen>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton
                    isActive={category === activeCategory}
                    onClick={() => setActiveCategory(category)}
                    tooltip={category}
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    {open && <span>{category}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
