"use client";

import React, { useState } from "react";
import SchemeQuestion from "@/components/SchemeQuestion";
import axios from "axios";
import SchemeBookCard from "@/components/SchemeBookCard";

const FinancialSchemesPage = () => {
  const [userHelpType, setUserHelpType] = useState<string | null>(null);
  const [userSituation, setUserSituation] = useState<string | null>(null);
  const [userRegion, setUserRegion] = useState<string | null>(null);
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const normalize = (str: string) => str.trim().toLowerCase();

  const handleSubmit = async () => {
    if (!userHelpType || !userSituation || !userRegion || !userGoal) return;

    setLoading(true);
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/financial/financial-schemes",
        {
          params: {
            support: normalize(userHelpType),
            situation: normalize(userSituation),
            goal: normalize(userGoal),
            region: normalize(userRegion),
          },
        }
      );
      setSchemes(res.data);
    } catch (err) {
      console.error("Error fetching schemes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen px-6 py-10 overflow-hidden fade-in"
      style={{
        backgroundColor: "#F8F8F8",
        backgroundImage:
          "radial-gradient(circle, #6fc1cf 3.5px, transparent 3.5px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-[#e3864f] mb-12">
        Find the Financial Support You Deserve
        </h1>

        <div className="space-y-6">
          <SchemeQuestion
            question="What kind of support are you looking for?"
            options={[
              "Financial Support",
              "Childcare / Creche Support",
              "Shelter / Housing",
              "Skill Development / Digital Literacy",
            ]}
            selectedOption={userHelpType}
            onSelect={setUserHelpType}
          />

          <SchemeQuestion
            question="Which situation best describes you?"
            options={[
              "Single Mother",
              "Single Father",
              "Low Income",
              "Working Parent",
            ]}
            selectedOption={userSituation}
            onSelect={setUserSituation}
          />

          <SchemeQuestion
            question="What is your primary goal?"
            options={[
              "Daily Financial Assistance",
              "Job Readiness / Skills",
              "Child Education Support",
              "Health or Maternity Benefits",
            ]}
            selectedOption={userGoal}
            onSelect={setUserGoal}
          />

          <SchemeQuestion
            question="Where do you live?"
            options={["Urban Areas", "Rural Areas"]}
            selectedOption={userRegion}
            onSelect={setUserRegion}
          />

          <div className="text-center">
            <button
              className="mt-6 px-8 py-3 rounded-full bg-[#F4A261] text-white font-semibold hover:bg-orange-500 transition-transform transform hover:scale-105"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Searching..." : "Find Schemes"}
            </button>
          </div>

          {schemes.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-teal-600 mb-6">
                Recommended Schemes
              </h2>
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {schemes.map((scheme, idx) => (
                  <div
                    className={`card-animate`}
                    style={{ animationDelay: `${idx * 0.2}s` }}
                    key={idx}
                  >
                    <SchemeBookCard scheme={scheme} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-animate {
          animation: fadeInCard 0.5s ease-out forwards;
        }

        @keyframes fadeInCard {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-focus:focus {
          border: 2px solid #f4a261;
          box-shadow: 0 0 10px rgba(244, 162, 97, 0.5);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default FinancialSchemesPage;
