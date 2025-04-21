"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaGeoJson from "../../assets/india_state_geo.json";

interface GeoType {
  rsmKey: string;
  properties: {
    st_nm?: string;
    name?: string;
    NAME_1?: string;
  };
}

const StatewiseSchemesPage = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle state click
  const handleStateClick = (geo: GeoType) => {
    const stateName =
      geo.properties.NAME_1 ?? geo.properties.st_nm ?? geo.properties.name ?? "Unknown";
    setSelectedState(stateName);
  };

  // Fetch schemes when selectedState changes
  useEffect(() => {
    const fetchSchemes = async () => {
      if (!selectedState) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:8000/api/financial/financial-schemes-by-region?region=${encodeURIComponent(
            selectedState
          )}`
        );
        setSchemes(res.data);
      } catch (error) {
        console.error("Failed to fetch schemes:", error);
        setSchemes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [selectedState]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#B8E6E2] via-[#FFFFFF] to-[#CDEBE7]
 p-9 flex flex-col items-center"
    >
      <h1 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-600 tracking-wide animate-pulse">
      Discover Government Schemes by State
      </h1>

      <div className="flex w-full max-w-7xl space-x-6 p-6">
        {/* Left side (Map) */}
        <div className="w-2/3">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1000, center: [80, 22] }}
          >
            <Geographies geography={indiaGeoJson}>
              {({ geographies }: { geographies: GeoType[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleStateClick(geo)}
                    style={{
                      default: {
                        fill: "#B8E6E2", // OneNest light blue as map color
                        outline: "none",
                        stroke: "#6FCF97", // Teal stroke
                        strokeWidth: 0.6,
                        transition: "all 0.3s ease-in-out",
                      },
                      hover: {
                        fill: "#6FCF97", // Teal on hover
                        outline: "none",
                      },
                      pressed: {
                        fill: "#F4A261", // Orange on click
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Right side (Schemes) */}
        <div className="w-1/2 pl-7">
          {/* Fun Facts Section - Only show if no state is selected */}
          {!selectedState && (
            <div className="mb-6 bg-white shadow-lg rounded-lg p-6 border-2 border-teal-500">
              <h3 className="text-xl font-semibold text-teal-700 mb-4">
                Did You Know?
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-xl text-teal-700">✔</span>
                  Over 120+ government schemes are available across India,
                  designed to benefit every citizen!
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl text-teal-700">✔</span>
                  Telangana has 20+ family-focused benefits to help improve the
                  well-being of families!
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl text-teal-700">✔</span>
                  The Pradhan Mantri Awas Yojana aims to provide affordable
                  housing for all by 2022!
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl text-teal-700">✔</span>
                  Uttar Pradesh has over 50 schemes dedicated to farmers and
                  agriculture.
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl text-teal-700">✔</span>
                  The MUDRA scheme has helped over 30 million people start their
                  own businesses!
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-xl text-teal-700">✔</span>
                  The PM-KISAN Yojana offers direct income support to farmers
                  across India!
                </li>
              </ul>
            </div>
          )}

          {selectedState && loading && (
            <div className="text-center text-teal-700">
              Loading available schemes...
            </div>
          )}

          {selectedState && schemes.length === 0 && !loading && (
            <p className="text-center text-gray-500">
              No schemes available for this state.
            </p>
          )}

          {selectedState && !loading && schemes.length > 0 && (
            <div className="space-y-6">
              {schemes.map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg rounded-lg p-6 border-2 border-teal-500 transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-teal-700">
                    {scheme.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{scheme.description}</p>

                  {/* Eligibility */}
                  {scheme.eligibility && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </div>
                  )}

                  {/* Benefits */}
                  {scheme.benefits && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Benefits:</strong> {scheme.benefits}
                    </div>
                  )}

                  {/* Application Process */}
                  {scheme.application_process && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Application Process:</strong>{" "}
                      {scheme.application_process}
                    </div>
                  )}

                  {/* Link */}
                  {scheme.official_link && (
                    <div className="mt-4">
                      <a
                        href={scheme.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        Learn more about this scheme
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatewiseSchemesPage;
