import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { Web3Modal } from "@web3modal/react";
import { ethereumClient, wcId } from "./Components/Wallets/walletConnectors";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
// const { provider } = configureChains(chains, [
//     walletConnectProvider({ projectId: wcId }),
// ]);

// const wagmiClient = createClient({
//     autoConnect: false,
//     connectors: modalConnectors({
//         appName: "XP.NETWORK Staking Platform",
//         chains,
//     }),
//     provider,
// });

// const ethereumClient = new EthereumClient(wagmiClient, chains);

// const modalConfig = {
//     theme: "dark",
//     accentColor: "default",
//     ethereum: {
//         appName: "XP.NETWORK Staking Platform",
//         chains: chains,
//         providers: [chains],
//         autoConnect: false,
//     },
//     projectId: wcId,
// };

root.render(
    <Provider store={store}>
        <App />
        <Web3Modal projectId={wcId} ethereumClient={ethereumClient} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
