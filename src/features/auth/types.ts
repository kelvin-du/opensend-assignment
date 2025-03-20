export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = UserProfile;

export type ProfileResponse = LoginResponse;

export type UserProfile = {
  accesses: [
    {
      store_id: number;
    },
  ];
  tokens: {
    accessToken: string;
    clientToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    first_name: string;
    last_name: string;
    id: number;
  };
  view: {
    type: "ADMIN" | "CLIENT";
  };
};
