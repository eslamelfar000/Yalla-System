import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { countries } from "./Countries"; // Assuming you have a list of countries with flags and dial codes

export default function PhoneInput() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [localNumber, setLocalNumber] = useState("");

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;

    // Ensure it starts with "+"
    if (!input.startsWith("+")) {
      setLocalNumber(input);
      return;
    }

    // Try to match dial code from the longest to shortest
    let matchedCountry = selectedCountry;
    for (let country of countries.sort(
      (a, b) => b.MobileCode.length - a.MobileCode.length
    )) {
      if (input.startsWith(country.MobileCode)) {
        matchedCountry = country;
        break;
      }
    }

    setSelectedCountry(matchedCountry);
    setLocalNumber(input.replace(matchedCountry.MobileCode, ""));
  };
  

  const fullNumber = `${selectedCountry.MobileCode}${localNumber}`;

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-between h-8" size="sm">
            <span>
              {selectedCountry.Code} {selectedCountry.MobileCode}
            </span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <ScrollArea className="h-64">
            <ul>
              {countries.map((country) => (
                <li
                  key={country.Code}
                  onClick={() => handleSelectCountry(country)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span>{country.Code}</span>
                    <span>{country.Name}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {country.MobileCode}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Input
        type="tel"
        placeholder="Phone number"
        value={`${localNumber}`}
        onChange={handleInputChange}
        className="flex-1"
      />
    </div>
  );
}
