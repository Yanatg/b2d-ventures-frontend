"use client";

import React from "react";
import FormDeal from "@/components/formInput/FormDeal";

interface DealAttributes {
  id: string;
  name: string;
  content: string;
  image_logo_url: string;
  image_content_url: string;
  target_amount: string;
  price_per_unit: string;
  minimum_investment: string;
  amount_raised: string;
  end_date: string;
  image_background_url: string;
  startup: {
    id: string;
  };
}

export default function EditDealDashboard({
  params,
}: {
  params: { dealId: string };
}) {
  const id = params.dealId;
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-6 py-10 gap-10 w-[1440px] ">
        <div className="flex flex-col w-full px-[20px]">
          <div className="text-[48px] font-bold">Edit Deal</div>
          <div className="mt-1 text-[20px] text-secondary">
            Edit your deal on B2D.
          </div>
        </div>
        <div className="w-full">
          <FormDeal isEdit={true} id={id} />
        </div>
      </div>
    </div>
  );
}
