import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Liff } from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';

const LiffContext = createContext<{
  liff: Liff | null;
  liffError: string | null;
}>({ liff: null, liffError: null });

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<
  PropsWithChildren<{
    liffId: string;
    mock?: {
      enable: boolean;
      plugin?: LiffMockPlugin;
      mockDidLoaded?: (parameter?: any) => { [method: string]: any };
    };
  }>
> = ({ children, liffId }) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // init Liff
  useEffect(() => {
    import('@line/liff')
      .then((liff) => liff.default)
      .then((liff) => {
        console.log('LIFF init...');
        liff
          .init({
            liffId: process.env.NEXT_PUBLIC_LIFF_ID!,
            withLoginOnExternalBrowser: true,
          })
          .then(() => {
            console.log('LIFF init succeeded.');
            setLiff(liff);
          })
          .catch((error: Error) => {
            console.log('LIFF init failed.');
            setLiffError(error.toString());
          });
      });
  }, [liffId]);
  return (
    <LiffContext.Provider
      value={{
        liff,
        liffError,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};
