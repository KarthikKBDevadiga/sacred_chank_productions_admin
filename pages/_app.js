import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import Firebase from "../helpers/Firebase";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
