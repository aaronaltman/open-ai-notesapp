"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function MenuBar() {
  return (
    <Menubar>
      {/* Notes Menu */}
      <MenubarMenu>
        <MenubarTrigger>Notes</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Create Note <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>My Notes</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Import Notes</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* User Profile Menu */}
      <MenubarMenu>
        <MenubarTrigger>Lets take a look at this</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => null}>Sign Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Help Menu */}
      <MenubarMenu>
        <MenubarTrigger>
          <UserButton />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
