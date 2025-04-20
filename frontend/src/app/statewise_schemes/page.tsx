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
    const stateName = geo.properties.NAME_1 ?? geo.properties.st_nm ?? geo.properties.name ?? "Unknown";
    setSelectedState(stateName);
  };

  // Fetch schemes when selectedState changes
  useEffect(() => {
    const fetchSchemes = async () => {
      if (!selectedState) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:8000/api/financial/financial-schemes-by-region?region=${encodeURIComponent(selectedState)}`
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
    <div className="p-9 flex flex-col items-center"
    style={{
        backgroundColor: "#F8F8F8",
        backgroundImage:
          "radial-gradient(circle, #6fc1cf 3.5px, transparent 3.5px)",
        backgroundSize: "80px 80px",
      }}>
      <h1 className="text-3xl font-semibold mb-8 text-center text-teal-700">
        Select Your State to View Available Schemes
      </h1>

      <div className="flex w-full max-w-7xl space-x-6 p-8">
        {/* Left side (Map) */}
        <div className="w-1/2">
          <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000, center: [80, 22] }}>
            <Geographies geography={indiaGeoJson}>
              {({ geographies }: { geographies: GeoType[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleStateClick(geo)}
                    style={{
                      default: {
                        fill: "#E0F2F1",
                        outline: "none",
                        stroke: "#333",
                        strokeWidth: 0.3,
                      },
                      hover: {
                        fill: "#A5D6A7",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#66BB6A",
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
        <div className="w-1/2 pl-8">
          {selectedState && loading && (
            <div className="text-center text-teal-700">Loading available schemes...</div>
          )}

          {selectedState && schemes.length === 0 && !loading && (
            <p className="text-center text-gray-500">No schemes available for this state.</p>
          )}

          {selectedState && !loading && schemes.length > 0 && (
            <div className="space-y-6">
              {schemes.map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg rounded-lg p-6 border-2 border-teal-500 transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <h3 className="text-xl font-semibold text-teal-700">{scheme.title}</h3>
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
                      <strong>Application Process:</strong> {scheme.application_process}
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
