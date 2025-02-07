"use client";

import { SidebarPanel } from "@/components/settings-panel";
import { SlidesEditor } from "@/components/slides-editor";
import React from "react";
import { useComponentPrinter } from "@/lib/hooks/use-component-printer";
import { RefProvider } from "@/lib/providers/reference-context";
import { MainNav } from "./main-nav";
import { TemplateSelector } from "@/components/template-selector";
import { useTemplateHandler } from "@/lib/hooks/use-template-handler";
import { usePatternHandler } from "@/lib/hooks/use-pattern-handler";

export default function Editor({}: {}) {
  const { componentRef, handlePrint, isPrinting } = useComponentPrinter();
  const { applyTemplate } = useTemplateHandler();
  usePatternHandler();

  return (
    <RefProvider myRef={componentRef}>
      <div className="flex-1 flex flex-col">
        <MainNav
          className="h-14 border-b px-6 flex items-center justify-between"
          handlePrint={handlePrint}
          isPrinting={isPrinting}
        >
          <div className="flex items-center gap-4">
            <TemplateSelector onTemplateSelect={applyTemplate} />
          </div>
        </MainNav>
        <div className="flex-1 flex flex-start md:grid md:grid-cols-[320px_minmax(0,1fr)]">
          <SidebarPanel />
          <SlidesEditor />
        </div>
      </div>
    </RefProvider>
  );
}
