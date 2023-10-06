"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function AvatarIcon({ src }: { src?: string | null }) {
  if (src) {
    return (
      <Avatar>
        <AvatarImage src={src} alt="Profile Picture"></AvatarImage>
      </Avatar>
    );
  } else <div>no avatar</div>;
}

export function ProfileMenu({
  className,
  name,
  email,
  image,
}: {
  className?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) {
  return (
    <div className={"flex justify-end"}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant={"link"}>
            <AvatarIcon src={image}></AvatarIcon>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="bg-none p-4 w-[500]">
          <div className=" flex justify-between py-2">
            <Badge>Role</Badge>
            <Link href={"/user/settings"}>
              <GearIcon></GearIcon>
            </Link>
          </div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
