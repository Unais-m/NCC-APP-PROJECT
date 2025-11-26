import 'package:flutter/material.dart';

import 'features/admin/views/admin_dashboard_page.dart';
import 'features/auth/views/login_page.dart';
import 'features/auth/views/signup_page.dart';
import 'features/dashboard/views/dashboard_page.dart';
import 'features/splash/splash_page.dart';

class AppRouter {
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  Route<dynamic> onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case SplashPage.routeName:
        return MaterialPageRoute(builder: (_) => const SplashPage());
      case LoginPage.routeName:
        return MaterialPageRoute(builder: (_) => const LoginPage());
      case SignupPage.routeName:
        return MaterialPageRoute(builder: (_) => const SignupPage());
      case DashboardPage.routeName:
        return MaterialPageRoute(builder: (_) => const DashboardPage());
      case AdminDashboardPage.routeName:
        return MaterialPageRoute(builder: (_) => const AdminDashboardPage());
      default:
        return MaterialPageRoute(builder: (_) => const SplashPage());
    }
  }
}



