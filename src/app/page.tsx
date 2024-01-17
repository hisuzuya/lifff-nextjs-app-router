import { useLiff } from '@/app/components/LiffProvider';
import styles from '@/styles/Home.module.css';

import { Profile } from './components/Profile';

export default function Home() {
  // const { liff, liffError } = useLiff();

  return (
    <div>
      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {/* {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )} */}
        <a
          href='https://developers.line.biz/ja/docs/liff/'
          target='_blank'
          rel='noreferrer'
        >
          LIFF Documentation
        </a>

        <Profile />
        <Profile />
        <Profile />
      </main>
    </div>
  );
}
