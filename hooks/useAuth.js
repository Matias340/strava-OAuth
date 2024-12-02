import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useStore } from '../store';

WebBrowser.maybeCompleteAuthSession();

const useAuth = () => {

  const setAccessToken = useStore(state => state.setAccessToken)
  const setAuthState = useStore(state => state.setAuthState)
  const authState = useStore(state => state.authState)

  const redirectUri = makeRedirectUri({
    scheme: 'stravaapp://redirect',
  });

  const authConfig = {
    clientId: '141460',
    redirectUri,
    scopes: ['activity:read_all'],
  };

  const [request, response, promptAsync] = useAuthRequest(authConfig, {
    authorizationEndpoint: 'https://www.strava.com/oauth/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
  });

  useEffect(() => {

    if (response?.type === 'success') {

      const { code } = response.params;

      const fetchToken = async () => {
        try {
          const res = await axios.post('https://www.strava.com/oauth/token', {
            client_id: authConfig.clientId,
            client_secret: '4b2b411272cd8521433034852cdbf5939a71403e',
            code,
            grant_type: 'authorization_code',
          });
          
          setAccessToken(res.data.access_token);
          setAuthState({
            isAuthenticated: true,
          });
        } catch (err) {
          console.error('Error obteniendo el token:', err);
          setAuthState({ isAuthenticated: false, accessToken: null });
        }
      };

      fetchToken();
    }
  }, [response, authConfig.clientId]);

  return {
    authState,
    loginWithStrava: promptAsync,  // Función para iniciar sesión
  };
};

export { useAuth };
