import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { carouselTemplates, CarouselTemplate } from "@/lib/templates/carousel-templates";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  className?: string;
}

type Category = CarouselTemplate["category"];

export function TemplateSelector({
  onTemplateSelect,
  className,
}: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Product");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const categories = Array.from(
    new Set(carouselTemplates.map((template) => template.category))
  );

  const filteredTemplates = carouselTemplates.filter(
    (template) => template.category === selectedCategory
  );

  const handleTemplateSelect = async (templateId: string) => {
    try {
      setIsLoading(templateId);
      await onTemplateSelect(templateId);
      setOpen(false);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2", className)}
        >
          <PlusCircle className="h-4 w-4" />
          Choose Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a template to get started quickly with your carousel
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as Category)}
          className="w-full"
        >
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
          <TabsContent value={selectedCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-2">
              {filteredTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-stretch gap-6 hover:border-primary group relative"
                  onClick={() => handleTemplateSelect(template.id)}
                  disabled={isLoading !== null}
                >
                  <div className="aspect-video relative bg-muted rounded-lg overflow-hidden group-hover:ring-2 ring-primary transition-all">
                    {template.thumbnail ? (
                      <Image
                        src={template.thumbnail}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <div className="text-center space-y-2">
                          <div className="text-2xl font-semibold">{template.name}</div>
                          <div className="text-sm opacity-70">{template.slides.length} slides</div>
                        </div>
                      </div>
                    )}
                    {isLoading === template.id && (
                      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 text-left">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 