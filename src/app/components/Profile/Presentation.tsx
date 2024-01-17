'use client';
import { Profile } from '@liff/get-profile';
import { Liff } from '@line/liff';

export function Presentation({
  profile,
  liff,
}: {
  profile: Profile | null;
  liff: Liff | null;
}) {
  return (
    <div>
      {profile && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */},
          <img src={profile.pictureUrl} alt='profile' width={100} />
          <p>profile.userId: {profile.userId}</p>
          <p>profile.displayName: {profile.displayName}</p>
        </>
      )}
      {profile ? (
        <button
          onClick={() => {
            liff?.logout();
            location.reload();
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={() => liff?.login()}>login</button>
      )}
    </div>
  );
}
