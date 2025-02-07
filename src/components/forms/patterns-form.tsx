import { useFormContext } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { backgroundPatterns } from "@/lib/customization/background-patterns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

export function PatternsForm() {
  const form = useFormContext<z.infer<typeof DocumentSchema>>();
  const categories = Array.from(new Set(backgroundPatterns.map(p => p.category)));
  const config = form.watch("config");

  return (
    <div className="space-y-6">
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="inline-flex flex-col gap-2 bg-transparent p-0">
          <div className="flex gap-2">
            <TabsTrigger 
              value="Geometric" 
              className="flex-1 border bg-background data-[state=active]:bg-muted"
            >
              Geometric
            </TabsTrigger>
            <TabsTrigger 
              value="Abstract" 
              className="flex-1 border bg-background data-[state=active]:bg-muted"
            >
              Abstract
            </TabsTrigger>
          </div>
          <div className="flex gap-2">
            <TabsTrigger 
              value="Minimal" 
              className="flex-1 border bg-background data-[state=active]:bg-muted"
            >
              Minimal
            </TabsTrigger>
            <TabsTrigger 
              value="Decorative" 
              className="flex-1 border bg-background data-[state=active]:bg-muted"
            >
              Decorative
            </TabsTrigger>
          </div>
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <Form {...form}>
              <form>
                <ScrollArea className="h-[400px] w-full px-1">
                  <div className="grid grid-cols-2 gap-2 pr-2">
                    {backgroundPatterns
                      .filter((p) => p.category === category)
                      .map((pattern) => (
                        <Button
                          key={pattern.id}
                          variant="outline"
                          className={cn(
                            "h-24 relative overflow-hidden hover:border-primary w-full bg-white",
                            config.pattern === pattern.id &&
                              "border-2 border-primary"
                          )}
                          onClick={() => {
                            form.setValue("config", {
                              ...config,
                              pattern: pattern.id
                            });
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `url(${pattern.pattern})`,
                              backgroundSize: "80px 80px",
                              backgroundPosition: "center",
                              backgroundRepeat: "repeat",
                            }}
                          />
                          <span className="absolute bottom-2 left-2 text-xs font-medium z-10">
                            {pattern.name}
                          </span>
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              </form>
            </Form>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 