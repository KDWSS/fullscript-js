import { FullscriptOptions } from "../fullscript";

import { FeatureOptions } from "./featureType";
import { getFeatureURL } from "./featureUtil";

describe("getFeatureUrl", () => {
  let mockFeatureOptions: FeatureOptions<"treatmentPlan">;
  let mockFullscriptOptions: FullscriptOptions;
  let mockFrameId: string;

  beforeEach(() => {
    mockFeatureOptions = {
      patient: {
        id: "patientId",
      },
      secretToken: "secretToken",
    };

    mockFullscriptOptions = {
      env: "us-snd",
      publicKey: "publicKey",
    };

    mockFrameId = "uuid";
  });

  it("returns the proper url", () => {
    const url = getFeatureURL(
      "treatmentPlan",
      mockFeatureOptions,
      mockFullscriptOptions,
      mockFrameId
    );

    expect(url).toEqual(
      "https://us-snd.fullscript.io/api/embeddable/session/treatment_plans/new?patient[id]=patientId&secret_token=secretToken&public_key=publicKey&frame_id=uuid&target_origin=http://localhost"
    );
  });
});
