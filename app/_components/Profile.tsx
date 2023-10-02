"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { UserCog } from "lucide-react";

export function AvatarIcon(props: { imageSrc?: string | null }) {
  if (props.imageSrc) {
    return (
      <Avatar>
        <AvatarImage src={props.imageSrc} alt="Profile Picture"></AvatarImage>
      </Avatar>
    );
  } else <div>no avatar</div>;
}

export function ProfileMenu({
  email,
  image,
}: {
  email?: string | null;
  image?: string | null;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant={"link"}>
          <AvatarIcon imageSrc={image}></AvatarIcon>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="pt-6">
        <div className="p-6 mx-2 space-x-4 bg-white border rounded-lg">
          <div>
            
            <p className="text-sm pb-2">{email}</p>
            <p className="text-sm">Settings</p>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
