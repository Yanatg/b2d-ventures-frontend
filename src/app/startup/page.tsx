"use client";

import React, { useEffect, useState } from "react";
import DealCard from "@/components/card";
import Filter from "@/components/filter";
import SearchBar from "@/components/searchBar";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Deal {
  attributes: {
    id: string;
    name: string;
    description: string;
    allocation: string;
    raised: string;
    investor_count: number;
    image_logo_url: string;
    image_content_url: string;
    type: string;
    status: string; // Added status attribute
  };
}

const DealDashboard: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
    fetchDeals();
  }, []);

  useEffect(() => {
    filterDeals();
  }, [selectedFilter, searchQuery, deals]);

  const handleCreateDeal = () => {
    router.push("/startup-form");
  };

  const fetchDeals = async () => {
    try {
      const response = await axios.get<{ data: Deal[] }>(
        "https://b2d-ventures-backend.onrender.com/api/admin/deals"
      );
      setDeals(response.data.data);
      setFilteredDeals(response.data.data);
      console.log("Deals fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  const handleDealClick = (dealId: string) => {
    router.push(`/detail-deal/${dealId}`);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filterDeals = () => {
    let filtered = deals;

    // Apply status filter
    filtered = filtered.filter((deal) => deal.attributes.status === "approved");

    // Apply type filter
    if (selectedFilter !== "") {
      filtered = filtered.filter((deal) => deal.attributes.type === selectedFilter);
    }

    // Apply search filter
    if (searchQuery !== "") {
      filtered = filtered.filter((deal) =>
        deal.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDeals(filtered);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col px-[102px] py-[54px] gap-10">
        <div className="grid grid-cols-2 gap-4 min-w-[1236px]">
          <div className="flex flex-col">
            <div className="text-[48px] font-bold">
              Investment opportunities
            </div>
            <div className="mt-1 text-[20px] text-secondary">
              Browse current investment opportunities on B2D.
            </div>
          </div>
          <div className="flex flex-col ml-auto mt-auto gap-2">
            {role === "startup" && (
              <div className="flex w-full justify-end gap-4">
                <div
                  className="flex items-center justify-center rounded-[8px] w-[144px] h-[32px] bg-purple text-white hover:cursor-pointer"
                  onClick={handleCreateDeal}
                >
                  Create Deal
                </div>
              </div>
            )}
            <div className="flex flex-row gap-4">
              <Filter onChange={onSelectChange} />
              <SearchBar onSearch={onSearch} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-12">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => (
              <div
                key={deal.attributes.id}
                onClick={() => handleDealClick(deal.attributes.id)}
                className="hover:cursor-pointer"
              >
                <DealCard
                  key={deal.attributes.id}
                  name={deal.attributes.name}
                  description={deal.attributes.description}
                  fundingGoal={parseFloat(deal.attributes.allocation)}
                  raisedAmount={parseFloat(deal.attributes.raised)}
                  investorNumber={deal.attributes.investor_count}
                  icon={deal.attributes.image_logo_url}
                  bgImage={deal.attributes.image_content_url}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-start text-[24px] text-gray-500">
              No investment opportunities.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealDashboard;