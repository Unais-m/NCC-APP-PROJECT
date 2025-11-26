import 'dart:convert';

import 'package:flutter/material.dart';

import '../../../core/api_client.dart';
import '../../dashboard/views/dashboard_page.dart';
import '../../splash/splash_page.dart';

class AuthProvider extends ChangeNotifier {
  final ApiClient _client = ApiClient.instance;

  Map<String, dynamic>? user;
  bool bootstrapComplete = false;
  bool loading = false;
  String? error;

  String get initialRoute =>
      user == null ? SplashPage.routeName : DashboardPage.routeName;

  Future<void> bootstrap() async {
    if (bootstrapComplete) return;
    loading = true;
    notifyListeners();
    try {
      final response = await _client.get('/auth/me');
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      user = data['user'] as Map<String, dynamic>?;
    } catch (_) {
      await _client.clearToken();
      user = null;
    } finally {
      bootstrapComplete = true;
      loading = false;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    error = null;
    loading = true;
    notifyListeners();
    try {
      final response = await _client.post('/auth/login', {
        'email': email,
        'password': password,
      });
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      user = data['user'] as Map<String, dynamic>?;
      final token = data['token'] as String?;
      if (token != null) await _client.saveToken(token);
      return true;
    } catch (exception) {
      error = exception.toString();
      return false;
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<bool> signup(Map<String, dynamic> payload) async {
    error = null;
    loading = true;
    notifyListeners();
    try {
      final response = await _client.post('/auth/signup', payload);
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      user = data['user'] as Map<String, dynamic>?;
      final token = data['token'] as String?;
      if (token != null) await _client.saveToken(token);
      return true;
    } catch (exception) {
      error = exception.toString();
      return false;
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    await _client.post('/auth/logout', {});
    await _client.clearToken();
    user = null;
    notifyListeners();
  }
}

