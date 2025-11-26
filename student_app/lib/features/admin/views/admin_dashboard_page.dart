import 'dart:convert';

import 'package:flutter/material.dart';

import '../../../core/api_client.dart';

class AdminDashboardPage extends StatefulWidget {
  const AdminDashboardPage({super.key});

  static const routeName = '/admin';

  @override
  State<AdminDashboardPage> createState() => _AdminDashboardPageState();
}

class _AdminDashboardPageState extends State<AdminDashboardPage> {
  final ApiClient _client = ApiClient.instance;
  List<Map<String, dynamic>> cadets = [];
  bool loading = false;
  String? error;

  @override
  void initState() {
    super.initState();
    _loadCadets();
  }

  Future<void> _loadCadets() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final response = await _client.get('/admin/cadets');
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      setState(() {
        cadets = (data['cadets'] as List<dynamic>).cast<Map<String, dynamic>>();
      });
    } catch (exception) {
      setState(() {
        error = exception.toString();
      });
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Admin Control Room')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(child: Text(error!))
              : RefreshIndicator(
                  onRefresh: _loadCadets,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: cadets.length,
                    itemBuilder: (_, index) {
                      final cadet = cadets[index];
                      return Card(
                        child: ListTile(
                          title: Text(cadet['name'] as String? ?? ''),
                          subtitle: Text('${cadet['college'] ?? ''} · ${cadet['role']}'),
                          trailing: TextButton(
                            onPressed: () {},
                            child: const Text('Manage'),
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}



