import 'dart:convert';
import 'dart:js';
import 'package:crossplatform_app/models/user_model.dart';
import 'package:crossplatform_app/screens/add_farm_landing_page.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UserController {
  Future<String> registerUser(UserModel user) async {
    final url = Uri.parse('http://localhost:3000/api/user/register');
    print(url);
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode(user.toJson());
    print(body);

    try {
      final response = await http.post(url, headers: headers, body: body);

      if (response.statusCode == 201) {
        // Registration successful, handle the response as needed
        return ('Registration successful');
      } else {
        // Registration failed, handle the error response as needed
        final errorResponse = jsonDecode(response.body);
        final errorMessage = errorResponse['message'];
        return 'Registration failed: Please Enter required credentials';
      }
    } catch (e) {
      // An error occurred during the registration process
      return ('Registration error: $e');
    }
  }

  Future<String> loginUser(
      UserModel user, SharedPreferences prefs, BuildContext context) async {
    final url = Uri.parse('http://localhost:3000/api/user/login');
    print(url);
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode(user.toJson());
    print(body);

    try {
      final response = await http.post(url, headers: headers, body: body);

      var jsonResponse = jsonDecode(response.body);
      if (jsonResponse != null &&
          jsonResponse['status'] != null &&
          jsonResponse['status']) {
        var myToken = jsonResponse['token'];
        print('myToken: ${myToken}');
        prefs.setString('token', myToken);
        Navigator.push(context,MaterialPageRoute(builder: (context) => const AddFarmLandingPage()));

      }
      print('Response.statusCOde": ${response.statusCode}');
      if (response.statusCode == 200) {
        if (jsonResponse.containsKey('message')) {
          final message = jsonResponse['message'];
          return '$message';
        } else {
          return "User Login Successfull";
        }
      } else {
        if (jsonResponse.containsKey('error')) {
          final errorMessage = jsonResponse['error'];
          return 'Login failed: $errorMessage';
        } else {
          return 'Login failed: Please enter correct message';
        }
        // login failed, handle the error response as needed
      }
    } catch (e) {
      // An error occurred during the login process
      return ('Login error: $e');
    }
  }
}
