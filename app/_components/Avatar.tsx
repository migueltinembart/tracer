"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export async function AvatarIcon(props: { imageSrc?: string | null }) {
  if (props.imageSrc) {
    return (
      <Avatar>
        <AvatarImage
          src={props.imageSrc}
          alt="Profile Picture"
          
        ></AvatarImage>
      </Avatar>
    );
  } else <div>no avatar</div>;
}
