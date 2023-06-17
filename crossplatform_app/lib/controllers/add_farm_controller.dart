import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:crossplatform_app/models/add_farm_model.dart';

class AddFarmController {
  Future<String> addfarm(AddFarmModel farm, String token) async {
    final url = Uri.parse('http://localhost:3000/api/farm/addfarm');
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
    final body = jsonEncode(farm.toJson());
  
    try {
      final response = await http.post(url, headers: headers, body: body);
      print('Response-----> ${response.statusCode }');

      if (response.statusCode == 201) {
        return ('Farm added Successfully');
      } else {
        return 'Farm creation failed: Please enter required details';
      }
    } catch (e) {
      return ('Creation error: $e');
    }
  }
}
