import 'package:crossplatform_app/models/add_farm_model.dart';
import 'package:flutter/material.dart';
import 'package:crossplatform_app/constants.dart';
import 'package:crossplatform_app/models/user_model.dart';
import 'package:crossplatform_app/controllers/add_farm_controller.dart';
import 'package:crossplatform_app/screens/login.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AddFarmPage extends StatefulWidget {
  final String token;

  const AddFarmPage({required this.token, Key? key}) : super(key: key);

  @override
  _AddFarmPageState createState() => _AddFarmPageState();
}

class _AddFarmPageState extends State<AddFarmPage> {
  late String farmerId;
  final AddFarmController _addfarmController = AddFarmController();
  final TextEditingController _farmnameController = TextEditingController();
  final TextEditingController _farmsizeController = TextEditingController();
  final TextEditingController _farmlocationController = TextEditingController();

  @override
  void initState() {
    super.initState();
    Map<String, dynamic> jwtDecodedToken = JwtDecoder.decode(widget.token);
    farmerId = jwtDecodedToken['_id'];
  }

  void _addfarm() async {
    final AddFarmModel farm = AddFarmModel(
      farmName: _farmnameController.text,
      farmSize: double.parse(_farmsizeController.text),
      farmLocation: _farmlocationController.text,
      farmerId: farmerId,
    );
    final String token = widget.token;
    final result = await _addfarmController.addfarm(farm, token);

    void _clearFields() {
      _farmnameController.clear();
      _farmsizeController.clear();
      _farmlocationController.clear();
    }

    if (result == 'Farm added Successfully') {
      _clearFields();
      // Success logic here
    } else {
      // Failure logic here
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        brightness: Brightness.light,
        backgroundColor: Colors.white,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(
            Icons.arrow_back_ios,
            size: 20,
            color: Colors.black,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          height: MediaQuery.of(context).size.height - 50,
          width: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Column(
                children: const <Widget>[
                  Text(
                    "Please Add your Farm",
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                ],
              ),
              Column(
                children: <Widget>[
                  inputFile(
                    label: "Farm Name",
                    controller: _farmnameController,
                  ),
                  inputFile(
                    label: "Farm Size",
                    controller: _farmsizeController,
                  ),
                  inputFile(
                    label: "Farm Location",
                    obscureText: true,
                    controller: _farmlocationController,
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.only(top: 3, left: 3),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  border: const Border(
                    bottom: BorderSide(color: Colors.black),
                    top: BorderSide(color: Colors.black),
                    left: BorderSide(color: Colors.black),
                    right: BorderSide(color: Colors.black),
                  ),
                ),
                child: MaterialButton(
                  minWidth: double.infinity,
                  height: 60,
                  onPressed: _addfarm,
                  color: kPrimaryColor,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: const Text(
                    "Submit",
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Widget inputFile({
  label,
  obscureText = false,
  required TextEditingController controller,
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      Text(
        label,
        style: const TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.w400,
          color: Colors.black87,
        ),
      ),
      const SizedBox(
        height: 5,
      ),
      TextField(
        controller: controller,
        obscureText: obscureText,
        decoration: const InputDecoration(
          contentPadding: EdgeInsets.symmetric(vertical: 0, horizontal: 10),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Color.fromARGB(255, 213, 213, 214)),
          ),
          border: OutlineInputBorder(
            borderSide: BorderSide(color: Color.fromARGB(255, 213, 213, 214)),
          ),
        ),
      ),
      const SizedBox(
        height: 10,
      ),
    ],
  );
}
