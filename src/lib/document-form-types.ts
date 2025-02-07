export type Config = {
  brand: {
    name: string;
    logo?: string;
  };
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  pageNumber: {
    showNumbers: boolean;
    position: "bottom-left" | "bottom-right" | "bottom-center";
  };
  pattern?: string;
}; 