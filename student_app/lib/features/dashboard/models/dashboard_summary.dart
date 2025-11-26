class DashboardSummary {
  const DashboardSummary({
    required this.totalHours,
    required this.totalPoints,
    required this.approvedActivities,
  });

  factory DashboardSummary.fromJson(Map<String, dynamic> json) => DashboardSummary(
        totalHours: (json['totalHours'] as num?)?.toDouble() ?? 0,
        totalPoints: (json['totalPoints'] as num?)?.toDouble() ?? 0,
        approvedActivities: json['approvedActivities'] as int? ?? 0,
      );

  final double totalHours;
  final double totalPoints;
  final int approvedActivities;
}



