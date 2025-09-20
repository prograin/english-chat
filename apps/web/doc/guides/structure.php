apps/
  web/                    # frontend web app
    public/               # static assets
    src/
      components/         # reusable UI components
      features/           # domain-specific UI features
      pages/              # routes/pages
      hooks/              # custom React hooks
      services/           # client-side API calls
      styles/             # global CSS or tailwind
      utils/              # helper functions
      App.jsx
      index.jsx
  mobile/                 # optional future mobile app


------------------------------------------------------$_COOKIE
------------------------------------------------------$_COOKIE
------------------------------------------------------$_COOKIE

src/
      assets/
      common/             // Shared components, hooks, and utils used across multiple features
          components/
          hooks/
          utils/
      features/
          users/           // Feature module for user-related functionality
              components/
              hooks/
              services/
              UserProfilePage.jsx
              types.ts
          products/         // Feature module for product-related functionality
              components/
              hooks/
              services/
              ProductListPage.jsx
              types.ts
      App.jsx
      index.jsx

------------------------------------------------------$_COOKIE
------------------------------------------------------$_COOKIE
------------------------------------------------------$_COOKIE


apps/
  web/                  # Web frontend
    public/
    src/
      app/              # App-level configuration, routes, context
        routes/
        store/          # Redux/ Zustand store
        providers/      # Context providers
      features/         # Feature modules (domain-driven)
        users/
          components/
          hooks/
          services/
          pages/
          types.ts
      shared/           # App-specific shared code
        components/
        hooks/
        utils/
      assets/
      styles/
      App.jsx
      index.jsx

