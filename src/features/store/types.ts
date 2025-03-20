export type StoreInfo = {
  owner: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  store: {
    id: number;
    name: string;
    onboarding_procedure: {
      onboarding_status: string;
    };
  };
};

export type StoreInfoResponse = StoreInfo;
