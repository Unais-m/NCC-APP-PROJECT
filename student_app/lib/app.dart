import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/theme.dart';
import 'features/auth/providers/auth_provider.dart';
import 'router.dart';

class NccConnectApp extends StatefulWidget {
  const NccConnectApp({super.key});

  @override
  State<NccConnectApp> createState() => _NccConnectAppState();
}

class _NccConnectAppState extends State<NccConnectApp> {
  late final AppRouter _router;

  @override
  void initState() {
    super.initState();
    _router = AppRouter();
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          return MaterialApp(
            title: 'NCC Connect',
            theme: buildTheme(),
            debugShowCheckedModeBanner: false,
            navigatorKey: _router.navigatorKey,
            onGenerateRoute: _router.onGenerateRoute,
            initialRoute: auth.initialRoute,
          );
        },
      ),
    );
  }
}



