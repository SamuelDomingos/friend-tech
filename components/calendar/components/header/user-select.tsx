"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";

export function UserSelect() {
  const { users, selectedUserId, setSelectedUserId } = useCalendar();
  const [open, setOpen] = useState(false);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 md:w-48 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            {selectedUserId === "all" ? (
              <>
                <AvatarGroup>
                  {users.slice(0, 2).map((user) => (
                    <Avatar key={user.id} className="size-5">
                      <AvatarImage src={user.avatar ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <span>Todos</span>
              </>
            ) : (
              <>
                <Avatar className="size-5">
                  <AvatarImage src={selectedUser?.avatar ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {selectedUser?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{selectedUser?.name}</span>
              </>
            )}
          </div>
          <ChevronsUpDown size={14} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end">
        <ScrollArea className="max-h-64">
          <div className="flex flex-col gap-0.5">
            <Button
              type="button"
              variant="ghost"
              className="justify-start gap-2 px-2"
              onClick={() => { setSelectedUserId("all"); setOpen(false); }}
            >
              <AvatarGroup>
                {users.slice(0, 2).map((user) => (
                  <Avatar key={user.id} className="size-5">
                    <AvatarImage src={user.avatar ?? undefined} />
                    <AvatarFallback className="text-xs">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span className="flex-1 truncate text-left">Todos</span>
              <Check
                size={14}
                className={cn(selectedUserId === "all" ? "opacity-100" : "opacity-0")}
              />
            </Button>

            {users.map((user) => (
              <Button
                key={user.id}
                type="button"
                variant="ghost"
                className="justify-start gap-2 px-2"
                onClick={() => { setSelectedUserId(user.id); setOpen(false); }}
              >
                <Avatar className="size-5">
                  <AvatarImage src={user.avatar ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-left">{user.name}</span>
                <Check
                  size={14}
                  className={cn(selectedUserId === user.id ? "opacity-100" : "opacity-0")}
                />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
