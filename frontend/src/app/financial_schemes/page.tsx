'use client';

import React, { useState } from 'react';
import SchemeQuestion from '@/components/SchemeQuestion';
import axios from 'axios';

const FinancialSchemesPage = () => {
  const [userHelpType, setUserHelpType] = useState<string | null>(null);
  const [userSituation, setUserSituation] = useState<string | null>(null);
  const [userRegion, setUserRegion] = useState<string | null>(null);
  const [userGoal, setUserGoal] = useState<string | null>(null);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userHelpType || !userSituation || !userRegion || !userGoal) return;

    setLoading(true);
    try {
      const res = await axios.get('/api/financial-schemes', {
        params: {
          user_help_type: userHelpType,
          user_situation: userSituation,
          user_region: userRegion,
          user_goal: userGoal
        }
      });
      setSchemes(res.data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] px-6 py-10">
      <h1 className="text-2xl font-bold text-center text-[#6FCF97] mb-10">
        Find Financial Schemes Tailored for You 💸
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <SchemeQuestion
          question="What kind of support are you looking for?"
          options={['Financial Aid for Daily Living', 'Childcare Support', 'Housing', 'Healthcare']}
          selectedOption={userHelpType}
          onSelect={setUserHelpType}
        />

        <SchemeQuestion
          question="Which situation best describes you?"
          options={['Single Parent (Widowed)', 'Single Parent (Divorced)', 'Unemployed', 'Low Income']}
          selectedOption={userSituation}
          onSelect={setUserSituation}
        />

        <SchemeQuestion
          question="Where do you live?"
          options={['Urban Areas', 'Rural Areas']}
          selectedOption={userRegion}
          onSelect={setUserRegion}
        />

        <SchemeQuestion
          question="What is your primary goal?"
          options={['Financial Aid for Daily Living', 'Job Support', 'Education Support', 'Medical Assistance']}
          selectedOption={userGoal}
          onSelect={setUserGoal}
        />

        <div className="text-center">
          <button
            className="mt-6 px-6 py-3 rounded-full bg-[#F4A261] text-white font-semibold hover:bg-orange-500 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Find Schemes'}
          </button>
        </div>

        {/* Results */}
        {schemes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">Recommended Schemes</h2>
            <div className="grid gap-4">
              {schemes.map((scheme, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl shadow bg-white border-l-4 border-[#6FCF97]"
                >
                  <h3 className="text-lg font-semibold text-[#333]">{scheme.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                  {scheme.region && (
                    <p className="text-xs text-gray-400 mt-2">Region: {scheme.region}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialSchemesPage;
