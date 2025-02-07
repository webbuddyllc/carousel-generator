import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "./ui/button";
import { EditorMenubar } from "./editor-menubar";
import { Download, Loader2Icon, Settings, Printer } from "lucide-react";
import Pager from "./pager";
import { FilenameForm } from "./forms/filename-form";
import { BringYourKeysDialog } from "@/components/api-keys-dialog";
import { StarOnGithub } from "@/components/star-on-github";
import { ReactNode } from "react";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export interface MainNavProps {
  className?: string;
  handlePrint: () => void;
  isPrinting: boolean;
  handleDownload?: () => void;
  isDownloading?: boolean;
  children?: ReactNode;
}

export function MainNav({
  className,
  handlePrint,
  isPrinting,
  handleDownload,
  isDownloading,
  children,
}: MainNavProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
      {handleDownload && (
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handlePrint}
        disabled={isPrinting}
      >
        {isPrinting ? (
          <Loader2Icon className="h-4 w-4 animate-spin" />
        ) : (
          <Printer className="h-4 w-4" />
        )}
        Print
      </Button>
    </div>
  );
}
