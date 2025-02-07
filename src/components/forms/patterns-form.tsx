import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { backgroundPatterns } from "@/lib/customization/background-patterns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PatternsForm() {
  const form: DocumentFormReturn = useFormContext();
  const categories = Array.from(new Set(backgroundPatterns.map(p => p.category)));

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <TabsList className="w-full justify-start mb-4">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="min-w-[100px]"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-2 gap-4">
              {backgroundPatterns
                .filter((p) => p.category === category)
                .map((pattern) => (
                  <Button
                    key={pattern.id}
                    variant="outline"
                    className={cn(
                      "h-24 relative overflow-hidden hover:border-primary",
                      form.watch("config.pattern") === pattern.id &&
                        "border-2 border-primary"
                    )}
                    onClick={() => {
                      form.setValue("config.pattern", pattern.id);
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url(${pattern.pattern})`,
                        backgroundSize: "100px 100px",
                      }}
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-medium">
                      {pattern.name}
                    </span>
                  </Button>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
} 