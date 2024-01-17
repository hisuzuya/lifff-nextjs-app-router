'use client';
import { useLiff } from '@/app/components/LiffProvider';
import { Profile } from '@liff/get-profile';

import { useEffect, useState } from 'react';
import { Presentation } from './Presentation';

export function Container() {
  const { liff } = useLiff();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const setLiProfile = async () => {
      const profile = await liff?.getProfile();
      setProfile(profile || null);
    };
    if (liff?.isLoggedIn()) setLiProfile();
  }, [liff]);

  return <Presentation liff={liff} profile={profile} />;
}
