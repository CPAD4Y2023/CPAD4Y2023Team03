import 'package:crossplatform_app/screens/add_farm_screen.dart';
import 'package:flutter/material.dart';
import 'package:crossplatform_app/constants.dart';
import 'package:crossplatform_app/screens/signup_screen.dart';

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
          width: double.infinity,
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 50),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Column(
                children: <Widget>[
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
                  image: DecorationImage(
                    image: AssetImage("icons/farmer.png"),
                  ),
                ),
              ),
              Column(
                children: <Widget>[
                  MaterialButton(
                    minWidth: double.infinity,
                    height: 60,
                    color: kPrimaryColor,
                    onPressed: () {
                      if (widget.token != null) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                AddFarmPage(token: widget.token),
                          ),
                        );
                      } else {
                        // Handle the case where the token is null
                        // Display an error message or redirect to the login screen
                        showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            title: const Text('Error'),
                            content:
                                const Text('Token is null. Please log in.'),
                            actions: [
                              TextButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => SignupPage(),
                                    ),
                                  );
                                },
                                child: const Text('Login'),
                              ),
                            ],
                          ),
                        );
                      }
                    },
                    shape: RoundedRectangleBorder(
                      side: const BorderSide(color: Colors.black),
                      borderRadius: BorderRadius.circular(50),
                    ),
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
