import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../auth/providers/auth_provider.dart';
import '../auth/views/login_page.dart';
import '../dashboard/views/dashboard_page.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  static const routeName = '/';

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    await auth.bootstrap();
    if (!mounted) return;
    if (auth.user != null) {
      Navigator.of(context).pushReplacementNamed(DashboardPage.routeName);
    } else {
      Navigator.of(context).pushReplacementNamed(LoginPage.routeName);
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}



