# SmartCart Pi: Integrated Shopping System

## Overview
SmartCart Pi is a cutting-edge smart cart system designed to enhance the shopping experience through advanced technology. Utilizing a Raspberry Pi and programmed in Python, this system integrates weight sensors, barcode scanners, an interactive display, and RFID for user authentication, offering real-time feedback and efficient purchase management. Additionally, it employs PubNub for real-time data communication, ensuring that every action on the cart is instantly displayed and synchronized with the web interface.

## Features
- **Real-Time Weight Sensing:** Utilizes weight sensors to automatically detect and log the weight of items placed in the cart, facilitating accurate billing and inventory management.
- **Barcode Scanning:** Employs a barcode scanner to quickly identify products and add them to the shopping cart's database, simplifying the checkout process.
- **Interactive Display:** Features an interactive display on the cart to show item details, prices, total costs, and more, allowing shoppers to manage their purchases directly from the cart.
- **RFID User Authentication:** Enhances security and personalization by using RFID technology for system login and user identification.
- **Real-Time Data Communication:** Uses PubNub to receive messages from the Raspberry Pi and display every action in real-time, while also sending corresponding data to the web interface.
- **Web Interface:** Developed with React and Node.js, the web interface enables remote monitoring and control of the cart, providing insights into usage and inventory levels.

## System Architecture
### Hardware Components
- Raspberry Pi (Model B+ or newer)
- Weight sensor module
- Barcode scanner
- LCD display or touch screen
- RFID reader
- Connection cables and power supply

### Software Components
- Python 3.x
- Node.js
- React (with hooks)
- PubNub for real-time communication
- Additional Python libraries:
  - `RPi.GPIO` for interfacing with the GPIO pins on the Raspberry Pi.
  - `hx711` for handling the HX711 weight sensor.
  - `mfrc522` for the RFID reader integration.
  - `threading` for managing concurrent operations.
  - `sys` for system-specific parameters and functions.

## Installation
### Setting up the Raspberry Pi
1. Flash Raspberry Pi with the latest version of Raspberry Pi OS.
2. Install Python and necessary libraries including PubNub.
3. Connect the hardware components according to the provided circuit diagram.

### Setting up the Web Application
1. Install Node.js and npm.
2. Clone the repository and navigate to the web application directory.
3. Run `npm install` to install dependencies, including PubNub.
4. Start the server with `npm start`.

## Usage
Detailed instructions on how to operate the system, including:
- **Starting the System:** How to power up and initialize the system.
- **Adding/Removing Items:** Instructions on adding or removing items from the cart.
- **Using RFID for Login:** Steps to authenticate and initiate a session using RFID.
- **Viewing Real-Time Actions:** Guidance on monitoring the real-time actions displayed via PubNub.
- **Checking Out:** Steps to finalize the shopping and process payments.

## Contributing
Contributions are welcome! If you'd like to improve SmartCart Pi or add features, please fork this repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, please reach out via GitHub or email [lo114.29li820@gmail.com].
