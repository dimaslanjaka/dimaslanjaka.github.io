## Optional Private Config

create new file named `_config.private.yml`. fill with following configs:

firebase config:
if you want deploy to firebase hosting
```yaml
firebase:
  apiKey: PROJECT_KEY
  authDomain: PROJECT_ID.firebaseapp.com
  projectId: PROJECT_ID
  storageBucket: PROJECT_ID.appspot.com
  messagingSenderId: 'PROJECT_MESSAGING_ID'
  appId: 'PROJECT_APP_ID'
  measurementId: PROJECT_MEASUREMENT_ID
```

ngrok config: [src/ngrok.ts](src/ngrok.ts)
ngrok server
```yaml
ngrok:
  token: "YOUR NGROK TOKEN"
```