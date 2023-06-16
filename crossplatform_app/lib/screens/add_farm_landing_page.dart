// import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:crossplatform_app/screens/add_farm_landing_page.dart';
import 'package:crossplatform_app/constants.dart';
import 'package:crossplatform_app/screens/signup_screen.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AddFarmLandingPage extends StatefulWidget {
  final token;

  const AddFarmLandingPage({@required this.token, Key? key}) : super(key: key);

  @override
  _AddFarmLandingPageState createState() => _AddFarmLandingPageState();
}

class _AddFarmLandingPageState extends State<AddFarmLandingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          // we will give media query height
          // double.infinity make it big as my parent allows
          // while MediaQuery make it big as per the screen

          width: double.infinity,
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 50),
          child: Column(
            // even space distribution
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Column(
                children: <Widget>[
                  // const Image{
                  //   image: AssetImage("icons/logo.png"),
                  //   width: 100,
                  //   height: 100,
                  // },
                  const Text(
                    "SwasthFarms",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 30,
                      color: kPrimaryColor,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Text(
                    "Welcome",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.grey[700],
                      fontSize: 15,
                    ),
                  )
                ],
              ),
              Container(
                height: MediaQuery.of(context).size.height / 3,
                decoration: const BoxDecoration(
                    image:
                        DecorationImage(image: AssetImage("icons/farmer.png"))),
              ),
              Column(
                children: <Widget>[
                  //Add Farm Button
                  MaterialButton(
                    minWidth: double.infinity,
                    height: 60,
                    color: kPrimaryColor,
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SignupPage()));
                    },
                    // defining the shape
                    shape: RoundedRectangleBorder(
                        side: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(50)),
                    child: const Text(
                      "Add Farm",
                      style:
                          TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
