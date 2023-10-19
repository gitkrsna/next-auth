"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Url } from "next/dist/shared/lib/router/router";

export interface NavMenuItem {
  trigger: string;
  content?: { title: string; href: string; description: string }[] | Url;
}

export function NavMenu({
  defaultValue,
  navMenuItems,
}: {
  defaultValue?: string;
  navMenuItems: NavMenuItem[];
}) {
  return (
    <NavigationMenu orientation="vertical" defaultValue={defaultValue}>
      <NavigationMenuList>
        {(navMenuItems ?? []).map(({ trigger, content }) => {
          return (
            <NavigationMenuItem key={trigger}>
              {Array.isArray(content) ? (
                <>
                  <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-0 left-0 animate-ease duration-250">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {(content ?? []).map(({ title, href, description }) => (
                        <ListItem key={title} title={title} href={href}>
                          {description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={content as Url} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {trigger}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
