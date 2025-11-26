import 'package:flutter/material.dart';

ThemeData buildTheme() {
  const seedColor = Color(0xFF4A3AF4);
  return ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: seedColor),
    scaffoldBackgroundColor: const Color(0xFFF5F6FB),
    useMaterial3: true,
    textTheme: const TextTheme(
      headlineLarge: TextStyle(fontWeight: FontWeight.w600),
      titleMedium: TextStyle(fontWeight: FontWeight.w500),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        shape: const StadiumBorder(),
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
      ),
    ),
  );
}



