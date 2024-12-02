# Strava OAuth App - React Native + Expo

Esta aplicación permite a los usuarios iniciar sesión con su cuenta de Strava utilizando el flujo de autorización OAuth 2.0. Fue desarrollada utilizando React Native con Expo y está diseñada para ser funcional tanto en Android como en iOS.

---

## 🚀 Configuración y Ejecución del Proyecto

### **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (recomendado: LTS)
- [Expo CLI](https://expo.dev/) (`npm install -g expo-cli`)
- Una cuenta en [Strava Developers](https://developers.strava.com/) para obtener tu `clientId` y `clientSecret`.
- Un dispositivo físico o un emulador (iOS o Android).

### **Pasos de Configuración**

1. **Clonar el repositorio**  
   Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/strava-oauth-app.git
   cd strava-oauth-app

   📋 Suposiciones y Decisiones de Diseño
OAuth 2.0 con Strava: Implemente un flujo de autorización utilizando la biblioteca expo-auth-session para garantizar compatibilidad con dispositivos móviles.
Gestión de estado: Utilize zustand para manejar el estado de autenticación y el token de acceso.
Expo Go: Decidi utilizar Expo Go para simplificar el flujo de desarrollo y depuración.
💡 Mejoras Potenciales
Dado más tiempo, estas son algunas áreas que podrían mejorarse:

Manejo de errores: Mejorar los mensajes de error para escenarios como tiempo de espera de autenticación o credenciales incorrectas.
Soporte Offline: Implementar almacenamiento en caché para mantener la sesión activa en caso de pérdida de conexión.
Diseño de la interfaz: Agregar animaciones, transiciones y personalizar aún más los estilos para mejorar la experiencia del usuario.
Pruebas: Integrar pruebas unitarias y funcionales con herramientas como Jest y Detox.
Seguridad: Almacenar el token de acceso de forma segura utilizando SecureStore o AsyncStorage cifrado.
🌟 Características Adicionales
Estas son algunas mejoras que añadimos para mostrar nuestras habilidades:

Interfaz personalizada: Inclui un botón estilizado para iniciar sesión y un spinner para indicar el estado de carga.
Redirección dinámica: Los usuarios autenticados son redirigidos automáticamente a la pantalla de actividades.
Estado persistente: Se garantiza que la autenticación persista mientras el token sea válido.
🛠 Tecnologías Utilizadas
React Native: Framework principal para el desarrollo de la app.
Expo: Entorno para simplificar el desarrollo y testing multiplataforma.
expo-auth-session: Para implementar el flujo de autorización OAuth 2.0.
Zustand: Manejo de estado de autenticación.
Axios: Cliente HTTP para obtener tokens de Strava.

🔗 Recursos
Documentación de Strava API
Expo AuthSession
React Native Docs
📧 Contacto

Autor: Matías Andrés
Email: mattersandres2000@gmail.com
GitHub: matias340
