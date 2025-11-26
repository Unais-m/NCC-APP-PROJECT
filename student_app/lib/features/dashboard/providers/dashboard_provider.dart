import 'dart:convert';

import 'package:flutter/material.dart';

import '../../../core/api_client.dart';
import '../models/dashboard_summary.dart';

class DashboardProvider extends ChangeNotifier {
  final ApiClient _client = ApiClient.instance;

  DashboardSummary? stats;
  List<Map<String, dynamic>> activities = [];
  List<Map<String, dynamic>> notifications = [];
  List<Map<String, dynamic>> camps = [];
  bool loading = false;
  String? error;

  Future<void> load() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      final responses = await Future.wait([
        _client.get('/activities?limit=5'),
        _client.get('/notifications'),
        _client.get('/camps'),
        _client.get('/activities/summary'),
      ]);

      activities = (jsonDecode(responses[0].body)['activities'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      notifications = (jsonDecode(responses[1].body)['notifications'] as List<dynamic>)
          .cast<Map<String, dynamic>>();
      camps = (jsonDecode(responses[2].body)['camps'] as List<dynamic>)
          .cast<Map<String, dynamic>>();

      final summary = jsonDecode(responses[3].body)['summary'] as List<dynamic>;
      stats = _aggregateSummary(summary.cast<Map<String, dynamic>>());
    } catch (exception) {
      error = exception.toString();
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  DashboardSummary _aggregateSummary(List<Map<String, dynamic>> summary) {
    double hours = 0;
    double points = 0;
    int approved = 0;
    for (final entry in summary) {
      hours += (entry['totalHours'] as num?)?.toDouble() ?? 0;
      points += (entry['totalPoints'] as num?)?.toDouble() ?? 0;
      approved += entry['count'] as int? ?? 0;
    }
    return DashboardSummary(
      totalHours: hours,
      totalPoints: points,
      approvedActivities: approved,
    );
  }
}



