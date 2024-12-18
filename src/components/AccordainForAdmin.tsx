"use client";
import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import axios from "axios";

interface AccordainForAdminProps {
  deals: any[];
}

interface Deal {
  attributes: {
    investor_count: number;
  };
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_URI}`;
const DEFAULT_BG_IMAGE = "/images/lexi.png"; // Replace with your default background image path
const DEFAULT_ICON_IMAGE = "/images/icon.jpg"; // Replace with your default icon image path

export default function App({ deals }: AccordainForAdminProps) {
  const getImageSrc = (imagePath?: string, isIcon: boolean = false) => {
    if (!imagePath) return isIcon ? DEFAULT_ICON_IMAGE : DEFAULT_BG_IMAGE;
    const fullPath = imagePath.startsWith("http")
      ? imagePath
      : `${API_BASE_URL}${imagePath}`;
    return fullPath;
  };

  function numberToStringFormat(amount: number) {
    return amount
      ? amount > 999999
        ? `$${(amount / 1000000).toLocaleString()}M`
        : amount > 999
        ? `$${(amount / 1000).toLocaleString()}K`
        : `$${amount}`
      : 0;
  }

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString();
  }

  const handleRemove = async (dealID: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URI}api/admin/${dealID}/deals/`
      );
      console.log(response.data);
      alert("Deal deleted.")
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  }

  return (
    <Accordion>
      {deals.map((deal) => (
        <AccordionItem
          data-testid="deal-item"
          key={deal.attributes.id}
          aria-label="Accordion 1"
          title={deal.attributes.name}
          startContent={
            <div className="w-[40px] h-[40px] overflow-hidden flex items-center justify-center rounded-md">
            <Image
              src={getImageSrc(deal.attributes.image_logo_url)}
              width={48}
              height={48}
              alt="logo"
              className="rounded-md object-contain"
            />
             </div>
          }
        >
          <div className="grid grid-cols-3 pl-12">
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">
                {deal.attributes.investor_count}
              </div>
              <div className="text-secondary">investors</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">{numberToStringFormat(deal.attributes.amount_raised)}</div>
              <div className="text-secondary">raised</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">{numberToStringFormat(deal.attributes.target_amount)}</div>
              <div className="text-secondary">Funding goal</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[20px]">{formatDate(deal.attributes.end_date)}</div>
              <div className="text-secondary">Deal end</div>
            </div>
            <div className="flex flex-cols-2 justify-between mt-2">
              <div className="flex flex-col">
                <Button
                  style={{ borderColor: "#FF0000", color: "#FF0000" }}
                  variant="bordered"
                  onClick={() => handleRemove(deal.attributes.id)}
                >
                  Remove
                </Button>
              </div>
              {/* <div className="flex flex-col">
                <Button style={{ backgroundColor: "#9710FF", color: "#fff" }}>
                  End Funding
                </Button>
              </div> */}
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
