class AddFarmModel {
  final String farmName;
  final double farmSize;
  final String farmLocation;
  final String farmerId;

  AddFarmModel({
    required this.farmName,
    required this.farmSize,
    required this.farmLocation,
    required this.farmerId,
  });

  Map<String, dynamic> toJson() {
    return {
      'farmName': farmName,
      'farmSize': farmSize,
      'farmLocation': farmLocation,
      'farmerId': farmerId
    };
  }
}
