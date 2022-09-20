## Information

This readme is a work in progress. It will be updated as the project progresses.

# Project Description

I couldnt find a consolidated place that gave me all the information I needed to to get a Raspberry PI up and running with an Express server. So I decided to make one.

This project will be a step by step guide to getting a Raspberry PI up and running with an Express server including socketio. The eventual goal is to have a Raspberry PI that can be accessed from anywhere in the world and can be used to control gpio pins.

For this project I will be using the following:

- [Raspberry PI 4 Model B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
  - The idea is to use socket.io to send and receive data from the Raspberry PI to another server. This will allow the client to control the gpio pins on the Raspberry PI. Without having to deal with router port forwarding and other issues that come with trying to access a Raspberry PI from the internet.
- [PM2](https://pm2.keymetrics.io/)
  - This is a process manager for Node.js applications. It will allow me to keep the Express server running even if I close the terminal.
- [Nginx](https://www.nginx.com/)
  - Nginx will be used as a reverse proxy to allow for http/https connections.
  - Since I plan on using sockets as the main way to communicate with the Raspberry PI, Nginx is mainly for testing purposes.
- [AWS](https://aws.amazon.com/)
  - I will be using AWS to host an Express and Socketio server. This will allow me to access the Raspberry PI from anywhere in the world.

# Pi Setup

Download and install Pi Imager from https://www.raspberrypi.org/software/

## Install Raspbian

- Insert a micro SD card into your computer.
- Open Pi Imager and select `Raspbian Pi OS(32-bit)` as the operating system, it should be the default.
- Click on choose Storage and select the SD card as the target.
- Click the settings icon.
  - Set hostname to `raspberrypi`
  - Make sure SSH is enabled
    - This will allow you to connect to the Raspberry PI via SSH.
    - Make sure "Use Password Authentication" is enabled.
  - Set a username and password.
    - This will be the username and password you use to login to the Raspberry PI.
  - Configure the wifi. (Wireless LAN)
    - This will allow you to connect to the Raspberry PI via wifi.
    - SSID: The name of your wifi network.
    - Password: The password for your wifi network.
    - **IMPORTANT: Make sure you have the correct wifi country code selected.**
      - This can be found in the dropdown menu.
      - If you select the wrong country code you will not be able to connect to the Raspberry PI via wifi.
- Click "Write" to write the image to the SD card.
- Remove the SD card from your computer and insert it into the Raspberry PI.
- Connect the Raspberry PI to power.
- Wait for the Raspberry PI to boot up.

## Connect to the Raspberry PI via SSH

- Using the `Hostname` you set earlier, you can get the IP address of the pi. This will be used to login via SSH.
- Open a terminal and run the following command.
  - ```bash
    ping -c 1 {{HOSTNAME}}.local | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" | head -1
    ```
  - This will return the IP address of the Raspberry PI.
- Open a terminal and run the following command.
  - This will connect you to the Raspberry PI via SSH.
  - ```bash
    ssh {{USERNAME}}@{{IP_ADDRESS}}
    ```
- Enter the password you set earlier.
- You should now be connected to the Raspberry PI via SSH.
- If you have previously connected to the pi, you may need to remove the old key from the known hosts file.
  - ```bash
    ssh-keygen -R {{IP_ADDRESS}}
    ```
  - This will remove the old key from the known hosts file.
  - You can now connect to the Raspberry PI via SSH.

## Update the Raspberry PI and install Node.js

- Run the following commands to update the Raspberry PI.
  - ```bash
    sudo apt update
    sudo apt upgrade
    ```
- Run the following commands to install Node.js and npm.
  - ```bash
    sudo apt-get install nodejs
    sudo apt-get install npm
    ```
- Update node and npm.
  - ```bash
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    ```
- Check the version of node and npm.
  - ```bash
    node -v
    npm -v
    ```
  - The version of node should be 16.15 or higher.
  - The version of npm should be 8.15 or higher.

## Install Git and Clone the Project and Install Dependencies

- Run the following command to install git.
  - ```bash
    sudo apt install git
    ```
- Navigate to the directory you want to clone the project into.
  - ```bash
    cd {{DIRECTORY}}
    ```
- Run the following command to clone the project.
  - ```bash
    git clone https://github.com/widgetdude/node-pi-server.git
    ```
- Navigate into the project directory.
  - ```bash
    cd node-pi-server
    ```
- Run the following command to install the project dependencies.
  - ```bash
    npm install
    ```

## Run the server to make sure everything is working

- Run the following command to start the server.
  - ```bash
    npm start
    ```
- The console should output the following.

  - ```bash
    Server running on port 3000
    ```

- Open a browser and navigate to the IP address of the Raspberry PI.

  - ```bash
    http://{{IP_ADDRESS}}:3000/api/helloworld
    ```

- You should see the following message.
  - ```json
    { "message": "Hello World" }
    ```
- Press `Ctrl + C` to stop the server.

## Install PM2 to keep the server running even if you close the terminal and after a reboot

- Run the following command to install PM2.
  - ```bash
    sudo npm install pm2@latest -g
    ```
- Run the following command to start the server with PM2.
  - ```bash
    pm2 start npm --name "node-pi-server" -- start
    ```
- Run the following command to save the process list.
  - ```bash
    pm2 save
    ```
- Run the following command to start the process list on boot.

  - ```bash
    pm2 startup systemd
    ```
  - It will output a command that you need to run. Copy and paste the command into the terminal and press enter.
  - Example:
    - ```bash
      sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u {{USERNAME}} --hp /home/{{USERNAME}}
      ```

- Restart the Raspberry PI to make sure everything is working.
  - ```bash
    sudo reboot
    ```
- Notice that during reboot process, the server isnt reachable. Open a web browser and navigate to the IP address of the Raspberry PI.
  - ```bash
    http://{{IP_ADDRESS}}:3000/api/helloworld
    ```
- You should see that the server is unreachable becuase the server is still starting up.
- Wait a about minute for the server to finish rebooting and try again.
- Because PM2 is set up, once the reboot is complete, the server should be reachable again.
- Open a web browser and navigate to the IP address of the Raspberry PI.
  - ```bash
    http://{{IP_ADDRESS}}:3000/api/helloworld
    ```
