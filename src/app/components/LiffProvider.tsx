'use client';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
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
> = ({ children, liffId, mock }) => {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  const initLiff = useCallback(async () => {
    try {
      const liffModule = await import('@line/liff');
      const liff = liffModule.default;
      console.log('LIFF init...');

      if (mock?.enable) {
        console.log('LIFF init mock');
        liff.use(mock?.plugin ?? new LiffMockPlugin());
      }

      await liff.init({
        liffId,
        withLoginOnExternalBrowser: true,
        mock: mock?.enable ?? false,
      } as any);

      if (mock?.mockDidLoaded) {
        (liff as any).$mock.set(mock.mockDidLoaded);
      }

      console.log('LIFF init succeeded.');
      setLiff(liff);
    } catch (error) {
      console.log('LIFF init failed.');
      setLiffError((error as Error).toString());
    }
  }, [liffId, mock]);

  // init Liff
  useEffect(() => {
    console.log('LIFF init start...');
    initLiff();
  }, [initLiff]);

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
