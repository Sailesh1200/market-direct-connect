
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ProductCategory } from "@/types";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  onApplyFilters: (filters: ProductFilters) => void;
  onResetFilters: () => void;
}

export interface ProductFilters {
  search: string;
  categories: ProductCategory[];
  priceRange: [number, number];
  organic: boolean;
}

const categoryOptions: { value: ProductCategory; label: string }[] = [
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "grains", label: "Grains" },
  { value: "dairy", label: "Dairy" },
  { value: "meat", label: "Meat" },
  { value: "poultry", label: "Poultry" },
  { value: "herbs", label: "Herbs" },
  { value: "other", label: "Other" }
];

const ProductFilters = ({ onApplyFilters, onResetFilters }: ProductFiltersProps) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [organic, setOrganic] = useState(false);

  const handleCategoryChange = (category: ProductCategory) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      search,
      categories,
      priceRange,
      organic
    });
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategories([]);
    setPriceRange([0, 10]);
    setOrganic(false);
    onResetFilters();
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-2 top-2.5"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "organic"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-farm-green-700 font-semibold">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categoryOptions.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.value}`}
                    checked={categories.includes(category.value)}
                    onCheckedChange={() => handleCategoryChange(category.value)}
                  />
                  <Label 
                    htmlFor={`category-${category.value}`}
                    className="cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-farm-green-700 font-semibold">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={20}
                step={1}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="my-4"
              />
              <div className="flex justify-between">
                <span>${priceRange[0].toFixed(2)}</span>
                <span>${priceRange[1].toFixed(2)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="organic">
          <AccordionTrigger className="text-farm-green-700 font-semibold">
            Product Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="organic"
                checked={organic}
                onCheckedChange={() => setOrganic(!organic)}
              />
              <Label 
                htmlFor="organic"
                className="cursor-pointer"
              >
                Organic Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button 
          onClick={handleApplyFilters}
          className="w-full bg-farm-green-600 hover:bg-farm-green-700"
        >
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          onClick={handleResetFilters}
          className="w-full border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
