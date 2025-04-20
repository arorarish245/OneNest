"use client";

import React, { useState } from "react";
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

  // 🛠 Fix: handleStateClick inside component with geo passed in
  const handleStateClick = (geo: GeoType) => {
    const stateName = geo.properties.NAME_1 ?? geo.properties.st_nm ?? geo.properties.name ?? "Unknown";
    setSelectedState(stateName);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4 text-center text-teal-700">
        Select Your State to View Available Schemes
      </h1>

      <div className="w-full max-w-4xl">
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

      {selectedState && (
        <div className="mt-6 text-lg text-center text-gray-800">
          <p className="font-medium">You selected:</p>
          <p className="text-xl font-bold text-orange-600">{selectedState}</p>
        </div>
      )}
    </div>
  );
};

export default StatewiseSchemesPage;
