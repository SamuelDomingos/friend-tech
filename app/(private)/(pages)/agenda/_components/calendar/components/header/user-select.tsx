"use client";

import { SearchIcon, UserIcon } from "lucide-react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { useCalendar } from "@/app/(private)/(pages)/agenda/_components/calendar/contexts/calendar-context";

export function UserSelect() {
  const { users, selectedUserId, setSelectedUserId } = useCalendar();

  const items = ["all", ...users.map((user) => user.id)];

  const itemToStringLabel = (id: string) => {
    if (id === "all") return "Todos";
    return users.find((user) => user.id === id)?.name ?? "";
  };

  return (
    <Combobox
      items={items}
      value={selectedUserId}
      onValueChange={(value) => setSelectedUserId(value ?? "all")}
      itemToStringLabel={itemToStringLabel}
    >
      <ComboboxInput
        placeholder="Buscar profissional"
        className="flex-1 md:w-48"
      >
        <InputGroupAddon>
          <SearchIcon className="size-4" />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent align="end" className="w-80">
        <ComboboxEmpty>Nenhum profissional encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(id: string) =>
            id === "all" ? (
              <ComboboxItem key={id} value={id}>
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
                Todos
              </ComboboxItem>
            ) : (
              (() => {
                const user = users.find((u) => u.id === id);
                return (
                  <ComboboxItem key={id} value={id}>
                    <Avatar className="size-5">
                      <AvatarImage src={user?.avatar ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {user?.name[0] ?? <UserIcon className="size-3" />}
                      </AvatarFallback>
                    </Avatar>
                    {user?.name}
                  </ComboboxItem>
                );
              })()
            )
          }
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
