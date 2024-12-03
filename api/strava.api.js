import axios from "axios";

export const getActivities = (accessToken) => async () => {
  const response = await axios.get(
    "https://www.strava.com/api/v3/athlete/activities",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
