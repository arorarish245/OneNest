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
  const normalize = (str: string) => str.trim().toLowerCase();

  const handleSubmit = async () => {
    if (!userHelpType || !userSituation || !userRegion || !userGoal) return;

    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/financial/financial-schemes', {
        params: {
            support: normalize(userHelpType),
            situation: normalize(userSituation),
            goal: normalize(userGoal),
            region: normalize(userRegion) 
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
          options={[
            'Financial Support',
            'Childcare / Creche Support',
            'Shelter / Housing',
            'Skill Development / Digital Literacy'
          ]}
          selectedOption={userHelpType}
          onSelect={setUserHelpType}
        />

        <SchemeQuestion
          question="Which situation best describes you?"
          options={[
            'Single Mother',
            'Single Father',
            'Low-Income',
            'Working Parent'
          ]}
          selectedOption={userSituation}
          onSelect={setUserSituation}
        />

        <SchemeQuestion
          question="What is your primary goal?"
          options={[
            'Daily Financial Assistance',
            'Job Readiness / Skills',
            'Child Education Support',
            'Health or Maternity Benefits'
          ]}
          selectedOption={userGoal}
          onSelect={setUserGoal}
        />

        <SchemeQuestion
          question="Where do you live?"
          options={['Urban Areas', 'Rural Areas']}
          selectedOption={userRegion}
          onSelect={setUserRegion}
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
