import { useOutletContext } from "react-router";

const useFeatureFlag = (name: string) => {
  const { featureFlags } = useOutletContext<{
    featureFlags: Record<string, boolean>;
  }>();

  return featureFlags?.[name] || false;
};

export default useFeatureFlag;
