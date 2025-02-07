"use client";

import { SidebarPanel } from "@/components/settings-panel";
import { SlidesEditor } from "@/components/slides-editor";
import React, { useState } from "react";
import { useComponentPrinter } from "@/lib/hooks/use-component-printer";
import { RefProvider } from "@/lib/providers/reference-context";
import { MainNav } from "./main-nav";
import { TemplateSelector } from "@/components/template-selector";
import { useTemplateHandler } from "@/lib/hooks/use-template-handler";
import { usePatternHandler } from "@/lib/hooks/use-pattern-handler";
import { AIGeneratorPage } from "./ai-generator-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Wand2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

export default function Editor() {
  const { componentRef, handlePrint, isPrinting } = useComponentPrinter();
  const { applyTemplate } = useTemplateHandler();
  const { toast } = useToast();
  usePatternHandler();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Get the component element
      const element = componentRef.current as HTMLElement | null;
      if (!element) {
        toast({
          title: "Error",
          description: "Could not find the carousel element.",
          variant: "destructive",
        });
        return;
      }

      // Get all slide elements
      const carouselContent = element.querySelector('#element-to-download-as-pdf');
      if (!carouselContent) {
        toast({
          title: "No carousel content found",
          description: "Please create some slides before downloading.",
          variant: "destructive",
        });
        return;
      }

      // Get actual slide items (excluding the "add new" items)
      const slideElements = Array.from(carouselContent.querySelectorAll('[id^="carousel-item-"]'));
      if (!slideElements.length) {
        toast({
          title: "No slides found",
          description: "Please create some slides before downloading.",
          variant: "destructive",
        });
        return;
      }

      // Use html2canvas to capture each slide
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Initialize PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1080, 1080] // LinkedIn carousel dimensions
      });

      // Convert each slide to canvas and add to PDF
      for (let i = 0; i < slideElements.length; i++) {
        // Find the PageBase component within the slide
        const pageBase = slideElements[i].querySelector('[data-page-base]');
        if (!pageBase) continue;

        const canvas = await html2canvas(pageBase as HTMLElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          onclone: (clonedDoc) => {
            // Remove any UI elements that shouldn't be in the PDF
            const clonedElement = clonedDoc.querySelector(`#carousel-item-${i}`);
            if (clonedElement) {
              const uiElements = clonedElement.querySelectorAll('.ui-element');
              uiElements.forEach(el => el.remove());
            }
          }
        });

        // Convert canvas to image
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Add new page if not first page
        if (i > 0) {
          pdf.addPage();
        }

        // Add image to PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, 1080, 1080);
      }

      // Save the PDF
      const filenameInput = document.querySelector('input[name="filename"]') as HTMLInputElement;
      const filename = filenameInput?.value || 'my-carousel';
      pdf.save(`${filename}.pdf`);
      
      toast({
        title: "Success",
        description: `Downloaded ${slideElements.length} slides as PDF`,
      });
    } catch (error) {
      console.error('Error downloading carousel:', error);
      toast({
        title: "Error",
        description: "Failed to download carousel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <RefProvider myRef={componentRef}>
      <div className="flex-1 flex flex-col">
        <MainNav
          className="h-14 border-b px-6 flex items-center justify-between"
          handlePrint={handlePrint}
          isPrinting={isPrinting}
          handleDownload={handleDownload}
          isDownloading={isDownloading}
        >
          <div className="flex items-center gap-4">
            <TemplateSelector onTemplateSelect={applyTemplate} />
          </div>
        </MainNav>
        <Tabs defaultValue="editor" className="flex-1 flex flex-col">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b px-6">
              <TabsTrigger value="editor" data-tab-value="editor">Editor</TabsTrigger>
              <TabsTrigger value="ai" data-tab-value="ai" className="gap-2">
                <Wand2 className="w-4 h-4" />
                AI Generator
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="editor" className="flex-1 flex flex-start md:grid md:grid-cols-[320px_minmax(0,1fr)] data-[state=inactive]:hidden">
            <SidebarPanel />
            <SlidesEditor />
          </TabsContent>
          <TabsContent value="ai" className="flex-1 data-[state=inactive]:hidden">
            <AIGeneratorPage />
          </TabsContent>
        </Tabs>
      </div>
    </RefProvider>
  );
}
