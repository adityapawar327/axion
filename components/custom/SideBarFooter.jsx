'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function SideBarFooter() {
  const router = useRouter();
  const [user, setUser] = useState(null); // assuming you manage user state here

  const options = [
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
    },
  ];

  const onOptionClick = (option) => {
    console.log(option);
    if (option.name === 'Sign Out') {
      googleLogout(); // Log out from Google
      localStorage.clear(); // Clear local storage
      setUser(null); // Clear user state
      window.location.reload(); // Reload the page
    } else if (option.path) {
      router.push(option.path); // Navigate to the path if it exists
    } else {
      console.warn('No path defined for option:', option.name);
    }
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start my-3"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
