"use client";
import AuthModal from "airbnb/components/auth/AuthModal";
import CompactFooter from "airbnb/components/footer/CompactFooter";
import Navbar from "airbnb/components/navbar/Navbar";
import { userAppStore } from "airbnb/store/store";
import React, { useEffect } from "react";
import ListingPhotos from "./components/ListingPhotos";
import TripScheduler from "./components/TripScheduler";
import ListingAmenties from "./components/ListingAmenties";
import ListingMap from "./components/ListingMap";
import { getListing } from "airbnb/lib/lisitng";

export default function Page({
  params: { listing },
}: {
  params: { listing: string };
}) {
  const { isAuthModalOpen, currentListing, setCurrentListing } = userAppStore();
  useEffect(() => {
    const getData = async () => {
      const data = await getListing(listing);
      console.log({ data });
      setCurrentListing(data);
    };
    if (listing) getData();
  }, [listing, setCurrentListing]);
  return (
    <div>
      {currentListing && (
        <>
          <Navbar />
          <div
            className="h-[80vh] overflow-auto no-scrollbar px-20 pt-10 text-airbnb-light-black grid gap-10"
            style={{ gridTemplateColumns: "70fr 30fr" }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-5xl">{currentListing?.title}</h2>
                <span className="text-lg cursor-pointer underline">
                  {currentListing?.locationData?.landmark}
                </span>
              </div>
              <ListingPhotos />

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold">
                    {currentListing?.locationType} hosted by Kishan
                  </h3>
                  <ul className="flex gap-5">
                    {Object.keys(currentListing.placeSpace).map((type) => (
                      <li
                        className="border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start w-32"
                        key={type}
                      >
                        <span className="text-2xl font-semibold">
                          {currentListing.placeSpace[type]}
                        </span>
                        <span className="capitalize">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p>{currentListing?.description}</p>
                <ListingAmenties />
                <ListingMap />
              </div>
            </div>
            <div>
              <TripScheduler />
            </div>
          </div>
          <CompactFooter />
          {isAuthModalOpen && <AuthModal />}
        </>
      )}
    </div>
  );
}
