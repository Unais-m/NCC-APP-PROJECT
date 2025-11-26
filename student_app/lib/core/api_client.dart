import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient {
  ApiClient._internal();
  static final ApiClient instance = ApiClient._internal();

  static const String _baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:5000/api',
  );

  Future<SharedPreferences> get _prefs async => SharedPreferences.getInstance();

  Future<String?> _getToken() async {
    final prefs = await _prefs;
    return prefs.getString('token');
  }

  Future<void> saveToken(String token) async {
    final prefs = await _prefs;
    await prefs.setString('token', token);
  }

  Future<void> clearToken() async {
    final prefs = await _prefs;
    await prefs.remove('token');
  }

  Future<http.Response> post(String path, Map<String, dynamic> body) async {
    final token = await _getToken();
    final response = await http.post(
      Uri.parse('$_baseUrl$path'),
      headers: _headers(token),
      body: jsonEncode(body),
    );
    _throwIfNeeded(response);
    return response;
  }

  Future<http.Response> get(String path) async {
    final token = await _getToken();
    final response = await http.get(
      Uri.parse('$_baseUrl$path'),
      headers: _headers(token),
    );
    _throwIfNeeded(response);
    return response;
  }

  Map<String, String> _headers(String? token) {
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  void _throwIfNeeded(http.Response response) {
    if (response.statusCode >= 400) {
      throw ApiException(
        statusCode: response.statusCode,
        message: response.body,
      );
    }
  }
}

class ApiException implements Exception {
  ApiException({required this.statusCode, required this.message});
  final int statusCode;
  final String message;

  @override
  String toString() => 'ApiException($statusCode): $message';
}



