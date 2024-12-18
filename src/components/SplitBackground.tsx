"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplitBackground({}) {
  const router = useRouter();

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const googleSignIn = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${SCOPES.join(
      " "
    )}&access_type=offline&prompt=consent`;
    window.location.href = url;
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        background: "linear-gradient(to right, #FFFFFF 50%, #4E0A81 50%)",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg border-2 border-[#D9D9D9] w-full max-w-4xl h-auto"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 flex flex-col justify-between bg-white text-center p-4">
            <div>
              <div className="inline-block space-x-2 mt-12">
                <p className="text-[#625B71] text-3xl md:text-4xl font-bold inline">Welcome to</p>
                <p className="text-[#000000] text-3xl md:text-4xl font-bold inline">B2D</p>
              </div>
              <div className="flex justify-center my-12">
                <button
                  className="bg-[#FFFFFF] text-[#000000] py-2 px-6 rounded-xl border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-full max-w-xs font-medium flex items-center justify-center space-x-2 h-16" // Set a fixed height for the button
                  onClick={googleSignIn}
                >
                  <Image
                    src="/images/Google_icons.png"
                    width={20}
                    height={20}
                    alt="Google Icon"
                  />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <Image
                src="/images/logo.png"
                width={300}
                height={300}
                alt="image"
                className="w-[200px] h-[200px] mx-auto"
              />
            </div>
            <div className="flex justify-between mb-12 mx-4">
              <button 
                onClick={() => router.push('/learnmore')}
                className="bg-[#FFFFFF] text-[#000000] py-2 px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/2 mx-1 h-16">
                LEARN MORE
              </button>
              <button 
                onClick={() => router.push('/policy')}
                className="bg-[#FFFFFF] text-[#000000] py-2 px-4 rounded-lg border-2 border-[#D9D9D9] shadow-md hover:shadow-lg w-1/2 mx-1 h-16">
                POLICY
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-1">
            <div className="relative w-full h-full">
              <Image
                src="/images/image_4.png"
                layout="fill"
                alt="image"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}