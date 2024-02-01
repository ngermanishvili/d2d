"use client";
import React from "react";
import photo from "../../../assets/images/avatar1.jpg";
import Image from "next/image";
import usePhotoStore from "@/hooks/photo-store";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
// components
interface SettingsPageProps {
  amountOfShipments: number;
}

const CardProfile: React.FC<SettingsPageProps> = ({ amountOfShipments }) => {

  const user = useCurrentUser();
  const { photoUrl, setPhotoUrl } = usePhotoStore();
  const capitalizedFirstName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : '';

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center relative ">

              {photoUrl.length > 0 ? (
                <>
                  <Image
                    width={150}
                    height={150}
                    alt="..."
                    src={photoUrl}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px inline-block "
                  />
                  <Button
                    type="button"
                    onClick={() => setPhotoUrl("")}
                    variant="destructive"
                    size="sm"
                    className="absolute right-[30px] mt-10"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                ""
              )}

            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    {amountOfShipments}
                  </span>
                  <span className="text-sm text-blueGray-400">სულ შეკვეთები</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">აქტიური შეკვეთები</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 ">
                    ✅
                  </span>
                  <span className="text-sm text-blueGray-400">სტატუსი</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              {capitalizedFirstName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              მომხმარებელი - {user?.input2}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              საკონტაქტო ელ-ფოსტა - {user?.email}
            </div>
            {/* <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div> */}
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
