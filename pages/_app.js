import { AnimatePresence } from 'framer-motion';
import '../styles/globals.css';
import '../styles/tooltip.css';
import '../styles/ticket_tooltip.css';

import Firebase from '../helpers/Firebase';
import { getAnalytics, logEvent } from 'firebase/analytics';

function MyApp({ Component, pageProps }) {
  // console.log(Component.name);

  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
