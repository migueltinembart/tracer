import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NavBarAvatar() {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <span className="text-md">Profile</span>
          <p></p>
          <p>Logout</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
