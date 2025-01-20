'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="mt-10 flex flex-col items-center p-10 md:px-32 lg:px-48 w-full bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="font-bold text-4xl text-center text-indigo-400 mb-6">Pricing</h2>
      <p className="text-gray-400 max-w-xl text-center mt-4 mb-8">
        {Lookup.PRICING_DESC}
      </p>
      
      {/* User token information */}
      <div className="p-6 border border-gray-700 rounded-xl w-full flex justify-between items-center bg-gray-800 shadow-md mb-8">
        <h2 className="text-lg text-gray-300">
          <span className="font-semibold text-indigo-400">{userDetail?.token}</span> Tokens Left
        </h2>
        <div className="text-center">
          <h3 className="font-medium text-gray-200">Need more tokens?</h3>
          <p className="text-sm text-gray-400">Upgrade your plan below</p>
        </div>
      </div>

      {/* Pricing Model Component */}
      <PricingModel />
    </div>
  );
}

export default Pricing;
