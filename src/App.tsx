import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import "normalize.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Connect } from "./Components/Connect/Connect";
import { Stake } from "./Pages/Stake/Stake";
import { ClaimRewards } from "./Pages/ClaimRewards/ClaimRewards";
import { Gallery } from "./Pages/Gallery/Gallery";
import { Error } from "./Components/Error/Error";
import { StakingLimitPopup } from "./Components/StakingLimitPopup/StakingLimitPopup";

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/connect/:to" element={<Connect />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/rewards" element={<ClaimRewards />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/error" element={<Error />} />
          <Route path="/limit" element={<StakingLimitPopup />} />

          {/*  <Route path="/associationDonation" element={<DonationMain />}>
          <Route index element={<Donation />} />
            <Route path="/associationDonation/Receipt" element={<DonationDetails />} />
          </Route>
          <Route path="/payment-completed" element={<PaymentCompleted/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
