import React, { useEffect } from "react";
import { Fullscript, EventListenerPayload } from "@fullscript/fullscript-js";

import "./App.css";

const App = () => {
  useEffect(() => {
    mountTreatmentPlan();
  });

  const handlePatientSelected = (payload: EventListenerPayload<"patient.selected">) => {
    console.log(payload);
  };

  const handleTreatmentPlanActivated = (
    payload: EventListenerPayload<"treatmentPlan.activated">
  ) => {
    console.log(payload);
  };

  const mountTreatmentPlan = () => {
    //     ################
    //  publicKey: fullscript-js-test-public-key
    //  patientId: a23a465f-20db-4602-a53b-3f283d90e381
    //  secretToken: 41GePHjzCYe6eUg3CTrl9CTtDnZkK1uOyE0e6jIkvOjJCTJE
    // ################################################################

    const client = Fullscript({
      publicKey: "fullscript-js-test-public-key",
      env: "dev",
    });

    const feature = client.create("treatmentPlan", {
      patient: {
        id: "a23a465f-20db-4602-a53b-3f283d90e388",
        email: "mail@google.com",
      },
      secretToken: "xC4Q3lz38DXB7tucuO6VrdXvOrskNVOKkNc12lniH2teg74J",
    });

    feature.mount("treatment-plan-iframe");
    feature.on("treatmentPlan.activated", handleTreatmentPlanActivated);
    feature.on("patient.selected", handlePatientSelected);
  };

  return (
    <div className="app">
      <h1>Fullscript.js Demo</h1>
      <h4>This is a demo app using Fullscript.js as a module</h4>
      <div style={{ width: "100vw", height: "100vh" }} id="treatment-plan-iframe" />
    </div>
  );
};

export { App };
