"use client";

import { useState, useEffect } from "react";
import DetailCard from "@/components/DetailCard";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";

interface DealAttributes {
  id: string;
  name: string;
  content: string;
  image_logo_url: string;
  image_content_url: string;
  allocation: string;
  price_per_unit: string;
  minimum_investment: string;
  raised: string;
  end_date: string;
  image_background_url: string;
  startup: {
    id: string;
  };
}

interface Deal {
  attributes: DealAttributes;
}

function contentFormatter(content: string) {
  return content.replace(/<[^>]*>?/gm, "").replace(/\r\n/g, "<br/>");
}

export default function DealDashboard({
  params,
}: {
  params: { dealId: string };
}) {
  const id = params.dealId;
  const [deals, setDeals] = useState<Deal[]>([]);
  const [deal, setDeal] = useState<Deal | null>(null);

  const API_BASE_URL = "https://b2d-ventures-backend.onrender.com/";
  const DEFAULT_BG_IMAGE = "/images/lexi.png";
  const DEFAULT_ICON_IMAGE = "/images/icon.jpg";

  const Router = useRouter();

  const getImageSrc = (imagePath?: string, isIcon: boolean = false) => {
    if (!imagePath) return isIcon ? DEFAULT_ICON_IMAGE : DEFAULT_BG_IMAGE;
    const fullPath = imagePath.startsWith("http")
      ? imagePath
      : `${API_BASE_URL}${imagePath}`;
    return fullPath;
  };

  const fetchDeal = async () => {
    try {
      const response = await axios.get<{ data: Deal[] }>(
        "https://b2d-ventures-backend.onrender.com/api/admin/deals"
      );
      setDeals(response.data.data);
      console.log("Deals fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeal();
  }, []);

  useEffect(() => {
    if (deals.length > 0) {
      const foundDeal = deals.find((deal) => deal.attributes.id === id);
      if (foundDeal) {
        setDeal(foundDeal);
        console.log("Deal found:", foundDeal);
      }
    }
  }, [deals, id]);

  const handleRequestData = (dealId: string, userId: string | null) => {
    return async () => {
      try {
        const response = await axios.post(
          `https://b2d-ventures-backend.onrender.com/api/investor/${userId}/deals/${dealId}/request-dataroom/`
        );
        alert(
          "Data requested successfully! Please check your email for more details."
        );
      } catch (error) {
        console.error("Error requesting data:", error);
      }
    };
  };

  const handleEditDeal = (dealId: string) => {
    Router.push(`/edit-deal/${dealId}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex px-[102px] py-[54px] gap-10">
        <div className="flex flex-row justify-between gap-16">
          <div className="flex flex-col w-[793px]">
            <div className="flex flex-row gap-4 items-center">
              <div className="rounded-[8px] overflow-hidden shadow-sm">
                <Image
                  src={getImageSrc(deal?.attributes.image_logo_url)}
                  width={48}
                  height={48}
                  alt="logo"
                  className="w-[60px] h-[60px]"
                />
              </div>
              <div className="text-[48px] font-bold">
                {deal ? deal.attributes.name : "Loading..."}
              </div>
            </div>
            <div className="mt-1 text-[20px] text-secondary mb-5">
              Wireless Building Automation: Cost-effective Energy Management &
              Decarbonization
            </div>
            <Image
              src={getImageSrc(deal?.attributes.image_content_url)}
              width={793}
              height={412}
              alt="image"
              className="w-full h-[412px] rounded-[8px]"
            />
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{
                __html: deal
                  ? contentFormatter(deal.attributes.content)
                  : "Loading...",
              }}
            />
          </div>
          <div className="flex flex-col mt-[90px] gap-5">
            <div className="flex flex-row justify-between w-full">
              <div
                onClick={handleRequestData(id, localStorage.getItem("userId"))}
                className="flex items-center justify-center bg-white w-[313px] h-[44px] rounded-[8px] text-purple border-[2px] border-purple text-semi-bold hover:cursor-pointer"
              >
                Request for private data
              </div>
              <Link href={`/schedule-meeting?id=${deal?.attributes.startup.id}`}>
                <button className="flex items-center justify-center border-2 border-border w-[44px] h-[44px] rounded-[8px] text-white font-semibold">
                  <img
                    src="/images/Phoneicon.png"
                    alt="Fund Icon"
                    className="w-6 h-6 opacity-50"
                  />
                </button>
              </Link>
            </div>
            <div className="flex">
              {deal && (
                <DetailCard
                  allocation={Number(deal.attributes.allocation)}
                  pricePerFractionalUnit={Number(
                    deal.attributes.price_per_unit
                  )}
                  minimumInvestment={Number(deal.attributes.minimum_investment)}
                  raised={Number(deal.attributes.raised)}
                  fundingGoal={Number(deal.attributes.allocation)}
                  dealEnd={deal.attributes.end_date}
                  image_bg={deal.attributes.image_background_url}
                  dealId={id}
                />
              )}
            </div>
            {deal?.attributes.startup.id === localStorage.getItem("userId") && (
              <div
                onClick={handleEditDeal.bind(null, id)}
                className="flex items-center justify-center bg-white w-[378px] h-[44px] rounded-[8px] text-purple border-[2px] border-purple text-semi-bold hover:cursor-pointer"
              >
                Edit Deal
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
