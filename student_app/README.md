# NCC Connect Flutter App

Flutter student-facing companion for the NCC Connect platform. Provides splash, auth, dashboard, notifications, activity summaries, and admin quick view hooked to the existing Node/Express API.

## Getting Started

1. Install Flutter 3.24+.
2. From the repo root:
   ```sh
   cd student_app
   flutter pub get
   ```
3. Create a `.env` (optional) or pass an `--dart-define` for the API base:
   ```sh
   flutter run --dart-define=API_BASE_URL=http://192.168.1.10:5000/api
   ```

## Structure

- `lib/core` – shared theme and REST client.
- `lib/features/auth` – login/signup screens plus provider.
- `lib/features/dashboard` – cadet dashboard widgets.
- `lib/features/admin` – lightweight admin roster view.
- `lib/features/splash` – bootstrap + routing.

The app expects the server to send a `token` in `/auth/login` and `/auth/signup` responses; it persists the token with `shared_preferences` and attaches it as a Bearer token on subsequent requests.



