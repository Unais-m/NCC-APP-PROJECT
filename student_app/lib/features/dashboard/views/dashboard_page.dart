import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../../auth/providers/auth_provider.dart';
import '../providers/dashboard_provider.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  static const routeName = '/dashboard';

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => DashboardProvider()..load(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Cadet Dashboard'),
          actions: [
            IconButton(
              onPressed: () => context.read<AuthProvider>().logout(),
              icon: const Icon(Icons.logout),
            ),
          ],
        ),
        body: Consumer<DashboardProvider>(
          builder: (context, provider, _) {
            if (provider.loading) {
              return const Center(child: CircularProgressIndicator());
            }
            if (provider.error != null) {
              return Center(child: Text(provider.error!));
            }
            return RefreshIndicator(
              onRefresh: provider.load,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  _StatGrid(summary: provider.stats),
                  const SizedBox(height: 20),
                  _SectionCard(
                    title: 'Recent Activity',
                    child: Column(
                      children: provider.activities
                          .map((activity) => ListTile(
                                title: Text(activity['title'] as String? ?? 'Activity'),
                                subtitle: Text(
                                  '${DateFormat('dd MMM').format(DateTime.parse(activity['date'] as String))} · ${activity['hours']} hrs',
                                ),
                                trailing: Text(activity['status'] as String? ?? 'pending'),
                              ))
                          .toList(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  _SectionCard(
                    title: 'Notifications',
                    child: Column(
                      children: provider.notifications
                          .map((notification) => ListTile(
                                leading: const Icon(Icons.notifications_active_outlined),
                                title: Text(notification['message'] as String? ?? ''),
                                subtitle: Text(
                                  DateFormat('dd MMM, HH:mm')
                                      .format(DateTime.parse(notification['createdAt'] as String)),
                                ),
                              ))
                          .toList(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  _SectionCard(
                    title: 'Upcoming Camps',
                    child: Column(
                      children: provider.camps
                          .map((camp) => ListTile(
                                leading: const Icon(Icons.military_tech_outlined),
                                title: Text(camp['title'] as String? ?? 'Camp'),
                                subtitle: Text(
                                  '${camp['location']} · ${DateFormat('dd MMM').format(DateTime.parse(camp['startDate']))}',
                                ),
                                trailing: ElevatedButton(
                                  onPressed: () {},
                                  child: const Text('Apply'),
                                ),
                              ))
                          .toList(),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}

class _StatGrid extends StatelessWidget {
  const _StatGrid({this.summary});

  final DashboardSummary? summary;

  @override
  Widget build(BuildContext context) {
    final cards = [
      _StatCard(
        label: 'Total Hours',
        value: '${summary?.totalHours ?? 0}',
      ),
      _StatCard(
        label: 'Points',
        value: '${summary?.totalPoints ?? 0}',
      ),
      _StatCard(
        label: 'Verified Activities',
        value: '${summary?.approvedActivities ?? 0}',
      ),
    ];

    return GridView.count(
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      childAspectRatio: 1.6,
      shrinkWrap: true,
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      children: cards,
    );
  }
}

class _SectionCard extends StatelessWidget {
  const _SectionCard({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            child,
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(color: Colors.grey)),
            const SizedBox(height: 8),
            Text(value, style: Theme.of(context).textTheme.headlineMedium),
          ],
        ),
      ),
    );
  }
}



